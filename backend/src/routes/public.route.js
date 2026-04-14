const express = require('express');
const pool = require('../db/client');
const rateLimit = require('express-rate-limit');
const router = express.Router();

// 100 requests per 15 min per IP
const publicLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
router.use(publicLimiter);

// Helper: resolve slug → orgId (never pass slug into data queries)
async function resolveOrg(slug) {
    const { rows } = await pool.query('SELECT id FROM orgs WHERE slug = $1', [slug]);
    return rows[0]?.id || null;
}

// GET /public/:slug — org summary + all monitors
router.get('/:slug', async (req, res) => {
    const orgId = await resolveOrg(req.params.slug);
    if (!orgId) return res.status(404).json({ error: 'Org not found' });

    const monitors = await pool.query(
        'SELECT id, name, url, status, updated_at FROM monitors WHERE org_id = $1',
        [orgId]
    );

    // Active incidents
    const incidents = await pool.query(
        'SELECT * FROM incidents WHERE org_id = $1 AND resolved_at IS NULL',
        [orgId]
    );

    res.json({ monitors: monitors.rows, activeIncidents: incidents.rows });
});

// GET /public/:slug/incidents — paginated incident history
router.get('/:slug/incidents', async (req, res) => {
    const orgId = await resolveOrg(req.params.slug);
    if (!orgId) return res.status(404).json({ error: 'Org not found' });

    const cursor = req.query.cursor ? parseInt(req.query.cursor) : 2147483647; // max int

    const { rows } = await pool.query(
        `SELECT * FROM incidents WHERE org_id = $1 AND id < $2 ORDER BY id DESC LIMIT 20`,
        [orgId, cursor]
    );

    const nextCursor = rows.length === 20 ? rows[rows.length - 1].id : null;
    res.json({ incidents: rows, nextCursor });
});

// GET /public/:slug/uptime/:monitorId — 90-day uptime (cached)
const uptimeCache = new Map(); // monitorId → { ratio, cachedAt }

router.get('/:slug/uptime/:monitorId', async (req, res) => {
    const orgId = await resolveOrg(req.params.slug);
    if (!orgId) return res.status(404).json({ error: 'Org not found' });

    const monitorId = parseInt(req.params.monitorId);
    const now = Date.now();
    const cached = uptimeCache.get(monitorId);

    if (cached && now - cached.cachedAt < 5 * 60 * 1000) {
        return res.json({ uptime: cached.ratio });
    }

    const { rows } = await pool.query(
        `SELECT COUNT(*) FILTER(WHERE is_up = true):: float / COUNT(*) AS ratio FROM check_logs WHERE monitor_id = $1 AND checked_at >= NOW() - INTERVAL '90 days'`,
        [monitorId]
    );

    const ratio = parseFloat(rows[0].ratio) || 1.0;
    uptimeCache.set(monitorId, { ratio, cachedAt: now });
    res.json({ uptime: ratio });
});

module.exports = router;