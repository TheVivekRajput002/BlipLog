require('dotenv').config();
const cron = require('node-cron');
const axios = require('axios');
const pool = require('../db/client');
const { sendIncidentStarted, sendIncidentResolved } = require('../email/mailer');

// ── Main loop: fires every 60 seconds ──────────────────────
cron.schedule('* * * * *', async () => {
    console.log('[engine] tick', new Date().toISOString());
    const { rows: monitors } = await pool.query('SELECT * FROM monitors');

    for (const monitor of monitors) {
        await checkMonitor(monitor);
    }
});

async function checkMonitor(monitor) {
    const start = Date.now();
    let isUp = false;
    let responseMs = null;
    let statusCode = null;

    try {
        const res = await axios.get(monitor.url, { timeout: 10000 });
        responseMs = Date.now() - start;
        statusCode = res.status;
        isUp = res.status < 400;
    } catch (err) {
        responseMs = null; // timeout or network error
        isUp = false;
    }

    // Write check log
    await pool.query(
        `INSERT INTO check_logs(monitor_id, response_ms, status_code, is_up) VALUES($1, $2, $3, $4)`,
        [monitor.id, responseMs, statusCode, isUp]
    );

    // Evaluate last 3 results
    const { rows: recent } = await pool.query(
        `SELECT is_up FROM check_logs WHERE monitor_id = $1 ORDER BY checked_at DESC LIMIT 3`,
        [monitor.id]
    );

    const allDown = recent.length === 3 && recent.every(r => !r.is_up);
    const backUp = isUp && monitor.status === 'down';

    if (allDown && monitor.status === 'up') {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            await client.query(
                `UPDATE monitors SET status = 'down', updated_at = NOW() WHERE id = $1`,
                [monitor.id]
            );
            const { rows } = await client.query(
                `INSERT INTO incidents(monitor_id, org_id, started_at, state) VALUES($1, $2, NOW(), 'investigating') RETURNING id`,
                [monitor.id, monitor.org_id]
            );
            await client.query('COMMIT');
            await sendAlertIfNeeded(rows[0].id, monitor);
        } catch (e) {
            await client.query('ROLLBACK');
            console.error('[engine] down transition failed', e);
        } finally {
            client.release();
        }
    }

    // ── Transition to UP ──────────────────────────────────────
    if (backUp) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            await client.query(
                `UPDATE monitors SET status = 'up', updated_at = NOW() WHERE id = $1`,
                [monitor.id]
            );
            const { rows } = await client.query(
                `UPDATE incidents SET resolved_at = NOW(), state = 'resolved' WHERE monitor_id = $1 AND resolved_at IS NULL RETURNING *`,
                [monitor.id]
            );
            await client.query('COMMIT');
            if (rows.length) await sendIncidentResolved(rows[0], monitor);
        } catch (e) {
            await client.query('ROLLBACK');
            console.error('[engine] up transition failed', e);
        } finally {
            client.release();
        }
    }
}

// ── Idempotent alert sender ────────────────────────────────
async function sendAlertIfNeeded(incidentId, monitor) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const { rows } = await client.query(
            'SELECT alert_sent_at FROM incidents WHERE id = $1 FOR UPDATE',
            [incidentId]
        );
        if (rows[0].alert_sent_at !== null) {
            await client.query('ROLLBACK');
            return; 
        }
        await sendIncidentStarted(incidentId, monitor);
        await client.query(
            'UPDATE incidents SET alert_sent_at = NOW() WHERE id = $1',
            [incidentId]
        );
        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        console.error('[engine] alert failed', e);
    } finally {
        client.release();
    }
}

console.log('[engine] Monitor worker started');