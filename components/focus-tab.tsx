"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, RotateCcw, Coffee, Maximize2 } from "lucide-react"
import { fetchTasks, type Task } from "@/lib/user-data"
import JSConfetti from "js-confetti"

interface TimerState {
    timeLeft: number
    isRunning: boolean
    isBreak: boolean
    selectedTask: string
    grinchActive: boolean
    completedPomodoros: number
}

interface TimerActions {
    setTimeLeft: (t: number) => void
    setIsRunning: (b: boolean) => void
    setIsBreak: (b: boolean) => void
    setSelectedTask: (id: string) => void
    setGrinchActive: (b: boolean) => void
    startSession: () => void
    handlePause: () => void
    handleReset: () => void
    handleEarlyExit: (reason?: string) => void
}

interface FocusTabProps {
    onStatsUpdate: () => void
    timerState: TimerState
    actions: TimerActions
}

export function FocusTab({ onStatsUpdate, timerState, actions }: FocusTabProps) {
  const { timeLeft, isRunning, isBreak, selectedTask, grinchActive, completedPomodoros } = timerState
  const { setIsRunning, setIsBreak, setSelectedTask, setGrinchActive, startSession, handlePause, handleReset, handleEarlyExit } = actions

  const [tasks, setTasks] = useState<Task[]>([])
  const [strictMode, setStrictMode] = useState(false) // Local UI state for "Big Timer" view
  const [mounted, setMounted] = useState(false)
  
  // Confetti ref (local usage if needed, though page.tsx has one too)
  const confettiRef = useRef<JSConfetti | null>(null)

  useEffect(() => {
    setMounted(true)
    confettiRef.current = new JSConfetti()
    fetchTasks().then(setTasks)
  }, [])

  // Fullscreen helper for "Strict Mode" button
  const toggleStrictMode = async () => {
      if (!strictMode) {
          try {
              await document.documentElement.requestFullscreen()
              setStrictMode(true)
          } catch (e) { console.error(e) }
      } else {
          if (document.fullscreenElement) {
              await document.exitFullscreen().catch(() => {})
          }
          setStrictMode(false)
      }
  }

  // Listen for fullscreen exits to close strict mode UI
  useEffect(() => {
      const handleData = () => {
          if (!document.fullscreenElement) setStrictMode(false)
      }
      document.addEventListener('fullscreenchange', handleData)
      return () => document.removeEventListener('fullscreenchange', handleData)
  }, [])

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60)
      .toString()
      .padStart(2, "0")}`

  const incompleteTasks = tasks.filter((t) => !t.completed)

  const strictModeOverlay = (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-white animate-in fade-in duration-300 w-screen h-screen">
      <div className="absolute top-8 right-8">
        <Button onClick={toggleStrictMode} variant="destructive" size="lg" className="font-bold border-2 border-white/20">
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
            <Button size="lg" onClick={startSession} className="min-w-[200px] h-20 text-2xl gap-4 bg-white text-black hover:bg-white/90">
              <Play className="h-8 w-8" /> Start Focus
            </Button>
          ) : (
            <Button size="lg" onClick={() => handleEarlyExit("You exited strict mode!")} className="min-w-[200px] h-20 text-2xl gap-4 bg-transparent border-2 border-white/20 hover:bg-white/10">
              {grinchActive ? "GIVE UP (Penalty)" : "Pause"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto space-y-8">
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
                    <Button size="lg" onClick={startSession} className="gap-2">
                      <Play className="h-5 w-5" /> Start
                    </Button>
                  ) : (
                    <Button size="lg" onClick={() => handleEarlyExit()} variant={grinchActive ? "destructive" : "secondary"} className="gap-2">
                      {grinchActive ? "Give Up (-50 XP)" : "Pause"}
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
                        actions.setTimeLeft(300)
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
                        actions.setTimeLeft(1500)
                      }}
                      variant="outline"
                    >
                      End Break
                    </Button>
                  )}
                  
                  {/* Strict Mode Button */}
                   {!strictMode && (
                    <Button size="lg" variant="ghost" onClick={toggleStrictMode} className="text-white/50 hover:text-white hover:bg-white/10">
                        <Maximize2 className="h-5 w-5" />
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                     <span className={`text-xs font-bold ${grinchActive ? "text-red-500" : "text-white/60"}`}>
                        GRINCH MODE: {grinchActive ? "ON 👹" : "OFF"}
                     </span>
                     <div 
                       onClick={() => !isRunning && setGrinchActive(!grinchActive)}
                       className={`w-12 h-6 rounded-full cursor-pointer transition-colors p-1 flex ${grinchActive ? 'bg-red-600 justify-end' : 'bg-gray-600 justify-start'}`}
                     >
                        <div className="w-4 h-4 bg-white rounded-full shadow-md" />
                     </div>
                </div>
              </div>

              {/* CENTERED TASK SELECT */}
              {!isBreak && (
                <div className="flex justify-center w-full">
                  <div className="w-full max-w-sm text-center relative">
                    {/* TASK LOCK OVERLAY */}
                    {isRunning && (
                         <div className="absolute inset-0 z-10 bg-black/50 backdrop-blur-[1px] flex items-center justify-center rounded-md cursor-not-allowed">
                             <div className="bg-red-900/90 text-white text-xs px-3 py-1 rounded-full flex items-center gap-2 shadow-lg border border-red-500/50">
                                <span className="animate-pulse">🔒</span> Task Locked
                             </div>
                         </div>
                    )}
                  
                    <Select value={selectedTask} onValueChange={setSelectedTask} disabled={isRunning}>
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
