import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        modalBounce: 'modalBounce 0.15s ease-in-out',
        shimmer: 'shimmer 1.5s infinite',
      },
      keyframes: {
        modalBounce: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-150%)' },
          '50%': { transform: 'translateX(-60%)' },
          '100%': { transform: 'translateX(150%)' },
        },
      },
      colors: {
        'curious-blue': {
          '50': '#eff9ff',
          '100': '#def3ff',
          '200': '#b6e8ff',
          '300': '#75d8ff',
          '400': '#2cc6ff',
          '500': '#00a1e4',
          '600': '#008cd4',
          '700': '#006fab',
          '800': '#005d8d',
          '900': '#064e74',
          '950': '#04314d',
        },
        'quill-gray': {
          '50': '#f7f8f7',
          '100': '#efefef',
          '200': '#d7d9d7',
          '300': '#bbbebb',
          '400': '#959b95',
          '500': '#7a7e79',
          '600': '#626762',
          '700': '#505450',
          '800': '#444844',
          '900': '#3c3e3c',
          '950': '#282928',
        },
      },
    },
  },
  plugins: [],
}
export default config
