/** @type {import('stein-plugin-tailwindcss').TailwindConfig} */
export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        fontFamily: {
            sans: ['Satoshi', 'sans-serif'],
        },
        extend: {
            spacing: {
                page: '1100px',
            },
        },
    },
    plugins: [],
}
