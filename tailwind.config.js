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
				"violet-blue-profile": "#877fa9",
				"violet-blue-landing": "#9ba1ce",
				"main-green": "#418154",
				"main-yellow": "#F3D40C",
				"secondary-yellow": "#e1c512",
				"darkest-blue": "#140E46",
				"dark-blue": "#271B80",
				"medium-blue": "#313BAB",
				"light-blue": "#4F5EC7",
				link: "#F4F4F5",
			},
		},
	},
	plugins: [],
};
