"use client"

export interface Task {
  id: string
  title: string
  completed: boolean
  priority: "high" | "medium" | "low"
  createdAt: Date
  xpAwarded?: number
}

import { calculateNextLevelXP, getStreakMultiplier, getTaskBaseXP } from "./progression"

export interface Quest {
  id: string
  title: string
  description: string
  progress: number
  target: number
  completed: boolean
  claimed: boolean
  xpReward: number
  type: "daily" | "weekly"
}

export interface Gift {
  id: string
  title: string
  description: string
  unlocked: boolean
  xpCost: number
  reward: string
  rarity: "common" | "rare" | "epic" | "legendary"
}

export interface UserStats {
  level: number
  xp: number
  lifetimeXp: number
  totalFocusMinutes: number
  todayFocusMinutes: number
  weekFocusMinutes: number
  tasksCompleted: number
  currentStreak: number
  badges: string[]
  name: string
  avatar?: string
  id?: number
  is_blocked?: boolean
  weeklyFocus?: number[] // Array of daily minutes [Mon, Tue, ..., Sun]
  gifts?: string[]
}

export interface PublicStats {
  active_elves: number
  nice_list: { username: string; xp: number; avatar?: string }[]
  naughty_count: number
}

export interface UserSettings {
  name: string
  avatar: "santa" | "elf" | "reindeer" | "snowman"
  theme: "festive" | "dark" | "calm"
  snowEnabled: boolean
  soundEnabled: boolean
  pomodoroMinutes?: number
}

import { getAuthState } from "./auth"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5555/api"

// Get user data from localStorage (Sync - for initial render)
export function getUserStats(): UserStats {
  if (typeof window === "undefined") {
    return getDefaultUserStats()
  }
  const stored = localStorage.getItem("userStats")
  return stored ? JSON.parse(stored) : getDefaultUserStats()
}

// Fetch user data from API (Async)
export async function fetchUserStats(): Promise<UserStats> {
  const { user, isGuest } = getAuthState()

  if (isGuest || !user) {
    return getUserStats()
  }

  try {
    const { token } = getAuthState()
    const headers: any = {}
    if (token) headers["Authorization"] = `Bearer ${token}`

    const response = await fetch(`${API_URL}/users/${user.id}`, { headers })
    if (response.ok) {
      const data = await response.json()
      const stats: UserStats = {
        level: data.level,
        xp: data.xp,
        lifetimeXp: data.lifetime_xp || data.xp,
        totalFocusMinutes: data.total_focus_minutes,
        todayFocusMinutes: data.today_focus_minutes || 0,
        weekFocusMinutes: data.week_focus_minutes || 0,
        tasksCompleted: data.tasks_completed_count || 0,
        currentStreak: data.current_streak,
        badges: data.badges || [],
        name: data.username || getUserSettings().name,
        id: data.id,
        is_blocked: data.is_blocked,
        weeklyFocus: data.weekly_focus || [0, 0, 0, 0, 0, 0, 0],
        gifts: data.gifts || []
      }

      // Sync settings from backend to local storage
      if (typeof window !== "undefined") {
        const currentSettings = getUserSettings()
        const newSettings = {
          ...currentSettings,
          avatar: data.avatar || currentSettings.avatar,
          theme: data.theme || currentSettings.theme,
        }
        // Only update if changed to avoid loops or unnecessary writes
        if (JSON.stringify(currentSettings) !== JSON.stringify(newSettings)) {
          localStorage.setItem("userSettings", JSON.stringify(newSettings))
        }

        // Sync more user settings from data
        const advancedSettings = {
          ...newSettings,
          snowEnabled: data.snow_enabled !== undefined ? data.snow_enabled : newSettings.snowEnabled,
          soundEnabled: data.sound_enabled !== undefined ? data.sound_enabled : newSettings.soundEnabled,
          name: data.username || newSettings.name,
        }
        localStorage.setItem("userSettings", JSON.stringify(advancedSettings))

        localStorage.setItem("userStats", JSON.stringify(stats))
      }
      return stats
    }
  } catch (error) {
    console.error("Failed to fetch user stats", error)
  }
  return getDefaultUserStats()
}

