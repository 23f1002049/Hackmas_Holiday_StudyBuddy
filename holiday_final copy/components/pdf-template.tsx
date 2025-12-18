import React from "react"
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer"
import type { UserSettings, UserStats } from "@/lib/user-data"

const GREEN_DARK = "#1b5e3a"
const GREEN_MID = "#2f6b3f"
// const GREEN_LIGHT = "#a7f3d0" // Unused
const CARD_BG = "rgba(255, 255, 255, 0.85)" // High opacity white for readability
const BORDER = "rgba(255, 255, 255, 0.4)"
const TEXT = "#1f2937"

// Fake gradient using stacked background layers (react-pdf safe)
// Fake gradient using stacked background layers (react-pdf safe)
// const GradientBackground = ... (Removed in favor of image)

const Snowflakes = () => (
    <View style={styles.snowflakeWrapper} fixed>
        {Array.from({ length: 35 }).map((_, i) => (
            <Text
                key={i}
                style={{
                    position: "absolute",
                    top: `${(i * 17) % 100}%`,
                    left: `${(i * 37) % 100}%`,
                    fontSize: (i % 3) * 10 + 20,
                    opacity: 0.15,
                    color: "white",
                }}
            >
                *
            </Text>
        ))}
    </View>
)

const styles = StyleSheet.create({
    page: {
        padding: 42,
        fontFamily: "Helvetica",
        color: TEXT,
        backgroundColor: "transparent", // Allow image to show
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
    gradientBand: {
        height: "33.33%",
    },
    snowflakeWrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1, // Just above background
    },
    watermark: {
        position: "absolute",
        top: 200,
        left: 100,
        width: 400,
        height: 400,
        opacity: 0.10, // Subtle watermark
        zIndex: 0,
    },

    // Content wrappers for visibility
    sectionCard: {
        backgroundColor: CARD_BG,
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        border: `1pt solid ${BORDER}`,
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#D4AF37", // Gold
        marginBottom: 6,
        textShadow: "0px 1px 3px rgba(0,0,0,0.3)", // Fake shadow for readability
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 28,
    },
    logo: {
        width: 60,
        height: 60,
        marginBottom: 10,
    },
    headerMeta: {
        fontSize: 11,
        color: "#D4AF37", // Gold
        fontWeight: "bold",
        textShadow: "0px 1px 2px rgba(0,0,0,0.3)",
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: GREEN_MID,
        marginBottom: 8,
    },
    paragraph: {
        fontSize: 11,
        lineHeight: 1.5,
        marginBottom: 10,
        color: TEXT,
    },

    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    statBox: {
        width: "23%",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
        border: `1pt solid ${BORDER}`,
    },
    statValue: {
        fontSize: 22,
        fontWeight: "bold",
        color: GREEN_DARK,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 10,
        color: "#4b5563",
    },

    /* Chart */
    chartContainer: {
        marginTop: 10,
        marginBottom: 10,
    },
    chartBars: {
        flexDirection: "row",
        alignItems: "flex-end",
        height: 120,
        marginTop: 10,
    },
    bar: {
        flex: 1,
        marginHorizontal: 4,
        borderRadius: 4,
    },
    chartLabelRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 6,
    },
    chartLabel: {
        fontSize: 9,
        width: "14%",
        textAlign: "center",
        color: TEXT,
    },

    listItem: {
        fontSize: 11,
        marginBottom: 4,
        color: TEXT,
    },

    badgeRow: {
        flexDirection: "row",
        gap: 8,
        marginTop: 8,
        flexWrap: "wrap",
    },
    badge: {
        border: `1pt solid #7dd3fc`,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 12,
        backgroundColor: "#ffffff",
    },
    badgeText: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#0f4c5c",
    },

    footer: {
        marginTop: 20,
        paddingTop: 12,
        textAlign: "center",
        fontSize: 9,
        color: "#f0fdf4",
        textShadow: "0px 1px 2px rgba(0,0,0,0.3)",
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
        <Document>
            <Page size="A4" style={styles.page}>
                <Image src="/images/pdf-background-v2.jpg" style={styles.backgroundImage} fixed />
                <Snowflakes />
                <Image src="/images/logo.png" style={styles.watermark} fixed />

                <View style={styles.contentContainer}>
                    {/* Header - No card, directly on background with shadow */}
                    <View>
                        <Image src="/images/logo.png" style={styles.logo} />
                        <Text style={styles.title}>Holiday Study Buddy: Report</Text>
                        <View style={styles.headerRow}>
                            <Text style={styles.headerMeta}>User: {settings.name}</Text>
                            <Text style={styles.headerMeta}>Date: {date}</Text>
                        </View>
                    </View>

                    {/* Stats Row - Individual Cards */}
                    <View style={styles.statsRow}>
                        <View style={styles.statBox}>
                            <Text style={styles.statValue}>{stats.totalFocusMinutes}</Text>
                            <Text style={styles.statLabel}>Focus Mins</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statValue}>{stats.tasksCompleted}</Text>
                            <Text style={styles.statLabel}>Tasks</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statValue}>{stats.currentStreak}</Text>
                            <Text style={styles.statLabel}>Streak</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statValue}>{stats.xp}</Text>
                            <Text style={styles.statLabel}>XP</Text>
                        </View>
                    </View>

                    {/* Executive Summary Card */}
                    <View style={styles.sectionCard}>
                        <Text style={styles.sectionTitle}>Executive Summary</Text>
                        <Text style={styles.paragraph}>
                            Welcome to your personalized productivity snapshot, {settings.name}! You are currently at Level {stats.level}.
                            This report highlights the study habits and consistency you are building.
                        </Text>
                    </View>

                    {/* Weekly Focus Chart Card */}
                    <View style={styles.sectionCard}>
                        <Text style={styles.sectionTitle}>Weekly Focus Trends</Text>
                        <View style={styles.chartContainer}>
                            <View style={styles.chartBars}>
                                {weekly.map((v, i) => (
                                    <View
                                        key={i}
                                        style={[
                                            styles.bar,
                                            {
                                                height: `${(v / max) * 100}%`,
                                                backgroundColor: i === 4 ? GREEN_MID : "#86efac", // Using lighter green for bars
                                            },
                                        ]}
                                    />
                                ))}
                            </View>
                            <View style={styles.chartLabelRow}>
                                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                                    <Text key={d} style={styles.chartLabel}>{d}</Text>
                                ))}
                            </View>
                        </View>
                    </View>

                    {/* Tasks & Achievements Split */}
                    <View style={{ flexDirection: 'row', gap: 20 }}>
                        {/* Tasks Card */}
                        <View style={[styles.sectionCard, { flex: 1 }]}>
                            <Text style={styles.sectionTitle}>Tasks & Quests</Text>
                            <Text style={styles.listItem}>• First Session</Text>
                            <Text style={styles.listItem}>• Task Master</Text>
                            <Text style={styles.listItem}>• Weekly Warrior</Text>
                            <Text style={styles.listItem}>• Pomodoro: {pomodoroMins}m</Text>
                        </View>

                        {/* Badges Card */}
                        <View style={[styles.sectionCard, { flex: 1 }]}>
                            <Text style={styles.sectionTitle}>Badges</Text>
                            <View style={styles.badgeRow}>
                                {stats.badges.map((b) => (
                                    <View key={b} style={styles.badge}>
                                        <Text style={styles.badgeText}>{b.replace(/_/g, " ").toUpperCase()}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>

                    {/* Motivational Quote */}
                    <View style={styles.sectionCard}>
                        <Text style={{ fontSize: 10, fontStyle: "italic", textAlign: "center", color: "#555" }}>
                            "Consistency is the currency of excellence. Your data reflects a commitment to growth that separates the scholars from the seekers. Keep the momentum, for every minute of focus is a brick in the foundation of your future success."
                        </Text>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text>OFFICIAL HOLIDAY STUDY BUDDY RECORD</Text>
                        <Text>Verification ID: HSB-{stats.level}-{stats.xp}</Text>
                    </View>
                </View>

            </Page>
        </Document>
    )
}
