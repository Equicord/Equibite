import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 1000,
    },
    plugins: [solidPlugin(), tsconfigPaths()],
    build: { sourcemap: true },
})
