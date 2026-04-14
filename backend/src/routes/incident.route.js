const express = require("express");
const pool = require("../db/client");
const {requireAuth} = require("../middleware/auth.middleware");
const rateLimit = require("express-rate-limit");

const router = express.Router();
router.use(requireAuth);


const updateLimiter = rateLimit({
    windowMs: 60*60*1000,
    max:10,
    keyGenerator: (req) => `org-${req.session.orgId}`,
    message: { error: 'Too many updates, try again later' },
})

router.patch('/:id/state', async (req, res) => {
    const { state } = req.body;
    if (!VALID_STATES.includes(state)) return res.status(400).json({ error: 'Invalid state' });
  
    const extra = state === 'resolved' ? ', resolved_at = NOW()' : '';
    const { rows } = await pool.query(
      `UPDATE incidents SET state = $1${extra} WHERE id = $2 AND org_id = $3 RETURNING *`,
      [state, req.params.id, req.session.orgId]
    );
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  });

  router.post('/:id/updates', updateLimiter, async (req, res) => {
    const { body } = req.body;
    // Verify this incident belongs to the org
    const check = await pool.query(
      'SELECT id FROM incidents WHERE id = $1 AND org_id = $2',
      [req.params.id, req.session.orgId]
    );
    if (!check.rows.length) return res.status(404).json({ error: 'Not found' });
  
    const { rows } = await pool.query(
      `INSERT INTO incident_updates (incident_id, body) VALUES ($1, $2) RETURNING *`,
      [req.params.id, body]
    );
    res.status(201).json(rows[0]);
  });

  module.exports = router
