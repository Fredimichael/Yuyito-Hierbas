import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}','./components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#C8A96A' // dorado suave
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'var(--font-sans)']
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.06)'
      }
    },
  },
  plugins: [],
}
export default config
