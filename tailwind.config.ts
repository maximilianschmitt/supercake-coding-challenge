import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',
        secondary: '#64748B',
        background: '#F5F7FA',
        border: '#E2E8F0',
        accent: '#2563EB',
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      fontSize: {
        sm: '0.875rem', 
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem', 
      },
      spacing: {
        4: '1rem', 
        8: '2rem', 
        12: '3rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
