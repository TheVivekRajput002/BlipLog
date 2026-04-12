'use client'

import type { MonitorLegacy } from '@/lib/types'
import { getUptimeBarColor, formatUptime } from '@/lib/utils'

interface UptimePersistenceProps {
  monitor: MonitorLegacy
}

export function UptimePersistence({ monitor }: UptimePersistenceProps) {
  return (
    <section className="px-8 py-8">
      <div className="bg-[var(--color-bg-surface)] p-6 border border-[var(--color-border-default)]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <span className="font-display font-bold uppercase tracking-widest text-xs text-[var(--color-text-primary)]">
            Uptime Persistence (Last 90 Days)
          </span>
          <span className="font-mono text-xs text-[var(--color-status-up)]">
            {formatUptime(monitor.uptimePercent)} AVAILABILITY
          </span>
        </div>

        {/* Bar chart */}
        <div
          className="flex gap-px h-16 w-full"
          role="img"
          aria-label={`90-day uptime chart — ${formatUptime(monitor.uptimePercent)} availability`}
        >
          {monitor.uptimeBars.map((bar, i) => (
            <div
              key={i}
              className="flex-1 transition-opacity hover:opacity-80"
              style={{ backgroundColor: getUptimeBarColor(bar.status) }}
              title={`${bar.date}: ${bar.status}`}
            />
          ))}
        </div>

        {/* Footer labels */}
        <div className="flex justify-between mt-4 font-mono text-[10px] text-[var(--color-text-tertiary)] uppercase">
          <span>90 days ago</span>
          <span>No data gaps detected</span>
          <span>Today</span>
        </div>
      </div>
    </section>
  )
}