/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'brand-red-50': '#FFF1F3FF',
        'brand-red-100': '#FFDFE3FF',
        'brand-red-200': '#FFC5CCFF',
        'brand-red-300': '#FF9CA8FF',
        'brand-red-400': '#FF6477FF',
        'brand-red-500': '#FF334CFF',
        'brand-red-600': '#EF233CFF',
        'brand-red-700': '#C80D24FF',
        'brand-red-800': '#A50F21FF',
        'brand-red-900': '#891321FF',
        'brand-red-950': '#4B040DFF',
        black: '#0E0E0EFF',
        white: '#FAFAFAFF',
        'zinc-50': '#FAFAFAFF',
        'zinc-100': '#F4F4F5FF',
        'zinc-200': '#E4E4E7FF',
        'zinc-300': '#D4D4D8FF',
        'zinc-400': '#A1A1AAFF',
        'zinc-500': '#71717AFF',
        'zinc-600': '#52525BFF',
        'zinc-700': '#3F3F46FF',
        'zinc-800': '#27272AFF',
        'zinc-900': '#18181BFF',
        'zinc-950': '#09090BFF',
      },
    },
  },
  plugins: [],
};
