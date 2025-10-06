'use client'

import { useEffect, useState } from 'react'

export default function DragonAnimation() {
  const [sparks, setSparks] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const newSpark = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
      }
      setSparks(prev => [...prev.slice(-5), newSpark])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Dragon silhouette */}
      <div className="absolute bottom-10 right-10 opacity-20 animate-dragon-breathe">
        <svg
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-primary"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>

      {/* Animated sparks */}
      {sparks.map(spark => (
        <div
          key={spark.id}
          className="absolute w-2 h-2 bg-primary rounded-full animate-flame-flicker"
          style={{
            left: `${spark.x}%`,
            top: `${spark.y}%`,
            opacity: 0.4,
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
    </div>
  )
}