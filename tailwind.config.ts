import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      background: 'hsl(var(--color-background) / <alpha-value>)',
      foreground: 'hsl(var(--color-foreground) / <alpha-value>)',
      card: 'hsl(var(--color-card) / <alpha-value>)',
      'card-foreground': 'hsl(var(--color-card-foreground) / <alpha-value>)',
      primary: 'hsl(var(--color-primary) / <alpha-value>)',
      'primary-foreground': 'hsl(var(--color-primary-foreground) / <alpha-value>)',
      'primary-light': '#FCA5A5',
      secondary: 'hsl(var(--color-secondary) / <alpha-value>)',
      'secondary-foreground': 'hsl(var(--color-secondary-foreground) / <alpha-value>)',
      muted: 'hsl(var(--color-muted) / <alpha-value>)',
      'muted-foreground': 'hsl(var(--color-muted-foreground) / <alpha-value>)',
      accent: 'hsl(var(--color-accent) / <alpha-value>)',
      'accent-foreground': 'hsl(var(--color-accent-foreground) / <alpha-value>)',
      red: '#DC2626',
      gold: '#F59E0B',
      amber: '#F59E0B',
      white: '#FFFFFF',
      black: '#000000',
      destructive: 'hsl(var(--color-destructive) / <alpha-value>)',
      'destructive-foreground': 'hsl(var(--color-destructive-foreground) / <alpha-value>)',
      border: 'hsl(var(--color-border) / <alpha-value>)',
      input: 'hsl(var(--color-input) / <alpha-value>)',
      ring: 'hsl(var(--color-ring) / <alpha-value>)',
    },
    extend: {
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
