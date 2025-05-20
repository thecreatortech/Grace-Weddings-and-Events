// This is the Next.js configuration file for the FinGenie application
/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
	},
	// Remove experimental.serverActions as it's now available by default

	typescript: {
		ignoreBuildErrors: true,
	},
};
module.exports = nextConfig;
