/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "icon-library.com",
				port: "",
				pathname: "/images/generic-user-icon/generic-user-icon-18.jpg",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			},
			{
				protocol: "https",
				hostname: "t3.ftcdn.net",
				port: "",
				pathname: "/**",
			},
		],
	},
	env: {
		BASE_URL: process.env.BASE_URL,
	},
};

module.exports = nextConfig;
