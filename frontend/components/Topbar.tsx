'use client'

function Topbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-[var(--color-border-default)] bg-[var(--color-bg-base)]/95 px-6 py-4 backdrop-blur">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-text-secondary)]">
          System Monitoring Console
        </p>
        <button
          type="button"
          className="rounded border border-[var(--color-border-default)] px-3 py-1 text-[11px] uppercase tracking-widest text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          Refresh
        </button>
      </div>
    </header>
  )
}

export default Topbar
