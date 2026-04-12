import { LatencyChart } from './LatencyChart'
import { CheckLog } from './CheckLog'
import type { CheckLogEntry, LatencyDataPoint } from '@/lib/types'

interface PerformanceGridProps {
  latencyData: LatencyDataPoint[]
  checkLog: CheckLogEntry[]
  onViewTrace?: () => void
}

export function PerformanceGrid({ latencyData, checkLog, onViewTrace }: PerformanceGridProps) {
  return (
    <section className="px-8 pb-8">
      <div className="grid grid-cols-12 gap-6">
        {/* Latency chart — 8 cols */}
        <div className="col-span-12 lg:col-span-8">
          <LatencyChart data={latencyData} />
        </div>

        {/* Check log — 4 cols */}
        <div className="col-span-12 lg:col-span-4">
          <CheckLog entries={checkLog} onViewTrace={onViewTrace} />
        </div>
      </div>
    </section>
  )
}