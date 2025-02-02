import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        ycustom: "-0.3rem 0.3rem 0 0 rgba(136, 112, 64)",
        tcustom: "0 0 1rem 0.5rem rgba(50, 98, 123, 0.4)",
      },
      width: {
        chart: "55%",
        planet: "21%",
      },
      translate: {
        xbtn: "-0.3rem",
        ybtn: "0.3rem",
      },
      colors: {
        lightyellow: "#FCC352",
        slightlydarkeryellow: "#E8B349",
        dyellow: "#887040",
        ddblue: "#32627b",
        dblue: "#427996",
        lblue: "#7ab7d8",
        descblue: "#578fad",

        gradientdblue: "#73b2d4",
        gradientlblue: "#caecff",
      },
    },
  },
  plugins: [],
} satisfies Config;
