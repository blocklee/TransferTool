import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
// https://vitejs.dev/config/
export default defineConfig({
    base:'/meerfansTools/',
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.join(__dirname, "src"),
        },
    },
    // 解决 (!) Some chunks are larger than 500 KiB after minification. Consider:
    // - Using dynamic import() to code-split the application
    // - Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/guide/en/#outputmanualchunks
    // - Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
    build: {
        chunkSizeWarningLimit: 2000,
    },
});
