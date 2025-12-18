"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, Download, X, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import JSConfetti from "js-confetti"
import { toPng } from "html-to-image"
import { Snowfall } from "./snowfall"

export interface Badge {
  code: string
  name: string
  description: string
}

interface AchievementModalProps {
  badge: Badge | null
  userName?: string
  onClose: () => void
}

export function AchievementModal({ badge, userName = "Scholar", onClose }: AchievementModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const confettiRef = useRef<JSConfetti | null>(null)
  const badgeCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (badge) {
      setIsOpen(true)
      if (!confettiRef.current) {
        confettiRef.current = new JSConfetti()
      }
      confettiRef.current.addConfetti({
        confettiColors: ["#22c55e", "#facc15", "#ef4444", "#3b82f6"],
        confettiRadius: 6,
        confettiNumber: 200,
      })
    } else {
      setIsOpen(false)
    }
  }, [badge])

  const handleDownload = async () => {
    if (badgeCardRef.current) {
      const dataUrl = await toPng(badgeCardRef.current, { cacheBust: true })
      const link = document.createElement("a")
      link.download = `HackMas-Badge-${badge?.name.replace(/\s+/g, "-")}.png`
      link.href = dataUrl
      link.click()
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'New Achievement Unlocked!',
          text: `I just earned the ${badge?.name} badge on Holiday Study Buddy! 🎅`,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing', error)
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && badge && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-md relative"
          >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-yellow-400 p-4 rounded-full shadow-2xl z-20 border-4 border-white animate-bounce-slow">
              <Trophy className="h-10 w-10 text-yellow-900" />
            </div>

            {/* Top Right Close Button */}
            <button
              onClick={() => {
                setIsOpen(false)
                setTimeout(onClose, 300)
              }}
              className="absolute -top-3 -right-3 z-30 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg border-2 border-white transition-transform hover:scale-110"
              aria-label="Close"
            >
              <X className="h-6 w-6 font-bold" />
            </button>

            <Card ref={badgeCardRef} className="overflow-hidden border-4 border-yellow-400 shadow-[0_0_50px_-12px_rgba(250,204,21,0.5)]">
              <div className="absolute top-4 right-4 opacity-10 filter grayscale">
                <img src="/images/logo.png" alt="Logo" className="h-12 w-12" />
              </div>
              <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
                <Snowfall enabled={true} />
              </div>

              <CardHeader className="text-center pt-10 bg-gradient-to-b from-yellow-50 to-transparent">
                <div className="flex justify-center mb-2">
                  <img src="/images/logo.png" alt="HackMas Logo" className="h-8 w-8 object-contain" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent font-playfair">
                  New Achievement!
                </CardTitle>
                <div className="text-green-700 font-semibold tracking-wider text-xs">OFFICIAL SELECTION • HACKMAS 2025</div>
              </CardHeader>

              <CardContent className="text-center py-8">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-20 animate-pulse"></div>
                  <div className="text-8xl filter drop-shadow-lg scale-110 transition-transform hover:scale-125 duration-500 cursor-default">
                    {/* Map badge code to emoji or icon */}
                    {getBadgeIcon(badge.code)}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">{badge.name}</h3>
                <p className="text-gray-600 px-6 italic mb-4">"{badge.description}"</p>

                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100">
                  <span className="text-xs font-bold text-green-700">{userName}</span>
                </div>

                <div className="mt-8 pt-6 border-t border-dashed border-gray-200">
                  <p className="text-xs text-gray-400 uppercase tracking-tighter font-mono">Issued for Excellence • Holiday Study Buddy</p>
                </div>
              </CardContent>

              <CardFooter className="flex gap-2 p-6 bg-gray-50/50">
                <Button
                  onClick={handleDownload}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-2 font-bold"
                >
                  <Download className="h-4 w-4" />
                  Save Badge
                </Button>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="bg-blue-600 border-blue-700 hover:bg-blue-700 text-white font-bold"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function getBadgeIcon(code: string): string {
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
