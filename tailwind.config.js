/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,html}',
  ],
  theme: {
    extend: {
      colors: {
        'dp-coral':      '#E8634A',
        'dp-coral-dark': '#C44E35',
        'dp-yellow':     '#F5C842',
        'dp-navy':       '#1A2B4A',
        'dp-navy-light': '#2A3F6A',
        'dp-cream':      '#FDF8F2',
        'dp-cream-dark': '#F5EDE0',
        'dp-sage':       '#4A7C6F',
        'dp-sage-light': '#6A9E92',
      },
      fontFamily: {
        display: ['Nunito', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      maxWidth: {
        'content': '1280px',
        'prose-lg': '72ch',
      },
      boxShadow: {
        'card':     '0 2px 12px 0 rgba(26,43,74,0.08)',
        'card-hover': '0 8px 32px 0 rgba(26,43,74,0.14)',
        'nav':      '0 1px 0 0 rgba(26,43,74,0.08)',
        'cta':      '0 4px 16px 0 rgba(232,99,74,0.30)',
      },
      borderRadius: {
        'xl':  '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
    },
  },
  plugins: [],
}
