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
      },
    },
  },
  plugins: [],
} satisfies Config;