export async function fetchPublicStats(): Promise<PublicStats | null> {
  try {
    const response = await fetch(`${API_URL}/public/stats`)
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error("Failed to fetch public stats", error)
  }
  return null
}

export async function saveUserStats(stats: UserStats) {
  // Always save to local storage first for immediate UI update
  if (typeof window !== "undefined") {
    const { isGuest } = getAuthState()

    if (isGuest) {
      // Handle Level Up logic based on quadratic formula
      let leveledUp = false;
      while (true) {
        const xpNeeded = calculateNextLevelXP(stats.level);
        if (stats.xp >= xpNeeded) {
          stats.xp -= xpNeeded;
          stats.level += 1;
          leveledUp = true;
        } else {
          break;
        }
      }
    }

    localStorage.setItem("userStats", JSON.stringify(stats))
  }

  const { user, isGuest } = getAuthState()
  if (isGuest || !user) return

  try {
    await fetch(`${API_URL}/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthState().token}`
      },
      body: JSON.stringify({
        xp: stats.xp,
        level: stats.level,
        current_streak: stats.currentStreak,
        total_focus_minutes: stats.totalFocusMinutes,
      }),
    })
  } catch (error) {
    console.error("Failed to save user stats", error)
  }
}

export async function resetUserData(): Promise<boolean> {
  const { user, isGuest } = getAuthState()

  if (isGuest || !user) {
    if (typeof window !== "undefined") {
      localStorage.clear()
      return true
    }
    return false
  }

  try {
    const response = await fetch(`${API_URL}/users/${user.id}/reset`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${getAuthState().token}`
      }
    })

    if (response.ok) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("userStats")
        localStorage.removeItem("tasks")
        localStorage.removeItem("quests")
        localStorage.removeItem("gifts")
      }
      return true
    }
  } catch (error) {
    console.error("Failed to reset user data", error)
  }
  return false
}

export function getUserSettings(): UserSettings {
  if (typeof window === "undefined") {
    return getDefaultUserSettings()
  }
  const stored = localStorage.getItem("userSettings")
  return stored ? JSON.parse(stored) : getDefaultUserSettings()
}

export async function startFocusSession(taskId?: string) {
  try {
    const { token, isGuest } = getAuthState()
    if (isGuest || !token) return null

    const response = await fetch(`${API_URL}/focus-session/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ task_id: taskId })
    })

    if (response.ok) {
        return await response.json()
    } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to start focus session")
    }
  } catch (error) {
    console.error("Failed to start session:", error)
    throw error
  }
}

export async function endFocusSession(sessionId: string, durationMinutes: number) {
  try {
    const { token } = getAuthState()
    if (!token) return null

    const response = await fetch(`${API_URL}/focus-session/end`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ session_id: sessionId, duration: durationMinutes })
    })

    if (response.ok) {
        return await response.json()
    }
  } catch (error) {
    console.error("Failed to end session:", error)
  }
  return null
}

export async function applyGrinchPenalty(penaltyAmount: number) {
  console.log("👹 Applying Grinch Penalty:", penaltyAmount)
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    
    // GUEST MODE FALLBACK
    if (!token) {
        console.log("👹 Guest Mode: Deducting locally")
        const stats = getUserStats()
        stats.xp = Math.max(0, stats.xp - penaltyAmount)
        saveUserStats(stats)
        return { success: true, message: "Guest Penalty Applied" }
    }

    // AUTH MODE
    console.log("👹 Auth Mode: Calling API")
    const response = await fetch(`${API_URL}/penalty`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ xp_penalty: penaltyAmount })
    })

    const data = await response.json()
    console.log("👹 API Response:", data)
    return data
  } catch (error) {
    console.error("Failed to apply penalty", error)
  }
  return null
}

