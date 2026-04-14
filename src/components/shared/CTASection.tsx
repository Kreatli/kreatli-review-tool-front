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
  /**
   * `guide`: top rule, soft teal/violet blurs, rounded (not pill) primary button—matches guide CTA screenshots.
   * `marketing`: stronger glows and padding (default for split).
   */
  splitTone?: 'marketing' | 'guide';
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
  splitTone = 'marketing',
}: CTASectionProps) {
  const isSplitGuideTone = layout === 'split' && splitTone === 'guide';

  const imageAside =
    splitPromoImageSrc != null && splitPromoImageSrc !== '' ? (
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl ring-1 ring-black/5 dark:ring-white/10',
          isSplitGuideTone
            ? 'shadow-[0_20px_50px_-14px_rgba(0,0,0,0.2)] dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.45)]'
            : 'shadow-2xl shadow-foreground-900/10 dark:shadow-black/40',
        )}
      >
        <Image
          src={splitPromoImageSrc}
          alt={splitPromoImageAlt ?? ''}
          width={920}
          height={560}
          className="h-auto w-full object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
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
    const isGuideTone = splitTone === 'guide';

    return (
      <section
        className={cn(
          'relative overflow-hidden',
          isGuideTone ? 'bg-transparent' : 'bg-background',
          className,
        )}
      >
        {isGuideTone ? null : (
          <>
            <div
              className="pointer-events-none absolute -left-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-violet-200/35 blur-3xl dark:bg-violet-500/10"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-500/10"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute left-1/3 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-200/25 blur-3xl dark:bg-amber-500/5"
              aria-hidden
            />
          </>
        )}
        <div
          className={cn(
            'relative z-10 mx-auto grid w-full grid-cols-1 items-center px-6',
            isGuideTone
              ? 'max-w-6xl gap-10 py-16 md:gap-12 md:py-20 lg:grid-cols-2 lg:gap-14 lg:py-20'
              : 'max-w-7xl gap-12 py-20 lg:grid-cols-2 lg:gap-16 lg:py-24',
          )}
        >
          <div
            className={cn(
              'flex max-w-xl flex-col justify-center text-left',
              isGuideTone && 'max-w-lg lg:max-w-xl',
            )}
          >
            <h2
              className={cn(
                'scroll-mt-24 font-sans font-bold leading-tight text-foreground',
                isGuideTone
                  ? 'mb-3 text-3xl sm:text-4xl'
                  : 'mb-4 text-3xl tracking-tight sm:text-4xl',
              )}
            >
              {title}
            </h2>
            <div
              className={cn(
                'text-lg text-foreground-500',
                isGuideTone ? 'mb-7 leading-[1.65]' : 'mb-10 leading-relaxed',
              )}
            >
              {description}
            </div>
            <div className={cn('flex flex-wrap items-center', isGuideTone ? 'gap-5' : 'gap-6')}>
              <Button
                as={NextLink}
                href={primaryButtonHref}
                radius={isGuideTone ? 'lg' : 'full'}
                size="lg"
                className={cn(
                  'min-w-0 bg-foreground font-semibold text-content1',
                  isGuideTone ? 'h-11 px-7' : 'h-12 px-8',
                )}
              >
                {primaryButtonText}
              </Button>
              {showDemoButton ? (
                <a
                  href={secondaryButtonHref}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-base font-semibold text-foreground underline-offset-4 hover:underline"
                >
                  {secondaryButtonText}
                </a>
              ) : null}
            </div>
          </div>
          <div className="flex w-full justify-center lg:justify-end">
            <div
              className={cn(
                'w-full',
                isGuideTone ? 'max-w-[min(100%,480px)] lg:max-w-none' : 'max-w-[min(100%,520px)] lg:max-w-none',
              )}
            >
              {splitAside ?? imageAside ?? defaultSplitAside}
            </div>
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
                <a href={secondaryButtonHref} target="_blank" rel="noopener noreferrer nofollow">
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
              rel="noopener noreferrer nofollow"
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
