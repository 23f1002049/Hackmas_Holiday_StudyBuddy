import React from "react"
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer"
import type { UserSettings, UserStats, Task, Badge } from "@/lib/user-data"

const RED_ACCENT = "#FF4B4B"
const GOLD_ACCENT = "#FFD700"
const GREEN_ACCENT = "#4ADE80"
const DARK_BG = "#0F172A"
const CARD_BG = "rgba(30, 41, 59, 0.7)"
const BORDER = "rgba(255, 255, 255, 0.1)"
const TEXT_MAIN = "#F8FAFC"
const TEXT_DIM = "#94A3B8"

const TEXT_WHITE = "#FFFFFF"
const SHADOW = "rgba(0, 0, 0, 0.3)"

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: "Helvetica",
        color: TEXT_MAIN,
        backgroundColor: DARK_BG,
    },
    backgroundImage: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        objectFit: "cover",
    },
    contentContainer: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        borderBottom: `2pt solid ${GOLD_ACCENT}66`,
        paddingBottom: 15,
    },
    brandBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    logo: {
        width: 45,
        height: 45,
    },
    brandName: {
        fontSize: 24,
        fontWeight: "black",
        letterSpacing: 2,
        color: TEXT_MAIN,
    },
    metaBox: {
        textAlign: "right",
    },
    userLabel: {
        fontSize: 7,
        color: TEXT_DIM,
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 2,
    },
    userName: {
        fontSize: 18,
        fontWeight: "black",
        color: GOLD_ACCENT,
        letterSpacing: 1,
    },
    reportId: {
        fontSize: 8,
        color: TEXT_DIM,
        marginTop: 4,
    },
    
    // Dashboard Section
    dashboard: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 15,
    },
    scoreCard: {
        flex: 1.5,
        backgroundColor: CARD_BG,
        borderRadius: 12,
        padding: 15,
        justifyContent: "center",
        border: `1pt solid ${GOLD_ACCENT}44`,
    },
    gradeCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        border: `2pt solid ${GOLD_ACCENT}`,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 215, 0, 0.1)",
        position: "absolute",
        right: 15,
        top: 15,
    },
    gradeText: {
        fontSize: 24,
        fontWeight: "bold",
        color: GOLD_ACCENT,
    },
    scoreLabel: {
        fontSize: 10,
        color: GOLD_ACCENT,
        textTransform: "uppercase",
        letterSpacing: 2,
        marginBottom: 4,
    },
    scoreValue: {
        fontSize: 42,
        fontWeight: "black",
        color: TEXT_MAIN,
    },
    scoreSub: {
        fontSize: 8,
        color: TEXT_DIM,
        marginTop: 2,
    },
    levelCard: {
        flex: 1,
        backgroundColor: CARD_BG,
        borderRadius: 12,
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        border: `1pt solid ${BORDER}`,
    },
    levelTag: {
        backgroundColor: GREEN_ACCENT,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
        marginBottom: 8,
    },
    levelTagText: {
        fontSize: 9,
        color: DARK_BG,
        fontWeight: "bold",
    },
    xpDisplay: {
        fontSize: 9,
        color: TEXT_DIM,
        marginTop: 4,
    },

    // Main Content
    mainRow: {
        flexDirection: "row",
        gap: 15,
    },
    leftCol: {
        flex: 2,
    },
    rightCol: {
        flex: 1,
    },

    section: {
        backgroundColor: CARD_BG,
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        border: `1pt solid ${BORDER}`,
    },
    sectionTitle: {
        fontSize: 10,
        fontWeight: "bold",
        color: GOLD_ACCENT,
        textTransform: "uppercase",
        letterSpacing: 1.5,
        marginBottom: 12,
        borderBottom: `1pt solid ${BORDER}`,
        paddingBottom: 4,
    },

    // Analytics Styles
    chartArea: {
        height: 100,
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 10,
        marginTop: 15,
        paddingHorizontal: 5,
    },
    barGroup: {
        flex: 1,
        alignItems: "center",
        gap: 6,
    },
    bar: {
        width: "100%",
        borderRadius: 4,
        backgroundColor: "rgba(255, 255, 255, 0.15)", // Increased visibility
        border: `1pt solid rgba(255, 255, 255, 0.1)`,
    },
    activeBar: {
        backgroundColor: GREEN_ACCENT,
        border: `1pt solid ${GREEN_ACCENT}88`,
    },
    barText: {
        fontSize: 8,
        color: TEXT_DIM,
    },
    barValue: {
        fontSize: 8,
        color: TEXT_WHITE,
        fontWeight: "bold",
        position: "absolute",
        top: -15,
    },

    metricsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    simpleMetric: {
        flex: 1,
        minWidth: "45%",
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        padding: 10,
        borderRadius: 8,
    },

    intensityBar: {
        height: 8,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 4,
        marginVertical: 8,
        overflow: "hidden",
    },
    intensityFill: {
        height: "100%",
        backgroundColor: RED_ACCENT,
    },

    // List Styles
    badgeList: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
    },
    badgeItem: {
        backgroundColor: "rgba(74, 222, 128, 0.1)",
        border: `1pt solid ${GREEN_ACCENT}44`,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    badgeLabel: {
        fontSize: 8,
        color: GREEN_ACCENT,
        fontWeight: "bold",
    },

    taskRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 4,
        borderBottom: `0.5pt solid ${BORDER}`,
    },
    taskName: {
        fontSize: 9,
        color: TEXT_MAIN,
    },

    // Executive Summary
    summaryBox: {
        backgroundColor: "rgba(255, 255, 255, 0.02)",
        borderRadius: 8,
        padding: 10,
        borderLeft: `3pt solid ${GOLD_ACCENT}`,
    },
    summaryText: {
        fontSize: 9,
        lineHeight: 1.4,
        color: "rgba(255, 255, 255, 0.9)",
        fontStyle: "italic",
    },

    footer: {
        position: "absolute",
        bottom: 25,
        left: 40,
        right: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        borderTop: `1pt solid ${BORDER}`,
        paddingTop: 8,
    },
    footerLabel: {
        fontSize: 8,
        color: TEXT_DIM,
        letterSpacing: 1,
    }
})

