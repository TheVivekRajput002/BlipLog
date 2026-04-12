export default function RegionalNodes() {
  const nodes = [
    { name: 'US-EAST-1', status: 'LIVE' },
    { name: 'EU-CENTRAL-1', status: 'LIVE' },
    { name: 'AP-SOUTH-1', status: 'LIVE' },
    { name: 'SA-EAST-1', status: 'LIVE' },
  ];

  return (
    <div className="bg-white text-black p-6 flex flex-col h-full min-h-[400px]">
      <h2 className="syne-text font-extrabold text-xl uppercase tracking-tighter mb-8">REGIONAL_NODES</h2>
      <div className="space-y-4 flex-1">
        {nodes.map((node, i) => (
          <div key={i} className="flex justify-between items-center py-2 border-b border-black/10">
            <span className="mono-text text-[10px] font-bold">{node.name}</span>
            <span className="mono-text text-[9px] bg-black text-white px-2 py-0.5 uppercase">{node.status}</span>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <div className="mono-text text-[9px] text-black/40 mb-2 uppercase">GEOSPATIAL_LOAD</div>
        <div className="w-full h-32 bg-zinc-200 overflow-hidden relative grayscale">
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent z-10"></div>
          <div 
            className="h-full w-full bg-cover bg-center" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCQPWBcNRZ5sneLNFBkQ8e5BOxWCbhnMWL26ogs0BjlZv1pWEXzAKSgBhGnEuG5AuWRaSEoQr9ctJq94E5i7V-ALj92HZ_Brx-mvdPl3Ejn07aOgt1fBnhfDvFn6NiKle0lKXYeWMdsmLtW4pe8gUybzgxyA4OypuIOdfDZZdAt8BxAS668YeqYHVKFojnFe7MNmFkNtRHFYdXHo_CCVUNXDcsYZOS0rJJVI5EOdlP7JyH1FEHt8BQRJUPz4Mp4K__w5Qgc9aYd8F4')" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
