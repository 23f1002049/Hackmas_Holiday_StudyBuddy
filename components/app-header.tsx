import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useState, useEffect } from "react"
import { fetchAnnouncements } from "@/lib/user-data"
import { Megaphone } from "lucide-react"
import { SoundscapePlayer } from "@/components/soundscape-player"
import { ElfSurveillanceWidget } from "@/components/elf-surveillance"

interface AppHeaderProps {
  level: number
  xp: number
  maxXp: number
  snowEnabled: boolean
  onSnowToggle: () => void
  displayName?: string
  isGuest?: boolean
}

export function AppHeader({ level, xp, maxXp, snowEnabled, onSnowToggle, displayName, isGuest: propIsGuest }: AppHeaderProps) {
  const xpPercentage = (xp / maxXp) * 100
  const { user, isGuest: contextIsGuest } = useAuth()
  const isGuest = propIsGuest || contextIsGuest
  const router = useRouter()
  const [announcement, setAnnouncement] = useState<string | null>(null)

  useEffect(() => {
    fetchAnnouncements().then(data => {
      if (data && data.length > 0) {
        setAnnouncement(data[0].content)
      }
    })
  }, [])

  return (
    <div className="w-full">
      {announcement && (
        <div className="bg-accent/90 text-primary py-1 px-4 text-center text-sm font-bold flex items-center justify-center gap-2 animate-pulse">
          <Megaphone className="h-4 w-4" />
          <span>{announcement}</span>
        </div>
      )}
      <header className={`sticky top-0 z-40 w-full border-b border-border backdrop-blur transition-colors duration-300
        dark:bg-[#D4AF37]/95 dark:text-black dark:border-[#B8860B]
        calm:bg-[#2E8B57]/95 calm:text-white calm:border-[#3CB371]
        bg-black/95 text-white shadow-md`}>
        <div className="container flex h-24 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="animate-float">
                <Image src="/images/logo.png" alt="Holiday Study Buddy" width={48} height={48} className="rounded-full ring-2 ring-white/20" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-accent app-title font-ice-cream tracking-wide drop-shadow-sm">Holiday Study Buddy</h1>
                <div className="flex items-start md:items-center gap-3 mt-1 flex-col md:flex-row">
                  {user && (
                    <p className="text-lg text-cream/90 mr-2 font-medium">
                      {isGuest ? "Guest Mode" : `Welcome, ${displayName || user.name}`}
                    </p>
                  )}
                  <ElfSurveillanceWidget />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3 min-w-[200px]">
              {isGuest && xp >= 100 ? (
                <Button
                  onClick={() => router.push("/login")}
                  variant="ghost"
                  className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 animate-pulse font-bold"
                >
                  Sign up to unlock Level 2 🔒
                </Button>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-xl font-bold">
                    <span className="text-accent">Level {level}</span>
                    <span className="text-muted-foreground opacity-50">|</span>
                    <span className="text-base text-muted-foreground">
                      {xp}/{maxXp} XP
                    </span>
                  </div>
                  <Progress value={xpPercentage} className="h-2 flex-1 transition-all duration-500" />
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-lg font-medium text-muted-foreground hidden sm:inline">Snow</span>
              <Switch checked={snowEnabled} onCheckedChange={onSnowToggle} className="scale-125" />
            </div>

            <SoundscapePlayer />
          </div>
        </div>
      </header>
    </div>
  )
}
