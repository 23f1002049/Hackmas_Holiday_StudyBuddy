import React from "react"
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer"
import type { UserSettings, UserStats } from "@/lib/user-data"

const RED_ACCENT = "#FF3131"
const GREEN_ACCENT = "#32CD32"
const CARD_BG = "rgba(0, 0, 0, 0.65)"
const BORDER = "rgba(255, 255, 255, 0.1)"
const TEXT = "#FFFFFF"



const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: "Helvetica",
        color: TEXT,
        backgroundColor: "#0a0a0a",
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
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 30,
        borderBottom: `2pt solid ${RED_ACCENT}`,
        paddingBottom: 15,
    },
    logoContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    logo: {
        width: 50,
        height: 50,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: TEXT,
        textTransform: "uppercase",
    },
    headerMeta: {
        textAlign: "right",
    },
    userName: {
        fontSize: 18,
        fontWeight: "bold",
        color: GREEN_ACCENT,
    },
    reportDate: {
        fontSize: 10,
        color: "rgba(255, 255, 255, 0.6)",
        marginTop: 4,
    },
    heroSection: {
        backgroundColor: CARD_BG,
        borderRadius: 15,
        padding: 25,
        marginBottom: 20,
        border: `1pt solid ${BORDER}`,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    heroText: {
        flex: 1,
    },
    achievementLabel: {
        fontSize: 10,
        color: RED_ACCENT,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 2,
        marginBottom: 5,
    },
    heroLevel: {
        fontSize: 48,
        fontWeight: "bold",
        color: TEXT,
    },
    heroSubtext: {
        fontSize: 12,
        color: "rgba(255, 255, 255, 0.8)",
        marginTop: 5,
    },
    statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
        marginBottom: 20,
    },
    statCard: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: 12,
        padding: 15,
        alignItems: "center",
        border: `1pt solid ${BORDER}`,
        minWidth: "22%",
    },
    statIconValue: {
        fontSize: 24,
        fontWeight: "bold",
        color: TEXT,
        marginBottom: 2,
    },
    statLabel: {
        fontSize: 8,
        color: "rgba(255, 255, 255, 0.5)",
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    mainGrid: {
        flexDirection: "row",
        gap: 20,
    },
    leftColumn: {
        flex: 2,
    },
    rightColumn: {
        flex: 1,
    },
    card: {
        backgroundColor: CARD_BG,
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        border: `1pt solid ${BORDER}`,
    },
    cardTitle: {
        fontSize: 12,
        fontWeight: "bold",
        color: RED_ACCENT,
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 12,
        borderBottom: `1pt solid rgba(255, 255, 255, 0.1)`,
        paddingBottom: 5,
    },
    chartContainer: {
        height: 100,
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 6,
        marginTop: 10,
    },
    barWrapper: {
        flex: 1,
        alignItems: "center",
        gap: 5,
    },
    bar: {
        width: "100%",
        borderRadius: 3,
    },
    barLabel: {
        fontSize: 7,
        color: "rgba(255, 255, 255, 0.4)",
    },
    badgeList: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6,
    },
    badge: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
        border: `0.5pt solid ${GREEN_ACCENT}`,
    },
    badgeText: {
        fontSize: 8,
        color: GREEN_ACCENT,
        fontWeight: "bold",
    },
    taskItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 6,
    },
    taskDot: {
        width: 4,
        height: 4,
        backgroundColor: RED_ACCENT,
        borderRadius: 2,
    },
    taskText: {
        fontSize: 10,
        color: "rgba(255, 255, 255, 0.8)",
    },
    quoteBox: {
        borderLeft: `2pt solid ${GREEN_ACCENT}`,
        paddingLeft: 10,
        marginTop: 5,
    },
    quoteText: {
        fontSize: 9,
        fontStyle: "italic",
        color: "rgba(255, 255, 255, 0.6)",
        lineHeight: 1.4,
    },
    footer: {
        position: "absolute",
        bottom: 30,
        left: 40,
        right: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: `1pt solid ${BORDER}`,
        paddingTop: 10,
    },
    footerText: {
        fontSize: 8,
        color: "rgba(255, 255, 255, 0.3)",
    },
    footerBrand: {
        fontSize: 10,
        fontWeight: "bold",
        color: "rgba(255, 255, 255, 0.5)",
        letterSpacing: 1,
    },
})

