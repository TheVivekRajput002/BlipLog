import type { Monitor, HistoryBar } from "@/lib/data";

const STATUS_BAR_COLOR: Record<HistoryBar["status"], string> = {
  green: "bg-green-500/80",
  yellow: "bg-yellow-500/80",
  red: "bg-red-500/80",
};

const STATUS_INDICATOR_COLOR: Record<Monitor["status"], string> = {
  up: "bg-green-500",
  degraded: "bg-yellow-500",
  down: "bg-red-500",
};

const STATUS_RESPONSE_COLOR: Record<Monitor["status"], string> = {
  up: "text-white",
  degraded: "text-yellow-500",
  down: "text-red-500",
};

const STATUS_BADGE: Record<Monitor["status"], { cls: string; label: string }> =
  {
    up: { cls: "status-up", label: "UP" },
    degraded: { cls: "status-degraded", label: "LATENCY" },
    down: { cls: "status-down", label: "DOWN" },
  };

interface Props {
  monitor: Monitor;
}

export default function MonitorCard({ monitor }: Props) {
  const badge = STATUS_BADGE[monitor.status];

  return (
    <div className="bg-surface-container-low group hover:bg-surface-container transition-colors p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        {/* Name + URL */}
        <div className="flex items-center gap-6 lg:w-1/4">
          <div
            className={`w-2 h-12 ${STATUS_INDICATOR_COLOR[monitor.status]}`}
          />
          <div>
            <h4 className="font-headline font-bold text-white uppercase text-lg leading-none mb-1">
              {monitor.name}
            </h4>
            <p className="font-mono text-[10px] text-neutral-500">
              {monitor.url}
            </p>
          </div>
        </div>

        {/* 90-day history bar */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-tighter">
              90-Day History
            </span>
            <span className="font-mono text-[10px] text-white">
              {monitor.uptime}
            </span>
          </div>
          <div className="flex gap-[2px] h-6">
            {monitor.history.map((bar, i) => (
              <div
                key={i}
                className={`flex-1 ${STATUS_BAR_COLOR[bar.status]}`}
              />
            ))}
          </div>
        </div>

        {/* Response + Badge */}
        <div className="flex lg:w-1/4 justify-end items-center gap-8">
          <div className="text-right">
            <p className="font-mono text-[10px] text-neutral-500 uppercase">
              Response
            </p>
            <p
              className={`font-headline font-bold ${STATUS_RESPONSE_COLOR[monitor.status]}`}
            >
              {monitor.response}
            </p>
          </div>
          <div className={`${badge.cls} px-3 py-1 font-mono text-[10px] font-bold`}>
            {badge.label}
          </div>
        </div>
      </div>
    </div>
  );
}