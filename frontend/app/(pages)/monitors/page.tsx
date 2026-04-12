import {
  MonitorHeader,
  UptimePersistence,
  PerformanceGrid,
  IncidentHistory,
} from '@/components/monitors'

import {
  MOCK_MONITOR,
  MOCK_CHECK_LOG,
  MOCK_LATENCY_DATA,
  MOCK_INCIDENTS,
} from '@/lib/mock-data'

/**
 * /monitors/[id] — API Gateway Detail
 *
 * In a real app this would be a dynamic route that fetches monitor data
 * server-side. For now we use the mock data directly.
 */
export default function MonitorDetailPage() {
  return (
    <>
      <MonitorHeader monitor={MOCK_MONITOR} />

      <UptimePersistence monitor={MOCK_MONITOR} />

      <PerformanceGrid
        latencyData={MOCK_LATENCY_DATA}
        checkLog={MOCK_CHECK_LOG}
      />

      <IncidentHistory incidents={MOCK_INCIDENTS} />
    </>
  )
}