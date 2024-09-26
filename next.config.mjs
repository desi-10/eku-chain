/** @type {import('next').NextConfig} */
const nextConfig = {
    // remote paterns
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "agriguru.pythonanywhere.com",
            },
        ],
    },
};

export default nextConfig;
