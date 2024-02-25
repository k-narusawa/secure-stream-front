import type { Config } from "tailwindcss";

const config: Config = {
  presets: [require("../configs/tailwind/tailwind.config")],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../shared-components/src/**/*.{js,ts,jsx,tsx}",
    "../configs/tailwind/tailwind.config.ts",
  ],
  plugins: [],
};
export default config;
