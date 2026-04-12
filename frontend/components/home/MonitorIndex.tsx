interface MonitorRowProps {
  name: string;
  region: string;
  status: string;
  uptime: string;
}

function MonitorRow({ name, region, status }: MonitorRowProps) {
  return (
    <div className="group flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors cursor-crosshair">
      <div className="flex items-center gap-5">
        <div className="w-1.5 h-1.5 bg-green-500"></div>
        <div>
          <div className="mono-text text-[11px] font-bold tracking-wider text-white">{name}</div>
          <div className="mono-text text-[8px] text-zinc-500 uppercase">{region}</div>
        </div>
      </div>
      <div className="flex items-center gap-10">
        <div className="flex gap-0.5">
          <div className="w-1 h-5 bg-green-500/40"></div>
          <div className="w-1 h-5 bg-green-500/40"></div>
          <div className="w-1 h-5 bg-green-500/40"></div>
          <div className="w-1 h-5 bg-green-500/40"></div>
          <div className="w-1 h-5 bg-green-500/40"></div>
          <div className="w-1 h-5 bg-green-500/60"></div>
          <div className="w-1 h-5 bg-green-500/60"></div>
          <div className="w-1 h-5 bg-green-500"></div>
        </div>
        <div className="mono-text text-[10px] text-green-500 w-24 text-right">{status}</div>
      </div>
    </div>
  );
}

export default function MonitorIndex() {
  const monitors = [
    { name: 'PRIMARY_DATA_CLUSTER', region: 'US-EAST-VA / POSTGRES_L1', status: 'NOMINAL', uptime: '99.98%' },
    { name: 'REST_GATEWAY_V2', region: 'GLOBAL_EDGE / KONG_PROTO', status: 'NOMINAL', uptime: '99.98%' },
    { name: 'EDGE_CACHE_NODES', region: 'CDN_LAYER / 42_POPS', status: 'NOMINAL', uptime: '99.98%' },
    { name: 'AUTH_MICRO_LAYER', region: 'ISOLATED_SECURITY / JWT', status: 'NOMINAL', uptime: '99.98%' },
  ];

  return (
    <div className="bg-[#0e0e0f] border border-outline p-1 overflow-hidden">
      <div className="p-6 flex justify-between items-center border-b border-outline">
        <div>
          <h2 className="syne-text font-bold text-lg uppercase tracking-widest text-white">MONITOR_INDEX</h2>
          <p className="mono-text text-[9px] text-zinc-500 mt-1 uppercase tracking-widest">Global Sector Performance</p>
        </div>
        <div className="text-right">
          <div className="mono-text text-[10px] text-white">99.98%</div>
          <div className="mono-text text-[8px] text-zinc-500 uppercase">30D_UPTIME</div>
        </div>
      </div>
      <div className="divide-y divide-outline">
        {monitors.map((m, i) => (
          <MonitorRow key={i} {...m} />
        ))}
      </div>
    </div>
  );
}
