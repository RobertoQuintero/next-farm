import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeRegistry } from '@/theme/ThemeRegistry'
import { Navbar } from './components'
import { AuthProvider } from './context/auth/AuthProvider'
import { UiProvider } from './context/ui/UiProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ThemeRegistry >
        <UiProvider>
          <AuthProvider>
            <body className={inter.className}>
              <Navbar/>
              <main>{children}</main>
            </body>
          </AuthProvider>
        </UiProvider>
      </ThemeRegistry>
    </html>
  )
}
