import Head from 'next/head';

/**
 * Breadcrumb item interface for structured data
 */
export interface BreadcrumbItem {
  /** Display name of the breadcrumb item */
  name: string;
  /** URL path for the breadcrumb item */
  url: string;
}

interface BreadcrumbStructuredDataProps {
  /** Array of breadcrumb items (should include Home as first item) */
  items: BreadcrumbItem[];
  /** Base URL for the site (defaults to https://kreatli.com) */
  baseUrl?: string;
}

/**
 * Component that generates BreadcrumbList JSON-LD structured data for SEO
 * This helps search engines understand site hierarchy and display breadcrumbs in search results
 *
 * @example
 * ```tsx
 * <BreadcrumbStructuredData items={[
 *   { name: "Home", url: "/" },
 *   { name: "Platform", url: "/platform" },
 *   { name: "Video Annotation", url: "/platform/video-annotation" }
 * ]} />
 * ```
 */
export function BreadcrumbStructuredData({
  items,
  baseUrl = 'https://kreatli.com',
}: BreadcrumbStructuredDataProps) {
  if (!items || items.length === 0) {
    return null;
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url.startsWith('/') ? item.url : `/${item.url}`}`,
    })),
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
}
