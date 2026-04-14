const dataLoader = require("dataloader");
const pool = require("../db/client");

function createLoaders() {
    const checkLoader = new DataLoader(async (monitorIds) => {
        const { rows } = await pool.query(
            `SELECT * FROM check_logs WHERE monitor_id = ANY($1:: int[]) ORDER BY checked_at DESC`,
            [monitorIds]
        );
        return monitorIds.map(id => rows.filter(r => r.monitor_id === id).slice(0, 30));
    });
}

const incidentLoader = new DataLoader(async (monitorIds) => {
    const { rows } = await pool.query(
        `SELECT * FROM incidents WHERE monitor_id = ANY($1:: int[]) AND resolved_at IS NULL`,
        [monitorIds]
    );
    return monitorIds.map(id => rows.find(r => r.monitor_id === id) || null);
});

return { checkLoader, incidentLoader };

module.exports = {
    Query: {
        monitors: async (_, __, { orgId }) => {
            const { rows } = await pool.query(
                'SELECT * FROM monitors WHERE org_id = $1',
                [orgId]
            );
            return rows;
        },
    },
    Monitor: {
        recentChecks: (monitor, _, { loaders }) => loaders.checkLoader.load(monitor.id),
        activeIncident: (monitor, _, { loaders }) => loaders.incidentLoader.load(monitor.id),
        updatedAt: (m) => m.updated_at,
    },
    CheckLog: {
        isUp: (c) => c.is_up,
        responseMs: (c) => c.response_ms,
        statusCode: (c) => c.status_code,
        checkedAt: (c) => c.checked_at,
    },
    Incident: {
        startedAt: (i) => i.started_at,
        resolvedAt: (i) => i.resolved_at,
        updates: async (incident) => {
            const { rows } = await pool.query(
                'SELECT * FROM incident_updates WHERE incident_id = $1 ORDER BY created_at ASC',
                [incident.id]
            );
            return rows;
        },
    },
    IncidentUpdate: {
        createdAt: (u) => u.created_at,
    },
};



