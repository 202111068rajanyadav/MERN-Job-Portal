/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "proimary":"#141414",
        "blue":"#3575E2"
      }
    },
  },
  plugins: [],
}

