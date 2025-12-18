"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X } from "lucide-react"
import { getSnowmanWisdom, type WisdomContext } from "@/lib/snowman-wisdom"

interface SnowmanSidekickProps {
    context: WisdomContext
}

export function SnowmanSidekick({ context }: SnowmanSidekickProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [message, setMessage] = useState("")
    const [isThinking, setIsThinking] = useState(false)

    useEffect(() => {
        // Show wisdom every few minutes or when stats change significantly
        const timer = setTimeout(() => {
            triggerWisdom()
        }, 5000)

        return () => clearTimeout(timer)
    }, [])

    const triggerWisdom = () => {
        setIsThinking(true)
        setTimeout(() => {
            setMessage(getSnowmanWisdom(context))
            setIsVisible(true)
            setIsThinking(false)
            
            // Auto hide after 8 seconds
            setTimeout(() => {
                setIsVisible(false)
            }, 8000)
        }, 1000)
    }

    return (
        <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        className="bg-card/95 border border-accent/30 p-4 rounded-2xl shadow-2xl max-w-[250px] pointer-events-auto relative mb-2"
                    >
                        <button 
                            onClick={() => setIsVisible(false)}
                            className="absolute -top-2 -right-2 bg-accent text-primary rounded-full p-0.5"
                        >
                            <X className="h-3 w-3" />
                        </button>
                        <p className="text-sm text-cream leading-relaxed font-handwritten italic">
                            "{message}"
                        </p>
                        <div className="absolute -bottom-2 right-6 w-4 h-4 bg-card border-r border-b border-accent/30 rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={triggerWisdom}
                className="pointer-events-auto cursor-pointer relative"
            >
                <div className="w-16 h-16 bg-white rounded-full border-4 border-accent overflow-hidden shadow-lg relative group">
                    {/* Simple CSS Snowman Head */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-50/50">
                        <div className="flex gap-2 mb-1">
                            <div className="w-1.5 h-1.5 bg-black rounded-full" />
                            <div className="w-1.5 h-1.5 bg-black rounded-full" />
                        </div>
                        <div className="w-3 h-1.5 bg-orange-500 rounded-full" />
                    </div>
                    {isThinking && (
                        <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="absolute -top-2 -right-2 bg-accent text-primary p-1.5 rounded-full shadow-lg border-2 border-primary">
                    <MessageCircle className="h-4 w-4" />
                </div>
            </motion.div>
        </div>
    )
}