export async function saveUserSettings(settings: UserSettings): Promise<{ success: boolean, error?: string }> {
  if (typeof window !== "undefined") {
    localStorage.setItem("userSettings", JSON.stringify(settings))
  }

  const { user, isGuest } = getAuthState()
  if (isGuest || !user) return { success: true }

  try {
    const auth = getAuthState()
    const response = await fetch(`${API_URL}/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth.token}`
      },
      body: JSON.stringify({
        avatar: settings.avatar,
        theme: settings.theme,
        snow_enabled: settings.snowEnabled,
        sound_enabled: settings.soundEnabled
      }),
    })
    
    if (response.ok) {
        return { success: true }
    } else {
        const data = await response.json()
        return { success: false, error: data.error || "Failed to save settings" }
    }
  } catch (error) {
    console.error("Failed to save user settings", error)
    return { success: false, error: "Network error" }
  }
}

// Removed duplicate saveFocusSession
// The new version with backend integration is already defined above in creating task logic?
// Wait, no. The new start/end functions replace it.
// But some old code might still call saveFocusSession.
// We should keep ONE implementation. The one at line 545 deals with Guest mode too.
// The one at 368 was just a stub.

// Let's remove the stub at 368.

export async function fetchTasks(): Promise<Task[]> {
  const { user, isGuest } = getAuthState()
  if (isGuest || !user) return getTasks()

  try {
    const { token } = getAuthState()
    const headers: any = {}
    if (token) headers["Authorization"] = `Bearer ${token}`

    const response = await fetch(`${API_URL}/users/${user.id}/tasks`, { headers })
    if (response.ok) {
      const data = await response.json()
      return data.map((t: any) => ({
        id: t.id.toString(),
        title: t.title,
        completed: t.is_completed,
        priority: t.priority as any,
        createdAt: new Date(t.created_at)
      }))
    }
  } catch (error) {
    console.error("Failed to fetch tasks", error)
  }
  return []
}

export async function createTask(title: string, priority: "high" | "medium" | "low" = "medium"): Promise<Task | null> {
  const { user, isGuest, token } = getAuthState()

  if (isGuest || !user) {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      priority,
      createdAt: new Date()
    }
    const tasks = getTasks()
    saveTasks([...tasks, newTask])
    return newTask
  }

  if (!token) {
    console.error("createTask: User is logged in but token is missing from AuthState!")
    // Temporarily return null or throw to avoid 401
    return null
  }

  try {
    const headers: any = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }

    // Debug log to confirm token is being used
    console.log("createTask: Sending request with token:", token.substring(0, 10) + "...")

    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers,
      body: JSON.stringify({ user_id: user.id, title, priority })
    })

    if (response.ok) {
      const t = await response.json()
      return {
        id: t.id.toString(),
        title: t.title,
        completed: t.is_completed,
        priority: t.priority as any,
        createdAt: new Date(t.created_at)
      }
    } else {
      const data = await response.json()
      if (response.status === 401 || data.error === "User not found") {
        import("./auth").then(m => m.signOut())
      }
      throw new Error(data.error || "Failed to create task")
    }
  } catch (error: any) {
    console.error("Failed to create task", error)
    throw error
  }
}

