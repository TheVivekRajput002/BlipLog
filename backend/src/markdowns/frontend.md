# Bliplog — Frontend Technical Reference

---

## 1. Design Philosophy

BlipLog serves two very different audiences on the same product:

- **Engineering teams** — power users who need dense information, fast scanning, and zero friction during an incident at 2 AM.
- **End customers** — non-technical visitors checking if a service is down, needing instant clarity with no cognitive load.

The design system reflects this split. The **dashboard** is utilitarian and data-dense — built for speed. The **public status page** is calm, open, and reassuring — built for trust.

**Aesthetic direction:** Industrial minimalism. Dark backgrounds with sharp monochrome contrast, precise grid alignment, minimal color (reserved exclusively for status signals), and monospace accents that nod to infrastructure tooling without being retro.

---

## 2. Design Tokens

### 2.1 Color Palette

:root {
  /* Backgrounds */
  --color-bg-base:        #0a0a0b;   /* App background — near-black */
  --color-bg-surface:     #111113;   /* Cards, panels */
  --color-bg-elevated:    #1a1a1e;   /* Modals, dropdowns, hover states */
  --color-bg-subtle:      #222226;   /* Input fields, code blocks */

  /* Borders */
  --color-border-default: #2a2a30;   /* Standard border */
  --color-border-subtle:  #1e1e23;   /* Dividers, very faint separation */
  --color-border-strong:  #3a3a45;   /* Focused inputs, highlighted rows */

  /* Text */
  --color-text-primary:   #f0f0f2;   /* Headlines, primary labels */
  --color-text-secondary: #8a8a96;   /* Subtext, timestamps, captions */
  --color-text-tertiary:  #55555f;   /* Placeholder text, disabled */
  --color-text-inverse:   #0a0a0b;   /* Text on light/colored backgrounds */

  /* Status — the only real color in the system */
  --color-status-up:        #22c55e;   /* Green — operational */
  --color-status-up-dim:    #166534;   /* Green background tint */
  --color-status-down:      #ef4444;   /* Red — outage */
  --color-status-down-dim:  #7f1d1d;   /* Red background tint */
  --color-status-degraded:  #f59e0b;   /* Amber — degraded */
  --color-status-degraded-dim: #78350f; /* Amber background tint */
  --color-status-unknown:   #6b7280;   /* Grey — no data */

  /* Incident state badge colors */
  --color-state-investigating: #f59e0b;
  --color-state-identified:    #3b82f6;
  --color-state-monitoring:    #8b5cf6;
  --color-state-resolved:      #22c55e;

  /* Interactive */
  --color-accent:         #e0e0e8;   /* Primary action color — bright white-grey */
  --color-accent-hover:   #ffffff;   /* Hover on primary actions */
  --color-focus-ring:     #5a5aff;   /* Keyboard focus ring — subtle blue */

  /* Public status page overrides (light mode) */
  --color-public-bg:         #fafafa;
  --color-public-surface:    #ffffff;
  --color-public-border:     #e5e7eb;
  --color-public-text:       #111827;
  --color-public-text-sub:   #6b7280;
}

**Color usage rules:**

- Status colors (`--color-status-*`) are the only saturated colors in the UI. Nothing else competes.
- The webd is both light and dark mode . 
- Never use status colors for decoration — only for live status signals.
- Accent color (`--color-accent`) is used for primary buttons, links, and active nav items. It is deliberately muted (near-white) to avoid distraction.

---

### 2.2 Typography


/* Font stack */
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Syne:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');

