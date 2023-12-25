/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    extend: {
      backgroundImage: {
        "app-background": "url('/images/bg8.png')"
      },
      gridTemplateColumns: {
        "userCard": '150px 1fr',
        "linkGrid": "50px 1fr"
      },
      gridTemplateRows: {
        "messagesGrid": 'repeat(2, auto)',
      }
    },
  },
  plugins: [

  ],
}

