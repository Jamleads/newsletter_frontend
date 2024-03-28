/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          mainBlue: "#000c35",
          mainGreen: "#079649",
          testRed: "#ff0000",
        },
        // secondary: {
        //   DEFAULT: "#000000",
        // },
      },
      // fontFamily: {
      //   sans: ["Inter", "sans-serif"],
      // },
    },
  },
  plugins: [],
};
