"use client"

import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface GuestLockProps {
    isGuest?: boolean
    children: React.ReactNode
    message?: string
    className?: string
}

export function GuestLock({ isGuest, children, message = "Sign up to unlock this feature!", className = "" }: GuestLockProps) {
    const router = useRouter()

    if (!isGuest) {
        return <>{children}</>
    }

    return (
        <div className={`relative ${className}`}>
            <div className="filter blur-sm pointer-events-none select-none opacity-50">
                {children}
            </div>
            <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
                <div className="bg-black/80 backdrop-blur-md text-white p-6 rounded-2xl shadow-2xl flex flex-col items-center text-center space-y-4 max-w-sm border border-white/10 transform transition-all hover:scale-105">
                    <div className="bg-yellow-500/20 p-4 rounded-full">
                        <Lock className="h-8 w-8 text-yellow-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-yellow-100">Guest Restricted</h3>
                        <p className="text-sm text-gray-300 mt-1">{message}</p>
                    </div>
                    <Button
                        onClick={() => router.push("/login")}
                        className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-bold border-0"
                    >
                        Sign Up Now
                    </Button>
                </div>
            </div>
        </div>
    )
}
