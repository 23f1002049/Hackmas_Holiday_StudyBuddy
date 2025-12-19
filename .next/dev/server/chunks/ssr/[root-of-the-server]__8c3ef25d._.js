module.exports = [
"[externals]/@react-pdf/renderer [external] (@react-pdf/renderer, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("@react-pdf/renderer");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "PdfDocument",
    ()=>PdfDocument
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Hackmas_Holiday_StudyBuddy/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@react-pdf/renderer [external] (@react-pdf/renderer, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const RED_ACCENT = "#FF4B4B";
const GOLD_ACCENT = "#FFD700";
const GREEN_ACCENT = "#4ADE80";
const DARK_BG = "#0F172A";
const CARD_BG = "rgba(30, 41, 59, 0.7)";
const BORDER = "rgba(255, 255, 255, 0.1)";
const TEXT_MAIN = "#F8FAFC";
const TEXT_DIM = "#94A3B8";
const TEXT_WHITE = "#FFFFFF";
const SHADOW = "rgba(0, 0, 0, 0.3)";
const styles = __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["StyleSheet"].create({
    page: {
        padding: 40,
        fontFamily: "Helvetica",
        color: TEXT_MAIN,
        backgroundColor: DARK_BG
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
        objectFit: "cover"
    },
    contentContainer: {
        flex: 1
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        borderBottom: `2pt solid ${GOLD_ACCENT}66`,
        paddingBottom: 15
    },
    brandBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    logo: {
        width: 45,
        height: 45
    },
    brandName: {
        fontSize: 24,
        fontWeight: "black",
        letterSpacing: 2,
        color: TEXT_MAIN
    },
    metaBox: {
        textAlign: "right"
    },
    userLabel: {
        fontSize: 7,
        color: TEXT_DIM,
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 2
    },
    userName: {
        fontSize: 18,
        fontWeight: "black",
        color: GOLD_ACCENT,
        letterSpacing: 1
    },
    reportId: {
        fontSize: 8,
        color: TEXT_DIM,
        marginTop: 4
    },
    // Dashboard Section
    dashboard: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 15
    },
    scoreCard: {
        flex: 1.5,
        backgroundColor: CARD_BG,
        borderRadius: 12,
        padding: 15,
        justifyContent: "center",
        border: `1pt solid ${GOLD_ACCENT}44`
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
        top: 15
    },
    gradeText: {
        fontSize: 24,
        fontWeight: "bold",
        color: GOLD_ACCENT
    },
    scoreLabel: {
        fontSize: 10,
        color: GOLD_ACCENT,
        textTransform: "uppercase",
        letterSpacing: 2,
        marginBottom: 4
    },
    scoreValue: {
        fontSize: 42,
        fontWeight: "black",
        color: TEXT_MAIN
    },
    scoreSub: {
        fontSize: 8,
        color: TEXT_DIM,
        marginTop: 2
    },
    levelCard: {
        flex: 1,
        backgroundColor: CARD_BG,
        borderRadius: 12,
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        border: `1pt solid ${BORDER}`
    },
    levelTag: {
        backgroundColor: GREEN_ACCENT,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
        marginBottom: 8
    },
    levelTagText: {
        fontSize: 9,
        color: DARK_BG,
        fontWeight: "bold"
    },
    xpDisplay: {
        fontSize: 9,
        color: TEXT_DIM,
        marginTop: 4
    },
    // Main Content
    mainRow: {
        flexDirection: "row",
        gap: 15
    },
    leftCol: {
        flex: 2
    },
    rightCol: {
        flex: 1
    },
    section: {
        backgroundColor: CARD_BG,
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        border: `1pt solid ${BORDER}`
    },
    sectionTitle: {
        fontSize: 10,
        fontWeight: "bold",
        color: GOLD_ACCENT,
        textTransform: "uppercase",
        letterSpacing: 1.5,
        marginBottom: 12,
        borderBottom: `1pt solid ${BORDER}`,
        paddingBottom: 4
    },
    // Analytics Styles
    chartArea: {
        height: 100,
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 10,
        marginTop: 15,
        paddingHorizontal: 5
    },
    barGroup: {
        flex: 1,
        alignItems: "center",
        gap: 6
    },
    bar: {
        width: "100%",
        borderRadius: 4,
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        border: `1pt solid rgba(255, 255, 255, 0.1)`
    },
    activeBar: {
        backgroundColor: GREEN_ACCENT,
        border: `1pt solid ${GREEN_ACCENT}88`
    },
    barText: {
        fontSize: 8,
        color: TEXT_DIM
    },
    barValue: {
        fontSize: 8,
        color: TEXT_WHITE,
        fontWeight: "bold",
        position: "absolute",
        top: -15
    },
    metricsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10
    },
    simpleMetric: {
        flex: 1,
        minWidth: "45%",
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        padding: 10,
        borderRadius: 8
    },
    intensityBar: {
        height: 8,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 4,
        marginVertical: 8,
        overflow: "hidden"
    },
    intensityFill: {
        height: "100%",
        backgroundColor: RED_ACCENT
    },
    // List Styles
    badgeList: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5
    },
    badgeItem: {
        backgroundColor: "rgba(74, 222, 128, 0.1)",
        border: `1pt solid ${GREEN_ACCENT}44`,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6
    },
    badgeLabel: {
        fontSize: 8,
        color: GREEN_ACCENT,
        fontWeight: "bold"
    },
    taskRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 4,
        borderBottom: `0.5pt solid ${BORDER}`
    },
    taskName: {
        fontSize: 9,
        color: TEXT_MAIN
    },
    // Executive Summary
    summaryBox: {
        backgroundColor: "rgba(255, 255, 255, 0.02)",
        borderRadius: 8,
        padding: 10,
        borderLeft: `3pt solid ${GOLD_ACCENT}`
    },
    summaryText: {
        fontSize: 9,
        lineHeight: 1.4,
        color: "rgba(255, 255, 255, 0.9)",
        fontStyle: "italic"
    },
    footer: {
        position: "absolute",
        bottom: 25,
        left: 40,
        right: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        borderTop: `1pt solid ${BORDER}`,
        paddingTop: 8
    },
    footerLabel: {
        fontSize: 8,
        color: TEXT_DIM,
        letterSpacing: 1
    }
});
const NAUGHTY_RED = "#FF0000";
const PdfDocument = ({ settings, stats, recentTasks, allBadges, focusHistory, allFocusSessions, date })=>{
    const weekly = stats.weeklyFocus ?? [
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ];
    const maxFocus = Math.max(...weekly, 30) // Minimum of 30 for scale
    ;
    const todayIndex = (new Date().getDay() + 6) % 7 // Monday = 0
    ;
    // Anti-Cheat Check
    const isNaughty = stats.gifts?.includes("lump_of_coal");
    // Accurate Metrics Logic
    // 1. Deep Work Index: Real session count >= 25 minutes
    const deepSessions = allFocusSessions.filter((s)=>s.duration_minutes >= 25).length;
    // 2. Average Session Time: Total Time / Total Session Count
    const sessionCount = Math.max(allFocusSessions.length, 1);
    const avgSessionTime = Math.round(stats.totalFocusMinutes / sessionCount);
    // 3. Balanced Performance Index
    // 50% Focus Time (Target 1500m), 30% Completion (Target 30), 20% Consistency (Target 10d Streak)
    const focusScore = Math.min(50, stats.totalFocusMinutes / 1500 * 50);
    const taskScore = Math.min(30, stats.tasksCompleted / 30 * 30);
    const streakScore = Math.min(20, stats.currentStreak / 10 * 20);
    const corePerformance = Math.round(focusScore + taskScore + streakScore);
    const intensity = Math.min(100, stats.todayFocusMinutes / 300 * 100);
    const getGrade = ()=>{
        if (corePerformance > 90) return "S";
        if (corePerformance > 75) return "A";
        if (corePerformance > 55) return "B";
        if (corePerformance > 35) return "C";
        return "D";
    };
    const getSummary = ()=>{
        if (isNaughty) return "ATTENTION: Anti-Cheat Violations Detected. User has been placed on the Naughty List for attempting to manipulate focus data. Improvement required immediately to restore honor.";
        const grade = getGrade();
        if (grade === "S") return "Master Class Productivity. You have achieved an elite level of flow. Your cognitive endurance is within the top 1% of users.";
        if (grade === "A") return "Exemplary consistency. Your session data shows significant high-quality focus. Maintain this rhythm to achieve peak learning velocity.";
        if (grade === "B") return "Solid study habits identified. Your metrics indicate regular study sessions, though increasing Deep Work length would boost results.";
        return "Growth opportunities detected. Increasing your average session time to 25+ minutes will significantly improve your learning retention and rank.";
    };
    const getBadgeLabel = (code)=>{
        const b = allBadges.find((x)=>x.code === code);
        return b ? b.name : code.replace(/_/g, " ").toUpperCase();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Document"], {
        title: `Productivity Audit - ${settings.name}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Page"], {
            size: "A4",
            style: styles.page,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Image"], {
                    src: "/images/pdf-achievement-bg.png",
                    style: styles.backgroundImage,
                    fixed: true
                }, void 0, false, {
                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                    lineNumber: 374,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                    style: styles.contentContainer,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                            style: styles.header,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                    style: styles.brandBox,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Image"], {
                                            src: "/images/logo.png",
                                            style: styles.logo
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 380,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                            style: styles.brandName,
                                            children: "HACKMAS"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 381,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                    lineNumber: 379,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                    style: styles.metaBox,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                            style: styles.userLabel,
                                            children: "Productivity Audit For"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 384,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                            style: styles.userName,
                                            children: settings.name.toUpperCase()
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 385,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                            style: styles.reportId,
                                            children: [
                                                "AUDIT ID: #",
                                                Date.now().toString().slice(-6)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 386,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                    lineNumber: 383,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                            lineNumber: 378,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                            style: styles.dashboard,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                    style: styles.scoreCard,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                            style: styles.gradeCircle,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                                style: [
                                                    styles.gradeText,
                                                    isNaughty ? {
                                                        color: NAUGHTY_RED
                                                    } : {}
                                                ],
                                                children: isNaughty ? "F" : getGrade()
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                lineNumber: 394,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 393,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                            style: styles.scoreLabel,
                                            children: "Productivity Index"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 396,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                            style: styles.scoreValue,
                                            children: [
                                                corePerformance,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 397,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                            style: styles.scoreSub,
                                            children: "A holistic metric of focus volume, accuracy, and streak consistency"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 398,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                    lineNumber: 392,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                    style: styles.levelCard,
                                    children: [
                                        isNaughty ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                            style: [
                                                styles.levelTag,
                                                {
                                                    backgroundColor: NAUGHTY_RED
                                                }
                                            ],
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                                style: [
                                                    styles.levelTagText,
                                                    {
                                                        color: TEXT_WHITE
                                                    }
                                                ],
                                                children: "NAUGHTY LIST"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                lineNumber: 403,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 402,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                            style: styles.levelTag,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                                style: styles.levelTagText,
                                                children: [
                                                    "RANK: ",
                                                    getGrade() === "S" ? "EINSTEIN" : "SCHOLAR"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                lineNumber: 407,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 406,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                            style: {
                                                fontSize: 28,
                                                fontWeight: "bold",
                                                color: TEXT_MAIN
                                            },
                                            children: [
                                                "LEVEL ",
                                                stats.level
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 410,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                            style: styles.xpDisplay,
                                            children: [
                                                stats.xp,
                                                " Total XP Accumulated"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 411,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                    lineNumber: 400,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                            lineNumber: 391,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                            style: styles.mainRow,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                    style: styles.leftCol,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                            style: styles.section,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                                    style: styles.sectionTitle,
                                                    children: [
                                                        "Weekly Focus Distribution (Total: ",
                                                        stats.weekFocusMinutes,
                                                        "m)"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                    lineNumber: 419,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                                    style: styles.chartArea,
                                                    children: weekly.map((v, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                                            style: styles.barGroup,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                                                    style: styles.barValue,
                                                                    children: v > 0 ? v : ""
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                    lineNumber: 423,
                                                                    columnNumber: 45
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                                                    style: [
                                                                        styles.bar,
                                                                        {
                                                                            height: `${Math.max(v / maxFocus * 100, 2)}%`
                                                                        },
                                                                        v > 0 ? styles.activeBar : {
                                                                            backgroundColor: "rgba(255, 255, 255, 0.08)"
                                                                        }
                                                                    ]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                    lineNumber: 424,
                                                                    columnNumber: 45
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                                                    style: styles.barText,
                                                                    children: [
                                                                        "MON",
                                                                        "TUE",
                                                                        "WED",
                                                                        "THU",
                                                                        "FRI",
                                                                        "SAT",
                                                                        "SUN"
                                                                    ][i]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                    lineNumber: 429,
                                                                    columnNumber: 45
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, i, true, {
                                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                            lineNumber: 422,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                    lineNumber: 420,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 418,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                            style: styles.section,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                                    style: styles.sectionTitle,
                                                    children: "All-Time Productivity Journey"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                    lineNumber: 437,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                                    style: styles.metricsGrid,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                                            style: styles.simpleMetric,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                                                    style: {
                                                                        fontSize: 16,
                                                                        fontWeight: "bold",
                                                                        color: GOLD_ACCENT
                                                                    },
                                                                    children: stats.totalFocusMinutes
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                    lineNumber: 440,
                                                                    columnNumber: 41
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                                                    style: {
                                                                        fontSize: 8,
                                                                        color: TEXT_DIM
                                                                    },
                                                                    children: "Total Minutes"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                    lineNumber: 441,
                                                                    columnNumber: 41
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                            lineNumber: 439,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                                            style: styles.simpleMetric,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                                                    style: {
                                                                        fontSize: 16,
                                                                        fontWeight: "bold",
                                                                        color: GREEN_ACCENT
                                                                    },
                                                                    children: stats.tasksCompleted
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                    lineNumber: 444,
                                                                    columnNumber: 41
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                                                    style: {
                                                                        fontSize: 8,
                                                                        color: TEXT_DIM
                                                                    },
                                                                    children: "Tasks Completed"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                    lineNumber: 445,
                                                                    columnNumber: 41
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                            lineNumber: 443,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                                            style: styles.simpleMetric,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                                                    style: {
                                                                        fontSize: 16,
                                                                        fontWeight: "bold",
                                                                        color: RED_ACCENT
                                                                    },
                                                                    children: stats.currentStreak
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                    lineNumber: 448,
                                                                    columnNumber: 41
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                                                    style: {
                                                                        fontSize: 8,
                                                                        color: TEXT_DIM
                                                                    },
                                                                    children: "Day Streak"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                    lineNumber: 449,
                                                                    columnNumber: 41
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                            lineNumber: 447,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                                            style: styles.simpleMetric,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                                                    style: {
                                                                        fontSize: 16,
                                                                        fontWeight: "bold",
                                                                        color: GREEN_ACCENT
                                                                    },
                                                                    children: deepSessions
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                    lineNumber: 452,
                                                                    columnNumber: 41
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                                                    style: {
                                                                        fontSize: 8,
                                                                        color: TEXT_DIM
                                                                    },
                                                                    children: "Deep Work Sessions"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                    lineNumber: 453,
                                                                    columnNumber: 41
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                            lineNumber: 451,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                    lineNumber: 438,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                                    style: {
                                                        marginTop: 15
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                                            style: {
                                                                fontSize: 8,
                                                                color: TEXT_DIM,
                                                                textTransform: "uppercase",
                                                                letterSpacing: 1
                                                            },
                                                            children: "Daily Focus Load"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                            lineNumber: 458,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                                            style: styles.intensityBar,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                                                style: [
                                                                    styles.intensityFill,
                                                                    {
                                                                        width: `${intensity}%`
                                                                    }
                                                                ]
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                lineNumber: 460,
                                                                columnNumber: 41
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                            lineNumber: 459,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                                            style: {
                                                                fontSize: 7,
                                                                color: TEXT_DIM
                                                            },
                                                            children: [
                                                                intensity,
                                                                "% of daily 5-hour target achieved"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                            lineNumber: 462,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                    lineNumber: 457,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 436,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                            style: styles.section,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                                    style: styles.sectionTitle,
                                                    children: "Snowman's Executive Advice"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                    lineNumber: 467,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                                    style: styles.summaryBox,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                                        style: styles.summaryText,
                                                        children: [
                                                            '"',
                                                            getSummary(),
                                                            '"'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                        lineNumber: 469,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                    lineNumber: 468,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 466,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                    lineNumber: 416,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                    style: styles.rightCol,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                            style: styles.section,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                                    style: styles.sectionTitle,
                                                    children: "Recent Mastery"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                    lineNumber: 477,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                recentTasks.slice(0, 8).map((t, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                                        style: styles.taskRow,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                                                style: styles.taskName,
                                                                children: [
                                                                    t.title.slice(0, 15),
                                                                    t.title.length > 15 ? "..." : ""
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                lineNumber: 480,
                                                                columnNumber: 41
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                                                style: {
                                                                    width: 4,
                                                                    height: 4,
                                                                    borderRadius: 2,
                                                                    backgroundColor: t.priority === "high" ? RED_ACCENT : t.priority === "medium" ? GOLD_ACCENT : GREEN_ACCENT
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                lineNumber: 481,
                                                                columnNumber: 41
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                        lineNumber: 479,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 476,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                            style: styles.section,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                                    style: styles.sectionTitle,
                                                    children: "Trophy Cabinet"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                    lineNumber: 493,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                                    style: styles.badgeList,
                                                    children: [
                                                        stats.badges.map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                                                                style: styles.badgeItem,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                                                    style: styles.badgeLabel,
                                                                    children: getBadgeLabel(b)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                    lineNumber: 497,
                                                                    columnNumber: 45
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, b, false, {
                                                                fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                lineNumber: 496,
                                                                columnNumber: 41
                                                            }, ("TURBOPACK compile-time value", void 0))),
                                                        stats.badges.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                                            style: {
                                                                fontSize: 8,
                                                                color: TEXT_DIM,
                                                                textAlign: "center",
                                                                width: "100%",
                                                                marginVertical: 10
                                                            },
                                                            children: "No trophies earned yet."
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                            lineNumber: 501,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                    lineNumber: 494,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 492,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                    lineNumber: 474,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                            lineNumber: 415,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["View"], {
                            style: styles.footer,
                            fixed: true,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                    style: styles.footerLabel,
                                    children: "HACKMAS HOLIDAY STUDY BUDDY • PROFESSIONAL AUDIT"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                    lineNumber: 510,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$pdf$2f$renderer__$5b$external$5d$__$2840$react$2d$pdf$2f$renderer$2c$__esm_import$29$__["Text"], {
                                    style: styles.footerLabel,
                                    children: [
                                        "VERIFIED ON ",
                                        date
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                    lineNumber: 511,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                            lineNumber: 509,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                    lineNumber: 376,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
            lineNumber: 373,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
        lineNumber: 372,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8c3ef25d._.js.map