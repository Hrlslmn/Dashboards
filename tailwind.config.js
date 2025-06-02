module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  extend: {
  animation: {
    slideIn: 'slideIn 0.3s ease-out',
  },
  keyframes: {
    slideIn: {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(0)' },
    },
  },
},

}

