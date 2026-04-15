import Head from 'next/head';

const FALLBACK_SITE_URL = 'https://kreatli.com';
const DEFAULT_OG_IMAGE_PATH = '/og-image.png';
const OG_SITE_NAME = 'Kreatli';

interface SeoHeadProps {
  title: string;
  description?: string;
  canonicalPath?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  imageUrl?: string;
  imageAlt?: string;
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
}

function getSiteUrl() {
  const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envSiteUrl) {
    return envSiteUrl;
  }

  return FALLBACK_SITE_URL;
}

function resolveAbsoluteUrl(url: string) {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  if (url.startsWith('//')) {
    return `https:${url}`;
  }

  const base = getSiteUrl();
  return `${base}${url.startsWith('/') ? url : `/${url}`}`;
}

function buildCanonicalUrl(canonicalPath?: string, canonicalUrl?: string) {
  if (canonicalUrl) {
    return resolveAbsoluteUrl(canonicalUrl);
  }

  if (!canonicalPath) {
    return undefined;
  }

  return resolveAbsoluteUrl(canonicalPath);
}

export function SeoHead({
  title,
  description,
  canonicalPath,
  canonicalUrl,
  ogType = 'website',
  imageUrl = DEFAULT_OG_IMAGE_PATH,
  imageAlt,
  noindex = false,
  publishedTime,
  modifiedTime,
}: SeoHeadProps) {
  const resolvedCanonicalUrl = buildCanonicalUrl(canonicalPath, canonicalUrl);
  const resolvedImageAlt = imageAlt || title;
  const resolvedImageUrl = resolveAbsoluteUrl(imageUrl);
  const robots = noindex ? 'noindex, nofollow' : undefined;

  return (
    <Head>
      <title key="title">{title}</title>
      {description ? <meta key="description" name="description" content={description} /> : null}
      {resolvedCanonicalUrl ? <link key="canonical" rel="canonical" href={resolvedCanonicalUrl} /> : null}
      <meta key="og:site_name" property="og:site_name" content={OG_SITE_NAME} />
      <meta key="og:type" property="og:type" content={ogType} />
      <meta key="og:title" property="og:title" content={title} />
      {description ? <meta key="og:description" property="og:description" content={description} /> : null}
      {resolvedCanonicalUrl ? <meta key="og:url" property="og:url" content={resolvedCanonicalUrl} /> : null}
      <meta key="og:image" property="og:image" content={resolvedImageUrl} />
      <meta key="og:image:secure_url" property="og:image:secure_url" content={resolvedImageUrl} />
      <meta key="og:image:alt" property="og:image:alt" content={resolvedImageAlt} />
      <meta key="og:image:width" property="og:image:width" content="1200" />
      <meta key="og:image:height" property="og:image:height" content="630" />
      {publishedTime ? <meta key="article:published_time" property="article:published_time" content={publishedTime} /> : null}
      {modifiedTime ? <meta key="article:modified_time" property="article:modified_time" content={modifiedTime} /> : null}
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:title" name="twitter:title" content={title} />
      {description ? <meta key="twitter:description" name="twitter:description" content={description} /> : null}
      <meta key="twitter:image" name="twitter:image" content={resolvedImageUrl} />
      {robots ? <meta key="robots" name="robots" content={robots} /> : null}
    </Head>
  );
}

export const SITE_URL = FALLBACK_SITE_URL;
export const DEFAULT_OG_IMAGE = DEFAULT_OG_IMAGE_PATH;
