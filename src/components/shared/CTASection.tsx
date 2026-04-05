import { Button, cn } from '@heroui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import React, { ReactNode } from 'react';

import LogoIcon from '../../assets/images/logo.svg';
import wysiwygStyles from '../layout/Storyblok/Wysiwyg/Wysiwyg.module.scss';

interface CTASectionProps {
  /** Main heading text */
  title: string;
  /** Description text (can be string or ReactNode for links) */
  description: string | ReactNode;
  /** Custom primary button text (default: "Start 7-day trial") */
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
  /** `article`: prose block with inline links. `split`: two-column CTA + dark promo card (see screenshot reference). */
  layout?: 'banner' | 'article' | 'split';
  /** Right column when `layout="split"`; defaults to dark promo card. */
  splitAside?: ReactNode;
  /** Promo card headline when using default split aside */
  splitPromoTitle?: string;
  /** Promo card body when using default split aside */
  splitPromoDescription?: ReactNode;
  /** When set (with `layout="split"`), shows this image instead of the default dark promo card. */
  splitPromoImageSrc?: string;
  splitPromoImageAlt?: string;
}

export function CTASection({
  title,
  description,
  primaryButtonText = 'Start 7-day trial',
  primaryButtonHref = '/sign-up',
  showDemoButton = true,
  secondaryButtonText = 'Book a Demo',
  secondaryButtonHref = 'https://calendar.app.google/NXbAeTAUwaBGh5x49',
  className = '',
  layout = 'banner',
  splitAside,
  splitPromoTitle = 'One workspace to rule them all',
  splitPromoDescription,
  splitPromoImageSrc,
  splitPromoImageAlt,
}: CTASectionProps) {
  const imageAside =
    splitPromoImageSrc != null && splitPromoImageSrc !== '' ? (
      <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/10">
        <Image
          src={splitPromoImageSrc}
          alt={splitPromoImageAlt ?? ''}
          width={760}
          height={480}
          className="h-auto w-full object-cover"
          sizes="(max-width: 1024px) 100vw, 380px"
        />
      </div>
    ) : null;

  const defaultSplitAside = (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-black p-8 text-white shadow-xl',
        'ring-1 ring-white/10',
      )}
    >
      <p className="font-sans text-xl font-bold leading-tight sm:text-2xl">{splitPromoTitle}</p>
      <div className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
        {splitPromoDescription ?? (
          <>
            Stop juggling drives, chat threads, and scattered review links. Keep embed-ready video, feedback, and
            approvals in one place—pay for the platform your team actually uses.
          </>
        )}
      </div>
      <div className="mt-8 flex justify-end [&_path]:fill-white">
        <LogoIcon aria-hidden className="h-5 w-auto sm:h-6" viewBox="0 0 90 22" />
      </div>
    </div>
  );

  if (layout === 'split') {
    return (
      <section
        className={cn(
          'relative overflow-hidden border-t border-foreground-200 bg-background',
          className,
        )}
      >
        <div
          className="pointer-events-none absolute left-0 top-1/2 h-72 w-72 -translate-x-1/3 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-0 top-1/2 h-72 w-72 translate-x-1/3 -translate-y-1/2 rounded-full bg-secondary/20 blur-3xl"
          aria-hidden
        />
        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:gap-14 lg:py-20">
          <div className="flex flex-col justify-center">
            <h2 className="mb-4 font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
            <div className="mb-8 max-w-xl text-lg text-foreground-500">{description}</div>
            <div className="flex flex-wrap items-center gap-5">
              <Button
                as={NextLink}
                href={primaryButtonHref}
                radius="full"
                size="lg"
                className="bg-foreground px-8 font-semibold text-content1"
              >
                {primaryButtonText}
              </Button>
              {showDemoButton ? (
                <a
                  href={secondaryButtonHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-semibold text-foreground underline-offset-4 hover:underline"
                >
                  {secondaryButtonText}
                </a>
              ) : null}
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            {splitAside ?? imageAside ?? defaultSplitAside}
          </div>
        </div>
      </section>
    );
  }

  if (layout === 'article') {
    return (
      <section className={cn('relative overflow-hidden', className)}>
        <div
          className={cn(
            wysiwygStyles.wysiwyg,
            '[&>h2:first-child]:!mt-0',
          )}
        >
          <h2>{title}</h2>
          <p>
            {description}{' '}
            <NextLink href={primaryButtonHref}>{primaryButtonText}</NextLink>
            {showDemoButton ? (
              <>
                {' '}
                or{' '}
                <a href={secondaryButtonHref} target="_blank" rel="noopener noreferrer">
                  {secondaryButtonText.toLowerCase()}
                </a>
                .
              </>
            ) : null}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={`overflow-hidden bg-foreground-50 px-6 py-16 lg:py-24 ${className}`}>
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-3 text-center">
        <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">{title}</h2>
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
