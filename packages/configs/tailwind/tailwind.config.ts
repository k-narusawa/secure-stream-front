import type { Config } from "tailwindcss";

const config: Config = {
  content: [],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui", "Noto Sans JP", "sans-serif"],
      serif: ["ui-serif", "Georgia", "Noto Serif JP", "serif"],
      mono: ["ui-monospace", "SFMono-Regular", "Noto Sans JP", "sans-serif"],
    },
  },
  plugins: [],
};
export default config;
