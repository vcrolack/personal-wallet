/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f3e8ff',
          100: '#e4ccff',
          200: '#c996ff',
          300: '#ae60ff',
          400: '#9333ea',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        neon: {
          purple: '#bf5af2',
          blue:   '#5e5ce6',
          pink:   '#ff2d55',
          green:  '#30d158',
        },
        surface: {
          base:    '#0a0a0f',
          raised:  '#12121a',
          overlay: '#1a1a26',
          subtle:  '#232334',
        },
        content: {
          primary:   '#f0eef6',
          secondary: '#a09cb5',
          muted:     '#5c5873',
          inverse:   '#0a0a0f',
        },
        success: '#30d158',
        warning: '#ffd60a',
        danger:  '#ff453a',
        info:    '#5e5ce6',
        border: {
          DEFAULT: '#232334',
          subtle:  '#1a1a26',
          focus:   '#8b5cf6',
        },
      },
      boxShadow: {
        'neon-sm':   '0 0 8px  rgba(139, 92, 246, 0.3)',
        'neon-md':   '0 0 16px rgba(139, 92, 246, 0.25)',
        'neon-lg':   '0 0 32px rgba(139, 92, 246, 0.2)',
        'neon-glow': '0 0 8px rgba(139, 92, 246, 0.4), 0 0 24px rgba(139, 92, 246, 0.15)',
      },
      backgroundImage: {
        'gradient-neon':    'linear-gradient(135deg, #8b5cf6, #5e5ce6)',
        'gradient-surface': 'linear-gradient(180deg, #12121a, #0a0a0f)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
