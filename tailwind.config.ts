import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary:'#EFF8FF',
        primary: '#1570EF',
        footerBlue: '#1849A9',
        darkPrimary:'#194185',
        lightBg: '#F9FAFB'
      },
    },
  },
  plugins: [],
  
};
export default config;
