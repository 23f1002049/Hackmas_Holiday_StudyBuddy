export interface WisdomContext {
    level: number
    xp: number
    maxXp: number
    streak: number
    tasksCompleted: number
    focusTimeToday: number
    name: string
}

const WISDOM_TEMPLATES = {
    greetings: [
        "Ho ho ho! Ready to work, {name}?",
        "Stay frosty! You're doing great.",
        "The North Pole is proud of your progress today!",
    ],
    encouragement: [
        "Just a little more XP to reach the next level!",
        "Every focused minute is a gift to your future self.",
        "Your focus is as sharp as an icicle!",
    ],
    streak: [
        "{streak} days in a row? You're on fire (but I'm not melting)!",
        "Don't let that streak break—the elves are watching!",
    ],
    health: [
        "Focused for over an hour? Time for a hot cocoa break!",
        "Remember to stretch! Even snowmen need to wiggle.",
        "Hydrate or diedrate! Drink some water helper.",
    ]
}

export function getSnowmanWisdom(context: WisdomContext): string {
    const { level, xp, maxXp, streak, focusTimeToday, name } = context

    // Priority 1: Health Reminders
    if (focusTimeToday > 60) {
        return WISDOM_TEMPLATES.health[Math.floor(Math.random() * WISDOM_TEMPLATES.health.length)].replace("{name}", name)
    }

    // Priority 2: Streak Praise
    if (streak > 3) {
        return WISDOM_TEMPLATES.streak[Math.floor(Math.random() * WISDOM_TEMPLATES.streak.length)].replace("{streak}", streak.toString())
    }

    // Priority 3: Level Progress
    if (xp / maxXp > 0.8) {
        return "You're so close to Level " + (level + 1) + "! Finish one more task."
    }

    // Default: Random Greeting or Encouragement
    const pool = [...WISDOM_TEMPLATES.greetings, ...WISDOM_TEMPLATES.encouragement]
    return pool[Math.floor(Math.random() * pool.length)].replace("{name}", name)
}
