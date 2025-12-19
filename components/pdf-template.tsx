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
        marginBottom: 25,
        borderBottom: `1pt solid ${BORDER}`,
        paddingBottom: 15,
    },
    brandBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    logo: {
        width: 40,
        height: 40,
    },
    brandName: {
        fontSize: 22,
        fontWeight: "bold",
        letterSpacing: 1.5,
        color: TEXT_MAIN,
    },
    metaBox: {
        textAlign: "right",
    },
    userName: {
        fontSize: 14,
        fontWeight: "bold",
        color: GREEN_ACCENT,
    },
    reportId: {
        fontSize: 8,
        color: TEXT_DIM,
        marginTop: 2,
    },
    
    // Dashboard Section
    dashboard: {
        flexDirection: "row",
        gap: 15,
        marginBottom: 20,
    },
    scoreCard: {
        flex: 1.2,
        backgroundColor: CARD_BG,
        borderRadius: 12,
        padding: 20,
        justifyContent: "center",
        border: `1pt solid ${GOLD_ACCENT}33`,
    },
    scoreLabel: {
        fontSize: 9,
        color: GOLD_ACCENT,
        textTransform: "uppercase",
        letterSpacing: 2,
        marginBottom: 4,
    },
    scoreValue: {
        fontSize: 36,
        fontWeight: "bold",
    },
    scoreSub: {
        fontSize: 9,
        color: TEXT_DIM,
        marginTop: 4,
    },
    levelCard: {
        flex: 1,
        backgroundColor: CARD_BG,
        borderRadius: 12,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        border: `1pt solid ${BORDER}`,
    },
    levelTag: {
        backgroundColor: GREEN_ACCENT,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
        marginBottom: 10,
    },
    levelTagText: {
        fontSize: 10,
        color: DARK_BG,
        fontWeight: "bold",
    },
    xpDisplay: {
        fontSize: 10,
        color: TEXT_DIM,
        marginTop: 5,
    },

    // Main Content
    mainRow: {
        flexDirection: "row",
        gap: 20,
    },
    leftCol: {
        flex: 1.8,
    },
    rightCol: {
        flex: 1,
    },

    section: {
        backgroundColor: CARD_BG,
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        border: `1pt solid ${BORDER}`,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: "bold",
        color: TEXT_DIM,
        textTransform: "uppercase",
        letterSpacing: 1.5,
        marginBottom: 15,
        borderBottom: `0.5pt solid ${BORDER}`,
        paddingBottom: 5,
    },

    // Analytics Styles
    chartArea: {
        height: 120,
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 8,
        marginTop: 5,
    },
    barGroup: {
        flex: 1,
        alignItems: "center",
        gap: 6,
    },
    bar: {
        width: "100%",
        borderRadius: 4,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
    },
    activeBar: {
        backgroundColor: RED_ACCENT,
    },
    barText: {
        fontSize: 8,
        color: TEXT_DIM,
    },
    barValue: {
        fontSize: 7,
        color: TEXT_MAIN,
        fontWeight: "bold",
        position: "absolute",
        top: -12,
    },

    intensityBar: {
        height: 6,
        backgroundColor: BORDER,
        borderRadius: 3,
        marginVertical: 10,
        overflow: "hidden",
    },
    intensityFill: {
        height: "100%",
        backgroundColor: GREEN_ACCENT,
    },

    // List Styles
    badgeList: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6,
    },
    badgeItem: {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        border: `0.5pt solid ${GOLD_ACCENT}44`,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    badgeLabel: {
        fontSize: 8,
        color: GOLD_ACCENT,
        fontWeight: "bold",
    },

    taskRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 6,
        borderBottom: `0.5pt solid ${BORDER}`,
    },
    taskName: {
        fontSize: 9,
        color: TEXT_MAIN,
    },
    taskBadge: {
        fontSize: 7,
        paddingHorizontal: 4,
        paddingVertical: 1,
        borderRadius: 2,
        color: TEXT_MAIN,
    },

    // Executive Summary
    summaryBox: {
        backgroundColor: "rgba(255, 255, 255, 0.02)",
        borderRadius: 8,
        padding: 10,
        borderLeft: `3pt solid ${RED_ACCENT}`,
    },
    summaryText: {
        fontSize: 9,
        lineHeight: 1.5,
        color: "rgba(255, 255, 255, 0.8)",
        fontStyle: "italic",
    },

    footer: {
        position: "absolute",
        bottom: 30,
        left: 40,
        right: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        borderTop: `1pt solid ${BORDER}`,
        paddingTop: 10,
    },
    footerLabel: {
        fontSize: 8,
        color: TEXT_DIM,
    }
})

interface Props {
    settings: UserSettings
    stats: UserStats
    recentTasks: Task[]
    allBadges: Badge[]
    date: string
}

