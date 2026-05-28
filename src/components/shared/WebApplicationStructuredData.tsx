import Head from 'next/head';

type Props = {
  name: string;
  description: string;
  /** Absolute HTTPS URL for this tool page */
  url: string;
};

/**
 * Per-page WebApplication JSON-LD for free tools (complements global Organization/SoftwareApplication in _app).
 */
export function WebApplicationStructuredData({ name, description, url }: Props) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web',
  };

  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
    </Head>
  );
}
