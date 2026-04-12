'use client'

import { useState } from 'react'
import type { LatencyDataPoint, TimeRange } from '@/lib/types'

interface LatencyChartProps {
  data: LatencyDataPoint[]
  defaultRange?: TimeRange
}

const TIME_RANGES: TimeRange[] = ['24H', '7D', '30D']

const TIME_LABELS = ['12:00 PM', '06:00 PM', '12:00 AM', '06:00 AM', 'NOW']

export function LatencyChart({ data, defaultRange = '24H' }: LatencyChartProps) {
  const [activeRange, setActiveRange] = useState<TimeRange>(defaultRange)

  return (
    <div className="bg-[var(--color-bg-surface)] p-8 border border-[var(--color-border-default)]">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="font-display font-bold uppercase tracking-widest text-sm text-[var(--color-text-primary)]">
            Response Time Latency
          </h3>
          <p className="font-mono text-[10px] text-[var(--color-text-tertiary)] mt-1 uppercase">
            {activeRange} Aggregation // Percentile 95
          </p>
        </div>

        {/* Range selector */}
        <div className="flex gap-1">
          {TIME_RANGES.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={[
                'px-3 py-1 font-mono text-[10px] uppercase transition-colors',
                activeRange === range
                  ? 'bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)]'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)]',
              ].join(' ')}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Chart area */}
      <div className="h-64 relative flex items-end gap-px">
        {/* Y-axis grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {['500ms', '250ms', '0ms'].map((label) => (
            <div
              key={label}
              className="border-t border-[var(--color-border-subtle)] w-full flex justify-end"
            >
              <span className="font-mono text-[10px] text-[var(--color-text-tertiary)] bg-[var(--color-bg-surface)] px-1 -translate-y-1/2">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Bars */}
        {data.map((point, i) => (
          <div
            key={i}
            className="flex-1 transition-opacity hover:opacity-90 relative group cursor-default"
            style={{
              height: `${point.heightPercent}%`,
              backgroundColor: point.isSpike
                ? 'rgba(255,255,255,0.65)'
                : 'rgba(255,255,255,0.18)',
            }}
            title={`${point.label || ''} ${point.value}ms`}
          >
            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] font-mono text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              {point.value}ms
            </div>
          </div>
        ))}
      </div>

      {/* X-axis labels */}
      <div className="mt-4 flex justify-between font-mono text-[10px] text-[var(--color-text-tertiary)]">
        {TIME_LABELS.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  )
}