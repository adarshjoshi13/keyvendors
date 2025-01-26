/** @type {import('next').NextConfig} */

const rewrites = async (API_URL) => {
  try {
      // Fetch city routes
      const citiesResponse = await fetch(`${API_URL}/location/cities`);
      const citiesRs = await citiesResponse.json();

      const citiesOb = citiesRs?.data?.map((city) => ({
          source: `/${city.slug}`,
          destination: `/`,
      })) || []; // Fallback to an empty array if data is missing

      // Fetch static page routes
      const staticResponse = await fetch(`${API_URL}/pages`);
      const staticRs = await staticResponse.json();

      const staticOb = staticRs?.data?.map((page) => ({
          source: `/${page.slug}`,
          destination: `/static/${page.slug}`,
      })) || []; // Fallback to an empty array if data is missing

      return [
          ...citiesOb,
          ...staticOb,
      ];
  } catch (error) {
      console.error("Error generating rewrites:", error);

      // Return an empty array to avoid breaking the build
      return [];
  }
};

const nextConfig = {
  reactStrictMode: true,
  // experimental: {
    // largePageDataBytes: 200 * 1000, // 200KB by default
      // largePageDataBytes: 128 * 100000,
    // },
  env: {
    HOST: process.env.HOST,
    PAY_URL: process.env.PAY_URL,
    PAY_KEY: process.env.PAY_KEY,
    PAY_SECRET: process.env.PAY_SECRET,
    PAY_ENV: process.env.PAY_ENV,
    API_URL: process.env.API_URL,
    CDN_URL: process.env.CDN_URL,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  },
  images: {
    minimumCacheTTL: 600,
    domains: [
      "keyvendors.com",
      "www.keyvendors.com",
      "stg.keyvendors.com",
      "localhost",
    ], // <== Domain name
  },
  async rewrites() {
    return rewrites(process.env.API_URL);
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=9999999999, must-revalidate',
          }
        ],
      },
    ]
  },
};

module.exports = nextConfig;
