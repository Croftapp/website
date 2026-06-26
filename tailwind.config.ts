import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        body: "var(--body-color)",
        muted: "var(--fg-muted)",
        num: "var(--num-color)",
        rule: "var(--rule-color)",
      },
      fontFamily: {
        hero: "var(--font-hero)",
        head: "var(--font-head)",
        body: "var(--font-body)",
        ui: "var(--font-ui)",
      },
    },
  },
  plugins: [],
};

export default config;
