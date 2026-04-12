import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ActiveIncidents from "@/components/ActiveIncidents";
import StatsStrip from "@/components/StatsStrip";
import MonitorCard from "@/components/MonitorCard";
import SystemPanel from "@/components/SystemPanel";
import {
  MONITORS,
  ACTIVE_INCIDENTS,
  SYSTEM_LOGS,
  INFRA_METRICS,
} from "@/lib/data";

export default function MonitorsPage() {
  return (
    <div className="flex min-h-screen bg-background text-on-background selection:bg-primary selection:text-on-primary">
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 md:ml-64 flex flex-col">
        <Header />

        <main className="flex-1 p-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-neutral-500 tracking-[0.2em] uppercase">
                  Global View
                </span>
              </div>
              <h2 className="font-headline font-extrabold text-5xl tracking-tighter text-white uppercase">
                Monitors
              </h2>
              <div className="mt-4 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-neutral-400">
                    TOTAL:
                  </span>
                  <span className="font-mono text-[11px] text-white">
                    {MONITORS.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-neutral-400">
                    CRITICAL:
                  </span>
                  <span className="font-mono text-[11px] text-error">
                    {ACTIVE_INCIDENTS.length}
                  </span>
                </div>
              </div>
            </div>

            <button className="bg-brushed text-on-primary font-headline font-bold uppercase px-8 py-4 flex items-center gap-2 hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined">add</span>
              <span>Add Monitor</span>
            </button>
          </div>

          {/* Active Incidents */}
          <ActiveIncidents incidents={ACTIVE_INCIDENTS} />

          {/* Stats Strip */}
          <StatsStrip />

          {/* Monitor List */}
          <div className="space-y-4">
            {MONITORS.map((monitor) => (
              <MonitorCard key={monitor.id} monitor={monitor} />
            ))}
          </div>

          {/* System Logs + Infra Health */}
          <SystemPanel logs={SYSTEM_LOGS} metrics={INFRA_METRICS} />
        </main>
      </div>
    </div>
  );
}