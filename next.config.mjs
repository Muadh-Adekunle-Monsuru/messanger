/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'products.ls.graphics',
			},
		],
	},
};

export default nextConfig;
