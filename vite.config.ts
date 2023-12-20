import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  cacheDir: '.vite/',
  base: '', // 배포 시 빈 화면 오류로 수정 - 파일 경로가 base 를 기준으로 지정됨
  build: {
    outDir: 'build',
  },
});
