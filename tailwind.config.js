/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF4500',
        'primary-hover': '#FF6A33',
        background: '#0F1419',
        'background-light': '#1A2326',
        foreground: '#E5E7EB',
        border: '#374151',
        card: '#1F2937',
        'card-hover': '#252E38',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'flame-flicker': 'flameFlicker 1.5s ease-in-out infinite',
        'dragon-breathe': 'dragonBreathe 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        flameFlicker: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        dragonBreathe: {
          '0%, 100%': { opacity: '0.3', transform: 'translateY(0)' },
          '50%': { opacity: '0.6', transform: 'translateY(-5px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255, 69, 0, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 69, 0, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}