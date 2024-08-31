/** @type {import('stein-plugin-tailwindcss').TailwindConfig} */
export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        fontFamily: {
            sans: ['Satoshi', 'sans-serif'],
        },
        extend: {
            spacing: {
                'page-sm': '1100px',
                page: '1440px',
            },
        },
    },
    plugins: [],
}