export async function updateTask(taskId: string, updates: Partial<Task>) {
  const { user, isGuest } = getAuthState()

  if (isGuest || !user) {
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
      const task = tasks[taskIndex];
      const wasCompleted = task.completed;
      const nowCompleted = updates.completed ?? wasCompleted;

      tasks[taskIndex] = { ...task, ...updates };
      saveTasks(tasks);

      // Award/Deduct XP for guests
      if (!wasCompleted && nowCompleted) {
        const stats = getUserStats();
        const baseXp = getTaskBaseXP(task.priority);
        const multiplier = getStreakMultiplier(stats.currentStreak);
        const xpGain = Math.round(baseXp * multiplier);

        // Store xp_awarded in the local task object to handle deduction later
        tasks[taskIndex].xpAwarded = xpGain;
        saveTasks(tasks);

        stats.xp += xpGain;
        stats.tasksCompleted += 1;
        saveUserStats(stats);
      } else if (wasCompleted && !nowCompleted) {
        const stats = getUserStats();
        const xpLoss = task.xpAwarded || 0;
        stats.xp = Math.max(0, stats.xp - xpLoss);
        stats.tasksCompleted = Math.max(0, stats.tasksCompleted - 1);
        saveUserStats(stats);
      }
    }
    return
  }

  try {
    const body: any = {}
    if (updates.title !== undefined) body.title = updates.title
    if (updates.completed !== undefined) body.is_completed = updates.completed
    if (updates.priority !== undefined) body.priority = updates.priority

    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthState().token}`
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update task")
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to update task", error)
    throw error // Re-throw for frontend handling
  }
}

export async function deleteTask(taskId: string) {
  const { user, isGuest } = getAuthState()

  if (isGuest || !user) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === taskId);
    if (task && task.completed) {
      const stats = getUserStats();
      stats.xp = Math.max(0, stats.xp - (task.xpAwarded || 0));
      saveUserStats(stats);
    }
    const filteredTasks = tasks.filter(t => t.id !== taskId);
    saveTasks(filteredTasks);
    return;
  }

  try {
    await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${getAuthState().token}`
      }
    })
  } catch (error) {
    console.error("Failed to delete task", error)
  }
}

export async function saveFocusSession(durationMinutes: number, taskId?: string) {
  // Keeping this for backward compatibility or Guest Mode
  const { user, isGuest } = getAuthState()
  
  if (isGuest || !user) {
    const stats = getUserStats();
    const multiplier = getStreakMultiplier(stats.currentStreak);
    const xpGain = Math.round(durationMinutes * multiplier);

    stats.xp += xpGain;
    stats.totalFocusMinutes += durationMinutes;
    stats.todayFocusMinutes = (stats.todayFocusMinutes || 0) + durationMinutes;
    stats.weekFocusMinutes = (stats.weekFocusMinutes || 0) + durationMinutes;
    saveUserStats(stats);
    return;
  }

  // If Auth user calls this (old path), wrap to new path?
  // Or just keep the old endpoint for safety until refactor complete?
  // The backend still accepts /focus_sessions (singular) if we didn't delete it.
  // Wait, I replaced create_focus_session in routes.py with the NEW endpoints.
  // So the old endpoint is GONE.
  // We must adapt this function to use start/end internally or warn.
  
  console.error("saveFocusSession is deprecated and backend endpoint removed. Use startFocusSession flow.")
  return;
}

// Legacy local storage helpers (kept for guest mode)
export function getTasks(): Task[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem("tasks")
  return stored ? JSON.parse(stored) : []
}

export function saveTasks(tasks: Task[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }
}

export function getQuests(): Quest[] {
  if (typeof window === "undefined") return getDefaultQuests()
  const stored = localStorage.getItem("quests")
  return stored ? JSON.parse(stored) : getDefaultQuests()
}

export function saveQuests(quests: Quest[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("quests", JSON.stringify(quests))
  }
}

export function getGifts(): Gift[] {
  if (typeof window === "undefined") return getDefaultGifts()
  const stored = localStorage.getItem("gifts")
  return stored ? JSON.parse(stored) : getDefaultGifts()
}

export function saveGifts(gifts: Gift[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("gifts", JSON.stringify(gifts))
  }
}

export async function fetchGifts(): Promise<Gift[]> {
  try {
    const response = await fetch(`${API_URL}/gifts`)
    if (response.ok) {
        const data = await response.json()
        return data.map((g: any) => ({
            id: g.id.toString(),
            title: g.name,
            description: g.description,
            unlocked: false,
            xpCost: g.xp_required,
            reward: g.code, // Use code as reward key
            rarity: g.rarity
        }))
    }
  } catch (error) {
    console.error("Failed to fetch gifts", error)
  }
  return []
}

function getDefaultUserStats(): UserStats {
  return {
    level: 1,
    xp: 0,
    lifetimeXp: 0,
    totalFocusMinutes: 0,
    todayFocusMinutes: 0,
    weekFocusMinutes: 0,
    tasksCompleted: 0,
    currentStreak: 0,
    badges: [],
    name: "Holiday Helper"
  }
}

