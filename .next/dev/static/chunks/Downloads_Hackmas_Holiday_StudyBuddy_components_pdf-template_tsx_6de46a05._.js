(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PdfDocument",
    ()=>PdfDocument
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Hackmas_Holiday_StudyBuddy/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$renderer$2f$lib$2f$react$2d$pdf$2e$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/Hackmas_Holiday_StudyBuddy/node_modules/@react-pdf/renderer/lib/react-pdf.browser.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Hackmas_Holiday_StudyBuddy/node_modules/@react-pdf/primitives/lib/index.js [app-client] (ecmascript)");
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
const styles = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$renderer$2f$lib$2f$react$2d$pdf$2e$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["StyleSheet"].create({
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
        marginBottom: 25,
        borderBottom: `1pt solid ${BORDER}`,
        paddingBottom: 15
    },
    brandBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    logo: {
        width: 40,
        height: 40
    },
    brandName: {
        fontSize: 22,
        fontWeight: "bold",
        letterSpacing: 1.5,
        color: TEXT_MAIN
    },
    metaBox: {
        textAlign: "right"
    },
    userName: {
        fontSize: 14,
        fontWeight: "bold",
        color: GREEN_ACCENT
    },
    reportId: {
        fontSize: 8,
        color: TEXT_DIM,
        marginTop: 2
    },
    // Dashboard Section
    dashboard: {
        flexDirection: "row",
        gap: 15,
        marginBottom: 20
    },
    scoreCard: {
        flex: 1.2,
        backgroundColor: CARD_BG,
        borderRadius: 12,
        padding: 20,
        justifyContent: "center",
        border: `1pt solid ${GOLD_ACCENT}33`
    },
    scoreLabel: {
        fontSize: 9,
        color: GOLD_ACCENT,
        textTransform: "uppercase",
        letterSpacing: 2,
        marginBottom: 4
    },
    scoreValue: {
        fontSize: 36,
        fontWeight: "bold"
    },
    scoreSub: {
        fontSize: 9,
        color: TEXT_DIM,
        marginTop: 4
    },
    levelCard: {
        flex: 1,
        backgroundColor: CARD_BG,
        borderRadius: 12,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        border: `1pt solid ${BORDER}`
    },
    levelTag: {
        backgroundColor: GREEN_ACCENT,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
        marginBottom: 10
    },
    levelTagText: {
        fontSize: 10,
        color: DARK_BG,
        fontWeight: "bold"
    },
    xpDisplay: {
        fontSize: 10,
        color: TEXT_DIM,
        marginTop: 5
    },
    // Main Content
    mainRow: {
        flexDirection: "row",
        gap: 20
    },
    leftCol: {
        flex: 1.8
    },
    rightCol: {
        flex: 1
    },
    section: {
        backgroundColor: CARD_BG,
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        border: `1pt solid ${BORDER}`
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: "bold",
        color: TEXT_DIM,
        textTransform: "uppercase",
        letterSpacing: 1.5,
        marginBottom: 15,
        borderBottom: `0.5pt solid ${BORDER}`,
        paddingBottom: 5
    },
    // Analytics Styles
    chartArea: {
        height: 120,
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 8,
        marginTop: 5
    },
    barGroup: {
        flex: 1,
        alignItems: "center",
        gap: 6
    },
    bar: {
        width: "100%",
        borderRadius: 4,
        backgroundColor: "rgba(255, 255, 255, 0.05)"
    },
    activeBar: {
        backgroundColor: RED_ACCENT
    },
    barText: {
        fontSize: 8,
        color: TEXT_DIM
    },
    barValue: {
        fontSize: 7,
        color: TEXT_MAIN,
        fontWeight: "bold",
        position: "absolute",
        top: -12
    },
    intensityBar: {
        height: 6,
        backgroundColor: BORDER,
        borderRadius: 3,
        marginVertical: 10,
        overflow: "hidden"
    },
    intensityFill: {
        height: "100%",
        backgroundColor: GREEN_ACCENT
    },
    // List Styles
    badgeList: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6
    },
    badgeItem: {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        border: `0.5pt solid ${GOLD_ACCENT}44`,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6
    },
    badgeLabel: {
        fontSize: 8,
        color: GOLD_ACCENT,
        fontWeight: "bold"
    },
    taskRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 6,
        borderBottom: `0.5pt solid ${BORDER}`
    },
    taskName: {
        fontSize: 9,
        color: TEXT_MAIN
    },
    taskBadge: {
        fontSize: 7,
        paddingHorizontal: 4,
        paddingVertical: 1,
        borderRadius: 2,
        color: TEXT_MAIN
    },
    // Executive Summary
    summaryBox: {
        backgroundColor: "rgba(255, 255, 255, 0.02)",
        borderRadius: 8,
        padding: 10,
        borderLeft: `3pt solid ${RED_ACCENT}`
    },
    summaryText: {
        fontSize: 9,
        lineHeight: 1.5,
        color: "rgba(255, 255, 255, 0.8)",
        fontStyle: "italic"
    },
    footer: {
        position: "absolute",
        bottom: 30,
        left: 40,
        right: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        borderTop: `1pt solid ${BORDER}`,
        paddingTop: 10
    },
    footerLabel: {
        fontSize: 8,
        color: TEXT_DIM
    }
});
const PdfDocument = ({ settings, stats, recentTasks, allBadges, date })=>{
    const weekly = stats.weeklyFocus ?? [
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ];
    const maxFocus = Math.max(...weekly, 1);
    const todayIndex = (new Date().getDay() + 6) % 7 // Monday = 0
    ;
    // Professional Metrics
    const corePerformance = Math.min(100, Math.round(stats.tasksCompleted * 5 + stats.totalFocusMinutes / 10 + stats.currentStreak * 10));
    const estPomodoros = Math.round(stats.totalFocusMinutes / 25);
    const intensity = Math.min(100, stats.todayFocusMinutes / 300 * 100);
    // Dynamic Summary
    const getSummary = ()=>{
        if (corePerformance > 80) return "Exceptional focus. Your study pattern indicates high cognitive endurance. You are consistently outperforming the average study bracket.";
        if (corePerformance > 50) return "Solid momentum. You've established a healthy study rhythm. Increasing your Streak could further amplify your learning compounding.";
        return "Building foundations. Focus on completing 2-3 High Priority tasks daily to rapidly increase your Productivity Index.";
    };
    const getBadgeLabel = (code)=>{
        const b = allBadges.find((x)=>x.code === code);
        return b ? b.name : code.replace(/_/g, " ").toUpperCase();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Document"], {
        title: `Productivity Audit - ${settings.name}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Page"], {
            size: "A4",
            style: styles.page,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Image"], {
                    src: "/images/pdf-achievement-bg.png",
                    style: styles.backgroundImage,
                    fixed: true
                }, void 0, false, {
                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                    lineNumber: 305,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                    style: styles.contentContainer,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                            style: styles.header,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                                    style: styles.brandBox,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Image"], {
                                            src: "/images/logo.png",
                                            style: styles.logo
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 311,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                            style: styles.brandName,
                                            children: "HACKMAS"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 312,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                    lineNumber: 310,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                                    style: styles.metaBox,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                            style: styles.userName,
                                            children: settings.name
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 315,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                            style: styles.reportId,
                                            children: [
                                                "AUDIT ID: HSB-",
                                                Date.now().toString().slice(-6)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 316,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                    lineNumber: 314,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                            lineNumber: 309,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                            style: styles.dashboard,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                                    style: styles.scoreCard,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                            style: styles.scoreLabel,
                                            children: "Performance Index"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 323,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                            style: styles.scoreValue,
                                            children: [
                                                corePerformance,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 324,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                            style: styles.scoreSub,
                                            children: "Based on focus time and task velocity"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 325,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                    lineNumber: 322,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                                    style: styles.levelCard,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                                            style: styles.levelTag,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                style: styles.levelTagText,
                                                children: "RANK: SCHOLAR"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                lineNumber: 329,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 328,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                            style: {
                                                fontSize: 24,
                                                fontWeight: "bold"
                                            },
                                            children: [
                                                "LEVEL ",
                                                stats.level
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 331,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                            style: styles.xpDisplay,
                                            children: [
                                                stats.xp,
                                                " Total XP Accumulated"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 332,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                    lineNumber: 327,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                            lineNumber: 321,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                            style: styles.mainRow,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                                    style: styles.leftCol,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                                            style: styles.section,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                    style: styles.sectionTitle,
                                                    children: "Focus Distribution (Weekly)"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                    lineNumber: 340,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                                                    style: styles.chartArea,
                                                    children: weekly.map((v, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                                                            style: styles.barGroup,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                                    style: styles.barValue,
                                                                    children: v > 0 ? v + "m" : ""
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                    lineNumber: 344,
                                                                    columnNumber: 45
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                                                                    style: [
                                                                        styles.bar,
                                                                        {
                                                                            height: `${v / maxFocus * 100}%`
                                                                        },
                                                                        i === todayIndex ? styles.activeBar : {}
                                                                    ]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                    lineNumber: 345,
                                                                    columnNumber: 45
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                                    style: styles.barText,
                                                                    children: [
                                                                        "M",
                                                                        "T",
                                                                        "W",
                                                                        "T",
                                                                        "F",
                                                                        "S",
                                                                        "S"
                                                                    ][i]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                    lineNumber: 350,
                                                                    columnNumber: 45
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, i, true, {
                                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                            lineNumber: 343,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                    lineNumber: 341,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 339,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                                            style: styles.section,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                    style: styles.sectionTitle,
                                                    children: "Productivity Metrics"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                    lineNumber: 357,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                                                    style: {
                                                        flexDirection: "row",
                                                        justifyContent: "space-between",
                                                        marginBottom: 15
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                                    style: {
                                                                        fontSize: 18,
                                                                        fontWeight: "bold"
                                                                    },
                                                                    children: estPomodoros
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                    lineNumber: 360,
                                                                    columnNumber: 41
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                                    style: {
                                                                        fontSize: 8,
                                                                        color: TEXT_DIM
                                                                    },
                                                                    children: "Estimated Pomodoros"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                    lineNumber: 361,
                                                                    columnNumber: 41
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                            lineNumber: 359,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                                                            style: {
                                                                textAlign: "right"
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                                    style: {
                                                                        fontSize: 18,
                                                                        fontWeight: "bold"
                                                                    },
                                                                    children: [
                                                                        stats.currentStreak,
                                                                        " Days"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                    lineNumber: 364,
                                                                    columnNumber: 41
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                                    style: {
                                                                        fontSize: 8,
                                                                        color: TEXT_DIM
                                                                    },
                                                                    children: "Unbroken Streak"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                    lineNumber: 365,
                                                                    columnNumber: 41
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                            lineNumber: 363,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                    lineNumber: 358,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                    style: {
                                                        fontSize: 8,
                                                        color: TEXT_DIM,
                                                        textTransform: "uppercase"
                                                    },
                                                    children: "Focus Intensity Cap"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                    lineNumber: 369,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                                                    style: styles.intensityBar,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                                                        style: [
                                                            styles.intensityFill,
                                                            {
                                                                width: `${intensity}%`
                                                            }
                                                        ]
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                        lineNumber: 371,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                    lineNumber: 370,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                    style: {
                                                        fontSize: 7,
                                                        color: TEXT_DIM
                                                    },
                                                    children: [
                                                        "Current intensity: ",
                                                        intensity,
                                                        "% of daily target reached"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                    lineNumber: 373,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 356,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                                            style: styles.section,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                    style: styles.sectionTitle,
                                                    children: "Snowman's Executive Advice"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                    lineNumber: 377,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                                                    style: styles.summaryBox,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                        style: styles.summaryText,
                                                        children: [
                                                            '"',
                                                            getSummary(),
                                                            '"'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                        lineNumber: 379,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                    lineNumber: 378,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 376,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                    lineNumber: 338,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                                    style: styles.rightCol,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                                            style: styles.section,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                    style: styles.sectionTitle,
                                                    children: "Recent Mastery"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                    lineNumber: 387,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                recentTasks.slice(0, 6).map((t, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                                                        style: styles.taskRow,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                                style: styles.taskName,
                                                                children: [
                                                                    t.title.slice(0, 20),
                                                                    t.title.length > 20 ? "..." : ""
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                lineNumber: 390,
                                                                columnNumber: 41
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                                                                style: [
                                                                    styles.taskBadge,
                                                                    {
                                                                        backgroundColor: t.priority === "high" ? RED_ACCENT : t.priority === "medium" ? GOLD_ACCENT : GREEN_ACCENT
                                                                    }
                                                                ],
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                                    style: {
                                                                        fontSize: 6,
                                                                        fontWeight: "bold"
                                                                    },
                                                                    children: t.priority.toUpperCase()
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                    lineNumber: 395,
                                                                    columnNumber: 45
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                lineNumber: 391,
                                                                columnNumber: 41
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                        lineNumber: 389,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))),
                                                recentTasks.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                    style: {
                                                        fontSize: 8,
                                                        color: TEXT_DIM,
                                                        textAlign: "center",
                                                        marginVertical: 20
                                                    },
                                                    children: "No recently logged tasks"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                    lineNumber: 400,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 386,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                                            style: styles.section,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                    style: styles.sectionTitle,
                                                    children: "Trophy Cabinet"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                    lineNumber: 405,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                                                    style: styles.badgeList,
                                                    children: [
                                                        stats.badges.map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                                                                style: styles.badgeItem,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                                    style: styles.badgeLabel,
                                                                    children: getBadgeLabel(b)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                    lineNumber: 409,
                                                                    columnNumber: 45
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, b, false, {
                                                                fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                                lineNumber: 408,
                                                                columnNumber: 41
                                                            }, ("TURBOPACK compile-time value", void 0))),
                                                        stats.badges.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                            style: {
                                                                fontSize: 8,
                                                                color: TEXT_DIM,
                                                                textAlign: "center",
                                                                width: "100%",
                                                                marginVertical: 10
                                                            },
                                                            children: "Keep working to earn badges!"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                            lineNumber: 413,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                                    lineNumber: 406,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                            lineNumber: 404,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                    lineNumber: 385,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                            lineNumber: 336,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["View"], {
                            style: styles.footer,
                            fixed: true,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                    style: styles.footerLabel,
                                    children: "HACKMAS HOLIDAY STUDY BUDDY - PRODUCTIVITY AUDIT"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                    lineNumber: 422,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f40$react$2d$pdf$2f$primitives$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                    style: styles.footerLabel,
                                    children: [
                                        "GENERATED ON ",
                                        date.toUpperCase()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                                    lineNumber: 423,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                            lineNumber: 421,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
                    lineNumber: 307,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
            lineNumber: 304,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/pdf-template.tsx",
        lineNumber: 303,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = PdfDocument;
var _c;
__turbopack_context__.k.register(_c, "PdfDocument");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_Hackmas_Holiday_StudyBuddy_components_pdf-template_tsx_6de46a05._.js.map