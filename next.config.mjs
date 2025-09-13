/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/pricing", destination: "/", permanent: true },
      { source: "/features", destination: "/", permanent: true },
      { source: "/about", destination: "/", permanent: true },
      { source: "/testimonials", destination: "/", permanent: true },
      { source: "/services/:slug", destination: "/services/lead-generation", permanent: true },
    ];
  },
};

export default nextConfig;