export const PdfDocument = ({ settings, stats, recentTasks, allBadges, date }: Props) => {
    const weekly = stats.weeklyFocus ?? [0, 0, 0, 0, 0, 0, 0]
    const maxFocus = Math.max(...weekly, 1)
    const todayIndex = (new Date().getDay() + 6) % 7 // Monday = 0
    
    // Professional Metrics
    const corePerformance = Math.min(100, Math.round((stats.tasksCompleted * 5) + (stats.totalFocusMinutes / 10) + (stats.currentStreak * 10)))
    const estPomodoros = Math.round(stats.totalFocusMinutes / 25)
    const intensity = Math.min(100, (stats.todayFocusMinutes / 300) * 100)
    
    // Dynamic Summary
    const getSummary = () => {
        if (corePerformance > 80) return "Exceptional focus. Your study pattern indicates high cognitive endurance. You are consistently outperforming the average study bracket."
        if (corePerformance > 50) return "Solid momentum. You've established a healthy study rhythm. Increasing your Streak could further amplify your learning compounding."
        return "Building foundations. Focus on completing 2-3 High Priority tasks daily to rapidly increase your Productivity Index."
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
                            <Text style={styles.userName}>{settings.name}</Text>
                            <Text style={styles.reportId}>AUDIT ID: HSB-{Date.now().toString().slice(-6)}</Text>
                        </View>
                    </View>

                    {/* Dashboard */}
                    <View style={styles.dashboard}>
                        <View style={styles.scoreCard}>
                            <Text style={styles.scoreLabel}>Performance Index</Text>
                            <Text style={styles.scoreValue}>{corePerformance}%</Text>
                            <Text style={styles.scoreSub}>Based on focus time and task velocity</Text>
                        </View>
                        <View style={styles.levelCard}>
                            <View style={styles.levelTag}>
                                <Text style={styles.levelTagText}>RANK: SCHOLAR</Text>
                            </View>
                            <Text style={{ fontSize: 24, fontWeight: "bold" }}>LEVEL {stats.level}</Text>
                            <Text style={styles.xpDisplay}>{stats.xp} Total XP Accumulated</Text>
                        </View>
                    </View>

                    <View style={styles.mainRow}>
                        {/* Left Column - Analytics */}
                        <View style={styles.leftCol}>
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Focus Distribution (Weekly)</Text>
                                <View style={styles.chartArea}>
                                    {weekly.map((v, i) => (
                                        <View key={i} style={styles.barGroup}>
                                            <Text style={styles.barValue}>{v > 0 ? v + "m" : ""}</Text>
                                            <View style={[
                                                styles.bar, 
                                                { height: `${(v / maxFocus) * 100}%` },
                                                i === todayIndex ? styles.activeBar : {}
                                            ]} />
                                            <Text style={styles.barText}>{["M", "T", "W", "T", "F", "S", "S"][i]}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Productivity Metrics</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15 }}>
                                    <View>
                                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{estPomodoros}</Text>
                                        <Text style={{ fontSize: 8, color: TEXT_DIM }}>Estimated Pomodoros</Text>
                                    </View>
                                    <View style={{ textAlign: "right" }}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{stats.currentStreak} Days</Text>
                                        <Text style={{ fontSize: 8, color: TEXT_DIM }}>Unbroken Streak</Text>
                                    </View>
                                </View>
                                
                                <Text style={{ fontSize: 8, color: TEXT_DIM, textTransform: "uppercase" }}>Focus Intensity Cap</Text>
                                <View style={styles.intensityBar}>
                                    <View style={[styles.intensityFill, { width: `${intensity}%` }]} />
                                </View>
                                <Text style={{ fontSize: 7, color: TEXT_DIM }}>Current intensity: {intensity}% of daily target reached</Text>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Snowman's Executive Advice</Text>
                                <View style={styles.summaryBox}>
                                    <Text style={styles.summaryText}>"{getSummary()}"</Text>
                                </View>
                            </View>
                        </View>

                        {/* Right Column - Achievements */}
                        <View style={styles.rightCol}>
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Recent Mastery</Text>
                                {recentTasks.slice(0, 6).map((t, i) => (
                                    <View key={i} style={styles.taskRow}>
                                        <Text style={styles.taskName}>{t.title.slice(0, 20)}{t.title.length > 20 ? "..." : ""}</Text>
                                        <View style={[
                                            styles.taskBadge, 
                                            { backgroundColor: t.priority === "high" ? RED_ACCENT : t.priority === "medium" ? GOLD_ACCENT : GREEN_ACCENT }
                                        ]}>
                                            <Text style={{ fontSize: 6, fontWeight: "bold" }}>{t.priority.toUpperCase()}</Text>
                                        </View>
                                    </View>
                                ))}
                                {recentTasks.length === 0 && (
                                    <Text style={{ fontSize: 8, color: TEXT_DIM, textAlign: "center", marginVertical: 20 }}>No recently logged tasks</Text>
                                )}
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Trophy Cabinet</Text>
                                <View style={styles.badgeList}>
                                    {stats.badges.map((b) => (
                                        <View key={b} style={styles.badgeItem}>
                                            <Text style={styles.badgeLabel}>{getBadgeLabel(b)}</Text>
                                        </View>
                                    ))}
                                    {stats.badges.length === 0 && (
                                        <Text style={{ fontSize: 8, color: TEXT_DIM, textAlign: "center", width: "100%", marginVertical: 10 }}>Keep working to earn badges!</Text>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer} fixed>
                        <Text style={styles.footerLabel}>HACKMAS HOLIDAY STUDY BUDDY - PRODUCTIVITY AUDIT</Text>
                        <Text style={styles.footerLabel}>GENERATED ON {date.toUpperCase()}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

