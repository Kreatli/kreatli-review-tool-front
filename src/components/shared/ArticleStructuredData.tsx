import Head from 'next/head';

interface ArticleStructuredDataProps {
  title: string;
  description: string;
  url: string;
  publishedTime?: string;
  modifiedTime?: string;
  imageUrl?: string;
  authorName?: string;
}

/**
 * Emits schema.org Article JSON-LD for editorial content pages (guides, blog posts, comparisons).
 * Helps search engines display article rich results with thumbnail, date, and author info.
 */
export function ArticleStructuredData({
  title,
  description,
  url,
  publishedTime,
  modifiedTime,
  imageUrl,
  authorName = 'Kreatli',
}: ArticleStructuredDataProps) {
  const baseUrl = 'https://kreatli.com';
  const resolvedUrl = url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`;
  const resolvedImage = imageUrl
    ? imageUrl.startsWith('http')
      ? imageUrl
      : `${baseUrl}${imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`}`
    : `${baseUrl}/og-image.png`;

  const structuredData: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: resolvedUrl,
    image: resolvedImage,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kreatli',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/favicon-96x96.png`,
      },
    },
  };

  if (publishedTime) {
    structuredData.datePublished = new Date(publishedTime).toISOString();
  }
  if (modifiedTime) {
    structuredData.dateModified = new Date(modifiedTime).toISOString();
  } else if (publishedTime) {
    structuredData.dateModified = new Date(publishedTime).toISOString();
  }

  return (
    <Head>
      <script
        key="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
}
