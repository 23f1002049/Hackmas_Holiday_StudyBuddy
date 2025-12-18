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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  getUserSettings,
  saveUserSettings,
  type UserSettings,
} from "@/lib/user-data"
import { useAuth } from "@/components/auth-provider"
import { useTheme } from "next-themes"
import { LogOut, AlertCircle, Trophy, Download } from "lucide-react"
import { fetchAllBadges, getUserStats, type Badge } from "@/lib/user-data"
import { toPng } from "html-to-image"

const avatars = [
  { id: "santa", emoji: "🎅", name: "Santa" },
  { id: "elf", emoji: "🧝", name: "Elf" },
  { id: "reindeer", emoji: "🦌", name: "Reindeer" },
  { id: "snowman", emoji: "☃️", name: "Snowman" },
] as const

export function ProfileTab({
  onSettingsChange,
}: {
  onSettingsChange: () => void
}) {
  const [settings, setSettings] = useState<UserSettings>(getUserSettings())
  const [mounted, setMounted] = useState(false)
  const { user, isGuest, signOut } = useAuth()
  const { setTheme } = useTheme()
  const [allBadges, setAllBadges] = useState<Badge[]>([])
  const [userStats, setUserStats] = useState(getUserStats())

  useEffect(() => {
    setMounted(true)
    loadData()
    fetchAllBadges().then(setAllBadges)
  }, [])

  const loadData = async () => {
    const [fetchedSettings, fetchedStats] = await Promise.all([
        import("@/lib/user-data").then(m => m.getUserSettings()),
        import("@/lib/user-data").then(m => m.fetchUserStats())
    ])
    setSettings(fetchedSettings)
    setUserStats(fetchedStats)
  }

  const updateSettings = async (newSettings: UserSettings) => {
    setSettings(newSettings)
    await saveUserSettings(newSettings)
    if (newSettings.theme) {
      setTheme(newSettings.theme)
    }
  }

  if (!mounted) return null

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* ================= GUEST WARNING ================= */}
      {isGuest && (
        <Card className="border border-yellow-600/40 bg-yellow-50">
          <CardContent className="pt-6 flex gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-700 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800">
                Guest Mode Active
              </h3>
              <p className="text-sm text-yellow-700">
                Your progress isn’t saved. Create an account to keep your data.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ================= PROFILE ================= */}
      <Card
        className="border border-green-800/30"
        style={{
          backgroundImage: "url('/images/paper.jpg')",
          backgroundSize: "cover",
        }}
      >
        <CardHeader>
          <CardTitle className="text-2xl text-green-800">
            Your Profile
          </CardTitle>
          <CardDescription className="text-green-700">
            Customize your study buddy
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {user && !isGuest && (
            <div className="p-4 rounded-lg bg-white/70 border border-green-800/30">
              <Label className="text-green-800">Email</Label>
              <p className="text-green-700 mt-1">{user.email}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-green-800">Display Name</Label>
            <Input
              value={settings.name}
              onChange={(e) =>
                updateSettings({ ...settings, name: e.target.value })
              }
              className="bg-white border-green-800/30 text-green-900"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-green-800">Choose Avatar</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {avatars.map((avatar) => {
                const active = settings.avatar === avatar.id
                return (
                  <button
                    key={avatar.id}
                    onClick={() =>
                      updateSettings({ ...settings, avatar: avatar.id })
                    }
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${active
                      ? "border-green-800 bg-white/80"
                      : "border-green-800/30 bg-white/60 hover:border-green-800"
                      }`}
                  >
                    <div className="text-5xl">{avatar.emoji}</div>
                    <span className="text-sm text-green-800">
                      {avatar.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================= BADGES ================= */}
      <Card
        className="border border-yellow-500/30"
        style={{
          backgroundImage: "url('/images/paper.jpg')",
          backgroundSize: "cover",
        }}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-600" />
            <CardTitle className="text-2xl text-green-800">Your Achievements</CardTitle>
          </div>
          <CardDescription className="text-green-700">
            Showcase your hard-earned badges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {allBadges.map((badge: Badge) => {
              const earned = userStats.badges?.includes(badge.code)
              return (
                <div
                  key={badge.code}
                  id={`badge-card-${badge.code}`}
                  className={`relative group p-4 rounded-xl border-2 transition-all flex flex-col items-center text-center ${
                    earned 
                      ? "bg-white/90 border-yellow-400 shadow-md scale-100" 
                      : "bg-gray-100/50 border-transparent grayscale opacity-50 scale-95"
                  }`}
                >
                  <img src="/images/logo.png" alt="" className="absolute top-2 left-2 h-4 w-4 opacity-10 group-hover:opacity-30 transition-opacity" />
                  
                  <div className="text-5xl mb-3 filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {getBadgeEmoji(badge.code)}
                  </div>
                  <h4 className="font-bold text-sm text-green-900 leading-tight mb-1">{badge.name}</h4>
                  <p className="text-[10px] text-green-700 leading-tight mb-2">{badge.description}</p>
                  
                  {earned && (
                    <div className="mt-auto pt-2 border-t border-green-100 w-full">
                       <p className="text-[8px] font-bold text-green-600 uppercase tracking-tight">{settings.name}</p>
                    </div>
                  )}
                  
                  {earned && (
                    <button
                      onClick={async () => {
                        const el = document.getElementById(`badge-card-${badge.code}`)
                        if (el) {
                          const dataUrl = await toPng(el, { cacheBust: true, backgroundColor: '#ffffff' })
                          const link = document.createElement("a")
                          link.download = `Badge-${badge.name}.png`
                          link.href = dataUrl
                          link.click()
                        }
                      }}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity border border-yellow-200"
                      title="Download Badge"
                    >
                      <Download className="h-3 w-3 text-yellow-600" />
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* ================= SETTINGS ================= */}
      <Card
        className="border border-green-800/30"
        style={{
          backgroundImage: "url('/images/paper.jpg')",
          backgroundSize: "cover",
        }}
      >
        <CardHeader>
          <CardTitle className="text-2xl text-green-800">
            App Settings
          </CardTitle>
          <CardDescription className="text-green-700">
            Control app behavior
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Theme Selector - Custom Component */}
          <div className="p-4 rounded-lg bg-white/70 border border-green-800/30">
            <div className="mb-3">
              <Label className="text-green-800">Theme Mode</Label>
              <p className="text-sm text-green-700">Choose your visual style</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "festive", label: "Festive", icon: "🎅" },
                { id: "dark", label: "Dark", icon: "🌑" },
                { id: "calm", label: "Calm", icon: "🌿" },
              ].map((themeOpt) => (
                <button
                  key={themeOpt.id}
                  onClick={() => {
                    const newTheme = themeOpt.id as UserSettings["theme"]
                    updateSettings({ ...settings, theme: newTheme })
                    onSettingsChange()
                  }}
                  className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-all ${settings.theme === themeOpt.id
                    ? "border-green-800 bg-white shadow-md ring-2 ring-green-800/20"
                    : "border-transparent hover:bg-white/50"
                    }`}
                >
                  <span className="text-xl">{themeOpt.icon}</span>
                  <span className="text-xs font-medium text-green-900">{themeOpt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {[
            {
              title: "Snow Animation",
              desc: "Background snow",
              checked: settings.snowEnabled,
              onToggle: () => {
                updateSettings({
                  ...settings,
                  snowEnabled: !settings.snowEnabled,
                })
                onSettingsChange()
              },
            },
            {
              title: "Sound Effects",
              desc: "UI sounds",
              checked: settings.soundEnabled,
              onToggle: () =>
                updateSettings({
                  ...settings,
                  soundEnabled: !settings.soundEnabled,
                }),
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-lg bg-white/70 border border-green-800/30"
            >
              <div>
                <Label className="text-green-800">{item.title}</Label>
                <p className="text-sm text-green-700">{item.desc}</p>
              </div>
              <Switch
                checked={item.checked}
                onCheckedChange={item.onToggle}
                className="data-[state=checked]:bg-green-700"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ================= DATA + LOGOUT ================= */}
      <Card
        className="border border-green-800/30"
        style={{
          backgroundImage: "url('/images/paper.jpg')",
          backgroundSize: "cover",
        }}
      >
        <CardHeader>
          <CardTitle className="text-green-800">
            Data Management
          </CardTitle>
          <CardDescription className="text-green-700">
            Export or reset progress
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1 bg-white text-green-800 border-green-800"
              onClick={async () => {
                const { pdf } = await import("@react-pdf/renderer")
                const { PdfDocument } = await import("./pdf-template")

                // Get fresh stats
                const currentStats = localStorage.getItem("userStats")
                  ? JSON.parse(localStorage.getItem("userStats")!)
                  : { level: 1, xp: 0, totalFocusMinutes: 0, currentStreak: 0 }

                const blob = await pdf(
                  <PdfDocument
                    settings={settings}
                    stats={currentStats}
                    date={new Date().toLocaleDateString()}
                  />
                ).toBlob()

                const url = URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.href = url
                a.download = "Holiday_Study_Report.pdf"
                a.click()
                URL.revokeObjectURL(url)
              }}
            >
              Export PDF Report
            </Button>
            <Button
              variant="destructive"
              className="flex-1 bg-red-600"
              onClick={async () => {
                if (confirm("Reset all data? This cannot be undone!")) {
                  const { resetUserData } = await import("@/lib/user-data")
                  const success = await resetUserData()
                  if (success) {
                    window.location.reload()
                  } else {
                    alert("Failed to reset data. Please try again.")
                  }
                }
              }}
            >
              Reset All Data
            </Button>
          </div>

          {!isGuest && (
            <Button
              variant="outline"
              className="w-full bg-white text-green-800 border-green-800"
              onClick={signOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function getBadgeEmoji(code: string): string {
  const icons: Record<string, string> = {
    first_task: "🎯",
    task_master: "🏆",
    first_focus: "⚡",
    dedicated: "🔥",
    level_5: "🎖️",
    level_10: "👑",
    gift_wrapper: "🎁",
    weekend_warrior: "⚔️",
  }
  return icons[code] || "✨"
}

