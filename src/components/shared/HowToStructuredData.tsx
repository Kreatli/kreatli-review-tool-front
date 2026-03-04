import Head from 'next/head';

interface HowToStepItem {
  name: string;
  text: string;
}

interface HowToStructuredDataProps {
  /** Title of the how-to guide */
  name: string;
  /** Optional short description for the how-to */
  description?: string;
  /** Ordered list of steps shown on the page */
  steps: HowToStepItem[];
}

/**
 * Emits schema.org HowTo JSON-LD based on the same steps shown in the UI.
 * This helps search and answer engines understand step-by-step guides.
 */
export function HowToStructuredData({ name, description, steps }: HowToStructuredDataProps) {
  if (!steps || steps.length === 0) {
    return null;
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    ...(description ? { description } : {}),
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
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
