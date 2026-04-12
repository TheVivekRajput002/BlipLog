import type {
  Monitor,
  MonitorLegacy,
  CheckLogEntry,
  LatencyDataPoint,
  Incident,
  IncidentLegacy,
  UptimeBar,
  NavItem,
} from './types'

// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: 'dashboard', href: '/dashboard' },
  { label: 'Monitors', icon: 'analytics', href: '/monitor', active: true },
  { label: 'Incidents', icon: 'emergency', href: '/incident' },
  { label: 'Settings', icon: 'settings', href: '/settings' },
]

export const NAV_FOOTER_ITEMS: NavItem[] = [
  { label: 'Documentation', icon: 'description', href: '#' },
  { label: 'Logout',        icon: 'logout',       href: '#' },
]

// ─── Monitor (Legacy) ──────────────────────────────────────────────────────────

function generateUptimeBars(): UptimeBar[] {
  return Array.from({ length: 90 }, (_, i) => ({
    date: `Day ${90 - i}`,
    status: i === 61 ? 'down' : 'up',
  }))
}

export const MOCK_MONITOR: MonitorLegacy = {
  id:              'api-gateway',
  name:            'API Gateway',
  url:             'https://api.monolith-infra.io/v2/gateway',
  status:          'up',
  uptimePercent:   99.982,
  checkInterval:   'Every 30s',
  regions:         ['EU-WEST-1', 'US-EAST-1'],
  uptimeBars:      generateUptimeBars(),
}

// ─── Check Log ────────────────────────────────────────────────────────────────

export const MOCK_CHECK_LOG: CheckLogEntry[] = [
  { id: '1', timestamp: '2023.10.24 14:22:01', statusCode: 200,  latencyMs: 122  },
  { id: '2', timestamp: '2023.10.24 14:21:31', statusCode: 200,  latencyMs: 118  },
  { id: '3', timestamp: '2023.10.24 14:21:01', statusCode: 200,  latencyMs: 135  },
  { id: '4', timestamp: '2023.10.24 14:20:31', statusCode: 200,  latencyMs: 142  },
  { id: '5', timestamp: '2023.10.24 14:20:01', statusCode: 200,  latencyMs: 129  },
  { id: '6', timestamp: '2023.10.24 14:19:31', statusCode: 502,  latencyMs: 2401 },
  { id: '7', timestamp: '2023.10.24 14:19:01', statusCode: 200,  latencyMs: 131  },
]

// ─── Latency Chart ────────────────────────────────────────────────────────────

export const MOCK_LATENCY_DATA: LatencyDataPoint[] = [
  { label: '12:00 PM', value: 240, heightPercent: 40 },
  { label: '',         value: 280, heightPercent: 47 },
  { label: '',         value: 220, heightPercent: 37 },
  { label: '',         value: 320, heightPercent: 53 },
  { label: '',         value: 240, heightPercent: 40 },
  { label: '',         value: 260, heightPercent: 43 },
  { label: '',         value: 480, heightPercent: 80, isSpike: true },
  { label: '06:00 PM', value: 320, heightPercent: 53 },
  { label: '',         value: 300, heightPercent: 50 },
  { label: '',         value: 280, heightPercent: 47 },
  { label: '',         value: 240, heightPercent: 40 },
  { label: '',         value: 220, heightPercent: 37 },
  { label: '',         value: 260, heightPercent: 43 },
  { label: '',         value: 280, heightPercent: 47 },
  { label: '',         value: 300, heightPercent: 50 },
  { label: '',         value: 320, heightPercent: 53 },
  { label: '',         value: 280, heightPercent: 47 },
  { label: '',         value: 240, heightPercent: 40 },
  { label: '12:00 AM', value: 220, heightPercent: 37 },
  { label: '',         value: 260, heightPercent: 43 },
  { label: '',         value: 500, heightPercent: 94, isSpike: true },
  { label: '06:00 AM', value: 280, heightPercent: 47 },
  { label: '',         value: 240, heightPercent: 40 },
  { label: 'NOW',      value: 220, heightPercent: 37 },
]

// ─── Incidents (Legacy) ────────────────────────────────────────────────────────

export const MOCK_INCIDENTS: IncidentLegacy[] = [
  {
    id:              'inc-001',
    date:            'Oct 14, 2023',
    startTime:       '14:12',
    endTime:         '14:28',
    durationMinutes: 16,
    title:           'High Latency Threshold Exceeded',
    description:     'Automatic trigger: P99 latency exceeded 2000ms for 5 consecutive checks. Resolved by internal auto-scaling group adjustment in EU-CENTRAL-1.',
    state:           'resolved',
    priority:        'high',
  },
  {
    id:              'inc-002',
    date:            'Sep 02, 2023',
    startTime:       '09:04',
    endTime:         '09:12',
    durationMinutes: 8,
    title:           'Partial Connectivity Loss',
    description:     'External upstream provider DNS resolution failure. Traffic rerouted via backup clusters.',
    state:           'resolved',
    priority:        'medium',
  },
  {
    id:              'inc-003',
    date:            'Aug 22, 2023',
    startTime:       '22:00',
    endTime:         '22:45',
    durationMinutes: 45,
    title:           'Scheduled Maintenance: DB Migration',
    description:     'Planned downtime for core database engine upgrade to v15.4. All systems nominal post-migration.',
    state:           'scheduled',
    priority:        'maintenance',
  },
]

export const incidents: Incident[] = [
  {
    id: "incident-1",
    date: "MAY 24, 2024",
    title: "API Latency Degraded",
    updates: [
      {
        type: "resolved" as const,
        message:
          "The upstream provider issue has been resolved. Latency returned to normal levels across all regions. Monitoring performance for the next 4 hours.",
      },
      {
        type: "investigating" as const,
        message:
          "We are investigating reports of elevated latency in the US-EAST-1 region. Our engineering team is currently tracing the root cause.",
      },
    ],
  },
  {
    id: "incident-2",
    date: "MAY 18, 2024",
    title: "Scheduled Maintenance",
    updates: [
      {
        type: "completed" as const,
        message:
          "Routine maintenance on core infrastructure completed successfully. No downtime was observed during the window.",
      },
    ],
  },
];

// ─── Monitors (Modern - for UI) ───────────────────────────────────────────────

export const monitors: Monitor[] = [
  {
    id: "api-gateway",
    name: "API Gateway",
    status: "operational",
    uptime: "99.98%",
    segments: [
      { status: "up" },
      { status: "up" },
      { status: "up" },
      { status: "up" },
      { status: "up" },
      { status: "up" },
      { status: "down", label: "Minor Outage" },
      { status: "up" },
      { status: "up" },
      { status: "up" },
    ],
  },
  {
    id: "database-cluster",
    name: "Database Cluster",
    status: "operational",
    uptime: "100.0%",
    segments: Array(10).fill({ status: "up" }),
  },
  {
    id: "cdn-edges",
    name: "CDN Edges",
    status: "operational",
    uptime: "99.99%",
    segments: Array(10).fill({ status: "up" }),
  },
];


