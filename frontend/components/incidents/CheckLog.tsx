'use client'

import type { CheckLogEntry } from '@/lib/types'
import { getStatusCodeColor, formatLatency } from '@/lib/utils'

interface CheckLogProps {
  entries: CheckLogEntry[]
  onViewTrace?: () => void
}

export function CheckLog({ entries, onViewTrace }: CheckLogProps) {
  return (
    <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-[var(--color-border-default)]">
        <h3 className="font-display font-bold uppercase tracking-widest text-sm text-[var(--color-text-primary)]">
          Real-time Check Log
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left">
          <thead className="bg-[var(--color-bg-elevated)] border-b border-[var(--color-border-default)]">
            <tr>
              {['Timestamp', 'Stat', 'LAT'].map((col) => (
                <th
                  key={col}
                  className="px-6 py-3 font-mono text-[10px] text-[var(--color-text-secondary)] uppercase tracking-widest"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <CheckLogRow key={entry.id} entry={entry} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--color-border-subtle)] flex justify-center">
        <button
          onClick={onViewTrace}
          className="font-mono text-[10px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] uppercase tracking-widest transition-colors"
        >
          View Detailed Trace
        </button>
      </div>
    </div>
  )
}

// ─── Row sub-component ────────────────────────────────────────────────────────

function CheckLogRow({ entry }: { entry: CheckLogEntry }) {
  const isError = entry.statusCode >= 400
  const codeColor = getStatusCodeColor(entry.statusCode)

  return (
    <tr
      className={[
        'border-b border-[var(--color-border-subtle)]',
        'hover:bg-white/[0.03] transition-colors',
        isError ? 'bg-[var(--color-status-down-dim)]/10' : '',
      ].join(' ')}
    >
      <td className="px-6 py-3 font-mono text-[11px] text-[var(--color-text-secondary)]">
        {entry.timestamp}
      </td>
      <td
        className="px-6 py-3 font-mono text-[11px] font-medium"
        style={{ color: codeColor }}
      >
        {entry.statusCode}
      </td>
      <td
        className="px-6 py-3 font-mono text-[11px]"
        style={{ color: isError ? 'var(--color-status-down)' : 'var(--color-text-primary)' }}
      >
        {formatLatency(entry.latencyMs)}
      </td>
    </tr>
  )
}