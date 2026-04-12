export default function StatusHero() {
  return (
    <section className="hero-glow py-20 px-12 border-b border-outline">
      <div className="max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-3 bg-green-500/5 border border-green-500/20 px-3 py-1 mb-8">
          <span className="w-1.5 h-1.5 bg-green-500 animate-pulse"></span>
          <span className="mono-text text-[10px] font-bold text-green-500 tracking-[0.4em] uppercase">SYSTEMS_NOMINAL</span>
        </div>
        <h1 className="syne-text text-7xl md:text-8xl font-extrabold tracking-tighter text-white mb-8 leading-[0.85]">
          ENGINEERED<br/>
          <span className="text-zinc-800" style={{ WebkitTextStroke: '1px white' }}>RESILIENCE.</span>
        </h1>
        <p className="max-w-xl text-zinc-400 mono-text text-xs leading-relaxed uppercase tracking-wider">
          Infrastructure health monitoring for global distributed clusters. 
          Transparency through precision telemetry.
        </p>
      </div>
    </section>
  );
}