function getDefaultUserSettings(): UserSettings {
  return {
    name: "Holiday Helper",
    avatar: "santa",
    theme: "festive",
    snowEnabled: true,
    soundEnabled: true,
  }
}

function getDefaultQuests(): Quest[] {
  return [
    {
      id: "1",
      title: "First Focus Session",
      description: "Complete 1 Pomodoro session",
      progress: 0,
      target: 1,
      completed: false,
      claimed: false,
      xpReward: 50,
      type: "daily",
    },
    {
      id: "2",
      title: "Task Master",
      description: "Complete 3 tasks",
      progress: 0,
      target: 3,
      completed: false,
      claimed: false,
      xpReward: 75,
      type: "daily",
    },
    {
      id: "3",
      title: "Dedicated Student",
      description: "Focus for 60 minutes total",
      progress: 0,
      target: 60,
      completed: false,
      claimed: false,
      xpReward: 100,
      type: "daily",
    },
    {
      id: "4",
      title: "Weekly Warrior",
      description: "Complete 10 Pomodoro sessions this week",
      progress: 0,
      target: 10,
      completed: false,
      claimed: false,
      xpReward: 200,
      type: "weekly",
    },
  ]
}

function getDefaultGifts(): Gift[] {
  return [
    {
      id: "hot_cocoa",
      title: "Hot Cocoa",
      description: "A warm cup of cocoa",
      unlocked: false,
      xpCost: 200,
      reward: "Hot Cocoa Badge",
      rarity: "common",
    },
    {
      id: "gingerbread",
      title: "Gingerbread Man",
      description: "A tasty treat",
      unlocked: false,
      xpCost: 500,
      reward: "Gingerbread Badge",
      rarity: "rare",
    },
    {
      id: "snow_globe",
      title: "Snow Globe",
      description: "Shake it!",
      unlocked: false,
      xpCost: 2000,
      reward: "Snow Globe Badge",
      rarity: "epic",
    },
    {
      id: "golden_bell",
      title: "Golden Bell",
      description: "Rings with joy",
      unlocked: false,
      xpCost: 5000,
      reward: "Golden Bell Badge",
      rarity: "legendary"
    },
  ]
}

export async function fetchUserGifts(): Promise<Gift[]> {
  const { user, isGuest } = getAuthState()

  if (isGuest || !user) {
    return getGifts()
  }

  try {
    // First get all available gifts
    const allGiftsResponse = await fetch(`${API_URL}/gifts`)
    const rawGifts = await allGiftsResponse.json()

    // Map backend fields to frontend interface
    const allGifts: Gift[] = Array.isArray(rawGifts) ? rawGifts.map((g: any) => ({
      id: g.id,
      title: g.name, // Backend uses 'name', frontend uses 'title'
      description: g.description,
      xpCost: g.xp_required, // Map xp_required to xpCost
      reward: g.name + " Badge", // Construct reward string if missing
      rarity: g.rarity || "common",
      unlocked: false
    })) : []

    // Then get unlocked gifts
    const { token } = getAuthState()
    const headers: any = {}
    if (token) headers["Authorization"] = `Bearer ${token}`

    const unlockedResponse = await fetch(`${API_URL}/users/${user.id}/gifts`, { headers })
    const unlockedGifts = await unlockedResponse.json()

    if (unlockedResponse.status === 401 || (unlockedGifts && unlockedGifts.error === "User not found")) {
      import("./auth").then(m => m.signOut())
      return allGifts
    }

    const unlockedIds = new Set(Array.isArray(unlockedGifts) ? unlockedGifts.map((g: any) => g.id) : [])

    // Merge status
    return allGifts.map(gift => ({
      ...gift,
      unlocked: unlockedIds.has(gift.id)
    }))
  } catch (error) {
    console.error("Failed to fetch user gifts", error)
    return getGifts()
  }
}

