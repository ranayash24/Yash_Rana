import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:         '#080706',
        surface:    '#0f0e0c',
        'surface-2':'#161410',
        accent:     '#FF6B00',
        'accent-2': '#ff9a00',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      animation: {
        grain: 'grain 8s steps(10) infinite',
      },
      keyframes: {
        grain: {
          '0%,100%':{ transform:'translate(0,0)' },
          '10%':    { transform:'translate(-2%,-3%)' },
          '20%':    { transform:'translate(3%,2%)' },
          '30%':    { transform:'translate(-1%,3%)' },
          '40%':    { transform:'translate(2%,-1%)' },
          '50%':    { transform:'translate(-3%,1%)' },
          '60%':    { transform:'translate(3%,-3%)' },
          '70%':    { transform:'translate(-1%,-2%)' },
          '80%':    { transform:'translate(1%,3%)' },
          '90%':    { transform:'translate(-2%,2%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
