import { storyblokEditable } from '@storyblok/react';
import { SectionStoryblok } from '../../../../typings/storyblok';
import { cn } from '@heroui/react';

interface Props {
  blok: SectionStoryblok;
}

export const Section = ({ blok }: Props) => {
  const { title, text, image, orientation } = blok;

  return (
    <div
      className={cn({
        'grid gap-y-2 gap-x-8 items-center': orientation === 'horizontal',
        'sm:grid-cols-2': !!image?.filename,
      })}
      {...storyblokEditable(blok)}
    >
      <div>
        <h2 className="text-4xl font-sans max-w-xl font-bold mb-4">{title}</h2>
        {text && <p className="text-lg text-foreground-500">{text}</p>}
      </div>
      {image?.filename && (
        <div className="max-h-[500px] shadow-large overflow-hidden mt-4 rounded-medium outline outline-1 outline-offset-2 outline-foreground-300">
          <img src={image.filename} className="w-full h-auto max-h-[500px] object-cover" alt="" />
        </div>
      )}
    </div>
  );
};
