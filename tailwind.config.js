/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Brand blue. #16508C is the primary tone — the darker/lighter steps are
        // tuned around it so every `blue-500…900` utility resolves on-brand.
        // Lighter shades (50–400) intentionally keep Tailwind defaults so light
        // text/backgrounds on dark gradients retain their contrast.
        blue: {
          500: '#2570BF',
          600: '#1C62A8',
          700: '#16508C',
          800: '#123F6E',
          900: '#0D2E50',
        },
      },
    },
  },
  plugins: [],
};
