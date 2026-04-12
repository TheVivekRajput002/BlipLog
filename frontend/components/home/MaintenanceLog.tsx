export default function MaintenanceLog() {
  return (
    <div className="bg-[#0e0e0f] border border-outline p-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-zinc-500 text-[18px]">event</span>
        <h3 className="mono-text text-[10px] font-bold uppercase tracking-[0.2em] text-white">MAINTENANCE_LOG</h3>
      </div>
      <p className="mono-text text-[10px] text-zinc-500 leading-relaxed uppercase mb-6">
        EDGE_ROUTING_V4 UPGRADE SCHEDULED FOR OCT 24, 02:00 UTC. ZERO-DOWNTIME ROLLOUT.
      </p>
      <a 
        className="mono-text text-[9px] font-bold text-white underline underline-offset-4 tracking-widest uppercase hover:text-green-500 transition-colors" 
        href="#"
      >
        DETAIL_SPECS
      </a>
    </div>
  );
}
