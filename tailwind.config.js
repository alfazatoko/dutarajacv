/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9b87c4',
        'primary-hover': '#7a6aa3',
        background: '#f8f8f8',
        surface: '#ffffff',
        border: '#e5e7eb',
        'text-muted': '#9ca3af',
      },
    },
  },
  plugins: [],
}
