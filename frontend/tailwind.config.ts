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
        ycustom: "-5px 5px 0 0 rgba(136, 112, 64)",
      },
      width: {
        chart: "55%",
      },
    },
  },
  plugins: [],
} satisfies Config;
