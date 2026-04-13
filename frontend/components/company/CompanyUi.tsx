type OrgStatus = 'ACTIVE' | 'DORMANT'

interface Organization {
  id: number
  name: string
  nodeCluster: string
  members: string
  icon: string
  status: OrgStatus
}

const organizations: Organization[] = [
  {
    id: 1,
    name: 'NEURAL_DYNAMICS',
    nodeCluster: 'NORTH_AMERICA_01',
    members: '12,402',
    icon: 'hub',
    status: 'ACTIVE',
  },
  {
    id: 2,
    name: 'VOID_CORE_INDUSTRIES',
    nodeCluster: 'SINGAPORE_04',
    members: '1,094',
    icon: 'database',
    status: 'DORMANT',
  },
]

function Navbar() {
  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-[var(--color-bg-base)]/95 px-6 py-4 backdrop-blur">
      <div className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)] [font-family:var(--font-display)]">
        BLIPLOG
      </div>
      <div className="flex items-center gap-6">
        <div className="text-xs uppercase tracking-widest text-[var(--color-text-tertiary)] [font-family:var(--font-mono)]">
          SYSTEM_AUTH_GATEWAY
        </div>
        <span className="material-symbols-outlined cursor-pointer text-[var(--color-text-primary)] transition-opacity hover:opacity-70">
          account_circle
        </span>
      </div>
    </nav>
  )
}

function OrganizationCard({ organization }: { organization: Organization }) {
  const isActive = organization.status === 'ACTIVE'

  return (
    <article className="relative overflow-hidden border border-transparent bg-[var(--color-bg-surface)] p-8 transition-all duration-300 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-elevated)]">
      <div className="mb-12 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center bg-[var(--color-accent)]">
          <span className="material-symbols-outlined text-3xl text-[var(--color-text-inverse)]">
            {organization.icon}
          </span>
        </div>
        <span
          className={[
            'px-2 py-0.5 text-[10px] [font-family:var(--font-mono)]',
            isActive
              ? 'border border-green-500/20 bg-green-500/5 text-green-500'
              : 'border border-[var(--color-border-default)] bg-[var(--color-bg-base)] text-[var(--color-text-secondary)]',
          ].join(' ')}
        >
          {organization.status}
        </span>
      </div>

      <div>
        <h2 className="mb-2 text-2xl font-bold text-[var(--color-text-primary)] [font-family:var(--font-display)] md:text-3xl">
          {organization.name}
        </h2>
        <p className="mb-8 text-xs text-[var(--color-text-secondary)] [font-family:var(--font-mono)]">
          NODE_CLUSTER: {organization.nodeCluster}
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-[var(--color-border-default)] pt-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-[var(--color-text-tertiary)] [font-family:var(--font-mono)]">
              Members
            </span>
            <span className="text-sm text-[var(--color-text-primary)] [font-family:var(--font-mono)]">
              {organization.members}
            </span>
          </div>
          <button
            type="button"
            className="bg-[var(--color-accent)] px-6 py-2 text-sm font-bold uppercase tracking-widest text-[var(--color-text-inverse)] transition-colors hover:bg-[var(--color-accent-hover)] [font-family:var(--font-display)]"
          >
            ENTER
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute right-0 top-0 p-4 opacity-5">
        <span className="text-8xl font-black [font-family:var(--font-display)]">
          {String(organization.id).padStart(2, '0')}
        </span>
      </div>
    </article>
  )
}

function CreateOrganizationCard() {
  return (
    <article className="flex min-h-[340px] flex-col items-center justify-center border border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-base)] p-8 text-center transition-all duration-300 hover:border-[var(--color-accent)] hover:bg-[var(--color-bg-surface)]">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--color-border-strong)] transition-colors">
        <span className="material-symbols-outlined text-4xl text-[var(--color-text-secondary)]">
          add
        </span>
      </div>
      <h2 className="mb-2 text-2xl font-medium uppercase tracking-tight text-[var(--color-text-primary)] [font-family:var(--font-display)]">
        Create New Org
      </h2>
      <p className="max-w-[200px] text-[10px] uppercase text-[var(--color-text-secondary)] [font-family:var(--font-mono)]">
        Deploy a fresh node environment for your team
      </p>
    </article>
  )
}

export default function CompanyUi() {
  return (
    <div className="max-h-screen overflow-y-auto bg-[var(--color-bg-base)] text-[var(--color-text-primary)]">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-6 pb-12 pt-24">
        <header className="mb-16 border-l-4 border-[var(--color-accent)] pl-8">
          <h1 className="mb-4 text-5xl font-bold leading-none tracking-tight text-[var(--color-text-primary)] [font-family:var(--font-display)] md:text-6xl">
            JOIN_OR_CREATE_COMPANY
          </h1>
          <p className="text-sm uppercase tracking-widest text-[var(--color-text-secondary)] [font-family:var(--font-mono)]">
            Choose an existing company or create your company profile
          </p>
        </header>

        <section className="mb-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <article className="border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-6">
            <h2 className="mb-4 text-xl font-bold uppercase tracking-tight [font-family:var(--font-display)]">
              Join Existing Company
            </h2>
            <div className="space-y-3">
              <input
                placeholder="Invite code or company slug"
                className="w-full border border-[var(--color-border-default)] bg-[var(--color-bg-base)] px-4 py-2 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-border-strong)] [font-family:var(--font-mono)]"
              />
              <button
                type="button"
                className="w-full bg-[var(--color-accent)] px-6 py-2 text-sm font-bold uppercase tracking-widest text-[var(--color-text-inverse)] transition-colors hover:bg-[var(--color-accent-hover)] [font-family:var(--font-display)]"
              >
                Join Company
              </button>
            </div>
          </article>

          <article className="border border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-surface)] p-6">
            <h2 className="mb-4 text-xl font-bold uppercase tracking-tight [font-family:var(--font-display)]">
              Create Company Profile
            </h2>
            <p className="mb-3 text-xs text-[var(--color-text-secondary)] [font-family:var(--font-mono)]">
              Set up a new company workspace and invite your team.
            </p>
            <button
              type="button"
              className="w-full border border-[var(--color-border-strong)] px-6 py-2 text-sm font-bold uppercase tracking-widest transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] [font-family:var(--font-display)]"
            >
              Create Profile
            </button>
          </article>
        </section>

        <section className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
          {organizations.map((organization) => (
            <OrganizationCard key={organization.id} organization={organization} />
          ))}
          <CreateOrganizationCard />
        </section>
      </main>
    </div>
  )
}