:root {
  /* Display / Headings */
  --font-display: 'Syne', sans-serif;

  /* Body */
  --font-body: 'DM Sans', sans-serif;

  /* Monospace — used for IDs, URLs, timestamps, response times, uptime % */
  --font-mono: 'IBM Plex Mono', monospace;

  /* Scale */
  --text-xs:   0.75rem;    /* 12px — timestamps, badges, captions */
  --text-sm:   0.875rem;   /* 14px — secondary labels, table rows */
  --text-base: 1rem;       /* 16px — body text */
  --text-lg:   1.125rem;   /* 18px — section headers */
  --text-xl:   1.25rem;    /* 20px — card titles */
  --text-2xl:  1.5rem;     /* 24px — page titles */
  --text-3xl:  1.875rem;   /* 30px — dashboard hero stat */
  --text-4xl:  2.25rem;    /* 36px — public status page headline */

  /* Weight */
  --weight-regular: 400;
  --weight-medium:  500;
  --weight-semibold: 600;
  --weight-bold:    700;

  /* Line height */
  --leading-tight:  1.2;
  --leading-normal: 1.5;
  --leading-loose:  1.75;

  /* Letter spacing */
  --tracking-tight:  -0.02em;
  --tracking-normal:  0em;
  --tracking-wide:    0.05em;
  --tracking-widest:  0.1em;  /* used for labels, badge text */
}

**Typography rules:**

- `Syne` for all headings and the status page hero — geometric, authoritative.
- `DM Sans` for all body text and UI labels — neutral, readable at small sizes.
- `IBM Plex Mono` for all data values: response times, uptime percentages, IDs, URLs, timestamps. This visually distinguishes data from labels.
- ALL CAPS with `tracking-widest` for badge text and status labels only.

---

### 2.3 Spacing Scale


:root {
  --space-1:   0.25rem;   /* 4px */
  --space-2:   0.5rem;    /* 8px */
  --space-3:   0.75rem;   /* 12px */
  --space-4:   1rem;      /* 16px */
  --space-5:   1.25rem;   /* 20px */
  --space-6:   1.5rem;    /* 24px */
  --space-8:   2rem;      /* 32px */
  --space-10:  2.5rem;    /* 40px */
  --space-12:  3rem;      /* 48px */
  --space-16:  4rem;      /* 64px */
  --space-20:  5rem;      /* 80px */
  --space-24:  6rem;      /* 96px */
}


---

### 2.4 Border Radius


:root {
  --radius-sm:   4px;     /* Badges, chips */
  --radius-md:   8px;     /* Cards, inputs */
  --radius-lg:   12px;    /* Modals, large panels */
  --radius-xl:   16px;    /* Public status page cards */
  --radius-full: 9999px;  /* Pills, status dots */
}

---

### 2.5 Shadows


:root {
  --shadow-sm:  0 1px 3px rgba(0,0,0,0.4);
  --shadow-md:  0 4px 12px rgba(0,0,0,0.5);
  --shadow-lg:  0 8px 32px rgba(0,0,0,0.6);
  --shadow-glow-up:       0 0 12px rgba(34,197,94,0.2);   /* Green glow for "up" status */
  --shadow-glow-down:     0 0 12px rgba(239,68,68,0.3);   /* Red glow for "down" status */
  --shadow-glow-degraded: 0 0 12px rgba(245,158,11,0.2);
}

---

## 3. Layout System

### 3.1 Grid


.app-shell {
  display: grid;
  grid-template-columns: 240px 1fr;   /* Sidebar + main content */
  grid-template-rows: 56px 1fr;       /* Top bar + content */
  min-height: 100vh;
}

/* Content area max width — prevents lines from becoming too long */
.content-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-8);
}

/* Dashboard main grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-6);
}

/* Public status page — centered, narrower */
.public-container {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--space-12) var(--space-6);
}

### 3.2 Dashboard Layout Structure


┌─────────────────────────────────────────────────────────┐
│  Top Bar (56px) — Logo | Org Name | User Menu           │
├────────────────┬────────────────────────────────────────┤
│                │  Page Header (title + actions)         │
│  Sidebar       ├────────────────────────────────────────┤
│  (240px)       │  Stats Strip (4 metric cards)          │
│                ├────────────────────────────────────────┤
│  Nav items:    │  Monitor List                          │
│  - Dashboard   │  ┌──────────────────────────────────┐  │
│  - Monitors    │  │ Monitor Row × N                  │  │
│  - Incidents   │  └──────────────────────────────────┘  │
│  - Settings    │                                        │
│                │  Active Incidents Panel (if any)       │
└────────────────┴────────────────────────────────────────┘


