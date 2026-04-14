const nodemailer = require('nodemailer');
const pool = require('../db/client');

const transport = nodemailer.createTransport({
    host: 'smtp.resend.com',
    port: 465,
    secure: true,
    auth: {
        user: 'resend',
        pass: process.env.RESEND_API_KEY,
    },
});

async function getContacts(monitorId) {
    const { rows } = await pool.query(
        `SELECT destination FROM alert_contacts WHERE monitor_id = $1 AND type = 'email'`,
        [monitorId]
    );
    return rows.map(r => r.destination);
}

// Template 1 — Incident started (urgent)
async function sendIncidentStarted(incidentId, monitor) {
    const to = await getContacts(monitor.id);
    if (!to.length) return;

    await transport.sendMail({
        from: 'BlipLog Alerts alerts@yourdomain.com',
        to: to.join(', '),
        subject: `[DOWN] ${ monitor.name } is not responding`,
        text: [
            `${ monitor.name } has been unreachable since ${ new Date().toUTCString() }`,
            `URL: ${ monitor.url }`,
            `View status page: ${ process.env.FRONTEND_URL } / status`,
        ].join('\n'),
  });
}

// Template 2 — Incident update (informative)
async function sendIncidentUpdate(incident, monitor, updateBody) {
    const to = await getContacts(monitor.id);
    if (!to.length) return;

    await transport.sendMail({
        from: 'BlipLog Alerts alerts@yourdomain.com',
        to: to.join(', '),
        subject: `[UPDATE] ${ monitor.name } — ${ incident.state }`,
        text: [
            `The team has posted an update: `,
            `"${updateBody}"`,
            `Current state: ${ incident.state }`,
            `View full timeline: ${ process.env.FRONTEND_URL } / incidents / ${ incident.id }`,
        ].join('\n'),
  });
}

// Template 3 — Incident resolved (reassuring)
async function sendIncidentResolved(incident, monitor) {
    const to = await getContacts(monitor.id);
    if (!to.length) return;

    const downtimeMs = new Date() - new Date(incident.started_at);
    const minutes = Math.round(downtimeMs / 60000);

    await transport.sendMail({
        from: 'BlipLog Alerts alerts@yourdomain.com',
        to: to.join(', '),
        subject: `[RESOLVED] ${ monitor.name } is back up — ${ minutes } min downtime`,
        text: [
            `${ monitor.name } recovered at ${ new Date().toUTCString() }`,
            `Total downtime: ${ minutes } minutes`,
            `View incident timeline: ${ process.env.FRONTEND_URL } / incidents / ${ incident.id }`,
        ].join('\n'),
  });
}

module.exports = { sendIncidentStarted, sendIncidentUpdate, sendIncidentResolved };