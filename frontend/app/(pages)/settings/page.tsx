import { LabeledInput, MetricRow, SettingsSection } from '@/components/settings/SettingsUi'

const alertContacts = [
  'admin@bliplog.io',
  'ops-team@bliplog.io',
  'pagerduty-webhook-1',
]

const dangerActions = [
  {
    title: 'Archive Logs',
    description: 'Move all data to cold storage (read-only).',
    isCritical: false,
  },
  {
    title: 'Terminate Account',
    description: 'Permanent destruction of this BlipLog instance.',
    isCritical: true,
  },
]

export default function SettingsPage() {
  return (
    <div className="relative min-h-full bg-[var(--color-bg-base)] pb-24">
      <div className="settings-grid-pattern pointer-events-none absolute inset-0 -z-10 opacity-30" />

      <div className="mx-auto max-w-7xl space-y-10 p-6 lg:p-10">
        <header className="border-b border-[var(--color-border-default)] pb-6">
          <h1 className="text-4xl font-extrabold uppercase tracking-tighter text-[var(--color-text-primary)] [font-family:var(--font-display)]">
            System Settings
          </h1>
          <p className="mt-2 text-xs uppercase tracking-widest text-[var(--color-text-secondary)] [font-family:var(--font-mono)]">
            Global configuration and instance management
          </p>
        </header>

        <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:col-span-8">
            <SettingsSection
              icon="info"
              title="General Configuration"
              className="relative overflow-hidden md:col-span-2"
            >
              <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 translate-x-16 -translate-y-16 rotate-45 bg-[var(--color-accent)]/5" />
              <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2">
                <LabeledInput
                  label="Organization Name"
                  defaultValue="BLIPLOG_SYSTEMS_GLOBAL"
                />
                <LabeledInput
                  label="Organization Slug"
                  defaultValue="bliplog-systems"
                  readOnly
                />
              </div>
            </SettingsSection>

            <SettingsSection icon="public" title="Status Page">
              <div className="space-y-4">
                <div className="rounded-sm border border-[var(--color-border-default)] bg-[var(--color-bg-base)] p-3">
                  <p className="mb-1 text-[10px] uppercase text-[var(--color-text-secondary)] [font-family:var(--font-mono)]">
                    Instance URL
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-xs text-[var(--color-text-secondary)] [font-family:var(--font-mono)]">
                      status.bliplog.io/org/main
                    </span>
                    <button
                      type="button"
                      className="text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                    >
                      <span className="material-symbols-outlined text-sm">content_copy</span>
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex flex-1 items-center justify-center gap-2 bg-[var(--color-accent)] px-4 py-2 text-[10px] font-bold uppercase text-[var(--color-text-inverse)] transition-colors hover:bg-[var(--color-accent-hover)] [font-family:var(--font-mono)]"
                  >
                    <span className="material-symbols-outlined text-xs">visibility</span>
                    Preview
                  </button>
                  <button
                    type="button"
                    className="border border-[var(--color-border-default)] bg-[var(--color-bg-elevated)] px-4 py-2 text-[10px] uppercase text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-border-strong)] [font-family:var(--font-mono)]"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </SettingsSection>

            <SettingsSection
              icon="notifications"
              title="Alerting"
              action={
                <button
                  type="button"
                  className="text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                </button>
              }
            >
              <div className="custom-scrollbar max-h-40 space-y-2 overflow-y-auto pr-2">
                {alertContacts.map((contact) => (
                  <div
                    key={contact}
                    className="group flex items-center justify-between rounded-sm border border-[var(--color-border-default)] bg-[var(--color-bg-base)]/50 p-2 transition-colors hover:border-[var(--color-border-strong)]"
                  >
                    <span className="text-[10px] text-[var(--color-text-primary)] [font-family:var(--font-mono)]">
                      {contact}
                    </span>
                    <button
                      type="button"
                      className="text-xs text-[var(--color-text-tertiary)] transition-colors group-hover:text-red-400"
                    >
                      <span className="material-symbols-outlined text-xs">close</span>
                    </button>
                  </div>
                ))}
              </div>
            </SettingsSection>
          </div>

          <aside className="space-y-6 xl:col-span-4">
            <section className="flex flex-col items-center justify-center space-y-4 rounded-sm border border-dashed border-[var(--color-border-default)] bg-[var(--color-bg-surface)]/35 p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center border border-[var(--color-border-default)] bg-[var(--color-bg-base)]">
                <span className="material-symbols-outlined text-3xl text-[var(--color-text-tertiary)]">
                  image
                </span>
              </div>
              <div>
                <h3 className="text-[11px] uppercase tracking-widest text-[var(--color-text-primary)] [font-family:var(--font-mono)]">
                  Brand Mark
                </h3>
                <p className="mt-1 text-[10px] text-[var(--color-text-secondary)]">
                  Recommended: 256x256 SVG/PNG
                </p>
              </div>
              <button
                type="button"
                className="border border-[var(--color-border-default)] px-4 py-1.5 text-[10px] uppercase text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)] [font-family:var(--font-mono)]"
              >
                Upload New
              </button>
            </section>

            <section className="rounded-sm border-2 border-red-900/40 bg-[var(--color-bg-base)] p-6">
              <div className="mb-6 flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-red-600" />
                <h2 className="text-lg uppercase tracking-tight text-red-500 [font-family:var(--font-display)]">
                  Danger Zone
                </h2>
              </div>
              <p className="mb-6 text-[11px] leading-relaxed text-[var(--color-text-secondary)] [font-family:var(--font-mono)]">
                Warning: irreversible actions. All monitors, logs, and billing
                history will be purged immediately upon confirmation.
              </p>
              <div className="space-y-3">
                {dangerActions.map((action) => (
                  <button
                    key={action.title}
                    type="button"
                    className={[
                      'group w-full border p-3 text-left transition-all',
                      action.isCritical
                        ? 'border-red-900/50 bg-red-950/20 hover:bg-red-700 hover:text-white'
                        : 'border-[var(--color-border-subtle)] hover:border-red-900/50 hover:bg-red-900/10',
                    ].join(' ')}
                  >
                    <p className="text-[10px] font-bold uppercase text-[var(--color-text-primary)] [font-family:var(--font-mono)]">
                      {action.title}
                    </p>
                    <p className="text-[10px] text-[var(--color-text-secondary)] group-hover:text-red-100">
                      {action.description}
                    </p>
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-sm border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)]/35 p-6">
              <div className="space-y-4">
                <MetricRow
                  label="Current Tier"
                  value="ENTERPRISE_L3"
                  valueClassName="rounded bg-[var(--color-bg-elevated)] px-2 py-0.5 font-bold"
                />
                <MetricRow
                  label="Uptime Score"
                  value="99.998%"
                  valueClassName="text-[var(--color-status-up)]"
                />
                <MetricRow
                  label="Last Backup"
                  value="2023.10.27_14:02:44"
                  valueClassName="text-[var(--color-text-secondary)]"
                />
              </div>
            </section>
          </aside>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-[var(--color-border-default)] bg-[var(--color-bg-base)]/90 p-4 backdrop-blur md:left-64">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-1 w-1 rounded-full bg-[var(--color-text-secondary)]" />
            <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-secondary)] [font-family:var(--font-mono)]">
              Local changes detected
            </span>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              className="px-4 py-2 text-[11px] uppercase tracking-widest text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] [font-family:var(--font-mono)]"
            >
              Discard
            </button>
            <button
              type="button"
              className="rounded-sm bg-[var(--color-accent)] px-8 py-2 text-[11px] font-bold uppercase text-[var(--color-text-inverse)] transition-colors hover:bg-[var(--color-accent-hover)] [font-family:var(--font-mono)]"
            >
              Commit Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