### 3.3 Public Status Page Layout Structure


┌───────────────────────────────────────────┐
│  Minimal Header — Org Logo + Name         │
├───────────────────────────────────────────┤
│  Hero Status Banner                        │
│  "All Systems Operational"                │
├───────────────────────────────────────────┤
│  Monitor List                             │
│  ┌───────────────────────────────────┐    │
│  │ Monitor Row × N (name + bar + %)  │    │
│  └───────────────────────────────────┘    │
├───────────────────────────────────────────┤
│  Active Incidents (if any)                │
├───────────────────────────────────────────┤
│  Incident History (paginated)             │
└───────────────────────────────────────────┘

---

## 4. Component Library

### 4.1 StatusDot

The smallest status indicator. Used everywhere a status needs to be shown inline.

**Props:** `status: 'up' | 'down' | 'degraded' | 'unknown'`, `pulse?: boolean`

// Structure
<span class="status-dot status-dot--{status}">
  {pulse && <span class="status-dot__ring" />}
</span>

// CSS
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  display: inline-block;
  flex-shrink: 0;
}
.status-dot--up        { background: var(--color-status-up); }
.status-dot--down      { background: var(--color-status-down); }
.status-dot--degraded  { background: var(--color-status-degraded); }
.status-dot--unknown   { background: var(--color-status-unknown); }

/* Pulse animation — used when status is currently 'down' */
.status-dot--down .status-dot__ring {
  position: absolute;
  inset: -4px;
  border-radius: var(--radius-full);
  border: 1.5px solid var(--color-status-down);
  animation: pulse-ring 1.5s ease-out infinite;
}

@keyframes pulse-ring {
  0%   { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(2.5); }
}

---

### 4.2 StatusBadge

Pill-shaped label showing status or incident state. Slightly larger than StatusDot for contexts where it needs to be read.

**Props:** `status: 'up' | 'down' | 'degraded'` OR `state: 'investigating' | 'identified' | 'monitoring' | 'resolved'`

// Structure
<span class="status-badge status-badge--{value}">
  <StatusDot status={value} />
  {label}
</span>

// CSS
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
}

.status-badge--up         { background: var(--color-status-up-dim); color: var(--color-status-up); }
.status-badge--down       { background: var(--color-status-down-dim); color: var(--color-status-down); }
.status-badge--degraded   { background: var(--color-status-degraded-dim); color: var(--color-status-degraded); }
.status-badge--investigating { background: rgba(245,158,11,0.1); color: var(--color-state-investigating); }
.status-badge--identified    { background: rgba(59,130,246,0.1); color: var(--color-state-identified); }
.status-badge--monitoring    { background: rgba(139,92,246,0.1); color: var(--color-state-monitoring); }
.status-badge--resolved      { background: rgba(34,197,94,0.1);  color: var(--color-state-resolved); }

---

### 4.3 UptimeBar

The 90-day uptime visualization — the signature UI element of BlipLog.

**Props:** `days: Array<{ date: string, status: 'up' | 'down' | 'degraded' | 'no-data' }>`, `uptimePercent: number`

**Structure:**


<div class="uptime-bar">
  <div class="uptime-bar__segments">
    {days.map(day => (
      <Tooltip content={`${day.date} — ${day.status}`}>
        <span class={`uptime-bar__segment uptime-bar__segment--${day.status}`} />
      </Tooltip>
    ))}
  </div>
  <div class="uptime-bar__meta">
    <span class="uptime-bar__label">90 days ago</span>
    <span class="uptime-bar__percent">{uptimePercent}% uptime</span>
    <span class="uptime-bar__label">today</span>
  </div>
</div>

**CSS:**


.uptime-bar__segments {
  display: flex;
  gap: 2px;
  height: 28px;
}

.uptime-bar__segment {
  flex: 1;
  border-radius: 2px;
  transition: opacity 120ms ease;
  cursor: default;
}
.uptime-bar__segment:hover { opacity: 0.7; }

