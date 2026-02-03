import withSerwistInit from "@serwist/next";

const isDev = process.env.NODE_ENV === "development";

const withSerwist = withSerwistInit({
    swSrc: "src/app/sw.ts",
    swDest: "public/sw.js",
    disable: isDev, // Disable PWA in development for faster builds
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
            },
            {
                protocol: 'https',
                hostname: 'gasthofgraf.at',
            },
            {
                protocol: 'https',
                hostname: 'gasthausgraf.at',
            }
        ],
    },
    // Turbo is enabled by default in Next 15, we remove the webpack override
    // unless explicitly needed for serwist (but we disabled it in dev)
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default withSerwist(nextConfig);
