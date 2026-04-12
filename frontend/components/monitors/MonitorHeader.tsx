'use client'

import type { MonitorLegacy } from '@/lib/types'
import { getStatusBadgeClass } from '@/lib/utils'

interface MonitorHeaderProps {
  monitor: MonitorLegacy
  onEdit?: () => void
  onPause?: () => void
}

const STATUS_LABELS: Record<string, string> = {
  up:       'Operational',
  down:     'Outage',
  degraded: 'Degraded',
  unknown:  'Unknown',
}

export function MonitorHeader({ monitor, onEdit, onPause }: MonitorHeaderProps) {
  return (
    <section className="px-8 pt-8 pb-0">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-[var(--color-border-default)] pb-8">
        {/* Left: title + meta */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 flex-wrap">
            <h1 className="font-display font-extrabold text-5xl tracking-tight uppercase text-[var(--color-text-primary)]">
              {monitor.name}
            </h1>
            <span className={getStatusBadgeClass(monitor.status)}>
              {STATUS_LABELS[monitor.status]}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-[var(--color-text-secondary)]">
            <MetaItem icon="link">
              <span className="underline underline-offset-2">{monitor.url}</span>
            </MetaItem>
            <MetaItem icon="schedule">
              CHECK {monitor.checkInterval.toUpperCase()}
            </MetaItem>
            <MetaItem icon="location_on">
              {monitor.regions.join(', ')}
            </MetaItem>
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex gap-3 shrink-0">
          <button
            onClick={onEdit}
            className="bg-[var(--color-accent)] text-[var(--color-text-inverse)] font-display font-bold uppercase py-3 px-8 text-xs tracking-widest hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            Edit Monitor
          </button>
          <button
            onClick={onPause}
            className="border border-[var(--color-border-default)] text-[var(--color-text-primary)] font-display font-bold uppercase py-3 px-6 text-xs tracking-widest hover:bg-[var(--color-bg-elevated)] transition-colors"
          >
            Pause
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Sub-component ────────────────────────────────────────────────────────────

function MetaItem({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="material-symbols-outlined text-sm">{icon}</span>
      {children}
    </div>
  )
}