.uptime-bar__segment--up       { background: var(--color-status-up); }
.uptime-bar__segment--down     { background: var(--color-status-down); }
.uptime-bar__segment--degraded { background: var(--color-status-degraded); }
.uptime-bar__segment--no-data  { background: var(--color-bg-subtle); }

.uptime-bar__meta {
  display: flex;
  justify-content: space-between;
  margin-top: var(--space-2);
}

.uptime-bar__label {
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  font-family: var(--font-mono);
}

.uptime-bar__percent {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
}

---

### 4.4 MonitorCard (Dashboard)

The primary unit of the dashboard monitor list. Each registered endpoint is one card.

**Layout:**


┌────────────────────────────────────────────────────────────────┐
│  ● API Gateway                          [UP]    [⋮ Menu]       │
│  https://api.acme.com/health                                   │
│  ─────────────────────────────────────────────────────────── │
│  [Uptime Bar — 90 days]                                        │
│  90 days ago ·············· 99.94% uptime ················ today │
│  ─────────────────────────────────────────────────────────── │
│  Response time: 142ms        Last checked: 23s ago            │
└────────────────────────────────────────────────────────────────┘

**Props:** `monitor: Monitor`, `checkLogs: CheckLog[]`, `activeIncident?: Incident`

**CSS key rules:**

.monitor-card {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  padding: var(--space-5) var(--space-6);
  transition: border-color 150ms ease;
}

.monitor-card:hover {
  border-color: var(--color-border-strong);
}

/* When monitor is down — left border accent */
.monitor-card--down {
  border-left: 3px solid var(--color-status-down);
  box-shadow: var(--shadow-glow-down);
}

.monitor-card__name {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
}

.monitor-card__url {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  margin-top: var(--space-1);
}

.monitor-card__response {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

---

### 4.5 MonitorRow (Public Status Page)

Simpler, cleaner version for the public page. More breathing room, larger uptime bar.

**Layout:**

┌───────────────────────────────────────────────────────────┐
│  API Gateway                                    ✓ Up      │
│  [Uptime Bar — wider, more prominent]                      │
│  99.94% uptime over 90 days                               │
└───────────────────────────────────────────────────────────┘

---

### 4.6 IncidentCard

Shows an incident with its state, timeline of updates, and timestamps.

**Structure:**

<div class="incident-card">
  <div class="incident-card__header">
    <StatusBadge state={incident.state} />
    <h3 class="incident-card__title">{incident.title}</h3>
    <time class="incident-card__time">{incident.startedAt}</time>
  </div>

  <div class="incident-card__timeline">
    {updates.map(update => (
      <div class="incident-timeline-item">
        <div class="incident-timeline-item__dot" />
        <div class="incident-timeline-item__content">
          <span class="incident-timeline-item__state">{update.state}</span>
          <p class="incident-timeline-item__body">{update.body}</p>
          <time class="incident-timeline-item__time">{update.createdAt}</time>
        </div>
      </div>
    ))}
  </div>
</div>

**CSS:**

.incident-card {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  padding: var(--space-6);
}

/* Timeline vertical line */
.incident-card__timeline {
  margin-top: var(--space-5);
  padding-left: var(--space-5);
  border-left: 1px solid var(--color-border-subtle);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.incident-timeline-item__dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--color-border-strong);
  position: absolute;
  left: -4.5px;  /* Centered on the border-left line */
}

.incident-timeline-item__state {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-widest);
  color: var(--color-text-secondary);
}

.incident-timeline-item__body {
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  line-height: var(--leading-normal);
  margin-top: var(--space-1);
}

.incident-timeline-item__time {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  display: block;
  margin-top: var(--space-2);
}

---

### 4.7 MetricCard (Dashboard Stats Strip)

Four of these sit at the top of the dashboard, showing summary stats.

**Props:** `label: string`, `value: string | number`, `unit?: string`, `trend?: 'up' | 'down' | 'neutral'`

