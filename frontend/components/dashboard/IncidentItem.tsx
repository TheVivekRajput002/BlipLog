'use client'

import type { IncidentLegacy } from '@/lib/types'
import { getIncidentStateBadgeClass, getPriorityLabel } from '@/lib/utils'

interface IncidentItemProps {
  incident: IncidentLegacy
  onOpen?: (id: string) => void
}

export function IncidentItem({ incident, onOpen }: IncidentItemProps) {
  const {
    id, date, startTime, endTime, durationMinutes,
    title, description, state, priority,
  } = incident

  return (
    <article className="grid grid-cols-12 gap-4 items-start p-6 border border-[var(--color-border-default)] hover:border-[var(--color-border-strong)] transition-colors group">
      {/* Date / time range */}
      <div className="col-span-12 sm:col-span-2">
        <div className="font-mono text-[11px] text-[var(--color-text-secondary)] mb-1 uppercase">
          {date}
        </div>
        <div className="font-mono text-[11px] text-[var(--color-text-tertiary)]">
          {startTime} – {endTime}{' '}
          <span className="text-[var(--color-text-tertiary)]">({durationMinutes}m)</span>
        </div>
      </div>

      {/* Content */}
      <div className="col-span-12 sm:col-span-9">
        <h4 className="font-display font-bold text-lg uppercase leading-none mb-2 text-[var(--color-text-primary)]">
          {title}
        </h4>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4 max-w-2xl leading-relaxed">
          {description}
        </p>
        <div className="flex gap-2 flex-wrap">
          <span className={getIncidentStateBadgeClass(state)}>
            {state.charAt(0).toUpperCase() + state.slice(1)}
          </span>
          <span className="status-badge" style={{
            background: 'var(--color-bg-elevated)',
            color: 'var(--color-text-secondary)',
            borderColor: 'var(--color-border-default)',
          }}>
            {getPriorityLabel(priority)}
          </span>
        </div>
      </div>

      {/* Open button */}
      <div className="col-span-12 sm:col-span-1 flex sm:justify-end items-start">
        <button
          onClick={() => onOpen?.(id)}
          aria-label={`Open incident: ${title}`}
          className="material-symbols-outlined text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-text-secondary)]"
        >
          open_in_new
        </button>
      </div>
    </article>
  )
}