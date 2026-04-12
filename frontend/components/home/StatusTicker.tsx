export default function StatusTicker() {
  return (
    <div className="bg-surface border-b border-outline py-2.5 px-8">
      <div className="flex justify-between items-center mono-text text-[9px] uppercase tracking-[0.25em] text-zinc-500">
        <div className="flex items-center gap-8">
          <span className="flex items-center gap-2">TRAFFIC: <span className="text-white">4.2K REQ/S</span></span>
          <span className="flex items-center gap-2">LATENCY: <span className="text-white">24MS</span></span>
          <span className="flex items-center gap-2 text-green-500/80">ERROR_RATE: 0.001%</span>
        </div>
        <div className="flex items-center gap-6">
          <span>LAST_SYNC: 14:02:11 UTC</span>
          <span className="text-white/20">|</span>
          <span className="text-zinc-400">SESSION_TOKEN: <span className="text-white">AZ-9912X</span></span>
        </div>
      </div>
    </div>
  );
}
