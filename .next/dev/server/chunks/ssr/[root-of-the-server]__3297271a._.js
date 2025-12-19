module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Downloads/Hackmas_Holiday_StudyBuddy/lib/auth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkUsernameAvailability",
    ()=>checkUsernameAvailability,
    "getAuthState",
    ()=>getAuthState,
    "saveAuthState",
    ()=>saveAuthState,
    "signIn",
    ()=>signIn,
    "signInAsGuest",
    ()=>signInAsGuest,
    "signOut",
    ()=>signOut,
    "signUp",
    ()=>signUp
]);
"use client";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5555/api";
function getAuthState() {
    if ("TURBOPACK compile-time truthy", 1) {
        return {
            user: null,
            token: null,
            isAuthenticated: false,
            isGuest: false
        };
    }
    //TURBOPACK unreachable
    ;
    const stored = undefined;
}
function saveAuthState(state) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
}
async function signUp(email, password, name) {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
                username: name,
                auth_provider: "email"
            })
        });
        const data = await response.json();
        if (!response.ok) {
            return {
                success: false,
                error: data.error || "Signup failed"
            };
        }
        // Auto login after signup
        return signIn(email, password);
    } catch (error) {
        return {
            success: false,
            error: "Network error"
        };
    }
}
async function signIn(email, password) {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = await response.json();
        if (!response.ok) {
            return {
                success: false,
                error: data.error || "Login failed"
            };
        }
        const user = {
            id: data.user.id.toString(),
            email: data.user.email,
            name: data.user.username || data.user.email.split("@")[0],
            isGuest: false,
            isAdmin: data.user.is_admin
        };
        const authState = {
            user,
            token: data.token,
            isAuthenticated: true,
            isGuest: false
        };
        saveAuthState(authState);
        return {
            success: true,
            user,
            token: data.token
        };
    } catch (error) {
        return {
            success: false,
            error: "Network error"
        };
    }
}
function signInAsGuest() {
    const guestUser = {
        id: "guest-" + Date.now(),
        email: "guest@example.com",
        name: "Guest User",
        isGuest: true
    };
    const authState = {
        user: guestUser,
        token: null,
        isAuthenticated: true,
        isGuest: true
    };
    saveAuthState(authState);
    return {
        success: true,
        user: guestUser,
        token: null
    };
}
async function checkUsernameAvailability(username) {
    try {
        const response = await fetch(`${API_URL}/check-username?username=${encodeURIComponent(username)}`);
        return await response.json();
    } catch (error) {
        return {
            available: false,
            message: "Network error"
        };
    }
}
function signOut() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
}
}),
"[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/auth-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Hackmas_Holiday_StudyBuddy/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Hackmas_Holiday_StudyBuddy/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Hackmas_Holiday_StudyBuddy/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Hackmas_Holiday_StudyBuddy/lib/auth.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    const [authState, setAuthStateInternal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        user: null,
        token: null,
        isAuthenticated: false,
        isGuest: false
    });
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Check auth state on mount
        const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthState"])();
        setAuthStateInternal(state);
        setIsLoading(false);
    }, []);
    const setAuthState = (state)=>{
        setAuthStateInternal(state);
        // Only save to localStorage if not a guest
        if (state.isGuest || state.isAuthenticated) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveAuthState"])(state);
        }
    };
    const signOut = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signOut"])();
        setAuthStateInternal({
            user: null,
            token: null,
            isAuthenticated: false,
            isGuest: false
        });
        router.push("/login");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user: authState.user,
            isAuthenticated: authState.isAuthenticated,
            isGuest: authState.isGuest,
            isLoading,
            setAuthState,
            signOut
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/auth-provider.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
}),
"[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/theme-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Hackmas_Holiday_StudyBuddy/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Hackmas_Holiday_StudyBuddy/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/theme-provider.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
}),
"[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/ui/sonner.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Hackmas_Holiday_StudyBuddy/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Hackmas_Holiday_StudyBuddy/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Hackmas_Holiday_StudyBuddy/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
const Toaster = ({ ...props })=>{
    const { theme = 'system' } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hackmas_Holiday_StudyBuddy$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toaster"], {
        theme: theme,
        className: "toaster group",
        style: {
            '--normal-bg': 'var(--popover)',
            '--normal-text': 'var(--popover-foreground)',
            '--normal-border': 'var(--border)'
        },
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/Hackmas_Holiday_StudyBuddy/components/ui/sonner.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3297271a._.js.map