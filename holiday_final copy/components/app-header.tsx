import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/components/auth-provider"
import Image from "next/image"
import { useState, useEffect } from "react"
import { fetchAnnouncements, fetchActiveCount } from "@/lib/user-data"
import { Megaphone, Users } from "lucide-react"
import { SoundscapePlayer } from "@/components/soundscape-player"

interface AppHeaderProps {
  level: number
  xp: number
  maxXp: number
  snowEnabled: boolean
  onSnowToggle: () => void
  displayName?: string
}

export function AppHeader({ level, xp, maxXp, snowEnabled, onSnowToggle, displayName }: AppHeaderProps) {
  const xpPercentage = (xp / maxXp) * 100
  const { user, isGuest } = useAuth()
  const [announcement, setAnnouncement] = useState<string | null>(null)
  const [activeCount, setActiveCount] = useState(12)

  useEffect(() => {
    fetchAnnouncements().then(data => {
      if (data && data.length > 0) {
        setAnnouncement(data[0].content)
      }
    })

    const updateCount = () => {
        fetchActiveCount().then(c => setActiveCount(c))
    }
    updateCount()
    const interval = setInterval(updateCount, 30000) // Every 30s
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full">
      {announcement && (
        <div className="bg-accent/90 text-primary py-1 px-4 text-center text-sm font-bold flex items-center justify-center gap-2 animate-pulse">
          <Megaphone className="h-4 w-4" />
          <span>{announcement}</span>
        </div>
      )}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="animate-float">
                <Image src="/images/logo.png" alt="Holiday Study Buddy" width={40} height={40} className="rounded-full" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-accent app-title">Holiday Study Buddy</h1>
                <div className="flex items-center gap-3">
                    {user && (
                    <p className="text-xs text-cream/70">
                        {isGuest ? "Guest Mode" : `Welcome, ${displayName || user.name}`}
                    </p>
                    )}
                    <div className="flex items-center gap-1.5 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider flex items-center gap-1">
                            <Users className="h-3 w-3" /> {activeCount} Helpers Online
                        </span>
                    </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3 min-w-[200px]">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-bold text-accent">Level {level}</span>
                <span className="text-muted-foreground">|</span>
                <span className="text-muted-foreground">
                  {xp}/{maxXp} XP
                </span>
              </div>
              <Progress value={xpPercentage} className="h-2 flex-1 transition-all duration-500" />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:inline">Snow</span>
              <Switch checked={snowEnabled} onCheckedChange={onSnowToggle} />
            </div>

            <SoundscapePlayer />
          </div>
        </div>
      </header>
    </div>
  )
}
