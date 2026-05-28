import { Accordion, AccordionItem } from '@heroui/react';

import type { FAQItem } from '../shared/FAQStructuredData';

type Props = {
  faqs: FAQItem[];
  /** Accessible label for the accordion */
  ariaLabel: string;
};

/**
 * Visible FAQ block paired with FAQStructuredData on Storyblok guides — questions/answers
 * must stay in sync with JSON-LD on the same page.
 */
export function StoryblokGuideSupplementaryFaqs({ faqs, ariaLabel }: Props) {
  if (!faqs.length) {
    return null;
  }

  return (
    <section
      className="mb-10 rounded-2xl border border-foreground-200 bg-content1/30 p-6 sm:p-8"
      aria-labelledby="guide-quick-faqs-heading"
    >
      <h2 id="guide-quick-faqs-heading" className="mb-4 font-sans text-xl font-bold sm:text-2xl">
        Quick answers
      </h2>
      <p className="mb-6 text-sm text-foreground-600">
        Short answers to common searches—see the full guide below for depth, templates, and workflows.
      </p>
      <Accordion variant="splitted" aria-label={ariaLabel}>
        {faqs.map((item) => (
          <AccordionItem key={item.question} title={<span className="text-base font-semibold">{item.question}</span>}>
            <div className="space-y-2 whitespace-pre-wrap text-sm text-foreground-600 sm:text-base">{item.answer}</div>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
