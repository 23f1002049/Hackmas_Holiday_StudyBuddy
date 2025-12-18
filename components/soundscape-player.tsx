"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX, Flame, Wind, Music, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"

const SOUNDS = [
  { 
    id: "fireplace", 
    name: "Cozy Fireplace", 
    icon: Flame, 
    url: "https://www.soundjay.com/nature/sounds/fire-1.mp3" 
  },
  { 
    id: "wind", 
    name: "Winter Wind", 
    icon: Wind, 
    url: "https://www.soundjay.com/nature/sounds/wind-01.mp3" 
  },
  { 
    id: "lofi", 
    name: "Holiday Lofi", 
    icon: Music, 
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
  }
]

export function SoundscapePlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSound, setCurrentSound] = useState(SOUNDS[0])
  const [volume, setVolume] = useState(0.5)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (!audioRef.current) return
    
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e))
    }
    setIsPlaying(!isPlaying)
  }

  const selectSound = (sound: typeof SOUNDS[0]) => {
    setCurrentSound(sound)
    setIsPlaying(true)
    if (audioRef.current) {
      audioRef.current.src = sound.url
      audioRef.current.load() // Ensure new source is loaded
      audioRef.current.play().catch(e => {
        console.error("Audio play failed after selection:", e)
        setIsPlaying(false)
      })
    }
  }

  return (
    <div className="flex items-center gap-2">
      <audio 
        ref={audioRef} 
        src={currentSound.url} 
        loop 
        preload="auto"
      />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-accent hover:text-accent/80 hover:bg-accent/10 rounded-full transition-all">
            {isPlaying ? <Volume2 className="h-5 w-5 animate-pulse" /> : <VolumeX className="h-5 w-5 opacity-60" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-card border-accent/20 text-cream" align="end">
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>Ambient Soundscapes</span>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={togglePlay}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-accent/10" />
          <div className="p-2 space-y-3">
            <div className="flex items-center gap-2 px-2">
              <VolumeX className="h-4 w-4 opacity-50" />
              <Slider 
                value={[volume * 100]} 
                onValueChange={(val) => setVolume(val[0] / 100)} 
                max={100} 
                className="flex-1"
              />
              <Volume2 className="h-4 w-4 opacity-50" />
            </div>
          </div>
          <DropdownMenuSeparator className="bg-accent/10" />
          {SOUNDS.map((sound) => (
            <DropdownMenuItem 
              key={sound.id} 
              onClick={() => selectSound(sound)}
              className={`flex items-center gap-2 cursor-pointer ${currentSound.id === sound.id ? 'bg-accent/20 text-accent font-bold' : 'hover:bg-accent/10'}`}
            >
              <sound.icon className="h-4 w-4" />
              <span>{sound.name}</span>
              {currentSound.id === sound.id && isPlaying && (
                <div className="ml-auto flex gap-0.5 items-end h-3">
                    <div className="w-0.5 bg-accent animate-music-bar-1"></div>
                    <div className="w-0.5 bg-accent animate-music-bar-2"></div>
                    <div className="w-0.5 bg-accent animate-music-bar-3"></div>
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
