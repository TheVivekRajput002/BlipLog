import type { ReactNode } from 'react'

interface SettingsSectionProps {
  icon: string
  title: string
  subtitle?: string
  className?: string
  children: ReactNode
  action?: ReactNode
}

interface LabeledInputProps {
  label: string
  defaultValue: string
  readOnly?: boolean
}

interface MetricRowProps {
  label: string
  value: string
  valueClassName?: string
}

export function SettingsSection({
  icon,
  title,
  subtitle,
  className = '',
  children,
  action,
}: SettingsSectionProps) {
  return (
    <section
      className={`rounded-sm border border-[var(--color-border-default)] bg-[var(--color-bg-surface)]/60 p-6 ${className}`}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold uppercase tracking-tight text-[var(--color-text-primary)] [font-family:var(--font-display)]">
            <span className="material-symbols-outlined text-sm">{icon}</span>
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 text-[10px] uppercase tracking-widest text-[var(--color-text-secondary)] [font-family:var(--font-mono)]">
              {subtitle}
            </p>
          ) : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

export function LabeledInput({
  label,
  defaultValue,
  readOnly = false,
}: LabeledInputProps) {
  return (
    <label className="space-y-1.5">
      <span className="block text-[10px] uppercase tracking-widest text-[var(--color-text-secondary)] [font-family:var(--font-mono)]">
        {label}
      </span>
      <input
        defaultValue={defaultValue}
        readOnly={readOnly}
        className="w-full border border-[var(--color-border-default)] bg-[var(--color-bg-base)] px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none transition-colors focus:border-[var(--color-border-strong)] [font-family:var(--font-mono)] read-only:text-[var(--color-text-secondary)]"
      />
    </label>
  )
}

export function MetricRow({ label, value, valueClassName = '' }: MetricRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[10px] uppercase text-[var(--color-text-tertiary)] [font-family:var(--font-mono)]">
        {label}
      </span>
      <span
        className={`text-[10px] tracking-wide text-[var(--color-text-primary)] [font-family:var(--font-mono)] ${valueClassName}`}
      >
        {value}
      </span>
    </div>
  )
}
