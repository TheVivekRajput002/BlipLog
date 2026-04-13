interface ApiToken {
  label: string
  token: string
  createdAt: string
  lastUsage: string
}

interface SessionItem {
  device: string
  location: string
  status: string
  current?: boolean
}

const apiTokens: ApiToken[] = [
  {
    label: 'PRODUCTION_MONITOR_V1',
    token: 'blk_live_882x...990z',
    createdAt: '2023.10.12 // 09:44',
    lastUsage: '2h ago',
  },
  {
    label: 'CI_CD_AUTOMATION',
    token: 'blk_dev_110a...443w',
    createdAt: '2023.11.04 // 14:20',
    lastUsage: '14m ago',
  },
  {
    label: 'EXTERNAL_DATA_INGEST',
    token: 'blk_live_299u...112m',
    createdAt: '2024.01.15 // 11:05',
    lastUsage: 'Never',
  },
]

const sessions: SessionItem[] = [
  {
    device: 'macOS / Chrome 121',
    location: '192.168.1.1 — Berlin, DE',
    status: 'Current',
    current: true,
  },
  {
    device: 'iPhone 15 Pro / Safari',
    location: '82.14.99.1 — London, UK',
    status: '4h ago',
  },
]

function ProfileSummaryCard() {
  return (
    <section className="border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-8">
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="h-32 w-32 border-2 border-[var(--color-accent)] p-1">
            <img
              alt="User profile"
              className="h-full w-full object-cover grayscale"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB246KqKrQa2cQdxWwNIx92PQEKzcah0lYZUBIfqYUne2O_5xzyrY0d9r41yzb3gSe19CWbke2R-yZhcz0mnSdJgyezXK3MeBKWwVx88Tsvzr8hJMnIF9ufROAH0HJKRrhOwQ3Za7v5hlE59zlZGGPRli6kQ0hkjBVmwzMKVasZYGCCCvo8WpBtto1Na4mE5N4Z8peXV_os1IFreZT8tGPycvTfT2RWl6vdyCC42_2fXU8T107PBf0zc3zTa55990isdU1M1YRec0M"
            />
          </div>
          <button
            type="button"
            className="absolute -bottom-2 -right-2 bg-[var(--color-accent)] p-2 text-[var(--color-text-inverse)] transition-colors hover:bg-[var(--color-accent-hover)]"
          >
            <span className="material-symbols-outlined text-sm">photo_camera</span>
          </button>
        </div>
        <h3 className="text-xl font-bold text-[var(--color-text-primary)] [font-family:var(--font-display)]">
          KAI STERLING
        </h3>
        <p className="mt-1 text-xs uppercase tracking-wider text-[var(--color-text-secondary)] [font-family:var(--font-mono)]">
          k.sterling@bliplog.io
        </p>
      </div>

      <div className="my-6 h-px bg-[var(--color-border-default)]" />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-[9px] uppercase text-[var(--color-text-tertiary)] [font-family:var(--font-mono)]">
            Tier
          </p>
          <p className="font-bold text-[var(--color-text-primary)] [font-family:var(--font-display)]">
            ENTERPRISE
          </p>
        </div>
        <div>
          <p className="text-[9px] uppercase text-[var(--color-text-tertiary)] [font-family:var(--font-mono)]">
            Status
          </p>
          <div className="mt-0.5 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-status-up)]" />
            <p className="font-bold text-[var(--color-text-primary)] [font-family:var(--font-display)]">
              ACTIVE
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function SecurityCard() {
  return (
    <section className="border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-8">
      <h4 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--color-text-primary)] [font-family:var(--font-display)]">
        <span className="material-symbols-outlined text-lg">security</span>
        Security Protocol
      </h4>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase text-[var(--color-text-primary)] [font-family:var(--font-mono)]">
              2-Factor Auth
            </p>
            <p className="text-[10px] text-[var(--color-text-secondary)] [font-family:var(--font-mono)]">
              Enabled via Authenticator App
            </p>
          </div>
          <span className="material-symbols-outlined text-[var(--color-status-up)]">
            verified_user
          </span>
        </div>
        <div className="h-px bg-[var(--color-border-default)]" />
        <button
          type="button"
          className="flex items-center justify-center gap-2 bg-[var(--color-bg-elevated)] py-3 text-[10px] uppercase tracking-widest text-[var(--color-text-primary)] transition-colors hover:brightness-125 [font-family:var(--font-mono)]"
        >
          <span className="material-symbols-outlined text-sm">lock_reset</span>
          Reset Credentials
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 border border-[var(--color-border-default)] py-3 text-[10px] uppercase tracking-widest text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)] [font-family:var(--font-mono)]"
        >
          <span className="material-symbols-outlined text-sm">key_visualizer</span>
          Download Recovery Keys
        </button>
      </div>
    </section>
  )
}

