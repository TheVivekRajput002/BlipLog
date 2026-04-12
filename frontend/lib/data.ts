// ─── Types ───────────────────────────────────────────────────────────────────

export type MonitorStatus = "up" | "down" | "degraded";

export interface HistoryBar {
  status: "green" | "yellow" | "red";
}

export interface Monitor {
  id: string;
  name: string;
  url: string;
  status: MonitorStatus;
  uptime: string;
  response: string;
  history: HistoryBar[];
}

export interface Incident {
  id: string;
  name: string;
  detail: string;
  startedAgo: string;
}

export interface LogEntry {
  timestamp: string;
  level: "INFO" | "ERROR" | "WARN";
  message: string;
}

export interface InfraMetric {
  label: string;
  value: number; // 0–100
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

export const MONITORS: Monitor[] = [
  {
    id: "1",
    name: "Core Frontend",
    url: "HTTPS://BLIPLOG.COM",
    status: "up",
    uptime: "99.98%",
    response: "142ms",
    history: [
      ...Array(5).fill({ status: "green" }),
      { status: "yellow" },
      ...Array(24).fill({ status: "green" }),
    ],
  },
  {
    id: "2",
    name: "Database Cluster B",
    url: "RDS.AWS.INTERNAL",
    status: "degraded",
    uptime: "96.42%",
    response: "1.2s",
    history: [
      { status: "green" },
      { status: "green" },
      { status: "green" },
      { status: "red" },
      { status: "red" },
      { status: "green" },
      { status: "green" },
      { status: "green" },
      { status: "yellow" },
      { status: "yellow" },
      ...Array(19).fill({ status: "green" }),
      { status: "yellow" },
    ],
  },
  {
    id: "3",
    name: "Auth Service",
    url: "AUTH.BLIPLOG.INTERNAL",
    status: "down",
    uptime: "99.10%",
    response: "TIMEOUT",
    history: [
      ...Array(29).fill({ status: "green" }),
      { status: "red" },
    ],
  },
];

export const ACTIVE_INCIDENTS: Incident[] = [
  {
    id: "1",
    name: "Primary API Gateway - Singapore",
    detail: "Connection timed out. Retrying in 15s.",
    startedAgo: "12m ago",
  },
  {
    id: "2",
    name: "Authentication Service",
    detail: "500 Internal Server Error (v2.4.1)",
    startedAgo: "4m ago",
  },
];

export const SYSTEM_LOGS: LogEntry[] = [
  {
    timestamp: "2023-10-24 14:22:01",
    level: "INFO",
    message: "Health check passed for Service_Frontend_Main (Singapore)",
  },
  {
    timestamp: "2023-10-24 14:21:55",
    level: "ERROR",
    message: "Connection timeout on API_GW_Primary. Attempting failover...",
  },
  {
    timestamp: "2023-10-24 14:21:40",
    level: "WARN",
    message: "Memory usage above 85% on K8s-Node-04",
  },
  {
    timestamp: "2023-10-24 14:21:32",
    level: "INFO",
    message: "SSL Certificate renewal successful for *.bliplog.com",
  },
  {
    timestamp: "2023-10-24 14:21:15",
    level: "INFO",
    message: "Worker-7 successfully processed job #88219",
  },
];

export const INFRA_METRICS: InfraMetric[] = [
  { label: "CPU CLUSTER_A", value: 42 },
  { label: "MEMORY_CORE", value: 68 },
  { label: "STORAGE_ROOT", value: 21 },
];
