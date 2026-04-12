// ─── Status ───────────────────────────────────────────────────────────────────

export type MonitorStatus = 'up' | 'down' | 'degraded' | 'unknown' | 'operational' | 'outage'
export type IncidentState = 'investigating' | 'identified' | 'monitoring' | 'resolved' | 'scheduled'
export type IncidentPriority = 'critical' | 'high' | 'medium' | 'low' | 'maintenance'
export type TimeRange = '24H' | '7D' | '30D'

// ─── Uptime Segment (for UI) ───────────────────────────────────────────────────

export interface UptimeSegment {
  status: "up" | "down" | "partial"
  label?: string
}

// ─── Monitor (modern schema - for UI) ──────────────────────────────────────────

export interface Monitor {
  id: string
  name: string
  status: MonitorStatus
  uptime: string
  segments: UptimeSegment[]
}

// ─── Monitor Legacy (old schema - for mock-data) ───────────────────────────────

export interface MonitorLegacy {
  id: string
  name: string
  url: string
  status: MonitorStatus
  uptimePercent: number
  checkInterval: string
  regions: string[]
  uptimeBars: UptimeBar[]
}

export interface UptimeBar {
  date: string
  status: MonitorStatus
}

// ─── Check Log ────────────────────────────────────────────────────────────────

export interface CheckLogEntry {
  id: string
  timestamp: string
  statusCode: number
  latencyMs: number
}

// ─── Latency Chart ────────────────────────────────────────────────────────────

export interface LatencyDataPoint {
  label: string
  value: number        // in ms
  heightPercent: number
  isSpike?: boolean
}

// ─── Incident Update ──────────────────────────────────────────────────────────

export interface IncidentUpdate {
  type: "resolved" | "investigating" | "monitoring" | "identified" | "completed"
  message: string
}

// ─── Incident (modern schema - for UI) ────────────────────────────────────────

export interface Incident {
  id: string
  date: string
  title: string
  updates: IncidentUpdate[]
}

// ─── Incident Legacy (old schema - for mock-data) ────────────────────────────

export interface IncidentLegacy {
  id: string
  date: string
  startTime: string
  endTime: string
  durationMinutes: number
  title: string
  description: string
  state: IncidentState
  priority: IncidentPriority
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  icon: string
  href: string
  active?: boolean
}