interface Props {
    settings: UserSettings
    stats: UserStats
    recentTasks: Task[]
    allBadges: Badge[]
    focusHistory: { day: string; minutes: number }[]
    allFocusSessions: any[]
    date: string
}

export const PdfDocument = ({ settings, stats, recentTasks, allBadges, focusHistory, allFocusSessions, date }: Props) => {
    const weekly = stats.weeklyFocus ?? [0, 0, 0, 0, 0, 0, 0]
    const maxFocus = Math.max(...weekly, 30) // Minimum of 30 for scale
    const todayIndex = (new Date().getDay() + 6) % 7 // Monday = 0
    
    // Accurate Metrics Logic
    // 1. Deep Work Index: Real session count >= 25 minutes
    const deepSessions = allFocusSessions.filter(s => s.duration_minutes >= 25).length
    
    // 2. Average Session Time: Total Time / Total Session Count
    const sessionCount = Math.max(allFocusSessions.length, 1)
    const avgSessionTime = Math.round(stats.totalFocusMinutes / sessionCount)
    
    // 3. Balanced Performance Index
    // 50% Focus Time (Target 1500m), 30% Completion (Target 30), 20% Consistency (Target 10d Streak)
    const focusScore = Math.min(50, (stats.totalFocusMinutes / 1500) * 50)
    const taskScore = Math.min(30, (stats.tasksCompleted / 30) * 30)
    const streakScore = Math.min(20, (stats.currentStreak / 10) * 20)
    const corePerformance = Math.round(focusScore + taskScore + streakScore)
    
    const intensity = Math.min(100, (stats.todayFocusMinutes / 300) * 100)
    
    const getGrade = () => {
        if (corePerformance > 90) return "S"
        if (corePerformance > 75) return "A"
        if (corePerformance > 55) return "B"
        if (corePerformance > 35) return "C"
        return "D"
    }

    const getSummary = () => {
        const grade = getGrade()
        if (grade === "S") return "Master Class Productivity. You have achieved an elite level of flow. Your cognitive endurance is within the top 1% of users."
        if (grade === "A") return "Exemplary consistency. Your session data shows significant high-quality focus. Maintain this rhythm to achieve peak learning velocity."
        if (grade === "B") return "Solid study habits identified. Your metrics indicate regular study sessions, though increasing Deep Work length would boost results."
        return "Growth opportunities detected. Increasing your average session time to 25+ minutes will significantly improve your learning retention and rank."
    }

    const getBadgeLabel = (code: string) => {
        const b = allBadges.find(x => x.code === code)
        return b ? b.name : code.replace(/_/g, " ").toUpperCase()
    }

    return (
        <Document title={`Productivity Audit - ${settings.name}`}>
            <Page size="A4" style={styles.page}>
                <Image src="/images/pdf-achievement-bg.png" style={styles.backgroundImage} fixed />
                
                <View style={styles.contentContainer}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.brandBox}>
                            <Image src="/images/logo.png" style={styles.logo} />
                            <Text style={styles.brandName}>HACKMAS</Text>
                        </View>
                        <View style={styles.metaBox}>
                            <Text style={styles.userLabel}>Productivity Audit For</Text>
                            <Text style={styles.userName}>{settings.name.toUpperCase()}</Text>
                            <Text style={styles.reportId}>AUDIT ID: #{Date.now().toString().slice(-6)}</Text>
                        </View>
                    </View>

                    {/* Dashboard */}
                    <View style={styles.dashboard}>
                        <View style={styles.scoreCard}>
                            <View style={styles.gradeCircle}>
                                <Text style={styles.gradeText}>{getGrade()}</Text>
                            </View>
                            <Text style={styles.scoreLabel}>Productivity Index</Text>
                            <Text style={styles.scoreValue}>{corePerformance}%</Text>
                            <Text style={styles.scoreSub}>A holistic metric of focus volume, accuracy, and streak consistency</Text>
                        </View>
                        <View style={styles.levelCard}>
                            <View style={styles.levelTag}>
                                <Text style={styles.levelTagText}>RANK: {getGrade() === "S" ? "EINSTEIN" : "SCHOLAR"}</Text>
                            </View>
                            <Text style={{ fontSize: 28, fontWeight: "bold", color: TEXT_MAIN }}>LEVEL {stats.level}</Text>
                            <Text style={styles.xpDisplay}>{stats.xp} Total XP Accumulated</Text>
                        </View>
                    </View>

                    <View style={styles.mainRow}>
                        <View style={styles.leftCol}>
                            {/* Distribution Section */}
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Weekly Focus Distribution (Total: {stats.weekFocusMinutes}m)</Text>
                                <View style={styles.chartArea}>
                                    {weekly.map((v, i) => (
                                        <View key={i} style={styles.barGroup}>
                                            <Text style={styles.barValue}>{v > 0 ? v : ""}</Text>
                                            <View style={[
                                                styles.bar, 
                                                { height: `${Math.max((v / maxFocus) * 100, 2)}%` }, // Min 2% visibility
                                                v > 0 ? styles.activeBar : { backgroundColor: "rgba(255, 255, 255, 0.08)" }
                                            ]} />
                                            <Text style={styles.barText}>{["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"][i]}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                            
                            {/* Analytics Section */}
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>All-Time Productivity Journey</Text>
                                <View style={styles.metricsGrid}>
                                    <View style={styles.simpleMetric}>
                                        <Text style={{ fontSize: 16, fontWeight: "bold", color: GOLD_ACCENT }}>{stats.totalFocusMinutes}</Text>
                                        <Text style={{ fontSize: 8, color: TEXT_DIM }}>Total Minutes</Text>
                                    </View>
                                    <View style={styles.simpleMetric}>
                                        <Text style={{ fontSize: 16, fontWeight: "bold", color: GREEN_ACCENT }}>{stats.tasksCompleted}</Text>
                                        <Text style={{ fontSize: 8, color: TEXT_DIM }}>Tasks Completed</Text>
                                    </View>
                                    <View style={styles.simpleMetric}>
                                        <Text style={{ fontSize: 16, fontWeight: "bold", color: RED_ACCENT }}>{stats.currentStreak}</Text>
                                        <Text style={{ fontSize: 8, color: TEXT_DIM }}>Day Streak</Text>
                                    </View>
                                    <View style={styles.simpleMetric}>
                                        <Text style={{ fontSize: 16, fontWeight: "bold", color: GREEN_ACCENT }}>{deepSessions}</Text>
                                        <Text style={{ fontSize: 8, color: TEXT_DIM }}>Deep Work Sessions</Text>
                                    </View>
                                </View>
                                
                                <View style={{ marginTop: 15 }}>
                                    <Text style={{ fontSize: 8, color: TEXT_DIM, textTransform: "uppercase", letterSpacing: 1 }}>Daily Focus Load</Text>
                                    <View style={styles.intensityBar}>
                                        <View style={[styles.intensityFill, { width: `${intensity}%` }]} />
                                    </View>
                                    <Text style={{ fontSize: 7, color: TEXT_DIM }}>{intensity}% of daily 5-hour target achieved</Text>
                                </View>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Snowman's Executive Advice</Text>
                                <View style={styles.summaryBox}>
                                    <Text style={styles.summaryText}>"{getSummary()}"</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.rightCol}>
                            {/* Tasks Section */}
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Recent Mastery</Text>
                                {recentTasks.slice(0, 8).map((t, i) => (
                                    <View key={i} style={styles.taskRow}>
                                        <Text style={styles.taskName}>{t.title.slice(0, 15)}{t.title.length > 15 ? "..." : ""}</Text>
                                        <View style={{ 
                                            width: 4, 
                                            height: 4, 
                                            borderRadius: 2, 
                                            backgroundColor: t.priority === "high" ? RED_ACCENT : t.priority === "medium" ? GOLD_ACCENT : GREEN_ACCENT 
                                        }} />
                                    </View>
                                ))}
                            </View>

                            {/* Badges Section */}
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Trophy Cabinet</Text>
                                <View style={styles.badgeList}>
                                    {stats.badges.map((b) => (
                                        <View key={b} style={styles.badgeItem}>
                                            <Text style={styles.badgeLabel}>{getBadgeLabel(b)}</Text>
                                        </View>
                                    ))}
                                    {stats.badges.length === 0 && (
                                        <Text style={{ fontSize: 8, color: TEXT_DIM, textAlign: "center", width: "100%", marginVertical: 10 }}>No trophies earned yet.</Text>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer} fixed>
                        <Text style={styles.footerLabel}>HACKMAS HOLIDAY STUDY BUDDY • PROFESSIONAL AUDIT</Text>
                        <Text style={styles.footerLabel}>VERIFIED ON {date}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}


