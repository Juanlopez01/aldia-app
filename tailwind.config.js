/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				"main-green": "#418154",
				"main-yellow": "#F3D40C",
				"dark-blue": "#271B80",
				"medium-blue": "#313BAB",
				"light-blue": "#4F5EC7",
			},
		},
	},
	plugins: [],
};
