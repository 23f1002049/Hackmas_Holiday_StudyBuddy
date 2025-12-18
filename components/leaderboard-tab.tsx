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
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-6xl font-ice-cream text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-green-600 drop-shadow-sm p-2">
          ✨ Hall of Joy ✨
        </h2>
        <p className="text-cream/90 text-2xl font-light font-serif italic max-w-2xl mx-auto">
          "The most dedicated helpers making the holidays magical, one focus session at a time."
        </p>
      </div>

      <Card className="border-4 border-yellow-400/30 shadow-[0_0_50px_rgba(250,204,21,0.15)] overflow-hidden bg-white/90 backdrop-blur-md rounded-3xl">
        <CardHeader className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white p-8 border-b-4 border-yellow-400">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-yellow-300 animate-pulse" />
              <span className="text-3xl font-bold font-serif tracking-wide">Global Leaderboard</span>
            </div>
            <span className="text-xs bg-black/20 px-3 py-1 rounded-full font-mono text-yellow-200 border border-yellow-400/30">
              LIVE RANKINGS
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 bg-gradient-to-b from-white to-red-50">
          {loading ? (
            <div className="p-20 text-center text-muted-foreground animate-pulse text-xl">Loading rankings...</div>
          ) : leaders.length === 0 ? (
            <div className="p-20 text-center text-muted-foreground text-xl">No helpers in the list yet. Start studying to be the first!</div>
          ) : (
            <div className="divide-y divide-red-100/50">
              {leaders.map((leader, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-6 p-6 transition-all hover:bg-white hover:scale-[1.01] duration-300 group ${index === 0 ? 'bg-yellow-50/80' :
                      index === 1 ? 'bg-gray-50/80' :
                        index === 2 ? 'bg-orange-50/80' : ''
                    }`}
                >
                  <div className="flex-shrink-0 w-16 flex justify-center text-3xl filter drop-shadow-md transform transition-transform group-hover:scale-110 duration-300">
                    {getRankIcon(index)}
                  </div>

                  <div className="flex-shrink-0 relative">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-4xl border-4 overflow-hidden shadow-lg ${index === 0 ? 'border-yellow-400 bg-yellow-100 ring-4 ring-yellow-400/20' :
                        index === 1 ? 'border-gray-300 bg-gray-100' :
                          index === 2 ? 'border-orange-300 bg-orange-100' :
                            'border-white bg-green-50'
                      }`}>
                      {leader.avatar ? (
                        <img src={leader.avatar} alt="" className="w-full h-full object-cover" />
                      ) : (
                        (leader.name || "").toLowerCase().includes('santa') ? '🎅' :
                          (leader.name || "").toLowerCase().includes('elf') ? '🧝' :
                            (leader.name || "").toLowerCase().includes('reindeer') ? '🦌' : '☃️'
                      )}
                    </div>
                    {index === 0 && <div className="absolute -top-3 -right-2 text-2xl animate-bounce">👑</div>}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <p className="text-2xl font-black text-gray-800 tracking-tight group-hover:text-red-700 transition-colors">
                        {leader.name || "Holiday Helper"}
                      </p>
                      {index < 3 && (
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest ${index === 0 ? 'bg-yellow-400 text-yellow-900' :
                            index === 1 ? 'bg-gray-300 text-gray-800' :
                              'bg-orange-300 text-orange-900'
                          }`}>
                          Top {index + 1}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-6 text-base text-muted-foreground mt-2 font-medium">
                      <span className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                        <Target className="h-4 w-4" /> Lvl {leader.level}
                      </span>
                      <span className="flex items-center gap-1.5 text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-md">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" /> {leader.xp.toLocaleString()} XP
                      </span>
                    </div>

                    <div className="mt-3 w-full max-w-[200px] h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min(100, (leader.xp / (leader.level * 200)) * 100)}%` }} // Adjusted visual scale
                      />
                    </div>
                  </div>

                  <div className="text-right hidden sm:block min-w-[120px]">
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Focus Time</p>
                    <p className="text-3xl font-black text-gray-700 font-mono group-hover:text-green-700 transition-colors">
                      {Math.floor(leader.totalFocusMinutes / 60)}<span className="text-sm text-gray-400 mx-1">h</span>
                      {leader.totalFocusMinutes % 60}<span className="text-sm text-gray-400">m</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 sm:grid-cols-3">
        <Card className="bg-gradient-to-br from-red-50 to-white text-center border-red-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <p className="text-red-600 text-sm font-bold uppercase tracking-widest mb-2">Community Helpers</p>
            <p className="text-5xl font-black text-red-800">{leaders.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-white text-center border-green-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <p className="text-green-600 text-sm font-bold uppercase tracking-widest mb-2">Average Level</p>
            <p className="text-5xl font-black text-green-800">
              {leaders.length > 0 ? (leaders.reduce((acc, l) => acc + l.level, 0) / leaders.length).toFixed(1) : 0}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-white text-center border-blue-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <p className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-2">Total Focus Hours</p>
            <p className="text-5xl font-black text-blue-800">
              {Math.floor(leaders.reduce((acc, l) => acc + l.totalFocusMinutes, 0) / 60)}
              <span className="text-base font-medium text-blue-400 ml-1">hrs</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