export async function unlockGift(giftId: string): Promise<{ success: boolean; error?: string }> {
  const { user, isGuest } = getAuthState()

  if (isGuest || !user) {
    // Local storage fallback for guest
    const gifts = getGifts()
    const gift = gifts.find(g => g.id === giftId)
    const stats = getUserStats()

    if (gift && !gift.unlocked && stats.xp >= gift.xpCost) {
      gift.unlocked = true
      stats.xp -= gift.xpCost
      saveGifts(gifts)
      saveUserStats(stats)
      return { success: true }
    }
    return { success: false, error: "Cannot unlock gift" }
  }

  try {
    const { token } = getAuthState()
    const headers: any = { "Content-Type": "application/json" }
    if (token) headers["Authorization"] = `Bearer ${token}`

    const response = await fetch(`${API_URL}/users/${user.id}/gifts`, {
      method: "POST",
      headers,
      body: JSON.stringify({ gift_id: giftId }),
    })

    if (response.ok) {
      return { success: true }
    } else {
      const data = await response.json()
      return { success: false, error: data.error }
    }
  } catch (error) {
    return { success: false, error: "Network error" }
  }
}

export async function fetchQuests(): Promise<Quest[]> {
  const { user, isGuest } = getAuthState()
  if (isGuest || !user) return getQuests()

  try {
    const { token } = getAuthState()
    const headers: any = {}
    if (token) headers["Authorization"] = `Bearer ${token}`

    const response = await fetch(`${API_URL}/users/${user.id}/quests`, { headers })
    if (response.ok) {
      const data = await response.json()
      return data.map((q: any) => ({
        id: q.id.toString(),
        title: q.title,
        description: q.description,
        progress: q.progress,
        target: q.target,
        completed: q.completed,
        claimed: q.claimed,
        xpReward: q.xp_reward,
        type: q.type.includes("weekly") ? "weekly" : "daily"
      }))
    }
  } catch (error) {
    console.error("Failed to fetch quests", error)
  }
  return []
}

export async function claimQuest(questId: string): Promise<boolean> {
  const { user, isGuest } = getAuthState()
  if (isGuest || !user) {
    // Guest logic (simplified)
    const quests = getQuests()
    const q = quests.find(q => q.id === questId)
    if (q && q.completed && !q.claimed) {
      q.claimed = true;
      saveQuests(quests);

      const stats = getUserStats();
      stats.xp += q.xpReward;
      saveUserStats(stats);
      return true
    }
    return false
  }

  try {
    const response = await fetch(`${API_URL}/users/${user.id}/quests/${questId}/claim`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${getAuthState().token}`
      }
    })
    return response.ok
  } catch (error) {
    console.error("Failed to claim quest", error)
    return false
  }
}

export async function fetchAllBadges(): Promise<Badge[]> {
  try {
    const response = await fetch(`${API_URL}/badges`)
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error("Failed to fetch badges", error)
  }
  return []
}

export async function getBadgeDetails(code: string): Promise<Badge | null> {
  const all = await fetchAllBadges()
  return all.find(b => b.code === code) || null
}

export interface Badge {
  id: number
  code: string
  name: string
  description: string
}

// Deprecated: XP is now handled by backend actions
export async function addXP(amount: number) {
  // No-op for backend users, as XP is added server-side
  const { isGuest } = getAuthState()
  if (isGuest) {
    const stats = getUserStats()
    stats.xp += amount
    saveUserStats(stats)
  }
  return await fetchUserStats()
}

export async function fetchFocusHistory(): Promise<{ day: string; minutes: number }[]> {
  const { user, isGuest } = getAuthState()
  if (isGuest || !user) return []

  try {
    const response = await fetch(`${API_URL}/users/${user.id}/focus_history`, {
      headers: {
        "Authorization": `Bearer ${getAuthState().token}`
      }
    })
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error("Failed to fetch focus history", error)
  }
  return []
}

export async function fetchLeaderboard(): Promise<UserStats[]> {
  try {
    const response = await fetch(`${API_URL}/leaderboard`)
    if (response.ok) {
      const data = await response.json()
      return data.map((u: any) => ({
        level: u.level,
        xp: u.xp,
        totalFocusMinutes: u.total_focus_minutes,
        todayFocusMinutes: u.today_focus_minutes || 0,
        weekFocusMinutes: u.week_focus_minutes || 0,
        tasksCompleted: u.tasks_completed_count || 0,
        currentStreak: u.current_streak,
        badges: u.badges || [],
        name: u.username || "Holiday Helper",
        avatar: u.avatar
      }))
    }
  } catch (error) {
    console.error("Failed to fetch leaderboard", error)
  }
  return []
}

export async function fetchAllUsers(): Promise<UserStats[]> {
  const { isGuest } = getAuthState()
  if (isGuest) return []

  try {
    const response = await fetch(`${API_URL}/users`, {
      headers: {
        "Authorization": `Bearer ${getAuthState().token}`
      }
    })
    if (response.ok) {
      const data = await response.json()
      return data.map((u: any) => ({
        level: u.level,
        xp: u.xp,
        totalFocusMinutes: u.total_focus_minutes,
        todayFocusMinutes: u.today_focus_minutes || 0,
        weekFocusMinutes: u.week_focus_minutes || 0,
        tasksCompleted: u.tasks_completed_count || 0,
        currentStreak: u.current_streak,
        badges: u.badges || [],
        name: u.username || u.email,
        avatar: u.avatar,
        is_blocked: u.is_blocked,
        id: u.id
      }))
    }
  } catch (error) {
    console.error("Failed to fetch all users", error)
  }
  return []
}

export async function blockUser(userId: number, block: boolean): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/${block ? 'block' : 'unblock'}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${getAuthState().token}`
      }
    })
    return response.ok
  } catch (error) {
    console.error("Failed to toggle block status", error)
    return false
  }
}

