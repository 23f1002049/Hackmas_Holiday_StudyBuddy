"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserStats } from "@/lib/user-data"
import { Trophy, Flame, CheckCircle, Clock } from "lucide-react"

export function ShareCard({ stats, username }: { stats: UserStats; username: string }) {
  return (
    <div
      id="share-card"
      className="w-[500px] h-[300px] bg-[#0a0a0a] text-white rounded-2xl border-2 border-white/10 shadow-2xl relative overflow-hidden flex flex-col"
      style={{
        backgroundImage: "url('/images/pdf-achievement-bg.png')",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="relative z-10 flex-1 p-8 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start mb-6 border-b border-[#FF3131] pb-4">
          <div className="flex items-center gap-3">
             <img src="/images/logo.png" alt="Logo" className="w-10 h-10" />
             <h2 className="text-2xl font-bold tracking-tighter uppercase italic">HackMas</h2>
          </div>
          <div className="text-right">
             <p className="text-[#32CD32] font-bold text-lg">{username}</p>
             <p className="text-xs text-white/40 uppercase tracking-widest">Achiever Status</p>
          </div>
        </div>

        {/* Hero Level */}
        <div className="mb-6 flex items-baseline gap-2">
           <span className="text-[#FF3131] text-xs font-bold uppercase tracking-widest">Rank</span>
           <h3 className="text-5xl font-black italic">LEVEL {stats.level}</h3>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <div className="text-xl font-bold">{stats.currentStreak}</div>
            <div className="text-[8px] text-white/50 uppercase tracking-widest">Streak</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <div className="text-xl font-bold">{stats.tasksCompleted}</div>
            <div className="text-[8px] text-white/50 uppercase tracking-widest">Tasks</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <div className="text-xl font-bold">{stats.totalFocusMinutes}</div>
            <div className="text-[8px] text-white/50 uppercase tracking-widest">Minutes</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <div className="text-xl font-bold">{stats.xp}</div>
            <div className="text-[8px] text-white/50 uppercase tracking-widest">XP</div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex justify-between items-center pt-4 border-t border-white/5">
           <p className="text-[10px] text-white/40 italic">"Sleighing my goals one task at a time!"</p>
           <p className="text-[10px] font-bold text-white/20 tracking-widest">HOLIDAY STUDY BUDDY</p>
        </div>
      </div>
    </div>
  )
}
