import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
 
    
    plugins: [react()],
    base: "/Face_Recognition/",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  
});