**Examples:** "Total Monitors / 12", "Uptime / 99.8%", "Active Incidents / 2", "Avg Response / 184ms"

.metric-card {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  padding: var(--space-5) var(--space-6);
}

.metric-card__label {
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-widest);
  color: var(--color-text-tertiary);
  font-family: var(--font-body);
}

.metric-card__value {
  font-family: var(--font-mono);
  font-size: var(--text-3xl);
  font-weight: var(--weight-medium);
  color: var(--color-text-primary);
  margin-top: var(--space-2);
  letter-spacing: var(--tracking-tight);
}

.metric-card__unit {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-left: var(--space-1);
}

---

### 4.8 Sidebar Navigation

.sidebar {
  width: 240px;
  background: var(--color-bg-base);
  border-right: 1px solid var(--color-border-subtle);
  padding: var(--space-6) var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.sidebar__logo {
  padding: var(--space-2) var(--space-3);
  margin-bottom: var(--space-6);
}

.sidebar__logo-text {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  letter-spacing: var(--tracking-tight);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: background 120ms ease, color 120ms ease;
  text-decoration: none;
}

.nav-item:hover {
  background: var(--color-bg-elevated);
  color: var(--color-text-primary);
}

.nav-item--active {
  background: var(--color-bg-elevated);
  color: var(--color-text-primary);
}

.nav-item__icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  opacity: 0.7;
}

---

### 4.9 Form Components

#### Input

.input {
  width: 100%;
  background: var(--color-bg-subtle);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  outline: none;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.input:focus {
  border-color: var(--color-border-strong);
  box-shadow: 0 0 0 3px rgba(90,90,255,0.15);
}

.input::placeholder { color: var(--color-text-tertiary); }


#### Button

/* Primary */
.btn-primary {
  background: var(--color-accent);
  color: var(--color-text-inverse);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-5);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  cursor: pointer;
  transition: background 120ms ease;
}
.btn-primary:hover { background: var(--color-accent-hover); }

/* Ghost */
.btn-ghost {
  background: transparent;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-5);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: border-color 120ms ease, color 120ms ease;
}
.btn-ghost:hover {
  border-color: var(--color-border-strong);
  color: var(--color-text-primary);
}

/* Destructive */
.btn-danger {
  background: transparent;
  color: var(--color-status-down);
  border: 1px solid var(--color-status-down-dim);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-5);
  font-size: var(--text-sm);
  cursor: pointer;
}
.btn-danger:hover {
  background: var(--color-status-down-dim);
}

---

### 4.10 Toast Notifications

Used for success/error feedback after actions (creating a monitor, posting an update).


// Position: fixed, bottom-right
// Auto-dismiss after 4s
// Stack up to 3 at a time

<div class="toast-container">  {/* fixed bottom-right */}
  <div class="toast toast--success">
    <CheckIcon />
    <span>Monitor created successfully</span>
  </div>
</div>

.toast-container {
  position: fixed;
  bottom: var(--space-6);
  right: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  z-index: 1000;
}

.toast {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-5);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  box-shadow: var(--shadow-lg);
  animation: toast-in 200ms ease;
}

@keyframes toast-in {
  from { opacity: 0; transform: translateX(16px); }
  to   { opacity: 1; transform: translateX(0); }
}

---

### 4.11 Modal / Dialog

Used for: Add Monitor, Confirm Delete, Post Incident Update.

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 500;
  animation: fade-in 150ms ease;
}

.modal {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  width: 100%;
  max-width: 480px;
  box-shadow: var(--shadow-lg);
  animation: modal-in 200ms ease;
}

