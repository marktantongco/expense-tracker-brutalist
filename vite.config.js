import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => {
  const isVercel = Boolean(process.env.VERCEL);
  const isGitHubPages = Boolean(process.env.GITHUB_PAGES);

  return {
    plugins: [react()],
    base: isVercel ? '/' : (isGitHubPages ? '/expense-tracker-brutalist/' : '/'),
  };
})
