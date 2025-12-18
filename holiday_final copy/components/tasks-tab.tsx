"use client"

import { useState, useEffect, useRef } from "react"
import JSConfetti from "js-confetti"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { GiftIcon, Trash2 } from "lucide-react"
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  type Task,
  fetchQuests,
  claimQuest,
  getQuests,
  type Quest,
  getUserStats,
} from "@/lib/user-data"

/* ============================================================
   PRIORITY SYSTEM
   ============================================================ */
type Priority = "high" | "medium" | "low"

type TaskWithPriority = Task & {
  priority: Priority
}

const PRIORITY_META: Record<
  Priority,
  { label: string; icon: string; className: string }
> = {
  high: { label: "High Priority", icon: "🔴", className: "text-red-500" },
  medium: { label: "Medium Priority", icon: "⭐", className: "text-yellow-500" },
  low: { label: "Low Priority", icon: "🔔", className: "text-gray-400" },
}

export function TasksTab({ onStatsUpdate }: { onStatsUpdate: () => void }) {
  const [tasks, setTasks] = useState<TaskWithPriority[]>([])
  const [quests, setQuests] = useState<Quest[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newPriority, setNewPriority] = useState<Priority>("medium")
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null)

  /* 🎊 JS-CONFETTI */
  const confettiRef = useRef<JSConfetti | null>(null)

  useEffect(() => {
    loadData()

    // init js-confetti once
    confettiRef.current = new JSConfetti()
  }, [])

  const loadData = async () => {
    const [fetchedTasks, fetchedQuests] = await Promise.all([
      fetchTasks(),
      fetchQuests()
    ])

    setTasks(
      fetchedTasks
        .filter((t) => !t.completed)
    )
    setQuests(fetchedQuests)
  }

  const fireConfetti = () => {
    confettiRef.current?.addConfetti({
      confettiColors: [
        "#22c55e", // green
        "#facc15", // gold
      ],
      confettiRadius: 5,
      confettiNumber: 150,
    })
  }

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return

    try {
      const created = await createTask(newTaskTitle, newPriority)
      if (created) {
        setTasks([...tasks, created])
        setNewTaskTitle("")
        setNewPriority("medium")
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to create task")
    }
  }

  const handleToggleTask = async (taskId: string) => {
    if (updatingTaskId === taskId) return // Prevent double clicks
    
    const task = tasks.find(t => t.id === taskId)
    if (!task) return

    setUpdatingTaskId(taskId)
    try {
      const newCompleted = !task.completed

      // Optimistic update
      setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: newCompleted } : t))

      await updateTask(taskId, { completed: newCompleted })

      if (newCompleted) {
        fireConfetti()
        // Play ding sound
        const audio = new Audio("/audio/ding.mp3")
        audio.volume = 0.5
        audio.play().catch(() => {})
        
        // Remove from UI after a small delay to let user see it check off
        setTimeout(() => {
          setTasks(prev => prev.filter(t => t.id !== taskId))
        }, 1000)

        // Refresh quests to check for completion
        const updatedQuests = await fetchQuests()
        setQuests(updatedQuests)
        onStatsUpdate()
      }
    } finally {
      setUpdatingTaskId(null)
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId))
    await deleteTask(taskId)
  }

  const handleClaimQuest = async (questId: string) => {
    const success = await claimQuest(questId)
    if (success) {
      fireConfetti()
      const updatedQuests = await fetchQuests()
      setQuests(updatedQuests)
      onStatsUpdate()
    }
  }

  const dailyQuests = quests.filter((q) => q.type.includes("daily"))
  const weeklyQuests = quests.filter((q) => q.type.includes("weekly"))

  const parchmentStyle = {
    backgroundImage: "url('/images/paper.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 relative">
      <div className="grid gap-8 md:grid-cols-2">

        {/* 🎅 THE NICE LIST */}
        <Card
          className="relative bg-transparent text-[#3b2f2f] font-handwritten overflow-hidden"
          style={parchmentStyle}
        >
          <CardHeader>
            <CardTitle className="text-2xl">🎅 The Nice List</CardTitle>
            <CardDescription className="text-green-700 font-semibold">
              What will you finish today?
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add a study task..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                className="font-handwritten bg-white border-2 task-input"
              />

              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as Priority)}
                className="rounded-md border px-2 text-sm bg-white"
              >
                <option value="high">🔴 High</option>
                <option value="medium">⭐ Medium</option>
                <option value="low">🔔 Low</option>
              </select>

              <Button
                onClick={handleAddTask}
                size="icon"
                className="bg-red-500 hover:bg-red-600"
              >
                <GiftIcon className="h-5 w-5" />
              </Button>
            </div>

            {tasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500 bg-white/50 rounded-lg">
                <p className="font-handwritten text-xl">No tasks yet!</p>
                <p className="text-sm">Add one above to get started.</p>
              </div>
            ) : (
              tasks.map((task) => {
                const meta = PRIORITY_META[task.priority]

                return (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/80"
                  >
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => handleToggleTask(task.id)}
                      disabled={updatingTaskId === task.id}
                    />
                    <span className={`flex-1 font-handwritten text-lg task-item-text ${task.completed ? "line-through text-gray-400" : ""}`}>
                      {task.title}
                    </span>
                    <span className={meta.className}>{meta.icon}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )
              })
            )}
          </CardContent>
        </Card>

        {/* 🎁 QUESTS */}
        <div className="space-y-4">
          {[{ title: "Daily Quests", data: dailyQuests }, { title: "Weekly Quests", data: weeklyQuests }].map(
            (section) => (
              <Card
                key={section.title}
                className="bg-transparent"
                style={parchmentStyle}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <GiftIcon className="h-5 w-5" />
                    {section.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  {section.data.map((quest) => (
                    <div
                      key={quest.id}
                      className="p-4 rounded-lg bg-white/80"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-green-700">
                            {quest.title}
                          </h4>
                          <p className="text-sm text-green-700/80">
                            {quest.description}
                          </p>
                        </div>
                        {quest.completed && !quest.claimed ? (
                          <Button size="sm" onClick={() => handleClaimQuest(quest.id)}>
                            Claim {quest.xpReward} XP
                          </Button>
                        ) : quest.claimed ? (
                          <span className="text-xs font-bold text-green-600">COMPLETED</span>
                        ) : (
                          <span className="text-xs font-bold text-gray-500">{quest.xpReward} XP</span>
                        )}
                      </div>
                      <Progress
                        value={(quest.progress / quest.target) * 100} className="h-2 quest-progress"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>
    </div>
  )
}
