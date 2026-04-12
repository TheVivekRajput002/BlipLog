import type { MonitorStatus, IncidentState, IncidentPriority } from './types'

// ─── Status helpers ───────────────────────────────────────────────────────────

export function getStatusBadgeClass(status: MonitorStatus): string {
  const map: Record<MonitorStatus, string> = {
    up:           'status-badge--up',
    down:         'status-badge--down',
    degraded:     'status-badge--degraded',
    unknown:      'status-badge--unknown',
    operational:  'status-badge--up',
    outage:       'status-badge--down',
  }
  return `status-badge ${map[status]}`
}

export function getStatusDotClass(status: MonitorStatus): string {
  const map: Record<MonitorStatus, string> = {
    up:           'status-dot--up',
    down:         'status-dot--down',
    degraded:     'status-dot--degraded',
    unknown:      'status-dot--unknown',
    operational:  'status-dot--up',
    outage:       'status-dot--down',
  }
  return `status-dot ${map[status]}`
}

export function getUptimeBarColor(status: MonitorStatus): string {
  const map: Record<MonitorStatus, string> = {
    up:           'var(--color-status-up)',
    down:         'var(--color-status-down)',
    degraded:     'var(--color-status-degraded)',
    unknown:      'var(--color-status-unknown)',
    operational:  'var(--color-status-up)',
    outage:       'var(--color-status-down)',
  }
  return map[status]
}

// ─── Incident state helpers ───────────────────────────────────────────────────

export function getIncidentStateBadgeClass(state: IncidentState): string {
  const map: Record<IncidentState, string> = {
    investigating: 'status-badge--investigating',
    identified:    'status-badge--identified',
    monitoring:    'status-badge--monitoring',
    resolved:      'status-badge--resolved',
    scheduled:     'status-badge--monitoring',
  }
  return `status-badge ${map[state]}`
}

// ─── Priority tag ─────────────────────────────────────────────────────────────

export function getPriorityLabel(priority: IncidentPriority): string {
  const map: Record<IncidentPriority, string> = {
    critical:    'Critical Priority',
    high:        'High Priority',
    medium:      'Medium Priority',
    low:         'Low Priority',
    maintenance: 'Maintenance',
  }
  return map[priority]
}

// ─── HTTP status helpers ──────────────────────────────────────────────────────

export function isSuccessStatus(code: number): boolean {
  return code >= 200 && code < 300
}

export function getStatusCodeColor(code: number): string {
  if (code >= 200 && code < 300) return 'var(--color-status-up)'
  if (code >= 400 && code < 500) return 'var(--color-status-degraded)'
  return 'var(--color-status-down)'
}

// ─── Formatting ───────────────────────────────────────────────────────────────

export function formatLatency(ms: number): string {
  return `${ms}ms`
}

export function formatUptime(percent: number): string {
  return `${percent.toFixed(3)}%`
}