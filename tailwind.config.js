/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: '#0f0f11',
        surface: '#18181c',
        surface2: '#222228',
        surface3: '#2a2a32',
        border: 'rgba(255,255,255,0.07)',
        border2: 'rgba(255,255,255,0.12)',
        accent: '#7c6af7',
        accent2: '#a594fa',
        'accent-dim': 'rgba(124,106,247,0.15)',
        green: '#3ecf8e',
        'green-dim': 'rgba(62,207,142,0.12)',
        red: '#f97171',
        'red-dim': 'rgba(249,113,113,0.12)',
        amber: '#f5a623',
        'amber-dim': 'rgba(245,166,35,0.12)',
        text: '#e8e8f0',
        text2: '#8888a0',
        text3: '#555568',
      },
      fontFamily: {
        mono: ['DM Mono', 'monospace'],
        sans: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        'radius': '10px',
        'radius-lg': '16px',
      },
      animation: {
        'spin': 'spin 0.7s linear infinite',
      },
      keyframes: {
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
