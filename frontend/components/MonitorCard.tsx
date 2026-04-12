'use client'

import type { Monitor } from '@/lib/types'

interface MonitorCardProps {
  monitor: Monitor
}

export default function MonitorCard({ monitor }: MonitorCardProps) {
  const statusColor =
    monitor.status === 'operational' ? 'text-success bg-success/10' : 'text-error bg-error/10'

  return (
    <div className="bg-surface border border-outline p-6 hover:border-outline-strong transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-headline font-bold text-lg text-on-surface">
            {monitor.name}
          </h3>
          <span className={`inline-block mt-2 font-mono text-[10px] px-2 py-1 uppercase rounded ${statusColor}`}>
            {monitor.status}
          </span>
        </div>
        <span className="font-mono text-sm font-bold text-on-surface">
          {monitor.uptime}
        </span>
      </div>

      {/* Uptime segments */}
      <div className="flex gap-px h-6 w-full">
        {monitor.segments.map((segment, i) => (
          <div
            key={i}
            className={`flex-1 ${
              segment.status === 'up'
                ? 'bg-success'
                : segment.status === 'partial'
                  ? 'bg-warning'
                  : 'bg-neutral-700'
            }`}
            title={segment.label}
          />
        ))}
      </div>
    </div>
  )
}
