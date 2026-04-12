import type { Incident } from "@/lib/data";

interface Props {
  incidents: Incident[];
}

export default function ActiveIncidents({ incidents }: Props) {
  return (
    <section className="mb-12 border-l-4 border-error bg-error-container/5 p-6 relative overflow-hidden">
      {/* Background warning icon */}
      <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none">
        <span className="material-symbols-outlined text-6xl">warning</span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-error">emergency</span>
        <h3 className="font-headline font-bold uppercase tracking-widest text-sm text-error">
          Active Incidents ({incidents.length})
        </h3>
      </div>

      {/* Incident rows */}
      <div className="grid grid-cols-1 gap-4">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className="flex items-center justify-between p-4 bg-surface-container-low"
          >
            <div className="flex items-center gap-4">
              <span className="w-2 h-10 bg-error" />
              <div>
                <p className="font-headline font-bold text-white uppercase">
                  {incident.name}
                </p>
                <p className="font-mono text-[10px] text-neutral-500">
                  {incident.detail}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono text-xs text-error font-bold">DOWN</p>
              <p className="font-mono text-[10px] text-neutral-500">
                Started {incident.startedAgo}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}