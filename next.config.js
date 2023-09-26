/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    images: {
        remotePatterns: [{ hostname: "*.supabase.co" }],
    },
    experimental: {
        serverActions: true,
    },
};

module.exports = nextConfig;
