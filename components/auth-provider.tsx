"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import type { User, AuthState } from "@/lib/auth"
import { getAuthState, saveAuthState, signOut as authSignOut } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isGuest: boolean
  isLoading: boolean
  setAuthState: (state: AuthState) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthStateInternal] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isGuest: false,
  })
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check auth state on mount
    const state = getAuthState()
    setAuthStateInternal(state)
    setIsLoading(false)
  }, [])

  const setAuthState = (state: AuthState) => {
    setAuthStateInternal(state)
    // Only save to localStorage if not a guest
    if (state.isGuest || state.isAuthenticated) {
      saveAuthState(state)
    }
  }

  const signOut = () => {
    authSignOut()
    setAuthStateInternal({
      user: null,
      isAuthenticated: false,
      isGuest: false,
    })
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        isAuthenticated: authState.isAuthenticated,
        isGuest: authState.isGuest,
        isLoading,
        setAuthState,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
