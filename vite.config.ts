import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "dreamachine",
        short_name: "dreamachine",
        description: "Dreamachine and Binaural beats",
        theme_color: "#000000",
        display_override: ["window-control-overlay", "minimal-ui"],
        display: "standalone",
      },
    }),
  ],
});
