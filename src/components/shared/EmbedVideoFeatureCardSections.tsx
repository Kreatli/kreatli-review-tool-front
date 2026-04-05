import { Card, CardBody, cn } from '@heroui/react';

import {
  EMBED_VIDEO_DESTINATION_CARDS,
  EMBED_VIDEO_WHY_CARDS,
} from '../../data/embed-video-marketing';
import { getHeadingId } from '../../utils/storyblok';
import wysiwygStyles from '../layout/Storyblok/Wysiwyg/Wysiwyg.module.scss';
import { Icon } from '../various/Icon';

const platformHeadingClass =
  'mb-4 scroll-mt-24 font-sans text-2xl font-bold sm:text-3xl md:mt-8 md:text-3xl';

interface Props {
  /** Used for TOC anchor id (must match guide TOC label string). */
  destinationsTocLabel: string;
  destinationsHeading: string;
  destinationsIntro: string;
  whyTocLabel: string;
  whyHeading: string;
  whyIntro: string;
  /** When true, section wrappers use platform-style outer padding/backdrop. */
  variant?: 'platform' | 'guide';
}

export function EmbedVideoFeatureCardSections({
  destinationsTocLabel,
  destinationsHeading,
  destinationsIntro,
  whyTocLabel,
  whyHeading,
  whyIntro,
  variant = 'platform',
}: Props) {
  const outerDestinations =
    variant === 'platform'
      ? 'relative overflow-hidden px-6 py-16 backdrop-blur-lg'
      : 'relative overflow-hidden';
  const outerWhy =
    variant === 'platform' ? 'relative overflow-hidden px-6 py-16' : 'relative overflow-hidden';

  const headerWrapClass = 'mb-8 text-center';
  const introClass = 'mx-auto max-w-2xl text-lg text-foreground-500';

  return (
    <>
      <section className={outerDestinations}>
        <div
          className={
            variant === 'guide' ? 'relative z-10 w-full' : 'relative z-10 mx-auto max-w-6xl'
          }
        >
          {variant === 'guide' ? (
            <div
              className={cn(
                wysiwygStyles.wysiwyg,
                '[&>h2:first-child]:!mt-0',
              )}
            >
              <h2 id={getHeadingId(destinationsTocLabel)}>{destinationsHeading}</h2>
              <p>{destinationsIntro}</p>
              <ul>
                {EMBED_VIDEO_DESTINATION_CARDS.map((card) => (
                  <li key={card.title}>
                    <p>
                      <strong>{card.title}:</strong> {card.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <>
              <div className={headerWrapClass}>
                <h2 id={getHeadingId(destinationsTocLabel)} className={platformHeadingClass}>
                  {destinationsHeading}
                </h2>
                <p className={introClass}>{destinationsIntro}</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {EMBED_VIDEO_DESTINATION_CARDS.map((card) => (
                  <Card key={card.title}>
                    <CardBody className="p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="rounded-full bg-foreground-100 p-2">
                          <Icon icon={card.icon} size={20} className="text-primary" />
                        </div>
                        <h3 className="font-sans text-lg font-semibold">{card.title}</h3>
                      </div>
                      <p className="text-sm text-foreground-500">{card.description}</p>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className={outerWhy}>
        <div
          className={
            variant === 'guide' ? 'relative z-10 w-full' : 'relative z-10 mx-auto max-w-6xl'
          }
        >
          {variant === 'guide' ? (
            <div
              className={cn(
                wysiwygStyles.wysiwyg,
                '[&>h2:first-child]:!mt-0',
              )}
            >
              <h2 id={getHeadingId(whyTocLabel)}>{whyHeading}</h2>
              <p>{whyIntro}</p>
              <ul>
                {EMBED_VIDEO_WHY_CARDS.map((card) => (
                  <li key={card.title}>
                    <p>
                      <strong>{card.title}:</strong> {card.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <>
              <div className={headerWrapClass}>
                <h2 id={getHeadingId(whyTocLabel)} className={platformHeadingClass}>
                  {whyHeading}
                </h2>
                <p className={introClass}>{whyIntro}</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {EMBED_VIDEO_WHY_CARDS.map((card) => (
                  <Card key={card.title}>
                    <CardBody className="p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="rounded-full bg-foreground-100 p-2">
                          <Icon icon={card.icon} size={20} className="text-primary" />
                        </div>
                        <h3 className="font-sans text-lg font-semibold">{card.title}</h3>
                      </div>
                      <p className="text-sm text-foreground-500">{card.description}</p>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
