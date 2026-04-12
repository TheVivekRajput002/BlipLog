import Link from "next/link";
import type { Incident, IncidentUpdate } from "@/lib/types";

const updateStyles: Record<
  IncidentUpdate["type"],
  { wrapper: string; label: string }
> = {
  resolved: {
    wrapper: "bg-surface-container-low p-4",
    label: "Resolved",
  },
  monitoring: {
    wrapper: "bg-surface-container-low p-4",
    label: "Monitoring",
  },
  identified: {
    wrapper: "p-4 border-l-2 border-outline",
    label: "Identified",
  },
  investigating: {
    wrapper: "p-4 border-l-2 border-outline",
    label: "Investigating",
  },
  completed: {
    wrapper: "bg-surface-container-low p-4",
    label: "Completed",
  },
};

function IncidentItem({ incident }: { incident: Incident }) {
  return (
    <div className="relative pl-8 border-l border-outline">
      <div className="absolute -left-[5px] top-0 w-2 h-2 bg-outline" />
      <div className="mb-4">
        <span className="font-mono text-[11px] text-on-surface-variant block mb-1">
          {incident.date}
        </span>
        <h4 className="font-syne font-bold text-lg uppercase tracking-tight text-on-surface">
          {incident.title}
        </h4>
      </div>
      <div className="space-y-4">
        {incident.updates.map((update, i) => {
          const style = updateStyles[update.type];
          return (
            <div key={i} className={style.wrapper}>
              <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest block mb-2">
                {style.label}
              </span>
              <p className="text-sm leading-relaxed text-on-surface/90">
                {update.message}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function IncidentHistory({
  incidents,
}: {
  incidents: Incident[];
}) {
  return (
    <section>
      <div className="flex justify-between items-center mb-8 border-b border-outline pb-4">
        <h3 className="font-syne text-sm font-bold uppercase tracking-widest text-on-surface">
          Past Incidents
        </h3>
        <Link
          href="#"
          className="font-mono text-[10px] text-on-surface-variant uppercase hover:text-white transition-colors"
        >
          Incident Archive
        </Link>
      </div>
      <div className="space-y-10">
        {incidents.map((incident) => (
          <IncidentItem key={incident.id} incident={incident} />
        ))}
        <div className="py-12 text-center bg-surface border border-dashed border-outline">
          <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-[0.2em]">
            No further incidents reported in the last 30 days
          </p>
        </div>
      </div>
    </section>
  );
}