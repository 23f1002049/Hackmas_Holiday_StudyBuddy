"use client"

import { useEffect, useState } from "react"
import { fetchPublicStats, type PublicStats } from "@/lib/user-data"
import { Users, Trophy, Flame } from "lucide-react"

export function ElfSurveillanceWidget() {
  const [stats, setStats] = useState<PublicStats | null>(null)

  useEffect(() => {
    fetchPublicStats().then(setStats)

    const interval = setInterval(() => {
      fetchPublicStats().then(setStats)
    }, 30000) // Poll every 30s

    return () => clearInterval(interval)
  }, [])

  if (!stats) return null

  return (
    <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md rounded-full px-4 py-2 text-white/90 text-sm border border-white/10 shadow-lg animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Active Elves */}
      <div className="flex items-center gap-2 border-r border-white/20 pr-4">
        <div className="relative">
             <Users className="h-4 w-4 text-green-400" />
             <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
             </span>
        </div>
        <span className="font-bold tabular-nums">{stats.active_elves}</span>
        <span className="hidden sm:inline text-white/70">Elves Focusing</span>
      </div>

      {/* Ticker / Nice List */}
      <div className="flex items-center gap-2 overflow-hidden max-w-[200px] sm:max-w-xs">
        <Trophy className="h-4 w-4 text-yellow-500 shrink-0" />
        <div className="flex flex-col h-5 overflow-hidden relative">
             <div className="animate-ticker space-y-2">
                 {stats.nice_list.length > 0 ? (
                     stats.nice_list.map((u, i) => (
                         <div key={i} className="whitespace-nowrap flex items-center gap-1 font-medium text-xs h-5">
                             <span className="text-yellow-200">#{i+1}</span> {u.username} ({u.xp} XP)
                         </div>
                     ))
                 ) : (
                     <span className="text-xs">Be the first on the Nice List!</span>
                 )}
                 {/* Duplicate for infinite loop illusion if needed, or just standard list */}
             </div>
        </div>
      </div>
      
      {/* Naughty List Warning */}
      {stats.naughty_count > 0 && (
          <div className="flex items-center gap-1 text-red-400 border-l border-white/20 pl-4">
              <Flame className="h-4 w-4" />
              <span className="font-bold tabular-nums">{stats.naughty_count}</span>
              <span className="hidden sm:inline text-xs">Coal Issued</span>
          </div>
      )}
    </div>
  )
}
