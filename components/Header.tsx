import { AppSettings } from '@/types'
import Link from 'next/link'
import { Flame } from 'lucide-react'

interface HeaderProps {
  appSettings: AppSettings | null
}

export default function Header({ appSettings }: HeaderProps) {
  const appName = appSettings?.metadata?.app_name || '🐉 Dragon Test Scenario Generator'

  return (
    <header className="bg-background-light border-b border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Flame className="w-8 h-8 text-primary animate-flame-flicker" />
            <h1 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
              {appName}
            </h1>
          </Link>

          <nav className="flex items-center gap-6">
            <Link 
              href="/"
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Generator
            </Link>
            <Link 
              href="/scenarios"
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Scenarios
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}