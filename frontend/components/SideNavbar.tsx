 'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { NavItem } from '@/lib/types.ts'

interface SideNavbarProps {
  navItems?: NavItem[]
  footerItems?: NavItem[]
}

function SideNavbar({ navItems = [], footerItems = [] }: SideNavbarProps) {
  const pathname = usePathname()

  return (
    <div className='h-screen md:sticky top-0'>

    <aside className="h-screen hidden md:flex md:w-64 shrink-0 flex-col border-r border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-4">
      <div className="mb-6">
        <h2 className="font-display text-lg font-bold uppercase tracking-widest text-[var(--color-text-primary)]">
          BlipLog
        </h2>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={[
              'flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors',
              pathname === item.href || pathname.startsWith(`${item.href}/`)
                ? 'bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)]'
                : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)]',
            ].join(' ')}
          >
            <span className="material-symbols-outlined text-base">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-4 space-y-1 border-t border-[var(--color-border-subtle)] pt-4">
        {footerItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 rounded px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <span className="material-symbols-outlined text-base">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </aside>
    </div>
  )
}

export default SideNavbar
