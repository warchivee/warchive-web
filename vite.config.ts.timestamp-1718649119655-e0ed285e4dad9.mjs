// vite.config.ts
import { defineConfig } from "file:///C:/develop/warchive/warchive-web/node_modules/.pnpm/vite@5.1.1_sass@1.70.0/node_modules/vite/dist/node/index.js";
import react from "file:///C:/develop/warchive/warchive-web/node_modules/.pnpm/@vitejs+plugin-react@4.2.1_vite@5.1.1/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tsconfigPaths from "file:///C:/develop/warchive/warchive-web/node_modules/.pnpm/vite-tsconfig-paths@4.3.1_typescript@5.3.3_vite@5.1.1/node_modules/vite-tsconfig-paths/dist/index.mjs";
import svgr from "file:///C:/develop/warchive/warchive-web/node_modules/.pnpm/vite-plugin-svgr@4.2.0_typescript@5.3.3_vite@5.1.1/node_modules/vite-plugin-svgr/dist/index.js";
import mkcert from "file:///C:/develop/warchive/warchive-web/node_modules/.pnpm/vite-plugin-mkcert@1.17.5_vite@5.1.1/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
var vite_config_default = defineConfig({
  plugins: [react(), tsconfigPaths(), svgr(), mkcert()],
  cacheDir: ".vite/",
  base: "/",
  // github page 로 배포 시 /warchive-web/ (레포명) 을 여기에 입력하고, Browser Router 의 baseUrl 에도 입력합니다.
  build: {
    outDir: "build"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxkZXZlbG9wXFxcXHdhcmNoaXZlXFxcXHdhcmNoaXZlLXdlYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcZGV2ZWxvcFxcXFx3YXJjaGl2ZVxcXFx3YXJjaGl2ZS13ZWJcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L2RldmVsb3Avd2FyY2hpdmUvd2FyY2hpdmUtd2ViL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnO1xyXG5pbXBvcnQgc3ZnciBmcm9tICd2aXRlLXBsdWdpbi1zdmdyJztcclxuXHJcbmltcG9ydCBta2NlcnQgZnJvbSAndml0ZS1wbHVnaW4tbWtjZXJ0JztcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3JlYWN0KCksIHRzY29uZmlnUGF0aHMoKSwgc3ZncigpLCBta2NlcnQoKV0sXHJcbiAgY2FjaGVEaXI6ICcudml0ZS8nLFxyXG4gIGJhc2U6ICcvJywgLy8gZ2l0aHViIHBhZ2UgXHVCODVDIFx1QkMzMFx1RDNFQyBcdUMyREMgL3dhcmNoaXZlLXdlYi8gKFx1QjgwOFx1RDNFQ1x1QkE4NSkgXHVDNzQ0IFx1QzVFQ1x1QUUzMFx1QzVEMCBcdUM3ODVcdUI4MjVcdUQ1NThcdUFDRTAsIEJyb3dzZXIgUm91dGVyIFx1Qzc1OCBiYXNlVXJsIFx1QzVEMFx1QjNDNCBcdUM3ODVcdUI4MjVcdUQ1NjlcdUIyQzhcdUIyRTQuXHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcjogJ2J1aWxkJyxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwUixTQUFTLG9CQUFvQjtBQUN2VCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxVQUFVO0FBRWpCLE9BQU8sWUFBWTtBQUduQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFHLGNBQWMsR0FBRyxLQUFLLEdBQUcsT0FBTyxDQUFDO0FBQUEsRUFDcEQsVUFBVTtBQUFBLEVBQ1YsTUFBTTtBQUFBO0FBQUEsRUFDTixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsRUFDVjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
