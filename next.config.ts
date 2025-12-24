import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	turbopack: {},
	compress: true,
	poweredByHeader: false,
	reactStrictMode: true,
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*.*',
				port: '',
				pathname: '/**',
			},
		],
		formats: ['image/avif', 'image/webp'],
		minimumCacheTTL: 60 * 60 * 24 * 30,
	},
};

export default nextConfig;
