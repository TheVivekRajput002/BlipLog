import Sidebar from '@/components/SideNavbar'
import Topbar from '@/components/Topbar'
import { NAV_ITEMS, NAV_FOOTER_ITEMS } from '@/lib/mock-data'

import {
  StatusHeader,
  StatusTicker,
  StatusHero,
  MonitorIndex,
  LatencyMap,
  IncidentCount,
  RegionalNodes,
  MaintenanceLog,
  HistoricalLogs,
  StatusFooter
} from '@/components/home'


export default function PagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-primary)]">
      <Sidebar navItems={NAV_ITEMS} footerItems={NAV_FOOTER_ITEMS} />
      <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
        <Topbar />
        <main className="flex-1">
          <div className="flex min-h-screen bg-background text-on-surface selection:bg-white selection:text-black">
            {/* 
        Note: This page is within the (pages) layout which already includes a Sidebar and Topbar.
        If you want to use the specific Sidebar and Header from the HTML, 
        you might want to move this page out of the (pages) group or 
        adjust the layout to conditionalize the sidebar/header.
      */}


            <main className="flex-1 flex flex-col min-w-0">
              <StatusHeader />
              <StatusTicker />

              <div className="flex-1 overflow-y-auto grid-pattern">
                <StatusHero />

                <section className="max-w-6xl mx-auto px-12 py-16 w-full">
                  <div className="grid grid-cols-12 gap-8">
                    {/* Monitors Column */}
                    <div className="col-span-12 lg:col-span-8 space-y-8">
                      <MonitorIndex />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <LatencyMap />
                        <IncidentCount />
                      </div>
                    </div>

                    {/* Regions Column */}
                    <div className="col-span-12 lg:col-span-4 space-y-8">
                      <RegionalNodes />
                      <MaintenanceLog />
                    </div>
                  </div>
                </section>

                <HistoricalLogs />
                <StatusFooter />
              </div>
            </main>
          </div>
        </main>
      </div>
    </div>
  )
}