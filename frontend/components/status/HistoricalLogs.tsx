interface IncidentLogProps {
  id: string;
  date: string;
  title: string;
  status: string;
  description: string;
}

function IncidentLog({ id, date, title, status, description }: IncidentLogProps) {
  return (
    <div className="relative pl-12 border-l border-zinc-800 group">
      <div className="absolute -left-[3px] top-0 w-[5px] h-5 bg-zinc-800 group-hover:bg-white transition-colors"></div>
      <div className="mono-text text-[9px] text-zinc-600 mb-2 uppercase tracking-[0.3em]">{date} // INCIDENT_ID: {id}</div>
      <h3 className="syne-text font-bold text-xl text-white mb-4 uppercase tracking-tight">{title}</h3>
      <p className="text-zinc-500 mono-text text-[11px] leading-relaxed max-w-3xl uppercase">
        <span className="text-white font-bold mr-3">[{status}]</span>
        {description}
      </p>
    </div>
  );
}

export default function HistoricalLogs() {
  const incidents = [
    {
      id: '88A',
      date: 'OCT_12_2023',
      title: 'DEGRADED_PERFORMANCE_DASHBOARD_API',
      status: 'RESOLVED',
      description: 'SUDDEN TRAFFIC SPIKE TRIGGERED RATE-LIMITING ON CORE ANALYTICS. PATCH 14.2 DEPLOYED IN 14M. IMPACT: 3% OF GLOBAL USER BASE.'
    },
    {
      id: '74X',
      date: 'SEP_28_2023',
      title: 'MINOR_OUTAGE_IMAGE_OPTIMIZATION',
      status: 'RESOLVED',
      description: 'PACKET LOSS IN US-WEST CDN POPS. AUTOMATIC FAILOVER TO US-EAST-1 EXECUTED IN 220MS.'
    }
  ];

  return (
    <section className="max-w-6xl mx-auto px-12 pb-32 w-full">
      <div className="bg-[#0e0e0f] border border-outline p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-white/5 -mr-16 -mt-16"></div>
        <h2 className="syne-text font-black text-4xl uppercase tracking-tighter text-white mb-16">HISTORICAL_LOGS</h2>
        <div className="space-y-16">
          {incidents.map((incident, i) => (
            <IncidentLog key={i} {...incident} />
          ))}
        </div>
        <div className="mt-20 border-t border-outline pt-10 text-center">
          <button className="mono-text text-[10px] font-bold text-zinc-500 border border-outline px-10 py-4 hover:text-white hover:border-white transition-all uppercase tracking-[0.4em]">
            ACCESS_FULL_ARCHIVE_DATABASES
          </button>
        </div>
      </div>
    </section>
  );
}
