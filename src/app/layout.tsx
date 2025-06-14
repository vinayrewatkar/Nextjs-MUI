// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { ClientStyleRegistry } from './components/service/ClientStyleRegistry'
import { ThemeRegistry } from './components/service/ThemeRegistry'
import DashboardLayout from './components/ui/DashboardLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard App',
  description: 'A modern dashboard built with Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientStyleRegistry>
          <ThemeRegistry>
            <DashboardLayout>{children}</DashboardLayout>
          </ThemeRegistry>
        </ClientStyleRegistry>
      </body>
    </html>
  )
}
