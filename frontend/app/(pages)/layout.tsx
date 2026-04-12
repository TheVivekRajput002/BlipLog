import SideNavbar from '@/components/SideNavbar'
import Topbar from '@/components/Topbar'
import { NAV_ITEMS, NAV_FOOTER_ITEMS } from '@/lib/mock-data'

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-primary)]">
      <SideNavbar navItems={NAV_ITEMS} footerItems={NAV_FOOTER_ITEMS} />
      <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
        <Topbar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