interface Props {
    settings: UserSettings
    stats: UserStats
    date: string
}

export const PdfDocument = ({ settings, stats, date }: Props) => {
    // Fallback if weeklyFocus is undefined (though interface supports it now)
    const weekly = stats.weeklyFocus ?? [0, 0, 0, 0, 0, 0, 0]
    const max = Math.max(...weekly, 1)

    // Fallback if pomodoroMinutes is missing
    const pomodoroMins = settings.pomodoroMinutes || 25

    return (
        <Document title={`HackMas Report - ${settings.name}`}>
            <Page size="A4" style={styles.page}>
                <Image src="/images/pdf-achievement-bg.png" style={styles.backgroundImage} fixed />
                
                <View style={styles.contentContainer}>
                    {/* Header */}
                    <View style={styles.headerRow}>
                        <View style={styles.logoContainer}>
                            <Image src="/images/logo.png" style={styles.logo} />
                            <Text style={styles.title}>HackMas</Text>
                        </View>
                        <View style={styles.headerMeta}>
                            <Text style={styles.userName}>{settings.name}</Text>
                            <Text style={styles.reportDate}>{date}</Text>
                        </View>
                    </View>

                    {/* Hero Section */}
                    <View style={styles.heroSection}>
                        <View style={styles.heroText}>
                            <Text style={styles.achievementLabel}>Achievement Unlocked</Text>
                            <Text style={styles.heroLevel}>Level {stats.level}</Text>
                            <Text style={styles.heroSubtext}>Master of Festive Productivity</Text>
                        </View>
                        {/* Could add a circular progress here if needed */}
                    </View>

                    {/* Stats Grid */}
                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <Text style={styles.statIconValue}>{stats.totalFocusMinutes}</Text>
                            <Text style={styles.statLabel}>Focus Mins</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statIconValue}>{stats.tasksCompleted}</Text>
                            <Text style={styles.statLabel}>Tasks</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statIconValue}>{stats.currentStreak}</Text>
                            <Text style={styles.statLabel}>Days Streak</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statIconValue}>{stats.xp}</Text>
                            <Text style={styles.statLabel}>XP Earned</Text>
                        </View>
                    </View>

                    {/* Main Content Grid */}
                    <View style={styles.mainGrid}>
                        <View style={styles.leftColumn}>
                            {/* Chart Card */}
                            <View style={styles.card}>
                                <Text style={styles.cardTitle}>Focus Analytics</Text>
                                <View style={styles.chartContainer}>
                                    {weekly.map((v, i) => (
                                        <View key={i} style={styles.barWrapper}>
                                            <View 
                                                style={[
                                                    styles.bar, 
                                                    { 
                                                        height: `${(v / max) * 100}%`,
                                                        backgroundColor: i === new Date().getDay() - 1 ? RED_ACCENT : GREEN_ACCENT 
                                                    }
                                                ]} 
                                            />
                                            <Text style={styles.barLabel}>{["M", "T", "W", "T", "F", "S", "S"][i]}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            {/* Summary Card */}
                            <View style={styles.card}>
                                <Text style={styles.cardTitle}>Performance Summary</Text>
                                <View style={styles.quoteBox}>
                                    <Text style={styles.quoteText}>
                                        "Consistency is the currency of excellence. Your data reflects a commitment to growth that separates the scholars from the seekers."
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.rightColumn}>
                            {/* Badges Card */}
                            <View style={styles.card}>
                                <Text style={styles.cardTitle}>Achievements</Text>
                                <View style={styles.badgeList}>
                                    {stats.badges.map((b) => (
                                        <View key={b} style={styles.badge}>
                                            <Text style={styles.badgeText}>{b.replace(/_/g, " ").toUpperCase()}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            {/* Info Card */}
                            <View style={styles.card}>
                                <Text style={styles.cardTitle}>App Status</Text>
                                <View style={styles.taskItem}>
                                    <View style={styles.taskDot} />
                                    <Text style={styles.taskText}>Pomodoro: {pomodoroMins}m</Text>
                                </View>
                                <View style={styles.taskItem}>
                                    <View style={styles.taskDot} />
                                    <Text style={styles.taskText}>Status: Active</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer} fixed>
                        <Text style={styles.footerText}>HSB-REPORT-{stats.level}-{stats.xp}</Text>
                        <Text style={styles.footerBrand}>HOLIDAY STUDY BUDDY</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}
