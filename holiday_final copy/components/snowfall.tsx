"use client"

import { useEffect, useState } from "react"

export function Snowfall({ enabled = true }: { enabled?: boolean }) {
  const [snowflakes, setSnowflakes] = useState<
    Array<{ id: number; left: number; delay: number; duration: number; alt: boolean }>
  >([])

  useEffect(() => {
    if (!enabled) {
      setSnowflakes([])
      return
    }

    const flakes = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      alt: Math.random() > 0.5,
    }))

    setSnowflakes(flakes)
  }, [enabled])

  if (!enabled) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            animationName: flake.alt ? "snowfall-alt" : "snowfall",
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  )
}
