import type { LogEntry, InfraMetric } from "@/lib/data";

const LOG_LEVEL_COLOR: Record<LogEntry["level"], string> = {
  INFO: "text-green-500/60",
  ERROR: "text-red-500/60",
  WARN: "text-neutral-500",
};

interface Props {
  logs: LogEntry[];
  metrics: InfraMetric[];
}

export default function SystemPanel({ logs, metrics }: Props) {
  return (
    <section className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* System Logs */}
      <div className="lg:col-span-2 bg-surface-container-lowest p-8 border border-white/5">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-headline font-bold uppercase tracking-widest text-sm">
            System Logs
          </h3>
          <span className="font-mono text-[10px] text-neutral-500">
            STREAMING_LIVE
          </span>
        </div>

        <div className="space-y-4 font-mono text-[11px] h-64 overflow-y-auto no-scrollbar">
          {logs.map((entry, i) => (
            <div key={i} className="flex gap-4">
              <span className="text-neutral-600 shrink-0">
                [{entry.timestamp}]
              </span>
              <span className={`shrink-0 ${LOG_LEVEL_COLOR[entry.level]}`}>
                {entry.level}
              </span>
              <span className="text-white">{entry.message}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Infra Health */}
      <div className="bg-surface-container p-8 border border-white/5 relative overflow-hidden group">
        {/* Decorative bg icon */}
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <span className="material-symbols-outlined text-8xl">cloud_queue</span>
        </div>

        <h3 className="font-headline font-bold uppercase tracking-widest text-sm mb-6">
          Infra Health
        </h3>

        <div className="space-y-6">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <div className="flex justify-between mb-2">
                <span className="font-mono text-[10px] text-neutral-400">
                  {metric.label}
                </span>
                <span className="font-mono text-[10px] text-white">
                  {metric.value}%
                </span>
              </div>
              <div className="h-1 bg-surface-container-high w-full">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <button className="mt-8 w-full border border-neutral-700 py-3 font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
          View Detailed Metrics
        </button>
      </div>
    </section>
  );
}