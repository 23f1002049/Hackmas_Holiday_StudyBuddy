"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, RotateCcw, Coffee, Maximize2 } from "lucide-react"
import { getUserStats, saveUserStats, fetchTasks, getQuests, saveQuests, addXP, saveFocusSession } from "@/lib/user-data"
import type { Task } from "@/lib/user-data"
import JSConfetti from "js-confetti"

export function FocusTab({ onStatsUpdate }: { onStatsUpdate: () => void }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [selectedTask, setSelectedTask] = useState<string>("")
  const [tasks, setTasks] = useState<Task[]>([])
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  const [strictMode, setStrictMode] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Track elapsed time for partial saves
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const sessionStartTimeRef = useRef<number | null>(null)
  const elapsedSecondsRef = useRef<number>(0)

  useEffect(() => {
    fetchTasks().then(setTasks)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isRunning && timeLeft > 0) {
      if (!sessionStartTimeRef.current) {
        sessionStartTimeRef.current = Date.now()
      }

      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete()
            return 0
          }
          return prev - 1
        })

        if (!isBreak) {
          elapsedSecondsRef.current += 1
        }
      }, 1000)
    } else {
      sessionStartTimeRef.current = null
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft, isBreak])

  /* 🎊 JS-CONFETTI */
  const confettiRef = useRef<JSConfetti | null>(null)

  useEffect(() => {
    // init js-confetti
    confettiRef.current = new JSConfetti()
  }, [])

  const savePartialProgress = async () => {
    const seconds = elapsedSecondsRef.current
    if (seconds >= 60) {
      const minutes = Math.floor(seconds / 60)
      try {
        await saveFocusSession(minutes, selectedTask !== "none" ? selectedTask : undefined)
        onStatsUpdate()
        // Reset counter after saving
        elapsedSecondsRef.current = seconds % 60
      } catch (error) {
        console.error("Failed to save partial progress", error)
      }
    }
  }

  const handlePause = async () => {
    setIsRunning(false)
    if (!isBreak) {
      await savePartialProgress()
    }
  }

  const handleReset = async () => {
    if (!isBreak) {
      await savePartialProgress()
    }
    setIsRunning(false)
    setTimeLeft(isBreak ? 300 : 1500)
    elapsedSecondsRef.current = 0
  }

  const handleTimerComplete = async () => {
    setIsRunning(false)
    // Play tada sound
    const audio = new Audio("/audio/tada.mp3")
    audio.play().catch(() => { })

    if (!isBreak) {
      // Save session to backend
      try {
        // Calculate remaining minutes to save (if any accumulated or just save the full block if we rely on elapsed)
        // Ideally compelte session is 25 mins. 
        // We might have saved some partial chunks if paused. 
        // Simpler approach: Just save any pending elapsedSeconds + 1 (current sec)
        // OR: Since we increment elapsedSeconds every second, just save whatever is there.

        // However, standard Pomodoro expects full completion bonus maybe? 
        // For this simple app, let's just flush the remaining elapsedSeconds.

        await savePartialProgress() // Flush any pending minutes

        // Success! Fire confetti and refresh stats
        confettiRef.current?.addConfetti({
          emojis: ["🍅", "⏰", "✨", "🔥"],
          confettiNumber: 50,
        })

        setCompletedPomodoros((p) => p + 1)
        onStatsUpdate() // This will fetch fresh XP/Level from backend
        elapsedSecondsRef.current = 0
      } catch (error) {
        console.error("Failed to save session:", error)
      }
    }
  }

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60)
      .toString()
      .padStart(2, "0")}`

  const incompleteTasks = tasks.filter((t) => !t.completed)

  // ... (previous code)

  // ... (previous code)

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && strictMode) {
        setStrictMode(false)
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)

    if (strictMode) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen mode: ${err.message}`)
      })
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => console.error(err))
      }
    }

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [strictMode])

  const strictModeOverlay = (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-white animate-in fade-in duration-300 w-screen h-screen">
      <div className="absolute top-8 right-8">
        <Button onClick={() => setStrictMode(false)} variant="destructive" size="lg" className="font-bold border-2 border-white/20">
          Exit Strict Mode
        </Button>
      </div>

      <div className="text-center space-y-12">
        <div>
          <div className="text-[12rem] font-black tabular-nums tracking-tighter leading-none select-none">
            {formatTime(timeLeft)}
          </div>
          <div className="text-2xl font-medium text-white/50 uppercase tracking-[0.2em] mt-4">
            {isBreak ? "Break Time" : "Strict Focus"}
          </div>
        </div>

        <div className="flex justify-center gap-6">
          {!isRunning ? (
            <Button size="lg" onClick={() => setIsRunning(true)} className="min-w-[200px] h-20 text-2xl gap-4 bg-white text-black hover:bg-white/90">
              <Play className="h-8 w-8" /> Start
            </Button>
          ) : (
            <Button size="lg" onClick={handlePause} className="min-w-[200px] h-20 text-2xl gap-4 bg-transparent border-2 border-white/20 hover:bg-white/10">
              <Pause className="h-8 w-8" /> Pause
            </Button>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <audio ref={audioRef} src="/placeholder.svg?height=0&width=0" preload="auto" />

      {/* STRICT MODE OVERLAY - PORTAL */}
      {mounted && strictMode && createPortal(strictModeOverlay, document.body)}

      <Card className="rounded-2xl overflow-hidden bg-transparent shadow-none border-0">
        <CardContent className="p-0">
          {/* IMAGE-CONSTRAINED CONTAINER */}
          <div
            className="relative w-full aspect-[16/9] flex items-center justify-center rounded-3xl overflow-hidden"
            style={{
              backgroundImage: "url('/images/bg.jpeg')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            {/* CONTENT */}
            <div className="flex flex-col items-center space-y-8">
              {/* TIMER */}
              <div
                className={`w-80 h-80 rounded-full flex items-center justify-center
                bg-black/30 backdrop-blur-xl
                ring-2 ring-white/20
                shadow-[0_0_40px_rgba(0,0,0,0.35)]
                ${isRunning ? "animate-pulse-glow" : ""}`}
              >
                <div className="text-center">
                  <div className="text-6xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-sm text-white/90 mt-2 font-bold tracking-wide">
                    {isBreak ? "Break Time" : "Focus Time"}
                  </div>
                </div>
              </div>

              {/* CONTROLS */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-4">
                  {!isRunning ? (
                    <Button size="lg" onClick={() => setIsRunning(true)} className="gap-2">
                      <Play className="h-5 w-5" /> Start
                    </Button>
                  ) : (
                    <Button size="lg" onClick={handlePause} variant="secondary" className="gap-2">
                      <Pause className="h-5 w-5" /> Pause
                    </Button>
                  )}

                  <Button size="lg" onClick={handleReset} variant="outline" className="gap-2">
                    <RotateCcw className="h-5 w-5" /> Reset
                  </Button>

                  {!isBreak && timeLeft === 1500 && (
                    <Button
                      size="lg"
                      onClick={() => {
                        setIsBreak(true)
                        setTimeLeft(300)
                      }}
                      variant="outline"
                      className="gap-2"
                    >
                      <Coffee className="h-5 w-5" /> Take Break
                    </Button>
                  )}

                  {isBreak && (
                    <Button
                      size="lg"
                      onClick={() => {
                        setIsBreak(false)
                        setTimeLeft(1500)
                      }}
                      variant="outline"
                    >
                      End Break
                    </Button>
                  )}
                </div>

                <Button
                  onClick={() => setStrictMode(true)}
                  variant="ghost"
                  className="text-white/60 hover:text-white hover:bg-white/10 gap-2"
                >
                  <Maximize2 className="h-4 w-4" /> Enter Strict Mode
                </Button>
              </div>

              {/* CENTERED TASK SELECT */}
              {!isBreak && (
                <div className="flex justify-center w-full">
                  <div className="w-full max-w-sm text-center">
                    <Select value={selectedTask} onValueChange={setSelectedTask}>
                      <SelectTrigger className="justify-center text-center focus-empty-text">
                        <SelectValue placeholder="Select a task to focus on" />
                      </SelectTrigger>
                      <SelectContent>
                        {incompleteTasks.length === 0 ? (
                          <SelectItem value="none" disabled>
                            No tasks available
                          </SelectItem>
                        ) : (
                          incompleteTasks.map((t) => (
                            <SelectItem key={t.id} value={t.id}>
                              {t.title}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
