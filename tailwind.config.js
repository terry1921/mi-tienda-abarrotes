const colors = require('./src/design/colors')
const screens = require('./src/design/screens')
const fontFamily = require('./src/design/fontFamily')
const fontSize = require('./src/design/fontSize')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        screens,
        fontFamily,
        fontSize,
        extend: {
            colors,
            spacing: {
                '112': '28rem',
                '128': '32rem',
                '144': '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
            }
        }
    },
    plugins: [],
}