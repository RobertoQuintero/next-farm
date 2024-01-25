import './globals.css'
import { Inter,Montserrat_Alternates } from 'next/font/google'
import { ThemeRegistry } from '@/theme/ThemeRegistry'
import { Navbar } from './components'
import { AuthProvider } from './context/auth/AuthProvider'
import { UiProvider } from './context/ui/UiProvider'

const inter = Inter({ weight:'400',subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <ThemeRegistry >
          <UiProvider>
              <body className={inter.className}>
                <Navbar/>
                <main className='mainStyle'>
                  {children}
                </main>
              </body>
          </UiProvider>
        </ThemeRegistry>
      </AuthProvider>
    </html>
  )
}