function ApiAccessTable() {
  return (
    <section className="border border-[var(--color-border-default)] bg-[var(--color-bg-surface)]">
      <div className="flex items-end justify-between border-b border-[var(--color-border-default)] p-8">
        <div>
          <h4 className="text-xl font-bold uppercase tracking-tight text-[var(--color-text-primary)] [font-family:var(--font-display)]">
            API Access Management
          </h4>
          <p className="mt-1 text-[10px] uppercase tracking-widest text-[var(--color-text-secondary)] [font-family:var(--font-mono)]">
            System tokens for programmatic interaction
          </p>
        </div>
        <button
          type="button"
          className="bg-[var(--color-accent)] px-6 py-2 text-[10px] font-bold uppercase text-[var(--color-text-inverse)] transition-colors hover:bg-[var(--color-accent-hover)] [font-family:var(--font-display)]"
        >
          Generate New Token
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px] [font-family:var(--font-mono)]">
          <thead className="bg-[var(--color-bg-base)] text-[var(--color-text-secondary)]">
            <tr>
              <th className="px-8 py-4 font-medium uppercase tracking-[0.2em]">Identifier / Label</th>
              <th className="px-8 py-4 font-medium uppercase tracking-[0.2em]">Creation Date</th>
              <th className="px-8 py-4 font-medium uppercase tracking-[0.2em]">Last Usage</th>
              <th className="px-8 py-4 text-right font-medium uppercase tracking-[0.2em]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border-default)]">
            {apiTokens.map((token) => (
              <tr
                key={token.label}
                className="group transition-colors hover:bg-[var(--color-bg-base)]"
              >
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="font-bold uppercase text-[var(--color-text-primary)]">
                      {token.label}
                    </span>
                    <span className="text-[10px] text-[var(--color-text-secondary)]">
                      {token.token}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6 text-[var(--color-text-secondary)]">{token.createdAt}</td>
                <td
                  className={[
                    'px-8 py-6',
                    token.lastUsage === 'Never'
                      ? 'font-bold text-[var(--color-text-primary)]'
                      : 'text-[var(--color-text-secondary)]',
                  ].join(' ')}
                >
                  {token.lastUsage}
                </td>
                <td className="px-8 py-6 text-right">
                  <button
                    type="button"
                    className="ml-auto flex items-center gap-1 text-[var(--color-text-secondary)] transition-colors hover:text-red-500"
                  >
                    <span className="material-symbols-outlined text-sm">delete_sweep</span>
                    <span className="hidden text-[9px] uppercase tracking-widest md:inline">
                      Revoke
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function SessionAuditCard() {
  return (
    <section className="border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-8">
      <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-[var(--color-text-primary)] [font-family:var(--font-display)]">
        Session Audit Log
      </h4>

      <div className="flex flex-col gap-4">
        {sessions.map((session, index) => (
          <div key={session.device}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase text-[var(--color-text-primary)] [font-family:var(--font-mono)]">
                  {session.device}
                </p>
                <p className="text-[9px] text-[var(--color-text-secondary)] [font-family:var(--font-mono)]">
                  {session.location}
                </p>
              </div>
              <span
                className={[
                  'px-2 py-0.5 text-[8px] uppercase [font-family:var(--font-mono)]',
                  session.current
                    ? 'bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)]'
                    : 'text-[var(--color-text-secondary)]',
                ].join(' ')}
              >
                {session.status}
              </span>
            </div>
            {index < sessions.length - 1 ? (
              <div className="mt-4 h-px bg-[var(--color-border-default)]" />
            ) : null}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mt-8 text-[9px] uppercase tracking-widest text-[var(--color-text-secondary)] underline underline-offset-4 transition-colors hover:text-[var(--color-text-primary)] [font-family:var(--font-mono)]"
      >
        Sign out of all sessions
      </button>
    </section>
  )
}

function DeveloperAccessCard() {
  return (
    <section className="group relative overflow-hidden border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-8">
      <div className="relative z-10">
        <h4 className="mb-2 text-sm font-bold uppercase tracking-widest text-[var(--color-text-primary)] [font-family:var(--font-display)]">
          Developer Access
        </h4>
        <p className="mb-6 text-xs text-[var(--color-text-secondary)]">
          Upgrade your account to access Beta testing environments and priority
          CLI features.
        </p>
        <button
          type="button"
          className="w-full border-2 border-[var(--color-accent)] py-3 text-[10px] font-extrabold uppercase tracking-widest text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-accent)] hover:text-[var(--color-text-inverse)] [font-family:var(--font-display)]"
        >
          Request Developer Elevation
        </button>
      </div>
      <div className="pointer-events-none absolute -bottom-8 -right-8 opacity-5 transition-opacity group-hover:opacity-10">
        <span className="material-symbols-outlined text-[160px] text-[var(--color-text-primary)]">
          terminal
        </span>
      </div>
    </section>
  )
}

export default function ProfileUi() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-base)] p-6 md:p-12">
      <header className="mx-auto mb-12 max-w-6xl">
        <h2 className="border-l-4 border-[var(--color-accent)] pl-6 text-4xl font-extrabold uppercase tracking-tighter text-[var(--color-text-primary)] [font-family:var(--font-display)] md:text-5xl">
          Profile Configuration
        </h2>
        <div className="mt-4 flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-secondary)] [font-family:var(--font-mono)]">
          <span>Account ID: BLIP-UX-8829-X</span>
          <span className="h-1 w-1 rounded-full bg-[var(--color-border-default)]" />
          <span>Role: System Administrator</span>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12">
        <section className="flex flex-col gap-8 lg:col-span-4">
          <ProfileSummaryCard />
          <SecurityCard />
        </section>

        <section className="flex flex-col gap-8 lg:col-span-8">
          <ApiAccessTable />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <SessionAuditCard />
            <DeveloperAccessCard />
          </div>
        </section>
      </div>
    </main>
  )
}
