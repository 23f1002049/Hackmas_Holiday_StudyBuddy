"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Snowfall } from "@/components/snowfall"
import { AppHeader } from "@/components/app-header"
import { FocusTab } from "@/components/focus-tab"
import { TasksTab } from "@/components/tasks-tab"
import { GiftsTab } from "@/components/gifts-tab"
import { ProgressTab } from "@/components/progress-tab"
import { ProfileTab } from "@/components/profile-tab"
import { LeaderboardTab } from "@/components/leaderboard-tab"
import { getUserStats, getUserSettings, saveUserSettings, fetchUserStats } from "@/lib/user-data"
import { calculateNextLevelXP } from "@/lib/progression"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Timer, ListTodo, Gift, TrendingUp, User, AlertCircle, X, Trophy, Shield } from "lucide-react"
import { AdminDashboard } from "@/components/admin-dashboard"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AchievementModal } from "@/components/achievement-modal"
import { getBadgeDetails, type Badge } from "@/lib/user-data"
import { SnowmanSidekick } from "@/components/snowman-sidekick"

export default function Home() {
  const { isAuthenticated, isGuest, user, isLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const isGuestParam = searchParams.get("guest") === "true"

  const [userStats, setUserStats] = useState(getUserStats())
  const [settings, setSettings] = useState(getUserSettings())
  const [mounted, setMounted] = useState(false)
  const [showGuestBanner, setShowGuestBanner] = useState(true)
  const [showSignupPrompt, setShowSignupPrompt] = useState(false)
  const [newBadge, setNewBadge] = useState<Badge | null>(null)
  const prevBadges = useRef<string[]>([])

  const isAdmin = userStats.is_blocked !== undefined && (userStats.id === 1 || user?.isAdmin) // Simplification for demo or use is_admin from stats

  useEffect(() => {
    setMounted(true)

    // Initial badges ref
    if (userStats.badges) {
      prevBadges.current = userStats.badges
    }

    if (!isLoading && !isAuthenticated && !isGuestParam) {
      router.push("/login")
    } else if (isAuthenticated && !isGuestParam) {
      // Fetch fresh stats from backend
      fetchUserStats().then(stats => setUserStats(stats))
    }

    if (isGuest || isGuestParam) {
      const interval = setInterval(
        () => {
          setShowSignupPrompt(true)
        },
        5 * 60 * 1000,
      ) // Every 5 minutes

      return () => clearInterval(interval)
    }
  }, [isAuthenticated, isLoading, isGuestParam, router, isGuest])

  const handleSnowToggle = () => {
    const newSettings = { ...settings, snowEnabled: !settings.snowEnabled }
    setSettings(newSettings)
    saveUserSettings(newSettings)
  }

  const refreshStats = async () => {
    const stats = await fetchUserStats()

    // Check for new badges
    if (stats.badges && stats.badges.length > prevBadges.current.length) {
      const newlyEarned = stats.badges.filter(b => !prevBadges.current.includes(b))
      if (newlyEarned.length > 0) {
        const details = await getBadgeDetails(newlyEarned[0])
        if (details) {
          setNewBadge(details)
        }
      }
    }
    prevBadges.current = stats.badges || []
    setUserStats(stats)
  }

  const refreshSettings = () => {
    setSettings(getUserSettings())
  }

  const maxXp = calculateNextLevelXP(userStats.level)

  if (!mounted || isLoading) {
    return null
  }

  if (!isAuthenticated && !isGuestParam) {
    return null
  }

  const isInGuestMode = isGuest || isGuestParam

  return (
    <div className="min-h-screen bg-background">
      <Snowfall enabled={settings.snowEnabled} />

      {isInGuestMode && showGuestBanner && (
        <div className="bg-yellow-600/90 text-white px-4 py-3 relative">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <p className="font-semibold">Guest Mode – Your progress will not be saved</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => router.push("/login")}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                Sign Up to Save Progress
              </Button>
              <button onClick={() => setShowGuestBanner(false)} className="p-1 hover:bg-white/20 rounded">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <AppHeader
        level={userStats.level}
        xp={userStats.xp}
        maxXp={maxXp}
        snowEnabled={settings.snowEnabled}
        onSnowToggle={handleSnowToggle}
        displayName={settings.name}
        isGuest={isInGuestMode}
      />

      <main className="container mx-auto px-4 py-8">
        {isInGuestMode && showSignupPrompt && (
          <Card className="mb-6 bg-accent/20 border-accent p-6 relative">
            <button
              onClick={() => setShowSignupPrompt(false)}
              className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded"
            >
              <X className="h-4 w-4 text-cream" />
            </button>
            <div className="flex items-start gap-4">
              <Gift className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-yellow-300 mb-2">Don't lose your progress!</h3>
                <p className="text-cream mb-4">
                  You've made great progress! Sign up now to save your stats, tasks, and unlocked gifts.
                </p>
                <Button
                  onClick={() => router.push("/login")}
                  className="bg-accent hover:bg-accent/90 text-primary font-semibold"
                >
                  Create Free Account
                </Button>
              </div>
            </div>
          </Card>
        )}

        <Tabs defaultValue="focus" className="w-full">
          <TabsList className={`grid w-full mb-8 transition-smooth ${isAdmin ? 'grid-cols-4 md:grid-cols-7' : 'grid-cols-3 md:grid-cols-6'}`}>
            <TabsTrigger value="focus" className="flex items-center gap-2 hover-lift">
              <Timer className="h-4 w-4" />
              <span className="hidden sm:inline">Focus</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2 hover-lift">
              <ListTodo className="h-4 w-4" />
              <span className="hidden sm:inline">Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="gifts" className="flex items-center gap-2 hover-lift">
              <Gift className="h-4 w-4" />
              <span className="hidden sm:inline">Gifts</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2 hover-lift">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Progress</span>
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2 hover-lift">
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Hall of Joy</span>
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger value="admin" className="flex items-center gap-2 hover-lift text-accent font-bold">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Command Center</span>
              </TabsTrigger>
            )}
            <TabsTrigger value="profile" className="flex items-center gap-2 hover-lift">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="focus" className="animate-slide-in-up">
            <FocusTab onStatsUpdate={refreshStats} />
          </TabsContent>

          <TabsContent value="tasks" className="animate-slide-in-up">
            <TasksTab onStatsUpdate={refreshStats} isGuest={isInGuestMode} />
          </TabsContent>

          <TabsContent value="gifts" className="animate-slide-in-up">
            <GiftsTab onStatsUpdate={refreshStats} isGuest={isInGuestMode} />
          </TabsContent>

          <TabsContent value="progress" className="animate-slide-in-up">
            <ProgressTab userStats={userStats} isGuest={isInGuestMode} />
          </TabsContent>

          <TabsContent value="leaderboard" className="animate-slide-in-up">
            <LeaderboardTab />
          </TabsContent>

          {isAdmin && (
            <TabsContent value="admin" className="animate-slide-in-up">
              <AdminDashboard />
            </TabsContent>
          )}

          <TabsContent value="profile" className="animate-slide-in-up">
            <ProfileTab onSettingsChange={refreshSettings} isGuest={isInGuestMode} />
          </TabsContent>
        </Tabs>
      </main>

      <AchievementModal
        badge={newBadge}
        userName={settings.name}
        onClose={() => setNewBadge(null)}
        isGuest={isInGuestMode}
      />

      <SnowmanSidekick
        context={{
          level: userStats.level,
          xp: userStats.xp,
          maxXp: maxXp,
          streak: userStats.currentStreak,
          tasksCompleted: userStats.tasksCompleted,
          focusTimeToday: userStats.todayFocusMinutes,
          name: settings.name
        }}
      />
    </div>
  )
}
