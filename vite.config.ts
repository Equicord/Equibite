import tailwind from "@tailwindcss/vite"
import { defineConfig } from "vite"
import solid from "vite-plugin-solid"
import paths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000,
    },
    plugins: [solid(), paths(), tailwind()],
    // build: { sourcemap: true } - ???,
    preview: {
        allowedHosts: ["equicord.org"],
    },
})
