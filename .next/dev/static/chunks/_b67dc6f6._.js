(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
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
const API_URL = "http://127.0.0.1:5555/api";
function getAuthState() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const stored = localStorage.getItem("authState");
    if (stored) {
        return JSON.parse(stored);
    }
    return {
        user: null,
        token: null,
        isAuthenticated: false,
        isGuest: false
    };
}
function saveAuthState(state) {
    if ("TURBOPACK compile-time truthy", 1) {
        localStorage.setItem("authState", JSON.stringify(state));
    }
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
            user
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
        isAuthenticated: true,
        isGuest: true
    };
    // Note: Guest mode does NOT save to localStorage
    // Guest state is temporary and will be lost on refresh
    return {
        success: true
    };
}
function signOut() {
    if ("TURBOPACK compile-time truthy", 1) {
        localStorage.removeItem("authState");
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/auth-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    _s();
    const [authState, setAuthStateInternal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        user: null,
        isAuthenticated: false,
        isGuest: false
    });
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            // Check auth state on mount
            const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthState"])();
            setAuthStateInternal(state);
            setIsLoading(false);
        }
    }["AuthProvider.useEffect"], []);
    const setAuthState = (state)=>{
        setAuthStateInternal(state);
        // Only save to localStorage if not a guest
        if (!state.isGuest && state.isAuthenticated) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveAuthState"])(state);
        }
    };
    const signOut = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signOut"])();
        setAuthStateInternal({
            user: null,
            isAuthenticated: false,
            isGuest: false
        });
        router.push("/login");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
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
        fileName: "[project]/components/auth-provider.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "rNQo4Zgu/NXIawV4Ua1kMVBWz+A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_b67dc6f6._.js.map