import react from "@vitejs/plugin-react-swc";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	base: process.env.GITHUB_PAGES ? "/genpass" : "./",
	plugins: [UnoCSS(), react()],
});
