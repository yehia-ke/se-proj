import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--font-inter)'],
        sans: ['var(--font-dmsans)'],
      },
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
        },
      },
    },
  },
  plugins: [],
}

export default config
