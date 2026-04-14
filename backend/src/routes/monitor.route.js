const express = require("express");
const pool = require("../db/client");
const { requireAuth } = require("../middleware/auth.middleware");
const rateLimit = require("express-rate-limit");

const router = express.Router();

router.use(requireAuth);

router.get("/", async (req, res) => {
    const { rows } = await pool.query(
        'SELECT * FROM monitors WHERE org_id = $1 ORDER BY created_at DESC',
        [req.session.orgId]
    );
    res.json(rows)
})

router.post("/", async (req, res) => {
    const { url, name, contacts } = req.body
    const { rows } = await pool.query(
        'INSERT INTO monitors(org_id, url, name) VALUES($1, $2, $3) RETURNING *',
        [req.session.orgId, url, name]
    );

    const monitor = rows[0];

    if (contacts?.length) {
        for (const email of contacts) {
            await pool.query(
                'INSERT INTO alert_contacts (monitor_id, type, destination) VALUES ($1, $2, $3)',
                [monitor.id, 'email', email]
            );
        }
    }



    res.status(201).json(monitor);
})

router.patch('/:id', async (req, res) => {
    const { name, url } = req.body;
    const { rows } = await pool.query(
        'UPDATE monitors SET name = COALESCE($1, name), url = COALESCE($2, url), updated_at = NOW()      WHERE id = $3 AND org_id = $4 RETURNING *',
        [name, url, req.params.id, req.session.orgId]
    );
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
});

router.delete("/:id", async (req,res) => {
    await pool.query(
        'DELETE FROM monitors WHERE id = $1 AND org_id = $2',
        [req.params.id, req.session.orgId]
    )
    res.json({ok:true})
})

module.exports = router



