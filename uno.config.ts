import { defineConfig, presetAttributify, presetWind } from "unocss";

export default defineConfig({
	presets: [presetWind(), presetAttributify()],
});
