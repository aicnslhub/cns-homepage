/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Pretendard 폰트를 기본 폰트(sans)로 강제 지정
        sans: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
}