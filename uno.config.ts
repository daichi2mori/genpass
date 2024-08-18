import {
	defineConfig,
	toEscapedSelector as e,
	presetAttributify,
	presetIcons,
	presetWind,
} from "unocss";

export default defineConfig({
	presets: [presetWind(), presetAttributify(), presetIcons()],
	rules: [
		[
			/no-spinner/,
			([, name], { rawSelector, currentSelector, variantHandlers, theme }) => {
				const selector = e(rawSelector);
				return `
					${selector}::-webkit-outer-spin-button,
					${selector}::-webkit-inner-spin-button {
						-webkit-appearance: none;
						-moz-appearance:textfield;
					}
				`;
			},
		],
	],
	shortcuts: {
		"label-style": "cursor-pointer flex items-center gap-1 w-fit",
	},
});