@keyframes modal-in {
  from { opacity: 0; transform: scale(0.96) translateY(8px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

.modal__title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-6);
}

---

## 5. Pages

### 5.1 Login Page (`/login`)

**Purpose:** Entry point for engineering team. OAuth only — no email/password form in v1.

**Layout:** Full-screen centered card on dark background with subtle grid texture.

**Elements:**

- BlipLog logo + wordmark (centered, top of card)
- Tagline: _"Your services, watched. Your users, informed."_
- `Continue with GitHub` button (GitHub icon + label)
- `Continue with Google` button (Google icon + label)
- Divider: `— or —` (for future email auth)
- Footer: `Self-hosted · Open source`

**Interaction:** Clicking either OAuth button redirects to provider. On return, session is created and user is redirected to `/dashboard`.

---

### 5.2 Dashboard (`/dashboard`)

**Purpose:** Primary view for the engineering team. Shows all monitors at a glance.

**Sections (top to bottom):**

1. **Page Header**
    
    - Title: "Monitors"
    - Subtitle: "12 monitors · 2 down"
    - CTA button: "+ Add Monitor" (opens modal)
2. **Stats Strip** — 4 MetricCards in a row
    
    - Total Monitors
    - Overall Uptime % (last 30 days)
    - Active Incidents
    - Avg Response Time (ms)
3. **Monitor List**
    
    - Each monitor is a `MonitorCard`
    - Sorted: down monitors first, then degraded, then up
    - Empty state: centered illustration + "No monitors yet. Add your first one." + CTA button
4. **Active Incidents Panel** (only shown when incidents exist)
    
    - Collapsible section above the monitor list
    - Red left border accent on the panel
    - Each active incident shown with state badge, monitor name, time since start, and quick "Post Update" button

**States to handle:**

- Loading skeleton — cards with animated shimmer
- Empty state — no monitors added yet
- All up — subtle green tint on stats strip
- Incidents active — red alert banner at top of content area

---

### 5.3 Monitor Detail (`/monitors/:id`)

**Purpose:** Deep dive into a single monitor's history and settings.

**Sections:**

1. **Header** — Monitor name, URL, status badge, edit/delete actions
    
2. **Response Time Chart** — Line chart of `response_ms` over the last 24 hours
    
    - X-axis: time
    - Y-axis: milliseconds
    - Threshold line at 500ms (configurable)
    - Color: `--color-status-up` for the line, red segments where `is_up = false`
3. **Uptime Bar** — Full-width, 90-day view
    
4. **Recent Check Log** — Table of last 50 checks
    
    - Columns: Timestamp | Status Code | Response Time | Result
    - `is_up = false` rows have a subtle red background tint
    - Timestamps in `IBM Plex Mono`
5. **Incident History** — All past incidents for this monitor
    
6. **Settings Panel** (collapsible)
    
    - URL, display name, interval
    - Alert contacts list (add/remove emails)
    - Danger zone: Delete monitor

---

### 5.4 Incidents (`/incidents`)

**Purpose:** Team-facing view of all incidents across all monitors.

**Sections:**

1. **Filter Bar** — All / Active / Resolved / by Monitor
    
2. **Incident List**
    
    - Each incident is an `IncidentCard`
    - Active incidents appear at the top with animated state badge
    - Clicking an incident expands the timeline inline (accordion pattern)
3. **Post Update Flow** (for active incidents)
    
    - Inline form inside the IncidentCard
    - State selector: dropdown for `investigating → identified → monitoring → resolved`
    - Textarea for the public message
    - Character count indicator
    - Rate limit hint: "You can post up to 10 updates per hour"

---

### 5.5 Settings (`/settings`)

**Purpose:** Org-level configuration.

**Sections:**

1. **General** — Org name, slug (read-only after creation)
2. **Public Status Page** — Link to `/status/:slug`, copy button, preview button
3. **Alert Contacts** — Default email contacts for all new monitors
4. **Danger Zone** — Delete org (confirmation modal with typed slug required)

---

### 5.6 Public Status Page (`/status/:slug`)

**Purpose:** Customer-facing, unauthenticated. Designed to be calm and trustworthy.

**Theme:** Light mode. Clean white surface. Maximum breathing room.

**Sections (top to bottom):**

1. **Header**
    
    - Org name (large, `Syne` font)
    - Last updated timestamp ("Updated 23 seconds ago" — auto-refreshes every 30s)
2. **Hero Status Banner**
    
    - Full-width rounded banner
    - Three states:
        - **All Operational** — Subtle green background, checkmark icon, "All systems operational"
        - **Partial Outage** — Amber background, warning icon, "Partial system outage"
        - **Major Outage** — Red background, alert icon, "Major system outage"
3. **Monitor List**
    
    - Each monitor is a `MonitorRow` (lighter than dashboard card)
    - Name on left, status badge on right
    - Full-width uptime bar beneath name
    - Uptime percentage in monospace
4. **Active Incidents** (only if incidents exist)
    
    - Section header: "Active Incidents"
    - Each incident shown as an `IncidentCard` with full timeline
    - Auto-refreshes every 30 seconds
5. **Incident History**
    
    - Section header: "Past Incidents"
    - Paginated with "Load more" button (cursor pagination)
    - Resolved incidents shown in muted style
    - If no past incidents: "No incidents reported in the last 90 days."
6. **Footer**
    
    - "Powered by BlipLog" (light, small)

**Public page specific CSS:**

/* Override dark theme for public page */
.public-page {
  --color-bg-base:     var(--color-public-bg);
  --color-bg-surface:  var(--color-public-surface);
  --color-border-default: var(--color-public-border);
  --color-text-primary:   var(--color-public-text);
  --color-text-secondary: var(--color-public-text-sub);
  background: var(--color-public-bg);
}

.hero-banner {
  border-radius: var(--radius-xl);
  padding: var(--space-8) var(--space-10);
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.hero-banner--operational {
  background: rgba(34,197,94,0.08);
  border: 1px solid rgba(34,197,94,0.2);
}
.hero-banner--partial {
  background: rgba(245,158,11,0.08);
  border: 1px solid rgba(245,158,11,0.2);
}
.hero-banner--major {
  background: rgba(239,68,68,0.08);
  border: 1px solid rgba(239,68,68,0.2);
}

.hero-banner__title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
}

---

## 6. User Flows

### 6.1 Add a Monitor

Dashboard
  → Click "+ Add Monitor"
    → Modal opens (slide-up animation)
      → Fill in: Display Name, URL, Check Interval
        → Click "Add Monitor"
          → POST /monitors (with CSRF token)
            → Success: Modal closes, toast "Monitor created", new MonitorCard animates in
            → Error: Inline field errors, modal stays open

### 6.2 Incident Response Flow

Team receives alert email: "[DOWN] API Gateway is not responding"
  → Clicks link in email → lands on Dashboard
    → Sees red MonitorCard with pulsing StatusDot
      → Navigates to /incidents
        → Finds active incident
          → Clicks "Post Update"
            → Selects state: "Investigating"
            → Types message: "We are aware of the issue and investigating."
              → Click "Post Update"
                → POST /incidents/:id/updates
                  → Update appears on public status page immediately
                    → Repeat as investigation progresses
                      → When resolved: Select "Resolved" state
                        → Incident closes, monitor flips to "up"
                          → Team receives "[RESOLVED]" email

### 6.3 Customer Checks Status Page

Customer types status.acme.com/acme in browser (or clicks link from email)
  → Lands on /status/acme
    → Sees Hero Banner: "Major system outage" (red)
      → Scrolls down to Monitor List
        → Sees "API Gateway — DOWN" with red uptime bar segments today
          → Scrolls to Active Incidents
            → Reads incident updates timeline
              → Page auto-refreshes every 30s
                → After fix: Hero Banner changes to "All systems operational"

### 6.4 OAuth Login Flow


User visits /dashboard (unauthenticated)
  → Redirected to /login
    → Clicks "Continue with GitHub"
      → Redirected to GitHub OAuth
        → Authorizes → redirected to /auth/github/callback
          → Session created → redirected to /dashboard

---

## 7. Responsive Behavior

BlipLog is primarily a desktop application (engineering tooling). However, the public status page must be fully responsive.

### Dashboard — Breakpoints

|Breakpoint|Layout Change|
|---|---|
|`> 1024px`|Full sidebar + main content (default)|
|`768–1024px`|Sidebar collapses to icon-only (64px wide)|
|`< 768px`|Sidebar becomes bottom nav bar. MetricCards stack 2×2.|

### Public Status Page — Breakpoints

|Breakpoint|Layout Change|
|---|---|
|`> 768px`|Full-width layout, generous padding|
|`< 768px`|Reduced horizontal padding, uptime bar segments slightly taller for touch targets|

---

## 8. Animation Guidelines

Keep animations fast and purposeful. Never animate for decoration alone.

|Element|Animation|Duration|Easing|
|---|---|---|---|
|Modal open|scale(0.96) + translateY(8px) → normal|200ms|ease|
|Toast enter|translateX(16px) → normal|200ms|ease|
|Card hover|border-color|150ms|ease|
|Status dot pulse ring|scale + opacity loop|1500ms|ease-out|
|Page transition|opacity 0 → 1|200ms|ease|
|Skeleton shimmer|background-position sweep|1500ms|linear, infinite|
|Hero banner color change|background-color|500ms|ease|

**Skeleton loader pattern:**

.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-bg-elevated) 25%,
    var(--color-bg-subtle)   50%,
    var(--color-bg-elevated) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
  border-radius: var(--radius-sm);
}

