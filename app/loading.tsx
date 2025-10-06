import { Flame } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <Flame className="w-16 h-16 text-primary animate-flame-flicker mx-auto mb-4" />
        <p className="text-foreground text-lg">Summoning the Dragon...</p>
      </div>
    </div>
  )
}