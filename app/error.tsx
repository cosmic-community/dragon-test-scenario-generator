'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full dragon-card text-center">
        <AlertTriangle className="w-16 h-16 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Something went wrong!
        </h2>
        <p className="text-foreground/70 mb-6">
          The dragon encountered an error. Please try again.
        </p>
        <button
          onClick={reset}
          className="dragon-button"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}