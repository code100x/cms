/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './src/stories/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      boxShadow: {
        'concave-light': 'inset 6px 6px 16px rgba(209,205,199,0.5), inset -6px -6px 16px rgba(255,255,255,0.5)',
        'concave-dark': 'inset 6px 6px 16px rgba(22,22,22,0.6), inset -6px -6px 16px rgba(44,44,46,0.5)',
        neumorphic: '1px 1px 4px rgba(209, 205, 199, 0.5), -1px -1px 4px rgba(255, 255, 255, 0.5)',
        'neumorphic-dark': '1px 1px 4px rgb(113, 125, 134), -1px -1px 1px rgb(113, 125, 134)',
      },
      screens: {
        semi: '1140px',
      },
      colors: {
        'dark-concave': '#0000',
        'custom-dark': '#0A0B0C',
        'custom-light': '#EFEFEF',
        'custom-dark-opacity': 'rgba(12, 35, 64, 0.2)',
        'custom-container-dark-opacity': 'rgba(12, 35, 64, 0.2)',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderColor: {
        customborder: 'rgba(255, 255, 255, 0.2)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))',
          },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        scroll:
          'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      height: {
        sidebar: 'calc(100vh - 64px)',
      },
      fontFamily: {
        satoshi: ['var(--font-satoshi)'],
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwindcss-textshadow')],
};
