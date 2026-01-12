/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'kreatlimedia.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'kreatliassets.s3.amazonaws.com',
      },
    ],
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
        destination: '/comparisons/video-sharing-tools',
        permanent: true,
      },
      {
        source: '/post-production-video-editing-how-collaboration-tools-improve-cuts',
        destination: '/blog/video-post-production',
        permanent: true,
      },
      {
        source: '/producers-playbook-creative-production-management-software',
        destination: '/guides/creative-production-management',
        permanent: true,
      },
      {
        source: '/minimal-tech-stack-small-creative-teams',
        destination: '/guides/tech-stack-creative-teams',
        permanent: true,
      },
      {
        source: '/from-brief-to-publish-asset-management-software',
        destination: '/blog/asset-management-software',
        permanent: true,
      },
      {
        source: '/fiverr-project-manager-how-to-run-client-workflows',
        destination: '/guides/fiverr-manage-projects',
        permanent: true,
      },
      {
        source: '/upwork-project-manager-setup-track-jobs-milestones-deliverables',
        destination: '/guides/upwork-manage-projects',
        permanent: true,
      },
      {
        source: '/dms-cloud-vs-dms-saas-creative-teams',
        destination: '/comparisons/dms-for-creative-teams',
        permanent: true,
      },
      {
        source: '/best-creative-project-management-software-2026',
        destination: '/comparisons/creative-project-management',
        permanent: true,
      },
      {
        source: '/best-creative-project-management-software-freelancers-solopreneurs',
        destination: '/comparisons/project-management-software',
        permanent: true,
      },
      {
        source: '/top-5-most-read-blog-posts-on-kreatli',
        destination: '/blog/kreatli-top-posts',
        permanent: true,
      },
      {
        source: '/mam-vs-dam-which-asset-system-right-for-creative-teams',
        destination: '/comparisons/mam-vs-dam',
        permanent: true,
      },
      {
        source: '/essential-features-creative-collaboration-platforms',
        destination: '/blog/creative-collaboration-platforms',
        permanent: true,
      },
      {
        source: '/kreatli-vs-frame-io-comparison-2025',
        destination: '/comparisons/kreatli-vs-frameio',
        permanent: true,
      },
      {
        source: '/design-post-production-workflow-that-scales',
        destination: '/guides/post-production-workflow',
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
        destination: '/guides/file-transfer-guide',
        permanent: true,
      },
      {
        source: '/send-large-files-to-clients-20gb-tools',
        destination: '/guides/large-file-tools',
        permanent: true,
      },
      {
        source: '/how-to-send-gb-fast-ways-share-large-files',
        destination: '/guides/send-large-files',
        permanent: true,
      },
      {
        source: '/secure-ways-to-send-large-video-files',
        destination: '/guides/send-large-video-files',
        permanent: true,
      },
      {
        source: '/file-sharing-vs-file-transfer',
        destination: '/comparisons/file-sharing-vs-file-transfer',
        permanent: true,
      },
      {
        source: '/top-file-management-online-platforms-compare',
        destination: '/comparisons/file-management-platforms',
        permanent: true,
      },
      {
        source: '/best-frameio-alternatives-video-review-2025',
        destination: '/comparisons/frameio-alternatives',
        permanent: true,
      },
      {
        source: '/top-5-video-collaboration-tools-2025',
        destination: '/comparisons/video-collaboration-tools',
        permanent: true,
      },
      {
        source: '/blog/how-marketing-teams-use-kreatli-to-manage-production-from-brief-to-launch',
        destination: '/guides/marketing-production-management',
        permanent: true,
      },
      {
        source: '/blog/secure-ways-to-send-large-video-files',
        destination: '/guides/send-large-video-files',
        permanent: true,
      },
      {
        source: '/blog/best-frameio-alternatives-video-review-2026',
        destination: '/comparisons/frameio-alternatives-2026',
        permanent: true,
      },
      { source: '/blog/free-online-cloud-storage', destination: '/blog/free-cloud-storage', permanent: true },
      {
        source: '/blog/mam-vs-dam-which-asset-system-right-for-creative-teams',
        destination: '/comparisons/mam-vs-dam',
        permanent: true,
      },
      {
        source: '/blog/minimal-tech-stack-small-creative-teams',
        destination: '/guides/tech-stack-creative-teams',
        permanent: true,
      },
      {
        source: '/blog/ultimate-guide-file-transfer-cloud-sharing-video-teams',
        destination: '/guides/file-transfer-guide',
        permanent: true,
      },
      {
        source: '/blog/safe-zone-guide-instagram-reels-youtube-shorts-tiktok',
        destination: '/guides/safe-zone-guide',
        permanent: true,
      },
      {
        source: '/blog/kreatli-for-creative-agencies-how-to-run-client-production-without-tool-sprawl',
        destination: '/guides/creative-agencies-production',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-frameio-2026-comparison',
        destination: '/comparisons/kreatli-vs-frameio-2026',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-krock-io-the-right-choice-for-teams-scaling-creative-production',
        destination: '/comparisons/kreatli-vs-krockio',
        permanent: true,
      },
      {
        source: '/blog/small-but-mighty-why-creative-teams-are-moving-toward-unified-production-platforms',
        destination: '/blog/production-platform-for-creative-teams',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-studiobinder-production-management-vs-production-planning',
        destination: '/comparisons/kreatli-vs-studiobinder',
        permanent: true,
      },
      {
        source:
          '/blog/proofing-software-vs-production-management-key-differences-and-the-best-choice-for-creative-teams',
        destination: '/comparisons/proofing-software',
        permanent: true,
      },
      {
        source: '/blog/7-ways-share-large-video-files-with-clients-review-approval',
        destination: '/guides/share-large-video-files',
        permanent: true,
      },
      {
        source: '/blog/why-the-tooling-market-forces-content-teams-into-a-lose-lose-choice',
        destination: '/blog/tooling-for-content-teams',
        permanent: true,
      },
      {
        source: '/blog/frameio-alternatives-why-teams-switch-to-kreatli',
        destination: '/comparisons/frameio-alternatives',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-clickup-production-management-vs-project-management',
        destination: '/comparisons/kreatli-vs-clickup',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-notion-production-management-vs-flexible-workspace',
        destination: '/comparisons/kreatli-vs-notion',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-ziflow-production-management-platform-vs-enterprise-online-proofing',
        destination: '/comparisons/kreatli-vs-ziflow',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-filestage-production-management-vs-online-proofing',
        destination: '/comparisons/kreatli-vs-filestage',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-wipster-production-management-vs-video-review',
        destination: '/comparisons/kreatli-vs-wipster',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-lucidlink-remote-editing-streaming-vs-production-orchestration',
        destination: '/comparisons/kreatli-vs-lucidlink',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-dropbox-google-drive-file-storage-vs-production-management',
        destination: '/comparisons/kreatli-vs-dropbox',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-monday-custom-workflows-vs-production-software',
        destination: '/comparisons/kreatli-vs-monday',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-asana-why-production-teams-need-more-than-a-generic-pm-tool',
        destination: '/comparisons/kreatli-vs-asana',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-iconik-production-management-vs-cloud-mam',
        destination: '/comparisons/kreatli-vs-iconik',
        permanent: true,
      },
      {
        source: '/blog/realtime-vs-asynchronous-collaboration-tools',
        destination: '/comparisons/asynchronous-collaboration-tools',
        permanent: true,
      },
      {
        source: '/blog/best-virtual-team-collaboration-tools-creative-2026',
        destination: '/comparisons/virtual-collaboration-tools',
        permanent: true,
      },
      {
        source: '/blog/top-5-video-collaboration-tools-2026',
        destination: '/comparisons/video-collaboration-tools',
        permanent: true,
      },
      {
        source: '/blog/upwork-project-manager-setup-track-jobs-milestones-deliverables',
        destination: '/guides/upwork-manage-projects',
        permanent: true,
      },
      {
        source: '/blog/top-file-management-online-platforms-compare',
        destination: '/comparisons/file-management-platforms',
        permanent: true,
      },
      {
        source: '/blog/from-brief-to-publish-asset-management-software',
        destination: '/blog/asset-management-software',
        permanent: true,
      },
      {
        source: '/blog/send-large-files-to-clients-20gb-tools',
        destination: '/guides/large-file-tools',
        permanent: true,
      },
      {
        source: '/blog/dms-cloud-vs-dms-saas-creative-teams',
        destination: '/comparisons/dms-for-creative-teams',
        permanent: true,
      },
      {
        source: '/blog/post-production-video-editing-how-collaboration-tools-improve-cuts',
        destination: '/blog/video-post-production',
        permanent: true,
      },
      {
        source: '/blog/best-creative-project-management-software-2026',
        destination: '/comparisons/creative-project-management',
        permanent: true,
      },
      {
        source: '/blog/cloud-file-sharing-freelance-collaboration',
        destination: '/blog/cloud-file-sharing',
        permanent: true,
      },
      {
        source: '/blog/fiverr-project-manager-how-to-run-client-workflows',
        destination: '/guides/fiverr-manage-projects',
        permanent: true,
      },
      {
        source: '/blog/producers-playbook-creative-production-management-software',
        destination: '/guides/creative-production-management',
        permanent: true,
      },
      {
        source: '/blog/video-sharing-tools-present-drafts-fast-approvals',
        destination: '/comparisons/video-sharing-tools',
        permanent: true,
      },
      {
        source: '/blog/how-to-send-gb-fast-ways-share-large-files',
        destination: '/guides/send-large-files',
        permanent: true,
      },
      {
        source: '/blog/best-creative-project-management-software-freelancers-solopreneurs',
        destination: '/comparisons/project-management-software',
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
        destination: '/guides/post-production-workflow',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-frame-io-comparison-2026',
        destination: '/comparisons/kreatli-vs-frameio',
        permanent: true,
      },
      {
        source: '/blog/kreatli-for-in-house-creative-teams',
        destination: '/guides/kreatli-for-in-house-creative-teams',
        permanent: true,
      },
      {
        source: '/blog/kreatli-for-video-production-companies',
        destination: '/guides/kreatli-for-video-production-companies',
        permanent: true,
      },
      {
        source: '/blog/kreatli-for-advertising-agencies',
        destination: '/guides/kreatli-for-advertising-agencies',
        permanent: true,
      },
      {
        source: '/blog/kreatli-for-animation-studios',
        destination: '/guides/kreatli-for-animation-studios',
        permanent: true,
      },
      {
        source: '/blog/marketing-production-management',
        destination: '/guides/marketing-production-management',
        permanent: true,
      },
      {
        source: '/blog/creative-agencies-production',
        destination: '/guides/creative-agencies-production',
        permanent: true,
      },
      {
        source: '/blog/safe-zone-guide',
        destination: '/guides/safe-zone-guide',
        permanent: true,
      },
      {
        source: '/blog/share-large-video-files',
        destination: '/guides/share-large-video-files',
        permanent: true,
      },
      {
        source: '/blog/upwork-manage-projects',
        destination: '/guides/upwork-manage-projects',
        permanent: true,
      },
      {
        source: '/blog/tech-stack-creative-teams',
        destination: '/guides/tech-stack-creative-teams',
        permanent: true,
      },
      {
        source: '/blog/large-file-tools',
        destination: '/guides/large-file-tools',
        permanent: true,
      },
      {
        source: '/blog/send-large-video-files',
        destination: '/guides/send-large-video-files',
        permanent: true,
      },
      {
        source: '/blog/file-transfer-guide',
        destination: '/guides/file-transfer-guide',
        permanent: true,
      },
      {
        source: '/blog/creative-production-management',
        destination: '/guides/creative-production-management',
        permanent: true,
      },
      {
        source: '/blog/fiverr-manage-projects',
        destination: '/guides/fiverr-manage-projects',
        permanent: true,
      },
      {
        source: '/blog/send-large-files',
        destination: '/guides/send-large-files',
        permanent: true,
      },
      {
        source: '/blog/post-production-workflow',
        destination: '/guides/post-production-workflow',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-frameio-2026',
        destination: '/comparisons/kreatli-vs-frameio-2026',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-krockio',
        destination: '/comparisons/kreatli-vs-krockio',
        permanent: true,
      },
      {
        source: '/blog/proofing-software',
        destination: '/comparisons/proofing-software',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-studiobinder',
        destination: '/comparisons/kreatli-vs-studiobinder',
        permanent: true,
      },
      {
        source: '/blog/frameio-alternatives',
        destination: '/comparisons/frameio-alternatives',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-notion',
        destination: '/comparisons/kreatli-vs-notion',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-ziflow',
        destination: '/comparisons/kreatli-vs-ziflow',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-clickup',
        destination: '/comparisons/kreatli-vs-clickup',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-filestage',
        destination: '/comparisons/kreatli-vs-filestage',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-lucidlink',
        destination: '/comparisons/kreatli-vs-lucidlink',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-wipster',
        destination: '/comparisons/kreatli-vs-wipster',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-dropbox',
        destination: '/comparisons/kreatli-vs-dropbox',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-monday',
        destination: '/comparisons/kreatli-vs-monday',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-asana',
        destination: '/comparisons/kreatli-vs-asana',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-iconik',
        destination: '/comparisons/kreatli-vs-iconik',
        permanent: true,
      },
      {
        source: '/blog/asynchronous-collaboration-tools',
        destination: '/comparisons/asynchronous-collaboration-tools',
        permanent: true,
      },
      {
        source: '/blog/virtual-collaboration-tools',
        destination: '/comparisons/virtual-collaboration-tools',
        permanent: true,
      },
      {
        source: '/blog/video-collaboration-tools',
        destination: '/comparisons/video-collaboration-tools',
        permanent: true,
      },
      {
        source: '/blog/file-sharing-vs-file-transfer',
        destination: '/comparisons/file-sharing-vs-file-transfer',
        permanent: true,
      },
      {
        source: '/blog/file-management-platforms',
        destination: '/comparisons/file-management-platforms',
        permanent: true,
      },
      {
        source: '/blog/dms-for-creative-teams',
        destination: '/comparisons/dms-for-creative-teams',
        permanent: true,
      },
      {
        source: '/blog/creative-project-management',
        destination: '/comparisons/creative-project-management',
        permanent: true,
      },
      {
        source: '/blog/video-sharing-tools',
        destination: '/comparisons/video-sharing-tools',
        permanent: true,
      },
      {
        source: '/blog/project-management-software',
        destination: '/comparisons/project-management-software',
        permanent: true,
      },
      {
        source: '/blog/frameio-alternatives-2026',
        destination: '/comparisons/frameio-alternatives-2026',
        permanent: true,
      },
      {
        source: '/blog/mam-vs-dam',
        destination: '/comparisons/mam-vs-dam',
        permanent: true,
      },
      {
        source: '/blog/kreatli-vs-frameio',
        destination: '/comparisons/kreatli-vs-frameio',
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
