/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(0, 100%, 70%)",
        black: "	hsl(222, 30%, 17%)",
        grayL: "hsl(0, 0%, 60%)",
        grayLd: "hsl(0, 0%, 47%)",
        cultured: "hsl(0, 0%, 93%)",
        darkGray: "hsl(0, 0%, 27%)",
        brown: "hsl(29, 90%, 65%)",
        white: "hsl(0, 100%, 100%)",
        green: "hsl(152, 51%, 52%)",
        pink: "hsl(353, 100%, 78%)",
        overLayColor: "hsla(0, 0%, 0%, 0.5)",
      },
      screens: {
        xs: "480px",
        s: "576px",
      },
    },
  },
};
