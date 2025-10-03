module.exports = [
"[project]/.next-internal/server/app/api/alerts/user/page/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/api/alerts/user/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-rsc] (ecmascript)");
;
async function GET() {
    try {
        // This would fetch from your Laravel backend
        // For now, returning mock alerts
        const mockAlerts = [
            {
                id: "1",
                title: "Typhoon Warning",
                message: "Tropical Storm approaching Calapan City. Residents are advised to prepare emergency kits and stay updated.",
                type: "emergency",
                category: "Weather",
                timestamp: "2 hours ago",
                read: false,
                priority: "high"
            },
            {
                id: "2",
                title: "Road Closure Notice",
                message: "Main Street will be closed for repairs from Jan 15-20. Please use alternative routes.",
                type: "warning",
                category: "Traffic",
                timestamp: "5 hours ago",
                read: false,
                priority: "medium"
            },
            {
                id: "3",
                title: "Community Clean-up Drive",
                message: "Join us this Saturday for a city-wide clean-up drive. Meet at City Hall at 7:00 AM.",
                type: "info",
                category: "Events",
                timestamp: "1 day ago",
                read: true,
                priority: "low"
            },
            {
                id: "4",
                title: "Water Service Restored",
                message: "Water service in Brgy. Centro has been fully restored. Thank you for your patience.",
                type: "success",
                category: "Utilities",
                timestamp: "2 days ago",
                read: true,
                priority: "low"
            },
            {
                id: "5",
                title: "COVID-19 Vaccination Schedule",
                message: "Free COVID-19 booster shots available at City Health Center. Walk-ins welcome Mon-Fri 8AM-4PM.",
                type: "info",
                category: "Health",
                timestamp: "3 days ago",
                read: true,
                priority: "medium"
            }
        ];
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            alerts: mockAlerts
        });
    } catch (error) {
        console.error("[v0] Error fetching alerts:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: "Failed to fetch alerts"
        }, {
            status: 500
        });
    }
}
}),
"[project]/app/api/alerts/user/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/api/alerts/user/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__78383f19._.js.map