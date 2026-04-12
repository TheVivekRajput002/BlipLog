export default function StatusFooter() {
  return (
    <footer className="bg-[#0e0e0f] border-t border-outline py-16 px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="space-y-6">
          <div className="syne-text font-black text-3xl tracking-tighter text-white">BLIPLOG.</div>
          <p className="mono-text text-[9px] text-zinc-600 max-w-[240px] uppercase leading-relaxed tracking-widest">
            PRECISION INFRASTRUCTURE MONITORING ENGINE.<br/>
            ALL SYSTEMS RECORDED IN LOG_STATE_V2.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-20">
          <div className="space-y-6">
            <h4 className="mono-text text-[9px] text-white font-bold tracking-[0.3em] uppercase">SYSTEM_DOCS</h4>
            <ul className="space-y-3 mono-text text-[9px] text-zinc-500 uppercase tracking-widest font-medium">
              <li className="hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline">API_REFERENCE</li>
              <li className="hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline">SLA_AGREEMENT</li>
              <li className="hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline">PRIVACY_CORE</li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="mono-text text-[9px] text-white font-bold tracking-[0.3em] uppercase">CONNECT</h4>
            <ul className="space-y-3 mono-text text-[9px] text-zinc-500 uppercase tracking-widest font-medium">
              <li className="hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline">SSH_TERMINAL</li>
              <li className="hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline">GITHUB_ROOT</li>
              <li className="hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline">OPERATOR_SLACK</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-outline/50 flex justify-between items-center mono-text text-[8px] text-zinc-700 uppercase tracking-widest">
        <span>©2024 BLIPLOG INFRASTRUCTURE GROUP</span>
        <span>UUID: 4492-X-9912-A0</span>
      </div>
    </footer>
  );
}
