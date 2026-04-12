const STATS = [
  {
    label: "Total Monitors",
    value: "12",
    delta: "+2 MoM",
    deltaColor: "text-green-500",
  },
  {
    label: "Uptime % (30d)",
    value: "99.82",
    delta: "-0.04%",
    deltaColor: "text-error",
  },
  {
    label: "Active Incidents",
    value: "2",
    delta: "0 CRIT",
    deltaColor: "text-neutral-500",
  },
  {
    label: "Avg Response",
    value: (
      <>
        248<span className="text-xl">ms</span>
      </>
    ),
    delta: "-12ms",
    deltaColor: "text-green-500",
  },
];

export default function StatsStrip() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 mb-12">
      {STATS.map((stat, i) => (
        <div
          key={i}
          className="bg-surface-container p-6 border-l border-neutral-800"
        >
          <p className="font-mono text-[10px] text-neutral-500 mb-2 uppercase tracking-widest">
            {stat.label}
          </p>
          <div className="flex items-end gap-2">
            <span className="font-headline font-bold text-4xl text-white">
              {stat.value}
            </span>
            <span className={`font-mono text-[10px] mb-1 ${stat.deltaColor}`}>
              {stat.delta}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}