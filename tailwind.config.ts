import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5F2EEA",
        "primary-dark": "#9570FE",
        white: "#FFFFFF",
        "border-line": "#DEDEDE",
        placeholder: "#A0A3BD",
        "text-title": "#14142B",
        "text-body": "#4E4B66",
        "text-label": "#6E7191",
        "input-bg": "#FCFDFE",
        background: "#D6D8E7",
        "background-v2": "#F5F6F8",
        "off-white": "#FCFCFC",
        secondary: "#FCFCFC",
        error: "#ED2E7E",
        success: "#00BA88",
        warning: "#F4B740",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}
export default config
