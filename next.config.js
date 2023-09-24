/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: "qekizunytsypfkklwzte.supabase.co" }],
    },
    experimental: {
        serverActions: true,
    },
};

module.exports = nextConfig;
