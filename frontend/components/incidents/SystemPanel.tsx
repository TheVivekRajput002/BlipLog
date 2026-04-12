'use client'

export default function SystemPanel() {
  return (
    <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* System Logs */}
      <div className="bg-surface border border-outline p-6">
        <h3 className="font-headline font-bold text-on-surface uppercase tracking-widest mb-4">
          System Logs
        </h3>
        <div className="space-y-2 font-mono text-sm text-on-surface-variant">
          <p>[2024-04-12 14:32] API health check passed</p>
          <p>[2024-04-12 14:22] Database query optimized</p>
          <p>[2024-04-12 14:12] Cache invalidated</p>
          <p className="text-on-surface-variant/50">[View all logs →]</p>
        </div>
      </div>

      {/* Infrastructure Metrics */}
      <div className="bg-surface border border-outline p-6">
        <h3 className="font-headline font-bold text-on-surface uppercase tracking-widest mb-4">
          Infrastructure
        </h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span className="font-mono text-on-surface-variant">CPU Usage</span>
              <span className="font-mono font-bold">35%</span>
            </div>
            <div className="w-full bg-outline h-1 rounded-full overflow-hidden">
              <div className="bg-warning h-full" style={{ width: '35%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span className="font-mono text-on-surface-variant">Memory</span>
              <span className="font-mono font-bold">62%</span>
            </div>
            <div className="w-full bg-outline h-1 rounded-full overflow-hidden">
              <div className="bg-warning h-full" style={{ width: '62%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span className="font-mono text-on-surface-variant">Disk</span>
              <span className="font-mono font-bold">45%</span>
            </div>
            <div className="w-full bg-outline h-1 rounded-full overflow-hidden">
              <div className="bg-success h-full" style={{ width: '45%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
