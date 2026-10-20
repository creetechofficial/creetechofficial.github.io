module.exports = {
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        primary: '#F7BE00',
        'primary-dark': '#D9A400',
        'primary-ink': '#8A6400',
        brand: {
          dark: '#0D0D0D',
          card: '#1A1A2E',
          glass: 'rgba(255,255,255,0.08)',
        },
      },
      fontFamily: {
        sans: ['Karbon', 'Inter', 'sans-serif'],
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
        'marquee-reverse': 'marqueeReverse 30s linear infinite',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-left': 'slideLeft 0.7s ease-out forwards',
        'slide-right': 'slideRight 0.7s ease-out forwards',
        'counter-in': 'fadeUp 1s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glow: '0 0 30px rgba(247,190,0,0.35)',
        'glow-lg': '0 0 60px rgba(247,190,0,0.45)',
        glass: '0 8px 32px rgba(0,0,0,0.12)',
        card: '0 20px 60px rgba(0,0,0,0.15)',
        'card-hover': '0 30px 80px rgba(0,0,0,0.25)',
      },
    },
  },
  plugins: [],
}
