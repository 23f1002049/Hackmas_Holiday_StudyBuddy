"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Trophy, Medal, Star, Target } from "lucide-react"
import { fetchLeaderboard, type UserStats } from "@/lib/user-data"
import { Progress } from "@/components/ui/progress"

export function LeaderboardTab() {
  const [leaders, setLeaders] = useState<UserStats[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard().then(data => {
      setLeaders(data)
      setLoading(false)
    })
  }, [])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 0: return <Trophy className="h-6 w-6 text-yellow-400" />
      case 1: return <Medal className="h-6 w-6 text-gray-400" />
      case 2: return <Medal className="h-6 w-6 text-orange-400" />
      default: return <span className="font-bold text-lg text-muted-foreground w-6 text-center">{rank + 1}</span>
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-black text-green-700 tracking-tight">🏆 Hall of Joy</h2>
        <p className="text-muted-foreground text-lg italic">The most productive holiday helpers this season</p>
      </div>

      <Card className="border-2 border-green-500/20 shadow-xl overflow-hidden bg-white/50 backdrop-blur-sm">
        <CardHeader className="bg-green-700 text-white">
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            Global Rankings
          </CardTitle>
          <CardDescription className="text-green-100">Updated in real-time</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-12 text-center text-muted-foreground animate-pulse">Loading leaders...</div>
          ) : leaders.length === 0 ? (
             <div className="p-12 text-center text-muted-foreground">No helpers in the list yet. Start studying to be the first!</div>
          ) : (
            <div className="divide-y divide-green-100">
              {leaders.map((leader, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-4 p-4 transition-colors hover:bg-green-50/50 ${
                    index < 3 ? 'bg-gradient-to-r from-yellow-500/5 to-transparent' : ''
                  }`}
                >
                  <div className="flex-shrink-0 w-10 flex justify-center">
                    {getRankIcon(index)}
                  </div>
                  
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl border-2 border-green-200 overflow-hidden">
                      {leader.avatar ? (
                        <img src={leader.avatar} alt="" className="w-full h-full object-cover" />
                      ) : (
                        (leader.name || "").toLowerCase().includes('santa') ? '🎅' : 
                        (leader.name || "").toLowerCase().includes('elf') ? '🧝' : 
                        (leader.name || "").toLowerCase().includes('reindeer') ? '🦌' : '☃️'
                      )}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-green-900 truncate">{leader.name || "Holiday Helper"}</p>
                      {index === 0 && <span className="text-[10px] bg-yellow-400 text-yellow-900 px-1.5 rounded font-bold uppercase">Legend</span>}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-0.5">
                      <span className="flex items-center gap-1 font-medium text-green-700">
                        <Target className="h-3 w-3" /> Lvl {leader.level}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" /> {leader.xp} XP
                      </span>
                    </div>
                    <div className="mt-2 w-full max-w-[120px]">
                       <Progress value={(leader.xp / (leader.level * 100)) * 100} className="h-1 bg-green-100" />
                    </div>
                  </div>

                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Focus Time</p>
                    <p className="text-lg font-black text-green-700">{leader.totalFocusMinutes} <span className="text-sm font-normal">m</span></p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="grid gap-4 sm:grid-cols-3">
         <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-center">
            <p className="text-red-700 text-sm font-bold uppercase tracking-tight mb-1">Total Helpers</p>
            <p className="text-3xl font-black text-red-900">{leaders.length}</p>
         </div>
         <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
            <p className="text-green-700 text-sm font-bold uppercase tracking-tight mb-1">Avg Level</p>
            <p className="text-3xl font-black text-green-900">
                {leaders.length > 0 ? (leaders.reduce((acc, l) => acc + l.level, 0) / leaders.length).toFixed(1) : 0}
            </p>
         </div>
         <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
            <p className="text-blue-700 text-sm font-bold uppercase tracking-tight mb-1">Total Focus</p>
            <p className="text-3xl font-black text-blue-900">
                {leaders.reduce((acc, l) => acc + l.totalFocusMinutes, 0)}<span className="text-sm">m</span>
            </p>
         </div>
      </div>
    </div>
  )
}
