module.exports = [
"[externals]/@react-pdf/renderer [external] (@react-pdf/renderer, esm_import, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/[externals]_@react-pdf_renderer_5b366df1._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[externals]/@react-pdf/renderer [external] (@react-pdf/renderer, esm_import)");
    });
});
}),
"[project]/components/pdf-template.tsx [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/[root-of-the-server]__55377a76._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/components/pdf-template.tsx [app-ssr] (ecmascript)");
    });
});
}),
];