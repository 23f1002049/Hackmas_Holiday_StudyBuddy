"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserStats } from "@/lib/user-data"
import { Trophy, Flame, CheckCircle, Clock } from "lucide-react"

export function ShareCard({ stats, username }: { stats: UserStats; username: string }) {
  return (
    <div
      id="share-card"
      className="w-[400px] bg-gradient-to-br from-green-900 to-green-950 text-white p-6 rounded-xl border-4 border-yellow-500/50 shadow-2xl relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
      
      <CardHeader className="text-center relative z-10">
        <div className="mx-auto bg-yellow-500/20 p-3 rounded-full w-fit mb-2">
          <Trophy className="h-8 w-8 text-yellow-400" />
        </div>
        <CardTitle className="text-2xl font-bold text-yellow-400 font-handwritten">
          {username}'s Holiday Stats
        </CardTitle>
        <p className="text-green-200 text-sm">HackMas 2025</p>
      </CardHeader>

      <CardContent className="space-y-6 relative z-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 p-3 rounded-lg text-center">
            <div className="flex justify-center mb-1"><Flame className="h-5 w-5 text-orange-400" /></div>
            <div className="text-2xl font-bold">{stats.currentStreak}</div>
            <div className="text-xs text-green-200">Day Streak</div>
          </div>
          <div className="bg-white/10 p-3 rounded-lg text-center">
            <div className="flex justify-center mb-1"><CheckCircle className="h-5 w-5 text-blue-400" /></div>
            <div className="text-2xl font-bold">{stats.tasksCompleted}</div>
            <div className="text-xs text-green-200">Tasks Done</div>
          </div>
          <div className="bg-white/10 p-3 rounded-lg text-center">
            <div className="flex justify-center mb-1"><Clock className="h-5 w-5 text-purple-400" /></div>
            <div className="text-2xl font-bold">{stats.totalFocusMinutes}</div>
            <div className="text-xs text-green-200">Focus Mins</div>
          </div>
          <div className="bg-white/10 p-3 rounded-lg text-center">
            <div className="flex justify-center mb-1">🎁</div>
            <div className="text-2xl font-bold">{stats.level}</div>
            <div className="text-xs text-green-200">Level</div>
          </div>
        </div>

        <div className="text-center pt-2 border-t border-white/10">
          <p className="text-sm italic text-yellow-200/80">"Sleighing my goals one task at a time! 🎅"</p>
        </div>
      </CardContent>
    </div>
  )
}
