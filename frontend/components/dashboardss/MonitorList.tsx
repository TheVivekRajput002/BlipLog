import type { Monitor, UptimeSegment } from "@/lib/types";

function UptimeBar({ segments }: { segments: UptimeSegment[] }) {
  return (
    <div className="flex w-full h-8 bg-surface">
      {segments.map((seg, i) => (
        <div
          key={i}
          title={seg.label}
          className={[
            "flex-1 border-r border-background/20 transition-opacity",
            seg.status === "up"
              ? "bg-success opacity-90 hover:opacity-100"
              : seg.status === "partial"
              ? "bg-yellow-500 opacity-90 hover:opacity-100"
              : "bg-neutral-700",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

function MonitorRow({ monitor }: { monitor: Monitor }) {
  const statusColor =
    monitor.status === "operational" ? "text-success bg-success/10" : "text-error bg-error/10";

  return (
    <div className="group">
      <div className="flex justify-between items-end mb-3">
        <div>
          <span className="font-syne text-lg font-bold tracking-tight">
            {monitor.name}
          </span>
          <span
            className={`ml-3 font-mono text-[10px] px-2 py-0.5 uppercase ${statusColor}`}
          >
            {monitor.status}
          </span>
        </div>
        <div className="text-right">
          <span className="font-mono text-xs font-bold">{monitor.uptime}</span>
        </div>
      </div>
      <UptimeBar segments={monitor.segments} />
    </div>
  );
}

export default function MonitorList({ monitors }: { monitors: Monitor[] }) {
  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-8 border-b border-outline pb-4">
        <h3 className="font-syne text-sm font-bold uppercase tracking-widest text-on-surface">
          Active Monitors
        </h3>
        <span className="font-mono text-[10px] text-on-surface-variant uppercase">
          Last 90 Days
        </span>
      </div>
      <div className="space-y-12">
        {monitors.map((monitor) => (
          <MonitorRow key={monitor.id} monitor={monitor} />
        ))}
      </div>
    </section>
  );
}