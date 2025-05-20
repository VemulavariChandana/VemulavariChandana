/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
     // Ensure Edge runtime for API routes
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      // Enable code splitting for Edge functions to reduce function size
      config.optimization.splitChunks = {
        chunks: "all", // Split large code into smaller chunks
      };
    }
    return config;
  },
  reactStrictMode: true, // Optional: Enables React Strict Mode (for development)
  swcMinify: true, // Use SWC for faster minification (recommended for Next.js)
};

export default nextConfig;
