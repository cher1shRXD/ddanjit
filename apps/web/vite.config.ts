import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],
  server: {
    host: true,
    // https: {
    //   key: fs.readFileSync("/Users/cher1shRXD/cher1shrxds-macbookpro.tail1ddfe6.ts.net.key"),
    //   cert: fs.readFileSync("/Users/cher1shRXD/cher1shrxds-macbookpro.tail1ddfe6.ts.net.crt"),
    // },
    watch: {
      ignored: ["!**/packages/ui/**"],
    },
  },
  optimizeDeps: {
    force: true,
    include: ["@ddanjit/ui"],
  },
});
