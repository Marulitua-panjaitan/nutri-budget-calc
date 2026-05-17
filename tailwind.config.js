/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0b0f17",       // Background super gelap premium
        panelBg: "#111827",      // Background kartu/form
        neonGreen: "#10b981",    // Representasi gizi sehat / aman di kantong
        neonCyan: "#06b6d4",     // Representasi kalkulator/fitur presisi
        neonAmber: "#f59e0b",    // Representasi batas budget harian
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.15)',
        'glow-green': '0 0 20px rgba(16, 185, 129, 0.15)',
      }
    },
  },
  plugins: [],
}