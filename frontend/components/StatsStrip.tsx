'use client'

export default function StatsStrip() {
  const stats = [
    { label: 'Uptime', value: '99.98%', color: 'text-success' },
    { label: 'Response Time', value: '245ms', color: 'text-warning' },
    { label: 'Requests', value: '125.3K', color: 'text-on-surface' },
    { label: 'Errors', value: '0.02%', color: 'text-error' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {stats.map((stat, i) => (
        <div key={i} className="bg-surface-container p-6 border border-outline">
          <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">
            {stat.label}
          </p>
          <p className={`font-headline font-bold text-2xl ${stat.color}`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  )
}
