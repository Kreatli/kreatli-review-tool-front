import Head from 'next/head';

/**
 * FAQ item interface for structured data
 */
export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQStructuredDataProps {
  /** Array of FAQ items to generate structured data for */
  faqs: FAQItem[];
}

/**
 * Component that generates FAQPage JSON-LD structured data for SEO/AEO
 * This helps search engines understand and display FAQs in search results
 *
 * @example
 * ```tsx
 * <FAQStructuredData faqs={[
 *   { question: "What is X?", answer: "X is..." },
 *   { question: "How does Y work?", answer: "Y works by..." }
 * ]} />
 * ```
 */
export function FAQStructuredData({ faqs }: FAQStructuredDataProps) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
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
