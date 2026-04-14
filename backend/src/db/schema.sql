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
