export default function StatusHeader() {
  return (
    <header className="flex justify-between items-center h-16 w-full px-8 bg-[#0a0a0b]/80 backdrop-blur-md text-white sticky top-0 z-40 border-b border-outline">
      <div className="flex items-center gap-6">
        <h1 className="syne-text font-bold text-lg tracking-tighter uppercase">MONOLITH_UPTIME</h1>
        <div className="h-4 w-[1px] bg-outline"></div>
        <div className="flex items-center gap-3 mono-text text-[10px] text-zinc-500 tracking-widest uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span> NETWORK_STABLE
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <button className="p-2 text-zinc-400 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
          </button>
          <button className="p-2 text-zinc-400 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>
        </div>
        <div className="flex items-center gap-3 pl-4 border-l border-outline">
          <div className="text-right">
            <div className="mono-text text-[10px] text-white font-bold leading-none mb-1">OPERATOR_X</div>
            <div className="mono-text text-[8px] text-zinc-500 leading-none uppercase">SRE_LVL_4</div>
          </div>
          <div className="h-8 w-8 bg-zinc-800 flex items-center justify-center">
            <span className="material-symbols-outlined text-zinc-400 text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
