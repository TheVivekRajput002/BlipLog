import type { Metadata } from 'next'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'BlipLog // System Admin',
  description: 'Infrastructure uptime monitoring dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-primary)]">
          <main className="flex-1">{children}</main>
      </body>
    </html>
  )
}
