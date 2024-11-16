/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        moveUp: 'moveUp 5s linear infinite',
        pulseScale: 'pulseScale 3s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        shimmerButton: 'shimmerButton 2s linear infinite',
        slideIn: 'slideIn 0.5s ease-out',
      },
      keyframes: {
        moveUp: {
          '0%': { transform: 'translateY(100vh)', opacity: '0' },
          '100%': { transform: 'translateY(-100%)', opacity: '0.5' }
        },
        pulseScale: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.3' },
          '50%': { transform: 'scale(1.2)', opacity: '0.8' }
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' }
        },
        shimmerButton: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' }
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
    },
  },
  plugins: [],
}