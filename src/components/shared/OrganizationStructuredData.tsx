import Head from 'next/head';

const organizationData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Kreatli',
  url: 'https://kreatli.com',
  logo: 'https://kreatli.com/favicon-96x96.png',
  description:
    'Video Collaboration & Review Platform for creative teams. Frame-accurate feedback, project management, and file review in one workspace.',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'support@kreatli.com',
    contactType: 'customer support',
  },
};

const websiteData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Kreatli',
  url: 'https://kreatli.com',
};

const softwareData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Kreatli',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://kreatli.com',
  description:
    'Video Collaboration & Review Platform for creative teams. Frame-accurate video review, project management, and approval workflows.',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '14',
    highPrice: '29',
    priceCurrency: 'USD',
    offerCount: '3',
  },
};

/**
 * Global structured data for Organization, WebSite, and SoftwareApplication schemas.
 * Render once in _app.tsx so every page benefits.
 */
export function OrganizationStructuredData() {
  return (
    <Head>
      <script
        key="org-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        key="website-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        key="software-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareData) }}
      />
    </Head>
  );
}
