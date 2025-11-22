/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['res.cloudinary.com', 'kreatlimedia.s3.amazonaws.com', 'kreatliassets.s3.amazonaws.com'],
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
      {
        source: '/video-sharing-tools-present-drafts-fast-approvals',
        destination: '/blog/video-sharing-tools-present-drafts-fast-approvals',
        permanent: true,
      },
      {
        source: '/post-production-video-editing-how-collaboration-tools-improve-cuts',
        destination: '/blog/post-production-video-editing-how-collaboration-tools-improve-cuts',
        permanent: true,
      },
      {
        source: '/producers-playbook-creative-production-management-software',
        destination: '/blog/producers-playbook-creative-production-management-software',
        permanent: true,
      },
      {
        source: '/minimal-tech-stack-small-creative-teams',
        destination: '/blog/minimal-tech-stack-small-creative-teams',
        permanent: true,
      },
      {
        source: '/from-brief-to-publish-asset-management-software',
        destination: '/blog/from-brief-to-publish-asset-management-software',
        permanent: true,
      },
      {
        source: '/fiverr-project-manager-how-to-run-client-workflows',
        destination: '/blog/fiverr-project-manager-how-to-run-client-workflows',
        permanent: true,
      },
      {
        source: '/upwork-project-manager-setup-track-jobs-milestones-deliverables',
        destination: '/blog/upwork-project-manager-setup-track-jobs-milestones-deliverables',
        permanent: true,
      },
      {
        source: '/dms-cloud-vs-dms-saas-creative-teams',
        destination: '/blog/dms-cloud-vs-dms-saas-creative-teams',
        permanent: true,
      },
      {
        source: '/best-creative-project-management-software-2026',
        destination: '/blog/best-creative-project-management-software-2026',
        permanent: true,
      },
      {
        source: '/best-creative-project-management-software-freelancers-solopreneurs',
        destination: '/blog/best-creative-project-management-software-freelancers-solopreneurs',
        permanent: true,
      },
      {
        source: '/top-5-most-read-blog-posts-on-kreatli',
        destination: '/blog/top-5-most-read-blog-posts-on-kreatli',
        permanent: true,
      },
      {
        source: '/mam-vs-dam-which-asset-system-right-for-creative-teams',
        destination: '/blog/mam-vs-dam-which-asset-system-right-for-creative-teams',
        permanent: true,
      },
      {
        source: '/essential-features-creative-collaboration-platforms',
        destination: '/blog/essential-features-creative-collaboration-platforms',
        permanent: true,
      },
      {
        source: '/kreatli-vs-frame-io-comparison-2025',
        destination: '/blog/kreatli-vs-frame-io-comparison-2025',
        permanent: true,
      },
      {
        source: '/design-post-production-workflow-that-scales',
        destination: '/blog/design-post-production-workflow-that-scales',
        permanent: true,
      },
      {
        source: '/cloud-file-sharing-freelance-collaboration',
        destination: '/blog/cloud-file-sharing-freelance-collaboration',
        permanent: true,
      },
      {
        source: '/free-online-cloud-storage',
        destination: '/blog/free-online-cloud-storage',
        permanent: true,
      },
      {
        source: '/ultimate-guide-file-transfer-cloud-sharing-video-teams',
        destination: '/blog/ultimate-guide-file-transfer-cloud-sharing-video-teams',
        permanent: true,
      },
      {
        source: '/send-large-files-to-clients-20gb-tools',
        destination: '/blog/send-large-files-to-clients-20gb-tools',
        permanent: true,
      },
      {
        source: '/how-to-send-gb-fast-ways-share-large-files',
        destination: '/blog/how-to-send-gb-fast-ways-share-large-files',
        permanent: true,
      },
      {
        source: '/secure-ways-to-send-large-video-files',
        destination: '/blog/secure-ways-to-send-large-video-files',
        permanent: true,
      },
      {
        source: '/file-sharing-vs-file-transfer',
        destination: '/blog/file-sharing-vs-file-transfer',
        permanent: true,
      },
      {
        source: '/top-file-management-online-platforms-compare',
        destination: '/blog/top-file-management-online-platforms-compare',
        permanent: true,
      },
      {
        source: '/best-frameio-alternatives-video-review-2025',
        destination: '/blog/best-frameio-alternatives-video-review-2025',
        permanent: true,
      },
      {
        source: '/top-5-video-collaboration-tools-2025',
        destination: '/blog/top-5-video-collaboration-tools-2025',
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
