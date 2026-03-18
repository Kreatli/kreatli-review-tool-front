import Head from 'next/head';

const SITE_URL = 'https://kreatli.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

interface SeoHeadProps {
  title: string;
  description?: string;
  canonicalPath?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  imageUrl?: string;
  imageAlt?: string;
  noindex?: boolean;
}

function buildCanonicalUrl(canonicalPath?: string, canonicalUrl?: string) {
  if (canonicalUrl) {
    return canonicalUrl;
  }

  if (!canonicalPath) {
    return undefined;
  }

  return `${SITE_URL}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
}

export function SeoHead({
  title,
  description,
  canonicalPath,
  canonicalUrl,
  ogType = 'website',
  imageUrl = DEFAULT_OG_IMAGE,
  imageAlt,
  noindex = false,
}: SeoHeadProps) {
  const resolvedCanonicalUrl = buildCanonicalUrl(canonicalPath, canonicalUrl);
  const resolvedImageAlt = imageAlt || title;
  const robots = noindex ? 'noindex, nofollow' : undefined;

  return (
    <Head>
      <title key="title">{title}</title>
      {description ? <meta key="description" name="description" content={description} /> : null}
      {resolvedCanonicalUrl ? <link key="canonical" rel="canonical" href={resolvedCanonicalUrl} /> : null}
      <meta key="og:type" property="og:type" content={ogType} />
      <meta key="og:title" property="og:title" content={title} />
      {description ? <meta key="og:description" property="og:description" content={description} /> : null}
      {resolvedCanonicalUrl ? <meta key="og:url" property="og:url" content={resolvedCanonicalUrl} /> : null}
      <meta key="og:image" property="og:image" content={imageUrl} />
      <meta key="og:image:secure_url" property="og:image:secure_url" content={imageUrl} />
      <meta key="og:image:alt" property="og:image:alt" content={resolvedImageAlt} />
      <meta key="og:image:width" property="og:image:width" content="1200" />
      <meta key="og:image:height" property="og:image:height" content="630" />
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:title" name="twitter:title" content={title} />
      {description ? <meta key="twitter:description" name="twitter:description" content={description} /> : null}
      <meta key="twitter:image" name="twitter:image" content={imageUrl} />
      {robots ? <meta key="robots" name="robots" content={robots} /> : null}
    </Head>
  );
}

export { DEFAULT_OG_IMAGE,SITE_URL };
