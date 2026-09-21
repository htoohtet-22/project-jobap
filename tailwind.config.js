/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // Tailwind handles layout utilities; MUI's theme (src/theme.ts) own colors/typography so the two systems don't fight over design tokens.
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
