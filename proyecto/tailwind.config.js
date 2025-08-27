/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#16a34a",
          foreground: "#f0fdf4",
        },
      },
      typography: (theme) => ({
        invert: {
          css: {
            "--tw-prose-body": theme("colors.neutral[300]"),
            "--tw-prose-headings": theme("colors.brand.foreground"),
            "--tw-prose-links": theme("colors.brand.DEFAULT"),
            "--tw-prose-bold": theme("colors.neutral[100]"),
            "--tw-prose-counters": theme("colors.neutral[400]"),
            "--tw-prose-bullets": theme("colors.neutral[600]"),
            "--tw-prose-hr": theme("colors.neutral[800]"),
            "--tw-prose-quotes": theme("colors.neutral[200]"),
            "--tw-prose-code": theme("colors.green[300]"),
            "--tw-prose-pre-bg": theme("colors.neutral[900]"),
            "pre code": {
              fontSize: "0.85rem",
              lineHeight: "1.5",
            },
            code: {
              fontWeight: "400",
              backgroundColor: theme("colors.neutral[900] / 0.6"),
              padding: "0.15rem 0.4rem",
              borderRadius: "0.375rem",
              border: "1px solid " + theme("colors.neutral[800]"),
            },
            "h1,h2,h3": {
              scrollMarginTop: "6rem",
            },
            "p,ul,ol,pre,blockquote,table": {
              marginTop: "1.1em",
              marginBottom: "1.1em",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
