'use client'

import type { IncidentLegacy } from '@/lib/types'
import { IncidentItem } from './IncidentItem'

interface IncidentHistoryProps {
  incidents: IncidentLegacy[]
  onOpenIncident?: (id: string) => void
  onLoadMore?: () => void
}

export function IncidentHistory({
  incidents,
  onOpenIncident,
  onLoadMore,
}: IncidentHistoryProps) {
  return (
    <section className="px-8 pb-12">
      <div className="bg-[var(--color-bg-surface)] p-8 border border-[var(--color-border-default)]">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-[var(--color-text-tertiary)]">history</span>
          <h3 className="font-display font-bold uppercase tracking-widest text-sm text-[var(--color-text-primary)]">
            Incident History
          </h3>
        </div>

        {/* Incident list */}
        {incidents.length > 0 ? (
          <div className="space-y-4">
            {incidents.map((incident) => (
              <IncidentItem
                key={incident.id}
                incident={incident}
                onOpen={onOpenIncident}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <span className="material-symbols-outlined text-4xl text-[var(--color-text-tertiary)] mb-3 block">
              check_circle
            </span>
            <p className="font-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-widest">
              No incidents recorded
            </p>
          </div>
        )}

        {/* Load more */}
        <div className="mt-12 text-center">
          <button
            onClick={onLoadMore}
            className="font-display font-bold uppercase border border-[var(--color-border-default)] px-10 py-3 text-xs tracking-widest hover:bg-[var(--color-bg-elevated)] transition-colors text-[var(--color-text-primary)]"
          >
            Load Archive Logs
          </button>
        </div>
      </div>
    </section>
  )
}