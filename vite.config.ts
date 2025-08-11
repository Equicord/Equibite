import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import paths from 'vite-tsconfig-paths'
import tailwind from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 1000,
    },
    plugins: [solid(), paths(), tailwind()],
    // build: { sourcemap: true } - ???,
})
