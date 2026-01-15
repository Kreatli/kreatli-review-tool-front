import { Button } from '@heroui/react';
import NextLink from 'next/link';
import React, { ReactNode } from 'react';

interface CTASectionProps {
  /** Main heading text */
  title: string;
  /** Description text (can be string or ReactNode for links) */
  description: string | ReactNode;
  /** Custom primary button text (default: "Get Started for Free") */
  primaryButtonText?: string;
  /** Custom primary button href (default: "/sign-up") */
  primaryButtonHref?: string;
  /** Show secondary "Book a Demo" button (default: true) */
  showDemoButton?: boolean;
  /** Custom secondary button text (default: "Book a Demo") */
  secondaryButtonText?: string;
  /** Custom secondary button href (default: calendar link) */
  secondaryButtonHref?: string;
  /** Additional CSS classes for the section */
  className?: string;
}

export function CTASection({
  title,
  description,
  primaryButtonText = 'Get Started for Free',
  primaryButtonHref = '/sign-up',
  showDemoButton = true,
  secondaryButtonText = 'Book a Demo',
  secondaryButtonHref = 'https://calendar.app.google/NXbAeTAUwaBGh5x49',
  className = '',
}: CTASectionProps) {
  return (
    <section className={`overflow-hidden bg-foreground-50 px-6 py-16 lg:py-24 ${className}`}>
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-3 text-center">
        <h2 className="mx-auto max-w-xl font-sans text-2xl font-bold sm:text-4xl">{title}</h2>
        <p className="mx-auto max-w-xl text-lg text-foreground-500">{description}</p>
        <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button as={NextLink} href={primaryButtonHref} size="lg" className="bg-foreground text-content1">
            {primaryButtonText}
          </Button>
          {showDemoButton && (
            <Button
              as="a"
              href={secondaryButtonHref}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              variant="bordered"
            >
              {secondaryButtonText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
