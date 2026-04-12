export default function IncidentCount() {
  return (
    <div className="bg-[#0e0e0f] border border-outline p-6 flex flex-col justify-between h-full">
      <h3 className="mono-text text-[10px] uppercase tracking-widest text-zinc-500">INCIDENT_INDEX</h3>
      <div>
        <div className="text-6xl syne-text font-black text-white">00</div>
        <div className="mono-text text-[9px] text-zinc-600 mt-2 uppercase tracking-widest font-bold">ACTIVE_ISSUES_FOUND</div>
      </div>
    </div>
  );
}
