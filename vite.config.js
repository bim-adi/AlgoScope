import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import flowbiteReact from "flowbite-react/plugin/vite";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],
})