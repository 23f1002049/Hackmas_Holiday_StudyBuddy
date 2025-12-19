"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  fetchAllUsers, 
  blockUser, 
  createGift, 
  createAnnouncement, 
  clearAnnouncements,
  rewardUser, 
  fetchAllBadges,
  deleteUser,
  fetchGifts,
  deleteGift,
  type UserStats,
  type Badge,
  type Gift as GiftType
} from "@/lib/user-data"
import { Shield, Users, Gift, Megaphone, Award, Ban, CheckCircle, Plus, Trash2, XCircle } from "lucide-react"
import { toast } from "sonner"

export function AdminDashboard() {
  const [users, setUsers] = useState<UserStats[]>([])
  const [badges, setBadges] = useState<Badge[]>([])
  const [catalogGifts, setCatalogGifts] = useState<GiftType[]>([])
  const [loading, setLoading] = useState(true)
  
  // Gift Form State
  const [giftName, setGiftName] = useState("")
  const [giftDesc, setGiftDesc] = useState("")
  const [giftXp, setGiftXp] = useState(500)
  const [giftRarity, setGiftRarity] = useState("common")
  const [giftCode, setGiftCode] = useState("")

  // Announcement State
  const [announcement, setAnnouncement] = useState("")

  // Reward Modal State
  const [selectedUser, setSelectedUser] = useState<UserStats | null>(null)
  const [rewardXp, setRewardXp] = useState(0)
  const [rewardBadge, setRewardBadge] = useState("")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    const [allUsers, allBadges, allGifts] = await Promise.all([
      fetchAllUsers(),
      fetchAllBadges(),
      fetchGifts()
    ])
    setUsers(allUsers)
    setBadges(allBadges)
    setCatalogGifts(allGifts)
    setLoading(false)
  }

  const handleToggleBlock = async (user: UserStats) => {
    if (!user.id) return
    const success = await blockUser(user.id, !user.is_blocked)
    if (success) {
      toast.success(user.is_blocked ? "User unblocked" : "User blocked")
      loadData()
    }
  }

  const handleCreateGift = async () => {
    if (!giftName || !giftCode) {
        toast.error("Name and Code are required")
        return
    }
    const success = await createGift({
      name: giftName,
      code: giftCode,
      description: giftDesc,
      xp_required: giftXp,
      rarity: giftRarity
    })
    if (success) {
      toast.success("Gift created successfully!")
      setGiftName("")
      setGiftCode("")
      setGiftDesc("")
      loadData() // Refresh catalog
    }
  }

  const handleDeleteGift = async (giftId: number) => {
    if (!confirm("Remove this gift from the catalog? This will not remove it from users who already own it.")) return
    const success = await deleteGift(giftId)
    if (success) {
      toast.success("Gift removed from catalog")
      loadData()
    }
  }

  const handleClearAnnouncements = async () => {
    if (!confirm("Are you sure you want to clear all active announcements?")) return
    const success = await clearAnnouncements()
    if (success) {
      toast.success("All announcements cleared")
    }
  }

  const handleDeleteUser = async (user: UserStats) => {
    if (!user.id) return
    if (!confirm(`Are you sure you want to PERMANENTLY delete ${user.name}? This cannot be undone.`)) return
    
    const success = await deleteUser(user.id)
    if (success) {
      toast.success("User deleted successfully")
      loadData()
    }
  }

  const handleAnnounce = async () => {
    if (!announcement) return
    const success = await createAnnouncement(announcement)
    if (success) {
      toast.success("Announcement broadcasted!")
      setAnnouncement("")
    }
  }

  const handleGiveReward = async () => {
    if (!selectedUser?.id) return
    const success = await rewardUser(selectedUser.id, {
      xp: rewardXp,
      badge_code: rewardBadge
    })
    if (success) {
      toast.success("Reward granted!")
      setSelectedUser(null)
      setRewardXp(0)
      setRewardBadge("")
      loadData()
    }
  }

  return (
    <div className="space-y-8 p-4 bg-primary/20 rounded-xl border border-accent/20">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-8 w-8 text-accent" />
        <h2 className="text-3xl font-bold text-cream">Owner's Command Center</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <Card className="bg-primary/40 border-accent/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cream/70 uppercase">Total Citizens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{users.length}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-primary/40 border-accent/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cream/70 uppercase">Active Announcements</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="text-3xl font-bold text-green-400">1</div>
            <Button variant="ghost" size="sm" onClick={handleClearAnnouncements} className="text-red-400 hover:text-red-300 hover:bg-red-400/10">
                <XCircle className="h-4 w-4 mr-2" /> Clear
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-primary/40 border-accent/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cream/70 uppercase">Economy Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">Balanced</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Management */}
        <Card className="bg-primary/40 border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cream">
                <Users className="h-5 w-5" /> User Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-[400px] overflow-auto">
                <Table>
                <TableHeader>
                    <TableRow className="border-accent/10">
                    <TableHead className="text-cream/50">User</TableHead>
                    <TableHead className="text-cream/50 text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((u) => (
                    <TableRow key={u.id} className="border-accent/10">
                        <TableCell>
                        <div className="font-medium text-cream">{u.name}</div>
                        <div className="text-xs text-cream/50">Lvl {u.level} • {u.xp} XP</div>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                        <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-accent hover:text-accent/80"
                            onClick={() => setSelectedUser(u)}
                        >
                            <Award className="h-4 w-4" />
                        </Button>
                        <Button 
                            size="sm" 
                            variant="ghost" 
                            className={u.is_blocked ? "text-green-500 hover:text-green-400" : "text-red-500 hover:text-red-400"}
                            onClick={() => handleToggleBlock(u)}
                        >
                            {u.is_blocked ? <CheckCircle className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
                        </Button>
                        <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-red-500 hover:text-red-400"
                            onClick={() => handleDeleteUser(u)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {/* Announcements */}
          <Card className="bg-primary/40 border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cream">
                  <Megaphone className="h-5 w-5" /> Broadcast Announcement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                placeholder="What's the holiday news?" 
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                className="bg-primary/20 border-accent/20 text-cream"
              />
              <Button onClick={handleAnnounce} className="w-full bg-accent text-primary font-bold">
                Send to Everyone
              </Button>
            </CardContent>
          </Card>

          {/* New Gift */}
          <Card className="bg-primary/40 border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cream">
                  <Gift className="h-5 w-5" /> Add New Reward
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-cream/70">Name</Label>
                  <Input 
                    placeholder="E.g. Hot Cocoa" 
                    value={giftName}
                    onChange={(e) => setGiftName(e.target.value)}
                    className="bg-primary/20 border-accent/20 text-cream"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-cream/70">Unique Code</Label>
                  <Input 
                    placeholder="hot_cocoa" 
                    value={giftCode}
                    onChange={(e) => setGiftCode(e.target.value)}
                    className="bg-primary/20 border-accent/20 text-cream"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-cream/70">XP Cost</Label>
                  <Input 
                    type="number"
                    value={giftXp}
                    onChange={(e) => setGiftXp(parseInt(e.target.value))}
                    className="bg-primary/20 border-accent/20 text-cream"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-cream/70">Rarity</Label>
                  <Select value={giftRarity} onValueChange={setGiftRarity}>
                    <SelectTrigger className="bg-primary/20 border-accent/20 text-cream">
                      <SelectValue placeholder="Rarity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="common">Common</SelectItem>
                      <SelectItem value="rare">Rare</SelectItem>
                      <SelectItem value="epic">Epic</SelectItem>
                      <SelectItem value="legendary">Legendary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                  <Label className="text-cream/70">Description</Label>
                  <Input 
                    placeholder="A cozy drink..." 
                    value={giftDesc}
                    onChange={(e) => setGiftDesc(e.target.value)}
                    className="bg-primary/20 border-accent/20 text-cream"
                  />
              </div>
              <Button onClick={handleCreateGift} className="w-full bg-accent text-primary font-bold">
                <Plus className="h-4 w-4 mr-2" /> Add to Catalog
              </Button>
            </CardContent>
          </Card>

          {/* Gift Catalog List */}
          <Card className="bg-primary/40 border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cream">
                <Shield className="h-5 w-5" /> Gift Catalog
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-[300px] overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-accent/10">
                      <TableHead className="text-cream/50">Gift</TableHead>
                      <TableHead className="text-cream/50 text-right">Delete</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {catalogGifts.map((g) => (
                      <TableRow key={g.id} className="border-accent/10">
                        <TableCell>
                          <div className="font-medium text-cream">{g.title}</div>
                          <div className="text-xs text-cream/50">{g.xpCost} XP • {g.rarity}</div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-red-500 hover:text-red-400"
                            onClick={() => g.id && handleDeleteGift(parseInt(g.id.toString()))}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reward Modal */}
      {selectedUser && (
        <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent className="bg-primary border-accent/20 text-cream">
            <DialogHeader>
              <DialogTitle>Grant Reward to {selectedUser.name}</DialogTitle>
              <DialogDescription className="text-cream/50">
                Directly boost this user's stats or award a special badge.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label>Bonus XP</Label>
                <Input 
                   type="number" 
                   value={rewardXp} 
                   onChange={(e) => setRewardXp(parseInt(e.target.value))}
                   className="bg-primary/20 border-accent/20"
                />
              </div>
              <div className="space-y-2">
                <Label>Select Badge</Label>
                <Select value={rewardBadge} onValueChange={setRewardBadge}>
                  <SelectTrigger className="bg-primary/20 border-accent/20">
                    <SelectValue placeholder="Choose a badge..." />
                  </SelectTrigger>
                  <SelectContent>
                    {badges.map(b => (
                        <SelectItem key={b.code} value={b.code}>{b.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setSelectedUser(null)}>Cancel</Button>
              <Button onClick={handleGiveReward} className="bg-accent text-primary font-bold">Grant Reward</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
