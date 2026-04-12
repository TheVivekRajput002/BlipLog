export default function LatencyMap() {
  const bars = [
    'h-1/2', 'h-3/4', 'h-2/3', 'h-1/2', 'h-4/5', 'h-3/5', 
    'h-2/3', 'h-3/4', 'h-full border-t border-white bg-white/40', 
    'h-5/6', 'h-2/3', 'h-3/4'
  ];

  return (
    <div className="bg-[#0e0e0f] border border-outline p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="mono-text text-[10px] uppercase tracking-widest text-zinc-500">LATENCY_MAP</h3>
        <span className="mono-text text-[8px] text-green-500 px-2 border border-green-500/30">REALTIME</span>
      </div>
      <div className="h-32 flex items-end justify-between gap-1 pb-2">
        {bars.map((height, i) => (
          <div 
            key={i} 
            className={`flex-1 bg-white/5 ${height.includes('bg-') ? height : `bg-white/5 ${height}`}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
