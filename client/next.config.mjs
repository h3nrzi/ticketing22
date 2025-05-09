/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "http://ticketing.dev/api/:path*",
			},
		];
	},
};

export default nextConfig;