@keyframes shimmer {
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
}

---

## 9. Accessibility

- All interactive elements must have visible focus rings (`--color-focus-ring`)
- Status is never communicated by color alone — always paired with text or icon
- `aria-live="polite"` on the active incident count in the sidebar (updates when incidents change)
- `aria-label` on all icon-only buttons
- Tooltip on each UptimeBar segment (accessible via keyboard focus)
- Public status page: `<main>`, `<nav>`, `<section>` landmarks used correctly
- Minimum touch target: 44×44px on mobile
- Color contrast: all text/background combinations meet WCAG AA (4.5:1 for normal text)

---

## 10. File & Folder Structure

src/
├── components/
│   ├── ui/
│   │   ├── StatusDot.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── UptimeBar.tsx
│   │   ├── MetricCard.tsx
│   │   ├── Toast.tsx
│   │   ├── Modal.tsx
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Skeleton.tsx
│   ├── monitors/
│   │   ├── MonitorCard.tsx
│   │   ├── MonitorRow.tsx
│   │   ├── MonitorForm.tsx
│   │   ├── ResponseTimeChart.tsx
│   │   └── CheckLogTable.tsx
│   ├── incidents/
│   │   ├── IncidentCard.tsx
│   │   ├── IncidentTimeline.tsx
│   │   └── PostUpdateForm.tsx
│   └── layout/
│       ├── AppShell.tsx
│       ├── Sidebar.tsx
│       ├── TopBar.tsx
│       └── PublicHeader.tsx
│
├── pages/
│   ├── login.tsx
│   ├── dashboard.tsx
│   ├── monitors/
│   │   └── [id].tsx
│   ├── incidents.tsx
│   ├── settings.tsx
│   └── status/
│       └── [slug].tsx          ← public status page
│
├── styles/
│   ├── tokens.css              ← all CSS variables (colors, spacing, typography)
│   ├── reset.css
│   └── globals.css
│
├── lib/
│   ├── apollo-client.ts        ← GraphQL client setup
│   ├── dataloader.ts
│   └── api.ts                  ← REST fetch helpers
│
└── hooks/
    ├── useMonitors.ts
    ├── useIncidents.ts
    └── useStatusPage.ts        ← polling hook for public page (30s interval)

---

## 11. State Management

No global state library (no Redux/Zustand). State lives as close to the component as possible.

|Scope|Approach|
|---|---|
|Server data (monitors, incidents)|Apollo Client cache (GraphQL) + SWR for REST|
|Auth session|React context (`SessionContext`) — populated on app mount|
|Modal open/close|Local `useState` in parent component|
|Toast queue|Single `ToastContext` provider at app root|
|Public status page polling|`useStatusPage` custom hook with `setInterval` (30s)|