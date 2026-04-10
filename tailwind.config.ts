import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E1B4B',
        'primary-light': '#3F3A6B',
        cyan: '#06B6D4',
        amber: '#F59E0B',
        background: '#FFFFFF',
        foreground: '#1F2937',
        card: '#FFFFFF',
        'card-foreground': '#1F2937',
        secondary: '#F3F4F6',
        'secondary-foreground': '#1F2937',
        muted: '#F3F4F6',
        'muted-foreground': '#6B7280',
        accent: '#06B6D4',
        'accent-foreground': '#1E1B4B',
        destructive: '#EF4444',
        'destructive-foreground': '#FFFFFF',
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: '#1E1B4B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      borderRadius: {
        lg: 'calc(0.5rem + 0.5rem)',
        md: 'calc(0.5rem + 0.25rem)',
        sm: 'calc(0.5rem - 0.125rem)',
      },
    },
  },
  plugins: [],
}

export default config
