import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { setupRoutes } from "./app/routes";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
      routes: setupRoutes
    }),
    tsconfigPaths(),
  ],
  base: '/',
  server: {//dev server
    host: true, // allow external access
    allowedHosts: [
      "garssete.gasimg.com",
      "edition.garssete.com",
      "index.veycet.com",
      "testindex.veycet.com",
      "bycet.com",
      "test.bycet.com",
      "test.ashthor.com",
      "ashthor.com"
    ], // <-- your domain here
    hmr: {
      port: Number(process.env.VITE_HMR_PORT), // or any other available port
      path: '/hmr'
    },
  },
});
