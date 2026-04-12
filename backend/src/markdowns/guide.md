# BlipLog — Backend Implementation Guide

> **Scope:** This guide covers the backend only. The frontend (Next.js) is already built.  
> **Stack:** Express.js · PostgreSQL (raw SQL) · Apollo Server (GraphQL) · Nodemailer/Resend · Railway

---

## Table of Contents

1. [Project Setup](https://claude.ai/chat/2e1f1465-fac7-444a-ab8d-cbf0f1cd2bc2#1-project-setup)
2. [Database Setup](https://claude.ai/chat/2e1f1465-fac7-444a-ab8d-cbf0f1cd2bc2#2-database-setup)
3. [Express App Scaffold](https://claude.ai/chat/2e1f1465-fac7-444a-ab8d-cbf0f1cd2bc2#3-express-app-scaffold)
4. [Authentication (GitHub + Google OAuth)](https://claude.ai/chat/2e1f1465-fac7-444a-ab8d-cbf0f1cd2bc2#4-authentication-github--google-oauth)
5. [REST API — Monitor Routes](https://claude.ai/chat/2e1f1465-fac7-444a-ab8d-cbf0f1cd2bc2#5-rest-api--monitor-routes)
6. [REST API — Incident Routes](https://claude.ai/chat/2e1f1465-fac7-444a-ab8d-cbf0f1cd2bc2#6-rest-api--incident-routes)
7. [GraphQL API (Apollo Server)](https://claude.ai/chat/2e1f1465-fac7-444a-ab8d-cbf0f1cd2bc2#7-graphql-api-apollo-server)
8. [Public Status Page Endpoints](https://claude.ai/chat/2e1f1465-fac7-444a-ab8d-cbf0f1cd2bc2#8-public-status-page-endpoints)
9. [Monitor Engine (Background Worker)](https://claude.ai/chat/2e1f1465-fac7-444a-ab8d-cbf0f1cd2bc2#9-monitor-engine-background-worker)
10. [Email Notifications](https://claude.ai/chat/2e1f1465-fac7-444a-ab8d-cbf0f1cd2bc2#10-email-notifications)
11. [Security Hardening](https://claude.ai/chat/2e1f1465-fac7-444a-ab8d-cbf0f1cd2bc2#11-security-hardening)
12. [Environment Variables](https://claude.ai/chat/2e1f1465-fac7-444a-ab8d-cbf0f1cd2bc2#12-environment-variables)
13. [Deployment (Railway + Neon)](https://claude.ai/chat/2e1f1465-fac7-444a-ab8d-cbf0f1cd2bc2#13-deployment-railway--neon)

---

## 1. Project Setup

### 1.1 Initialize the project

```bash
mkdir bliplog-api && cd bliplog-api
npm init -y

### 1.2 Install all dependencies

```bash
# Core
npm install express pg express-session connect-pg-simple

# Auth
npm install passport passport-github2 passport-google-oauth20

# GraphQL
npm install @apollo/server graphql dataloader

# Email
npm install nodemailer

# Security
npm install helmet cors csurf express-rate-limit

# Worker / cron
npm install node-cron axios

# Utilities
npm install dotenv uuid

# Dev
npm install -D nodemon

### 1.3 Folder structure

bliplog-api/
├── src/
│   ├── db/
│   │   ├── client.js          # pg Pool setup
│   │   └── schema.sql         # All CREATE TABLE statements
│   ├── routes/
│   │   ├── auth.js            # OAuth callbacks
│   │   ├── monitors.js        # CRUD for monitors
│   │   ├── incidents.js       # State transitions + updates
│   │   └── public.js          # Unauthenticated status page endpoints
│   ├── graphql/
│   │   ├── typeDefs.js        # Schema
│   │   └── resolvers.js       # Resolvers + DataLoader
│   ├── worker/
│   │   └── engine.js          # Monitor ping loop (cron)
│   ├── email/
│   │   └── mailer.js          # Nodemailer + templates
│   ├── middleware/
│   │   └── auth.js            # requireAuth middleware
│   └── index.js               # App entry point
├── .env
└── package.json


### 1.4 package.json scripts

```json
"scripts": {
  "dev": "nodemon src/index.js",
  "start": "node src/index.js",
  "worker": "node src/worker/engine.js"
}

---

## 2. Database Setup

### 2.1 Create a Neon Postgres database

1. Go to [neon.tech](https://neon.tech/) → create a new project → copy the `DATABASE_URL`.
2. Paste it into your `.env` file (see §12).

### 2.2 Database client — `src/db/client.js`

```js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // required for Neon
});

module.exports = pool;


### 2.3 Run the schema — `src/db/schema.sql`

Paste the SQL below into the Neon SQL editor (or run via `psql`):

```sql
-- Tenant root
CREATE TABLE orgs (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  slug       TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- OAuth users
CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  org_id     INTEGER REFERENCES orgs(id) ON DELETE CASCADE,
  email      TEXT NOT NULL UNIQUE,
  name       TEXT,
  avatar_url TEXT,
  provider   TEXT NOT NULL, -- 'github' | 'google'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Monitored endpoints
CREATE TABLE monitors (
  id           SERIAL PRIMARY KEY,
  org_id       INTEGER NOT NULL REFERENCES orgs(id) ON DELETE CASCADE,
  url          TEXT NOT NULL,
  name         TEXT NOT NULL,
  interval_sec INTEGER NOT NULL DEFAULT 60,
  status       TEXT NOT NULL DEFAULT 'up',
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_monitors_org ON monitors(org_id);

-- Every ping result
CREATE TABLE check_logs (
  id          BIGSERIAL PRIMARY KEY,
  monitor_id  INTEGER NOT NULL REFERENCES monitors(id) ON DELETE CASCADE,
  checked_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  response_ms INTEGER,
  status_code INTEGER,
  is_up       BOOLEAN NOT NULL
);
CREATE INDEX idx_check_logs_monitor_time
  ON check_logs(monitor_id, checked_at DESC);

-- Outage records
CREATE TABLE incidents (
  id            SERIAL PRIMARY KEY,
  monitor_id    INTEGER NOT NULL REFERENCES monitors(id) ON DELETE CASCADE,
  org_id        INTEGER NOT NULL REFERENCES orgs(id) ON DELETE CASCADE,
  started_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at   TIMESTAMPTZ,
  state         TEXT NOT NULL DEFAULT 'investigating',
  alert_sent_at TIMESTAMPTZ
);
CREATE INDEX idx_incidents_org ON incidents(org_id, id DESC);
CREATE INDEX idx_incidents_monitor ON incidents(monitor_id, resolved_at);

-- Public update posts
CREATE TABLE incident_updates (
  id          SERIAL PRIMARY KEY,
  incident_id INTEGER NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
  body        TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_incident_updates_incident ON incident_updates(incident_id);

-- Alert email contacts per monitor
CREATE TABLE alert_contacts (
  id          SERIAL PRIMARY KEY,
  monitor_id  INTEGER NOT NULL REFERENCES monitors(id) ON DELETE CASCADE,
  type        TEXT NOT NULL DEFAULT 'email',
  destination TEXT NOT NULL
);
CREATE INDEX idx_alert_contacts_monitor ON alert_contacts(monitor_id);

---

## 3. Express App Scaffold

### `src/index.js`

```js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const helmet = require('helmet');
const cors = require('cors');
const pool = require('./db/client');

const authRouter    = require('./routes/auth');
const monitorsRouter = require('./routes/monitors');
const incidentsRouter = require('./routes/incidents');
const publicRouter  = require('./routes/public');
const { createApolloServer } = require('./graphql');

const app = express();

// ── Security ──────────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// ── Sessions ──────────────────────────────────────────────
app.use(session({
  store: new PgSession({ pool }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 },
}));

// ── Routes ────────────────────────────────────────────────
app.use('/auth', authRouter);
app.use('/monitors', monitorsRouter);
app.use('/incidents', incidentsRouter);
app.use('/public', publicRouter);

// ── GraphQL ───────────────────────────────────────────────
async function start() {
  const { apolloServer, apolloMiddleware } = await createApolloServer();
  app.use('/graphql', apolloMiddleware);
  await apolloServer.start();

  app.listen(process.env.PORT || 4000, () =>
    console.log(`BlipLog API running on port ${process.env.PORT || 4000}`)
  );
}

start();

---

## 4. Authentication (GitHub + Google OAuth)

### 4.1 Register OAuth apps

- **GitHub:** Settings → Developer Settings → OAuth Apps → New OAuth App  
    Callback URL: `https://your-api.railway.app/auth/github/callback`
- **Google:** console.cloud.google.com → Credentials → OAuth 2.0 Client  
    Callback URL: `https://your-api.railway.app/auth/google/callback`

### 4.2 Auth middleware — `src/middleware/auth.js`

```js
function requireAuth(req, res, next) {
  if (!req.session.userId) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

module.exports = { requireAuth };

### 4.3 Auth routes — `src/routes/auth.js`

```js
const express = require('express');
const axios   = require('axios');
const pool    = require('../db/client');
const router  = express.Router();

// ── GitHub ─────────────────────────────────────────────────
router.get('/github', (req, res) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user:email`;
  res.redirect(url);
});

router.get('/github/callback', async (req, res) => {
  const { code } = req.query;
  // Exchange code for access token
  const tokenRes = await axios.post('https://github.com/login/oauth/access_token',
    { client_id: process.env.GITHUB_CLIENT_ID, client_secret: process.env.GITHUB_CLIENT_SECRET, code },
    { headers: { Accept: 'application/json' } }
  );
  const accessToken = tokenRes.data.access_token;

  // Fetch user profile
  const profileRes = await axios.get('https://api.github.com/user',
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  const profile = profileRes.data;

  // Upsert user
  const result = await pool.query(
    `INSERT INTO users (email, name, avatar_url, provider)
     VALUES ($1, $2, $3, 'github')
     ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
     RETURNING id, org_id`,
    [profile.email || `${profile.login}@github`, profile.name, profile.avatar_url]
  );
  const user = result.rows[0];
  req.session.userId = user.id;
  req.session.orgId  = user.org_id;
  res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
});

// ── Google ─────────────────────────────────────────────────
router.get('/google', (req, res) => {
  const params = new URLSearchParams({
    client_id:     process.env.GOOGLE_CLIENT_ID,
    redirect_uri:  `${process.env.API_URL}/auth/google/callback`,
    response_type: 'code',
    scope:         'openid email profile',
  });
  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
});

router.get('/google/callback', async (req, res) => {
  const { code } = req.query;
  const tokenRes = await axios.post('https://oauth2.googleapis.com/token', {
    code,
    client_id:     process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri:  `${process.env.API_URL}/auth/google/callback`,
    grant_type:    'authorization_code',
  });
  const { access_token } = tokenRes.data;
  const profileRes = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',
    { headers: { Authorization: `Bearer ${access_token}` } }
  );
  const profile = profileRes.data;
  const result = await pool.query(
    `INSERT INTO users (email, name, avatar_url, provider)
     VALUES ($1, $2, $3, 'google')
     ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
     RETURNING id, org_id`,
    [profile.email, profile.name, profile.picture]
  );
  const user = result.rows[0];
  req.session.userId = user.id;
  req.session.orgId  = user.org_id;
  res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

module.exports = router;

> **Note:** New users won't have an `org_id` yet. After OAuth, redirect them to an onboarding page where they create/join an org. On org creation, `INSERT INTO orgs` and `UPDATE users SET org_id`.

---

## 5. REST API — Monitor Routes

### `src/routes/monitors.js`

```js
const express      = require('express');
const pool         = require('../db/client');
const { requireAuth } = require('../middleware/auth');
const rateLimit    = require('express-rate-limit');
const router       = express.Router();

router.use(requireAuth);

// GET /monitors — list all monitors for the org
router.get('/', async (req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM monitors WHERE org_id = $1 ORDER BY created_at DESC',
    [req.session.orgId]
  );
  res.json(rows);
});

// POST /monitors — create a new monitor
router.post('/', async (req, res) => {
  const { url, name, contacts } = req.body; // contacts: ['email@example.com']
  const { rows } = await pool.query(
    `INSERT INTO monitors (org_id, url, name) VALUES ($1, $2, $3) RETURNING *`,
    [req.session.orgId, url, name]
  );
  const monitor = rows[0];

  // Insert alert contacts
  if (contacts?.length) {
    for (const email of contacts) {
      await pool.query(
        'INSERT INTO alert_contacts (monitor_id, type, destination) VALUES ($1, $2, $3)',
        [monitor.id, 'email', email]
      );
    }
  }
  res.status(201).json(monitor);
});

// PATCH /monitors/:id — update name/url
router.patch('/:id', async (req, res) => {
  const { name, url } = req.body;
  const { rows } = await pool.query(
    `UPDATE monitors SET name = COALESCE($1, name), url = COALESCE($2, url), updated_at = NOW()
     WHERE id = $3 AND org_id = $4 RETURNING *`,
    [name, url, req.params.id, req.session.orgId]
  );
  if (!rows.length) return res.status(404).json({ error: 'Not found' });
  res.json(rows[0]);
});

// DELETE /monitors/:id
router.delete('/:id', async (req, res) => {
  await pool.query(
    'DELETE FROM monitors WHERE id = $1 AND org_id = $2',
    [req.params.id, req.session.orgId]
  );
  res.json({ ok: true });
});

module.exports = router;

---

## 6. REST API — Incident Routes

### `src/routes/incidents.js`

```js
const express      = require('express');
const pool         = require('../db/client');
const { requireAuth } = require('../middleware/auth');
const rateLimit    = require('express-rate-limit');
const router       = express.Router();

router.use(requireAuth);

// Rate limit: max 10 update posts per org per hour
const updateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  keyGenerator: (req) => `org-${req.session.orgId}`,
  message: { error: 'Too many updates, try again later' },
});

const VALID_STATES = ['investigating', 'identified', 'monitoring', 'resolved'];

// PATCH /incidents/:id/state — transition the incident state
router.patch('/:id/state', async (req, res) => {
  const { state } = req.body;
  if (!VALID_STATES.includes(state)) return res.status(400).json({ error: 'Invalid state' });

  const extra = state === 'resolved' ? ', resolved_at = NOW()' : '';
  const { rows } = await pool.query(
    `UPDATE incidents SET state = $1${extra}
     WHERE id = $2 AND org_id = $3 RETURNING *`,
    [state, req.params.id, req.session.orgId]
  );
  if (!rows.length) return res.status(404).json({ error: 'Not found' });
  res.json(rows[0]);
});

// POST /incidents/:id/updates — post a public update
router.post('/:id/updates', updateLimiter, async (req, res) => {
  const { body } = req.body;
  // Verify this incident belongs to the org
  const check = await pool.query(
    'SELECT id FROM incidents WHERE id = $1 AND org_id = $2',
    [req.params.id, req.session.orgId]
  );
  if (!check.rows.length) return res.status(404).json({ error: 'Not found' });

  const { rows } = await pool.query(
    'INSERT INTO incident_updates (incident_id, body) VALUES ($1, $2) RETURNING *',
    [req.params.id, body]
  );
  res.status(201).json(rows[0]);
});

module.exports = router;

---

## 7. GraphQL API (Apollo Server)

### 7.1 Type definitions — `src/graphql/typeDefs.js`

```js
const { gql } = require('graphql-tag');

module.exports = gql`
  type Monitor {
    id: ID!
    url: String!
    name: String!
    status: String!
    updatedAt: String!
    recentChecks: [CheckLog!]!
    activeIncident: Incident
  }

  type CheckLog {
    id: ID!
    isUp: Boolean!
    responseMs: Int
    statusCode: Int
    checkedAt: String!
  }

  type Incident {
    id: ID!
    state: String!
    startedAt: String!
    resolvedAt: String
    updates: [IncidentUpdate!]!
  }

  type IncidentUpdate {
    id: ID!
    body: String!
    createdAt: String!
  }

  type Query {
    monitors: [Monitor!]!
  }
`;

### 7.2 Resolvers — `src/graphql/resolvers.js`

```js
const DataLoader = require('dataloader');
const pool = require('../db/client');

function createLoaders() {
  // Batch: load recent checks for many monitors in one query
  const checkLoader = new DataLoader(async (monitorIds) => {
    const { rows } = await pool.query(
      `SELECT * FROM check_logs
       WHERE monitor_id = ANY($1::int[])
       ORDER BY checked_at DESC`,
      [monitorIds]
    );
    return monitorIds.map(id => rows.filter(r => r.monitor_id === id).slice(0, 30));
  });

  // Batch: load active incident for many monitors
  const incidentLoader = new DataLoader(async (monitorIds) => {
    const { rows } = await pool.query(
      `SELECT * FROM incidents
       WHERE monitor_id = ANY($1::int[]) AND resolved_at IS NULL`,
      [monitorIds]
    );
    return monitorIds.map(id => rows.find(r => r.monitor_id === id) || null);
  });

  return { checkLoader, incidentLoader };
}

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
    recentChecks:   (monitor, _, { loaders }) => loaders.checkLoader.load(monitor.id),
    activeIncident: (monitor, _, { loaders }) => loaders.incidentLoader.load(monitor.id),
    updatedAt: (m) => m.updated_at,
  },
  CheckLog: {
    isUp:       (c) => c.is_up,
    responseMs: (c) => c.response_ms,
    statusCode: (c) => c.status_code,
    checkedAt:  (c) => c.checked_at,
  },
  Incident: {
    startedAt:  (i) => i.started_at,
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

### 7.3 Apollo setup — `src/graphql/index.js`

```js
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const typeDefs   = require('./typeDefs');
const resolvers  = require('./resolvers');
const { createLoaders } = require('./resolvers');

async function createApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const middleware = expressMiddleware(server, {
    context: async ({ req }) => ({
      orgId: req.session?.orgId,
      loaders: createLoaders(),
    }),
  });

  return { apolloServer: server, apolloMiddleware: middleware };
}

module.exports = { createApolloServer };

---

## 8. Public Status Page Endpoints

### `src/routes/public.js`

```js
const express    = require('express');
const pool       = require('../db/client');
const rateLimit  = require('express-rate-limit');
const router     = express.Router();

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
    `SELECT * FROM incidents
     WHERE org_id = $1 AND id < $2
     ORDER BY id DESC LIMIT 20`,
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
    `SELECT COUNT(*) FILTER (WHERE is_up = true)::float / COUNT(*) AS ratio
     FROM check_logs
     WHERE monitor_id = $1 AND checked_at >= NOW() - INTERVAL '90 days'`,
    [monitorId]
  );

  const ratio = parseFloat(rows[0].ratio) || 1.0;
  uptimeCache.set(monitorId, { ratio, cachedAt: now });
  res.json({ uptime: ratio });
});

module.exports = router;

---

## 9. Monitor Engine (Background Worker)

This is the heart of BlipLog. It runs as a separate process on Railway.

### `src/worker/engine.js`

```js
require('dotenv').config();
const cron  = require('node-cron');
const axios = require('axios');
const pool  = require('../db/client');
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
  const start  = Date.now();
  let isUp     = false;
  let responseMs = null;
  let statusCode = null;

  try {
    const res  = await axios.get(monitor.url, { timeout: 10000 });
    responseMs = Date.now() - start;
    statusCode = res.status;
    isUp       = res.status < 400;
  } catch (err) {
    responseMs = null; // timeout or network error
    isUp       = false;
  }

  // Write check log
  await pool.query(
    `INSERT INTO check_logs (monitor_id, response_ms, status_code, is_up)
     VALUES ($1, $2, $3, $4)`,
    [monitor.id, responseMs, statusCode, isUp]
  );

  // Evaluate last 3 results
  const { rows: recent } = await pool.query(
    `SELECT is_up FROM check_logs
     WHERE monitor_id = $1 ORDER BY checked_at DESC LIMIT 3`,
    [monitor.id]
  );

  const allDown = recent.length === 3 && recent.every(r => !r.is_up);
  const backUp  = isUp && monitor.status === 'down';

  // ── Transition to DOWN ─────────────────────────────────────
  if (allDown && monitor.status === 'up') {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(
        `UPDATE monitors SET status = 'down', updated_at = NOW() WHERE id = $1`,
        [monitor.id]
      );
      const { rows } = await client.query(
        `INSERT INTO incidents (monitor_id, org_id, started_at, state)
         VALUES ($1, $2, NOW(), 'investigating') RETURNING id`,
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
        `UPDATE incidents SET resolved_at = NOW(), state = 'resolved'
         WHERE monitor_id = $1 AND resolved_at IS NULL RETURNING *`,
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
      return; // already sent
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

---

## 10. Email Notifications

### `src/email/mailer.js`

```js
const nodemailer = require('nodemailer');
const pool = require('../db/client');

const transport = nodemailer.createTransport({
  host:   'smtp.resend.com',
  port:   465,
  secure: true,
  auth: {
    user: 'resend',
    pass: process.env.RESEND_API_KEY,
  },
});

async function getContacts(monitorId) {
  const { rows } = await pool.query(
    `SELECT destination FROM alert_contacts
     WHERE monitor_id = $1 AND type = 'email'`,
    [monitorId]
  );
  return rows.map(r => r.destination);
}

// Template 1 — Incident started (urgent)
async function sendIncidentStarted(incidentId, monitor) {
  const to = await getContacts(monitor.id);
  if (!to.length) return;

  await transport.sendMail({
    from:    'BlipLog Alerts <alerts@yourdomain.com>',
    to:      to.join(', '),
    subject: `[DOWN] ${monitor.name} is not responding`,
    text: [
      `${monitor.name} has been unreachable since ${new Date().toUTCString()}.`,
      `URL: ${monitor.url}`,
      `View status page: ${process.env.FRONTEND_URL}/status`,
    ].join('\n'),
  });
}

// Template 2 — Incident update (informative)
async function sendIncidentUpdate(incident, monitor, updateBody) {
  const to = await getContacts(monitor.id);
  if (!to.length) return;

  await transport.sendMail({
    from:    'BlipLog Alerts <alerts@yourdomain.com>',
    to:      to.join(', '),
    subject: `[UPDATE] ${monitor.name} — ${incident.state}`,
    text: [
      `The team has posted an update:`,
      `"${updateBody}"`,
      `Current state: ${incident.state}`,
      `View full timeline: ${process.env.FRONTEND_URL}/incidents/${incident.id}`,
    ].join('\n'),
  });
}

// Template 3 — Incident resolved (reassuring)
async function sendIncidentResolved(incident, monitor) {
  const to = await getContacts(monitor.id);
  if (!to.length) return;

  const downtimeMs = new Date() - new Date(incident.started_at);
  const minutes    = Math.round(downtimeMs / 60000);

  await transport.sendMail({
    from:    'BlipLog Alerts <alerts@yourdomain.com>',
    to:      to.join(', '),
    subject: `[RESOLVED] ${monitor.name} is back up — ${minutes} min downtime`,
    text: [
      `${monitor.name} recovered at ${new Date().toUTCString()}.`,
      `Total downtime: ${minutes} minutes`,
      `View incident timeline: ${process.env.FRONTEND_URL}/incidents/${incident.id}`,
    ].join('\n'),
  });
}

module.exports = { sendIncidentStarted, sendIncidentUpdate, sendIncidentResolved };

---

## 11. Security Hardening

All of the following should already be in place from the scaffold, but double-check each one:

**Helmet** — adds `X-Content-Type-Options`, `X-Frame-Options`, `Strict-Transport-Security`, and a `Content-Security-Policy` header to every response automatically via `app.use(helmet())`.

**CORS** — restricted to `FRONTEND_URL` only. Never use `origin: '*'` in production.

**SQL injection** — all queries must use parameterized placeholders (`$1`, `$2`). Do a project-wide search for backtick SQL strings and eliminate them.

**Multi-tenant isolation** — every query touching org-scoped data must include `WHERE org_id = $1` where `orgId` comes from `req.session.orgId`. Never trust `req.body.orgId` or URL parameters for this.

**CSRF** — for any form/mutation that mutates state via a browser session, attach the `csurf` middleware. Public read endpoints are exempt.

**Rate limiting** — three layers are already configured: public endpoints (100/15 min/IP), incident updates (10/hour/org), and alert emails (once per incident via `alert_sent_at`).

**Session security** — cookies are `httpOnly`, `secure`, and `sameSite: lax`. Session secret should be a long random string (32+ chars), rotatable via env var.

---

## 12. Environment Variables

### Railway (API + Worker) — `.env`

```env
DATABASE_URL=postgresql://...
SESSION_SECRET=a_very_long_random_string_here

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

RESEND_API_KEY=re_...
FRONTEND_URL=https://your-app.vercel.app
API_URL=https://your-api.railway.app
PORT=4000

### Vercel (Frontend) — environment settings

```env
NEXT_PUBLIC_API_URL=https://your-api.railway.app

---

## 13. Deployment (Railway + Neon)

### 13.1 Deploy the API

1. Push your repo to GitHub.
2. Create a new Railway project → **Deploy from GitHub repo**.
3. Set all environment variables from §12 in Railway's dashboard.
4. Set the **start command** to `npm start`.
5. Railway auto-detects Node.js and deploys. Get your public URL from the Railway dashboard.

### 13.2 Deploy the Worker as a separate Railway service

The monitor engine must run as a long-lived background process, separate from the API web server.

1. In the same Railway project, add a new **service** pointing to the same repo.
2. Set the **start command** to `npm run worker`.
3. Give it the same environment variables.
4. It runs independently — if the API crashes, the worker keeps pinging.

### 13.3 Set up Neon

1. Create a Neon project at [neon.tech](https://neon.tech/).
2. Open the **SQL Editor** and paste the full schema from §2.3.
3. Copy the connection string into `DATABASE_URL` in Railway.

### 13.4 Verify end-to-end

Run through this checklist after deployment:

- [ ] `POST /monitors` creates a monitor and it appears in the DB
- [ ] Worker fires within 60 seconds and writes a `check_log` row
- [ ] Taking a URL offline triggers an incident within 3 minutes
- [ ] An alert email is delivered within 5 minutes
- [ ] `GET /public/:slug` returns monitor data without authentication
- [ ] Restoring the URL resolves the incident and sends a resolved email
- [ ] Two different orgs cannot see each other's data

---

## Quick Reference — Key Design Rules

|Rule|Why|
|---|---|
|Always use `WHERE org_id = $1` with session org|Multi-tenant isolation|
|Status flip + incident creation in one transaction|Prevents orphaned incidents|
|Check `alert_sent_at` with `FOR UPDATE` before emailing|Idempotency — no duplicate alerts|
|Cursor pagination on incident history|Immune to row shifts from new inserts|
|Uptime % cached 5 min|Avoids full table scans on every page load|
|DataLoader for GraphQL check_logs|Prevents N+1 queries on dashboard|
|Worker runs as separate Railway service|API restarts don't stop monitoring|