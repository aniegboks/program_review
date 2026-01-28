import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// Replace 'program_review' with your GitHub repo name
export default defineConfig({
  base: "/program_review/",
  plugins: [
    react(),
    tailwindcss(),
  ],
})
