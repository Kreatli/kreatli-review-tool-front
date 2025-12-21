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
        destination: '/blog/video-sharing-tools',
        permanent: true,
      },
      {
        source: '/post-production-video-editing-how-collaboration-tools-improve-cuts',
        destination: '/blog/video-post-production',
        permanent: true,
      },
      {
        source: '/producers-playbook-creative-production-management-software',
        destination: '/blog/creative-production-management',
        permanent: true,
      },
      {
        source: '/minimal-tech-stack-small-creative-teams',
        destination: '/blog/tech-stack-creative-teams',
        permanent: true,
      },
      {
        source: '/from-brief-to-publish-asset-management-software',
        destination: '/blog/asset-management-software',
        permanent: true,
      },
      {
        source: '/fiverr-project-manager-how-to-run-client-workflows',
        destination: '/blog/fiverr-manage-projects',
        permanent: true,
      },
      {
        source: '/upwork-project-manager-setup-track-jobs-milestones-deliverables',
        destination: '/blog/upwork-manage-projects',
        permanent: true,
      },
      {
        source: '/dms-cloud-vs-dms-saas-creative-teams',
        destination: '/blog/dms-for-creative-teams',
        permanent: true,
      },
      {
        source: '/best-creative-project-management-software-2026',
        destination: '/blog/creative-project-management',
        permanent: true,
      },
      {
        source: '/best-creative-project-management-software-freelancers-solopreneurs',
        destination: '/blog/project-management-software',
        permanent: true,
      },
      {
        source: '/top-5-most-read-blog-posts-on-kreatli',
        destination: '/blog/kreatli-top-posts',
        permanent: true,
      },
      {
        source: '/mam-vs-dam-which-asset-system-right-for-creative-teams',
        destination: '/blog/mam-vs-dam',
        permanent: true,
      },
      {
        source: '/essential-features-creative-collaboration-platforms',
        destination: '/blog/creative-collaboration-platforms',
        permanent: true,
      },
      {
        source: '/kreatli-vs-frame-io-comparison-2025',
        destination: '/blog/kreatli-vs-frameio',
        permanent: true,
      },
      {
        source: '/design-post-production-workflow-that-scales',
        destination: '/blog/post-production-workflow',
        permanent: true,
      },
      {
        source: '/cloud-file-sharing-freelance-collaboration',
        destination: '/blog/cloud-file-sharing',
        permanent: true,
      },
      {
        source: '/free-online-cloud-storage',
        destination: '/blog/free-cloud-storage',
        permanent: true,
      },
      {
        source: '/ultimate-guide-file-transfer-cloud-sharing-video-teams',
        destination: '/blog/file-transfer-guide',
        permanent: true,
      },
      {
        source: '/send-large-files-to-clients-20gb-tools',
        destination: '/blog/large-file-tools',
        permanent: true,
      },
      {
        source: '/how-to-send-gb-fast-ways-share-large-files',
        destination: '/blog/send-large-files',
        permanent: true,
      },
      {
        source: '/secure-ways-to-send-large-video-files',
        destination: '/blog/send-large-video-files',
        permanent: true,
      },
      {
        source: '/file-sharing-vs-file-transfer',
        destination: '/blog/file-sharing-vs-file-transfer',
        permanent: true,
      },
      {
        source: '/top-file-management-online-platforms-compare',
        destination: '/blog/file-management-platforms',
        permanent: true,
      },
      {
        source: '/best-frameio-alternatives-video-review-2025',
        destination: '/blog/frameio-alternatives',
        permanent: true,
      },
      {
        source: '/top-5-video-collaboration-tools-2025',
        destination: '/blog/video-collaboration-tools',
        permanent: true,
      },
      {
        source: '/blog/how-marketing-teams-use-kreatli-to-manage-production-from-brief-to-launch',
        destination: '/blog/marketing-production-management',
        permanent: true,
      },
      {
        source: '/blog/secure-ways-to-send-large-video-files',
        destination: '/blog/send-large-video-files',
        permanent: true,
      },
      {
        source: '/blog/best-frameio-alternatives-video-review-2026',
        destination: '/blog/frameio-alternatives-2026',
        permanent: true,
      },
      { source: '/blog/free-online-cloud-storage', destination: '/blog/free-cloud-storage', permanent: true },
      {
        source: '/blog/mam-vs-dam-which-asset-system-right-for-creative-teams',
        destination: '/blog/mam-vs-dam',
        permanent: true,
      },
      {
        source: '/blog/minimal-tech-stack-small-creative-teams',
        destination: '/blog/tech-stack-creative-teams',
        permanent: true,
      },
      {
        source: '/blog/ultimate-guide-file-transfer-cloud-sharing-video-teams',
        destination: '/blog/file-transfer-guide',
        permanent: true,
      },
      {
        source: '/blog/safe-zone-guide-instagram-reels-youtube-shorts-tiktok',
        destination: '/blog/safe-zone-guide',
        permanent: true,
      },
      {
        source: '/blog/kreatli-for-creative-agencies-how-to-run-client-production-without-tool-sprawl',
        destination: '/blog/creative-agencies-production',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-frameio-2026-comparison',
        destination: '/blog/kreatli-vs-frameio-2026',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-krock-io-the-right-choice-for-teams-scaling-creative-production',
        destination: '/blog/kreatli-vs-krockio',
        permanent: true,
      },
      {
        source: '/blog/small-but-mighty-why-creative-teams-are-moving-toward-unified-production-platforms',
        destination: '/blog/production-platform-for-creative-teams',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-studiobinder-production-management-vs-production-planning',
        destination: '/blog/kreatli-vs-studiobinder',
        permanent: true,
      },
      {
        source:
          '/blog/proofing-software-vs-production-management-key-differences-and-the-best-choice-for-creative-teams',
        destination: '/blog/proofing-software',
        permanent: true,
      },
      {
        source: '/blog/7-ways-share-large-video-files-with-clients-review-approval',
        destination: '/blog/share-large-video-files',
        permanent: true,
      },
      {
        source: '/blog/why-the-tooling-market-forces-content-teams-into-a-lose-lose-choice',
        destination: '/blog/tooling-for-content-teams',
        permanent: true,
      },
      {
        source: '/blog/frameio-alternatives-why-teams-switch-to-kreatli',
        destination: '/blog/frameio-alternatives',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-clickup-production-management-vs-project-management',
        destination: '/blog/kreatli-vs-clickup',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-notion-production-management-vs-flexible-workspace',
        destination: '/blog/kreatli-vs-notion',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-ziflow-production-management-platform-vs-enterprise-online-proofing',
        destination: '/blog/kreatli-vs-ziflow',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-filestage-production-management-vs-online-proofing',
        destination: '/blog/kreatli-vs-filestage',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-wipster-production-management-vs-video-review',
        destination: '/blog/kreatli-vs-wipster',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-lucidlink-remote-editing-streaming-vs-production-orchestration',
        destination: '/blog/kreatli-vs-lucidlink',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-dropbox-google-drive-file-storage-vs-production-management',
        destination: '/blog/kreatli-vs-dropbox',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-monday-custom-workflows-vs-production-software',
        destination: '/blog/kreatli-vs-monday',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-asana-why-production-teams-need-more-than-a-generic-pm-tool',
        destination: '/blog/kreatli-vs-asana',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-iconik-production-management-vs-cloud-mam',
        destination: '/blog/kreatli-vs-iconik',
        permanent: true,
      },
      {
        source: '/blog/realtime-vs-asynchronous-collaboration-tools',
        destination: '/blog/asynchronous-collaboration-tools',
        permanent: true,
      },
      {
        source: '/blog/best-virtual-team-collaboration-tools-creative-2026',
        destination: '/blog/virtual-collaboration-tools',
        permanent: true,
      },
      {
        source: '/blog/top-5-video-collaboration-tools-2026',
        destination: '/blog/video-collaboration-tools',
        permanent: true,
      },
      {
        source: '/blog/upwork-project-manager-setup-track-jobs-milestones-deliverables',
        destination: '/blog/upwork-manage-projects',
        permanent: true,
      },
      {
        source: '/blog/top-file-management-online-platforms-compare',
        destination: '/blog/file-management-platforms',
        permanent: true,
      },
      {
        source: '/blog/from-brief-to-publish-asset-management-software',
        destination: '/blog/asset-management-software',
        permanent: true,
      },
      {
        source: '/blog/send-large-files-to-clients-20gb-tools',
        destination: '/blog/large-file-tools',
        permanent: true,
      },
      {
        source: '/blog/dms-cloud-vs-dms-saas-creative-teams',
        destination: '/blog/dms-for-creative-teams',
        permanent: true,
      },
      {
        source: '/blog/post-production-video-editing-how-collaboration-tools-improve-cuts',
        destination: '/blog/video-post-production',
        permanent: true,
      },
      {
        source: '/blog/best-creative-project-management-software-2026',
        destination: '/blog/creative-project-management',
        permanent: true,
      },
      {
        source: '/blog/cloud-file-sharing-freelance-collaboration',
        destination: '/blog/cloud-file-sharing',
        permanent: true,
      },
      {
        source: '/blog/fiverr-project-manager-how-to-run-client-workflows',
        destination: '/blog/fiverr-manage-projects',
        permanent: true,
      },
      {
        source: '/blog/producers-playbook-creative-production-management-software',
        destination: '/blog/creative-production-management',
        permanent: true,
      },
      {
        source: '/blog/video-sharing-tools-present-drafts-fast-approvals',
        destination: '/blog/video-sharing-tools',
        permanent: true,
      },
      {
        source: '/blog/how-to-send-gb-fast-ways-share-large-files',
        destination: '/blog/send-large-files',
        permanent: true,
      },
      {
        source: '/blog/best-creative-project-management-software-freelancers-solopreneurs',
        destination: '/blog/project-management-software',
        permanent: true,
      },
      {
        source: '/blog/top-5-most-read-blog-posts-on-kreatli',
        destination: '/blog/kreatli-top-posts',
        permanent: true,
      },
      {
        source: '/blog/essential-features-creative-collaboration-platforms',
        destination: '/blog/creative-collaboration-platforms',
        permanent: true,
      },
      {
        source: '/blog/design-post-production-workflow-that-scales',
        destination: '/blog/post-production-workflow',
        permanent: true,
      },
      { source: '/blog/kreatli-vs-frame-io-comparison-2026', destination: '/blog/kreatli-vs-frameio', permanent: true },
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
