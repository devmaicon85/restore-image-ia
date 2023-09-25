/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    images: {
        remotePatterns: [{ hostname: "qekizunytsypfkklwzte.supabase.co" }],
    },
    experimental: {
        serverActions: true,
    },
};

module.exports = nextConfig;
