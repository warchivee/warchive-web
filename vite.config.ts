import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import vercel from 'vite-plugin-vercel';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), vercel()],
  cacheDir: '.vite/',
  base: '', // github page 로 배포 시 /warchive-web/ (레포명) 을 여기에 입력하고, Browser Router 의 baseUrl 에도 입력합니다.
  vercel: {
    outDir: 'build',
  },
});
