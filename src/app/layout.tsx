import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Toastify from '@/components/toatisfy'
import './globals.css'
import Mui from '@/components/mui'
import { AuthProvider } from '@/contexts/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'New Frontiers',
  description: 'A new DayZ experience.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Mui>
          <AuthProvider>
            {children}
          </AuthProvider>
          <Toastify />
        </Mui>
      </body>
    </html>
  )
}
