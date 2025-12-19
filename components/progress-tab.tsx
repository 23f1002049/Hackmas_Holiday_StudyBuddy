"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Clock,
  CheckCircle,
  Flame,
  Trophy,
  Download,
  Share2,
  Calendar,
  Target,
  Award,
  Brain,
  TrendingUp,
  FileDown,
} from "lucide-react"
import { getUserStats, fetchUserStats, fetchAllBadges, fetchFocusHistory, type UserStats, type Badge } from "@/lib/user-data"
import { calculateNextLevelXP } from "@/lib/progression"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { GuestLock } from "@/components/guest-lock"

export function ProgressTab({ userStats: initialStats, isGuest }: { userStats?: UserStats, isGuest?: boolean }) {
  const [userStats, setUserStats] = useState(initialStats || getUserStats())
  const [weeklyData, setWeeklyData] = useState<{ day: string; minutes: number }[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    loadData()
  }, [])

  useEffect(() => {
    if (initialStats) {
      setUserStats(initialStats)
    }
  }, [initialStats])

  const loadData = async () => {
    const { fetchUserStats, fetchFocusHistory } = await import("@/lib/user-data")
    const [stats, history] = await Promise.all([
      fetchUserStats(),
      fetchFocusHistory()
    ])
    setUserStats(stats)
    if (history && history.length > 0) {
      setWeeklyData(history)
    } else {
      // Fallback or empty state
      setWeeklyData([
        { day: "Mon", minutes: 0 },
        { day: "Tue", minutes: 0 },
        { day: "Wed", minutes: 0 },
        { day: "Thu", minutes: 0 },
        { day: "Fri", minutes: 0 },
        { day: "Sat", minutes: 0 },
        { day: "Sun", minutes: stats.todayFocusMinutes },
      ])
    }
  }

  if (!mounted) return null


  const stats = [
    {
      title: "Today's Focus",
      value: `${userStats.todayFocusMinutes} min`,
      icon: Clock,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "This Week",
      value: `${userStats.weekFocusMinutes} min`,
      icon: Clock,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Tasks Done",
      value: userStats.tasksCompleted,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Current Streak",
      value: `${userStats.currentStreak} days`,
      icon: Flame,
      color: "text-green-600",
      bgColor: "bg-green-500/10",
    },
  ]

  const badges = [
    { name: "First Task", icon: "📝", earned: userStats.badges.includes("first_task") },
    { name: "Task Master", icon: "✅", earned: userStats.badges.includes("task_master") },
    { name: "First Focus", icon: "🧘", earned: userStats.badges.includes("first_focus") },
    { name: "Dedicated Student", icon: "📚", earned: userStats.badges.includes("dedicated") },
    { name: "Level 5", icon: "⭐", earned: userStats.badges.includes("level_5") },
    { name: "Level 10", icon: "🌟", earned: userStats.badges.includes("level_10") },
    { name: "Gift Wrapper", icon: "🎁", earned: userStats.badges.includes("gift_wrapper") },
    { name: "Weekend Warrior", icon: "⚔️", earned: userStats.badges.includes("weekend_warrior") },
  ]

  const handleShare = () => alert("Share feature coming soon!")
  const handleDownload = () => alert("Download feature coming soon!")

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* STATS GRID */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-xl`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* LEVEL PROGRESS */}
      <Card className="bg-gradient-to-br from-green-500/10 via-card to-primary/10 border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Trophy className="h-6 w-6 text-accent" />
            Level Progress
          </CardTitle>
          <CardDescription>Keep going to reach the next level!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold text-primary">Level {userStats.level}</p>
              <p className="text-sm text-muted-foreground">
                {userStats.xp} / {calculateNextLevelXP(userStats.level)} XP
              </p>
            </div>
            <div className="text-6xl">🎄</div>
          </div>
          <Progress
            value={(userStats.xp / calculateNextLevelXP(userStats.level)) * 100}
            className="h-4 bg-green-500/20"
          />
        </CardContent>
      </Card>

      {/* WEEKLY + BADGES */}
      <div className="grid gap-8 md:grid-cols-2">

        {/* WEEKLY CHART */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Focus Time</CardTitle>
            <CardDescription>Your focus minutes throughout the week</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] overflow-hidden">
            <ChartContainer
              className="h-full"
              config={{
                minutes: { label: "Focus Minutes", color: "#22c55e" },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    cursor={{ fill: "rgba(34,197,94,0.15)" }}
                  />
                  <Bar
                    dataKey="minutes"
                    fill="#22c55e"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* BADGES */}
        <Card>
          <CardHeader>
            <CardTitle>Badge Collection</CardTitle>
            <CardDescription>Achievements unlocked</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {badges.map((b, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border text-center transition ${b.earned
                      ? "bg-green-500/10 border-green-500 hover:scale-105"
                      : "bg-muted/30 border-muted opacity-50"
                    }`}
                >
                  <div className="text-3xl">{b.icon}</div>
                  <p className="text-xs font-medium">{b.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SHARE */}
      <GuestLock isGuest={isGuest} message="Sign up to download your progress report!">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Share Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="hidden md:block transform scale-75 origin-left">
              {/* Hidden preview for layout, actual generation uses a hidden div */}
              <div className="pointer-events-none select-none">
                <ShareCard stats={userStats} username={userStats.name || "Holiday Helper"} />
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground">
                Show off your holiday productivity streak!
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={async () => {
                    const { toPng } = await import("html-to-image")
                    const node = document.getElementById("share-card-hidden")
                    if (node) {
                      const dataUrl = await toPng(node)
                      const link = document.createElement("a")
                      link.download = "hackmas-stats.png"
                      link.href = dataUrl
                      link.click()
                    }
                  }}
                  className="w-full md:w-auto"
                >
                  <Share2 className="h-4 w-4 mr-2" /> Generate Share Card
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </GuestLock>

      {/* Hidden Render Target */}
      <div className="fixed left-[-9999px] top-0">
        <div id="share-card-hidden">
          <ShareCard stats={userStats} username={userStats.name || "Holiday Helper"} />
        </div>
      </div>

      {/* ALL-TIME STATS (IMAGE BG) */}
      <Card
        className="relative overflow-hidden border-green-500/30"
        style={{
          backgroundImage: "url('/images/all-time-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <CardHeader className="relative z-10">
          <CardTitle className="text-white">All-Time Stats</CardTitle>
          <CardDescription className="text-white/80">Your full productivity journey</CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total Minutes", value: userStats.totalFocusMinutes, icon: "⏰" },
            { label: "Tasks Completed", value: userStats.tasksCompleted, icon: "📝" },
            { label: "Day Streak", value: userStats.currentStreak, icon: "🔥" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur rounded-lg border border-white/20"
            >
              <div className="text-3xl">{item.icon}</div>
              <div>
                <p className="text-2xl font-bold text-white">{item.value}</p>
                <p className="text-sm text-white/80">{item.label}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  )
}

import { ShareCard } from "./share-card"
