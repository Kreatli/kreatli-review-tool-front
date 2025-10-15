/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['res.cloudinary.com', 'kreatlimedia.s3.amazonaws.com'],
  },
  experimental: {
    scrollRestoration: true,
  },
  env: {
    API_URL: process.env.API_URL,
    GTM_ID: process.env.GTM_ID,
    GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    STORYBLOK_STATUS: process.env.STORYBLOK_STATUS,
    STORYBLOK_CONTENT_API_ACCESS_TOKEN: process.env.STORYBLOK_CONTENT_API_ACCESS_TOKEN,
  },
  productionBrowserSourceMaps: true,
  swcMinify: false,
  async redirects() {
    return [
      {
        source: '/signup/professional',
        destination: '/sign-up',
        permanent: true,
      },
      {
        source: '/signup/professional',
        destination: '/sign-up',
        permanent: true,
      },
      {
        source: '/faq',
        destination: '/',
        permanent: true,
      },
    ];
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ },
        use: ['@svgr/webpack'],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

module.exports = nextConfig;
