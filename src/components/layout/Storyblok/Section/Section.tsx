import { Button, cn, Image } from '@heroui/react';
import { storyblokEditable } from '@storyblok/react';
import NextLink from 'next/link';

import { SectionStoryblok } from '../../../../typings/storyblok';
import { Socials } from '../../../home/Socials/Socials';

interface Props {
  blok: SectionStoryblok;
}

export const Section = ({ blok }: Props) => {
  const { title, text, image, orientation, buttons, displaySocials, titleTag = 'h2' } = blok;

  const TitleTag = titleTag || 'h2';
  const imageAlt = image?.alt || image?.title || title || 'Kreatli section image';
  /** Optional; not from Storyblok schema by default—used by static guides for wide cover art. */
  const imageObjectFit = blok.imageObjectFit === 'contain' ? 'object-contain' : 'object-cover';

  return (
    <div className="flex flex-col gap-6">
      <div
        className={cn({
          'grid items-center gap-x-8 gap-y-2': orientation === 'horizontal',
          'sm:grid-cols-2': !!image?.filename,
        })}
        {...storyblokEditable(blok)}
      >
        <div>
          {title && <TitleTag className="mb-4 font-sans text-4xl font-bold">{title}</TitleTag>}
          {text && <p className="text-lg text-foreground-500">{text}</p>}
          {buttons && buttons?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-4">
              {buttons.map((button) => (
                <Button
                  key={button._uid}
                  as={NextLink}
                  href={button.url.linktype === 'story' ? button.url.cached_url : button.url.url}
                  target={button.url.target}
                  className={cn({ 'bg-foreground text-content1': !button.variant || button.variant === 'solid' })}
                  variant={button.variant || 'solid'}
                >
                  {button.label}
                </Button>
              ))}
            </div>
          )}
        </div>
        {image?.filename && (
          <div
            className={cn(
              'mt-4 max-h-[500px] overflow-hidden rounded-medium shadow-large outline outline-1 outline-offset-2 outline-foreground-300',
              imageObjectFit === 'object-contain' && 'bg-black',
            )}
          >
            <Image
              src={image.filename}
              removeWrapper
              radius="none"
              shadow="none"
              className={cn('h-auto max-h-[500px] w-full', imageObjectFit)}
              alt={imageAlt}
            />
          </div>
        )}
      </div>
      {displaySocials && (
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium">Follow us here:</div>
          <Socials />
        </div>
      )}
    </div>
  );
};
