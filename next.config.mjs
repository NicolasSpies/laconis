/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      // Altroute → neue Route (2026-04 umbenannt: grafik → branding)
      {
        source: "/leistungen/grafik",
        destination: "/leistungen/branding",
        permanent: true,
      },
      {
        source: "/leistungen/grafik/:path*",
        destination: "/leistungen/branding/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
