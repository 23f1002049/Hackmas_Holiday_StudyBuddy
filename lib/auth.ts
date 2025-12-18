"use client"

export interface User {
  id: string
  email: string
  name: string
  isGuest: boolean
  isAdmin?: boolean
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isGuest: boolean
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5555/api"

// Get auth state from localStorage
export function getAuthState(): AuthState {
  if (typeof window === "undefined") {
    return { user: null, token: null, isAuthenticated: false, isGuest: false }
  }

  const stored = localStorage.getItem("authState")
  if (stored) {
    return JSON.parse(stored)
  }

  return { user: null, token: null, isAuthenticated: false, isGuest: false }
}

export function saveAuthState(state: AuthState) {
  if (typeof window !== "undefined") {
    localStorage.setItem("authState", JSON.stringify(state))
  }
}

export async function signUp(email: string, password: string, name: string): Promise<{ success: boolean; error?: string; user?: User; token?: string }> {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        username: name,
        auth_provider: "email",
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return { success: false, error: data.error || "Signup failed" }
    }

    // Auto login after signup
    return signIn(email, password)
  } catch (error) {
    return { success: false, error: "Network error" }
  }
}

export async function signIn(email: string, password: string): Promise<{ success: boolean; error?: string; user?: User; token?: string }> {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return { success: false, error: data.error || "Login failed" }
    }

    const user: User = {
      id: data.user.id.toString(),
      email: data.user.email,
      name: data.user.username || data.user.email.split("@")[0],
      isGuest: false,
      isAdmin: data.user.is_admin,
    }

    const authState: AuthState = {
      user,
      token: data.token,
      isAuthenticated: true,
      isGuest: false,
    }

    saveAuthState(authState)
    return { success: true, user, token: data.token }
  } catch (error) {
    return { success: false, error: "Network error" }
  }
}

export function signInAsGuest(): { success: boolean; user?: User; token?: string | null } {
  const guestUser: User = {
    id: "guest-" + Date.now(),
    email: "guest@example.com",
    name: "Guest User",
    isGuest: true,
  }

  const authState: AuthState = {
    user: guestUser,
    token: null,
    isAuthenticated: true,
    isGuest: true,
  }

  saveAuthState(authState)
  return { success: true, user: guestUser, token: null }
}

export function signOut() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authState")
    localStorage.removeItem("userStats")
    localStorage.removeItem("userSettings")
    localStorage.removeItem("tasks")
    localStorage.removeItem("quests")
    localStorage.removeItem("gifts")
  }
}