export async function fetchFocusSessions(): Promise<any[]> {
  const { user, isGuest } = getAuthState()
  if (isGuest || !user) return []

  try {
    const response = await fetch(`${API_URL}/users/${user.id}/focus_sessions`, {
      headers: {
        "Authorization": `Bearer ${getAuthState().token}`
      }
    })
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error("Failed to fetch focus sessions", error)
  }
  return []
}

export async function createGift(giftData: any): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/gifts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthState().token}`
      },
      body: JSON.stringify(giftData)
    })
    return response.ok
  } catch (error) {
    console.error("Failed to create gift", error)
    return false
  }
}

export async function fetchAnnouncements(): Promise<any[]> {
  try {
    const response = await fetch(`${API_URL}/announcements`)
    if (response.ok) return await response.json()
  } catch (error) {
    console.error("Failed to fetch announcements", error)
  }
  return []
}

export async function createAnnouncement(content: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/announcements`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthState().token}`
      },
      body: JSON.stringify({ content })
    })
    return response.ok
  } catch (error) {
    console.error("Failed to create announcement", error)
    return false
  }
}

export async function rewardUser(userId: number, rewardData: any): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/reward`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthState().token}`
      },
      body: JSON.stringify(rewardData)
    })
    return response.ok
  } catch (error) {
    console.error("Failed to reward user", error)
    return false
  }
}

export async function clearAnnouncements(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/announcements/clear`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${getAuthState().token}`
      }
    })
    return response.ok
  } catch (error) {
    console.error("Failed to clear announcements", error)
    return false
  }
}

export async function deleteUser(userId: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${getAuthState().token}`
      }
    })
    return response.ok
  } catch (error) {
    console.error("Failed to delete user", error)
    return false
  }
}

export async function deleteGift(giftId: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/gifts/${giftId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${getAuthState().token}`
      }
    })
    return response.ok
  } catch (error) {
    console.error("Failed to delete gift", error)
    return false
  }
}

export async function createBadge(badgeData: any): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/badges`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthState().token}`
      },
      body: JSON.stringify(badgeData)
    })
    return response.ok
  } catch (error) {
    console.error("Failed to create badge", error)
    return false
  }
}

export async function fetchActiveCount(): Promise<number> {
  try {
    const response = await fetch(`${API_URL}/active-count`)
    if (response.ok) {
      const data = await response.json()
      return data.count
    }
  } catch (error) {
    console.error("Failed to fetch active count", error)
  }
  return 12 // Fallback
}
