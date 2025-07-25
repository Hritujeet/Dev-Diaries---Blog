import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https", // Allows images from any HTTPS domain
                hostname: "**", // Wildcard for any hostname
            },
        ],
    },
};

export default nextConfig;
