"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Gift, Lock, Sparkles } from "lucide-react"
import {
  getGifts,
  saveGifts,
  getUserStats,
  saveUserStats,
  fetchUserStats,
  fetchUserGifts,
  unlockGift,
  type Gift as GiftType,
} from "@/lib/user-data"

export function GiftsTab({
  onStatsUpdate,
}: {
  onStatsUpdate: () => void
}) {
  const [gifts, setGifts] = useState<GiftType[]>([])
  const [userStats, setUserStats] = useState(getUserStats())
  const [selectedGift, setSelectedGift] = useState<GiftType | null>(null)
  const [isUnwrapping, setIsUnwrapping] = useState(false)
  const [showReward, setShowReward] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const [fetchedGifts, fetchedStats] = await Promise.all([
      fetchUserGifts(),
      fetchUserStats()
    ])
    setGifts(fetchedGifts)
    setUserStats(fetchedStats)
  }

  const handleGiftClick = (gift: GiftType) => {
    if (gift.unlocked || userStats.xp >= gift.xpCost) {
      setSelectedGift(gift)
    }
  }

  const handleUnlock = async () => {
    if (!selectedGift || userStats.xp < selectedGift.xpCost) return

    setIsUnwrapping(true)

    const result = await unlockGift(selectedGift.id)

    if (result.success) {
      setTimeout(async () => {
        await loadData() // Refresh data from backend
        
        setIsUnwrapping(false)
        setShowReward(true)
        onStatsUpdate()
      }, 1500)
    } else {
      setIsUnwrapping(false)
      toast.error(result.error || "Failed to unlock gift")
      console.error(result.error)
    }
  }

  const handleClose = () => {
    setSelectedGift(null)
    setShowReward(false)
    setIsUnwrapping(false)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-bold text-green-700">🎄 Gift Shop</h2>
        <p className="text-muted-foreground">
          Spend your XP to unlock festive rewards
        </p>
        <div className="inline-flex items-center gap-2 bg-green-100 px-5 py-2 rounded-full">
          <Sparkles className="h-5 w-5 text-green-700" />
          <span className="font-bold text-lg text-green-800">
            {userStats.xp} XP Available
          </span>
        </div>
      </div>

      {/* Gift Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {gifts.map((gift) => {
          const isUnlocked = gift.unlocked
          const canAfford = userStats.xp >= gift.xpCost

          return (
            <Card
              key={gift.id}
              onClick={() => handleGiftClick(gift)}
              className="relative cursor-pointer rounded-2xl p-[8px] transition-transform duration-300 hover:scale-[1.03]"
            >
              {/* ✨ Warm Fairy Lights Border */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl">
                {Array.from({ length: 36 }).map((_, i) => (
                  <span
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-yellow-300"
                    style={{
                      animation: "fairy-twinkle 2.8s ease-in-out infinite",
                      animationDelay: `${Math.random() * 2}s`,
                      boxShadow: "0 0 6px rgba(255, 215, 120, 0.9)",
                      top:
                        i < 9
                          ? "0%"
                          : i < 18
                          ? "100%"
                          : i < 27
                          ? `${(i - 18) * 11.1}%`
                          : `${(i - 27) * 11.1}%`,
                      left:
                        i < 9
                          ? `${i * 11.1}%`
                          : i < 18
                          ? `${(i - 9) * 11.1}%`
                          : i < 27
                          ? "0%"
                          : "100%",
                    }}
                  />
                ))}
              </div>

              {/* 🎄 CARD WITH GREEN IMAGE BACKGROUND */}
              <div
                className="relative rounded-xl p-6 h-full text-white overflow-hidden"
                style={{
                  /* 🌿 GREEN BACKGROUND IMAGE PLACEHOLDER
                     Replace with your actual image path
                  */
                  backgroundImage: "url('/images/green-bg.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Overlay for state */}
                <div
                  className={`absolute inset-0 ${
                    isUnlocked
                      ? "bg-black/10"
                      : canAfford
                      ? "bg-black/25"
                      : "bg-black/45"
                  }`}
                />

                <CardContent className="relative z-10 p-0 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-16 h-16 rounded-xl bg-black/30 flex items-center justify-center text-3xl">
                      {isUnlocked ? "🎁" : <Gift className="h-8 w-8 text-yellow-200" />}
                    </div>

                    {!isUnlocked && !canAfford && (
                      <Lock className="h-4 w-4 text-yellow-200/80" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-yellow-100">
                        {gift.title}
                      </h3>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                        gift.rarity === 'legendary' ? 'bg-orange-500 text-white shadow-[0_0_8px_rgba(249,115,22,0.6)]' :
                        gift.rarity === 'epic' ? 'bg-purple-500 text-white' :
                        gift.rarity === 'rare' ? 'bg-blue-500 text-white' :
                        'bg-gray-500/50 text-gray-100'
                      }`}>
                        {gift.rarity}
                      </span>
                    </div>
                    <p className="text-sm text-white/90">
                      {gift.description}
                    </p>
                  </div>

                  <div className="flex justify-between border-t border-white/30 pt-3">
                    <span className="text-sm">Cost</span>
                    <span className="font-semibold text-yellow-100">
                      {gift.xpCost} XP
                    </span>
                  </div>
                </CardContent>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Unlock Dialog */}
      <Dialog open={!!selectedGift && !showReward} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          {isUnwrapping ? (
            <div className="flex flex-col items-center py-12 space-y-4">
              <div className="text-6xl animate-bounce">🎁</div>
              <p className="text-lg font-semibold">Unwrapping your gift...</p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Unlock Gift?</DialogTitle>
                <DialogDescription>
                  Spend XP to unwrap this festive reward
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5">
                <div className="text-center text-5xl">🎁</div>
                <div className="text-center">
                  <h3 className="font-bold text-xl">{selectedGift?.title}</h3>
                  <p className="text-muted-foreground">
                    {selectedGift?.description}
                  </p>
                </div>

                <div className="flex justify-between bg-green-100 p-4 rounded-lg">
                  <span className="font-semibold">Cost</span>
                  <span className="font-bold text-green-700">
                    {selectedGift?.xpCost} XP
                  </span>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button className="flex-1 gap-2" onClick={handleUnlock}>
                    <Sparkles className="h-4 w-4" /> Unlock
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Reward Dialog */}
      <Dialog open={showReward} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center py-8 space-y-6">
            <div className="text-7xl animate-bounce">🎁</div>
            <h3 className="text-2xl font-bold text-green-700">
              Congratulations!
            </h3>
            <p className="text-xl font-semibold">{selectedGift?.reward}</p>
            <Button onClick={handleClose} className="w-full">
              Awesome!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
