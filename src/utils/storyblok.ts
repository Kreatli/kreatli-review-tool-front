import { RichtextStoryblok, SectionStoryblok, WysiwygStoryblok } from '../typings/storyblok';

const SPECIAL_CHARACTERS = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;

export const getHeadingId = (label: string) => {
  return `heading-${label.slice(0, 20).toLowerCase().replaceAll(SPECIAL_CHARACTERS, '').replaceAll(/ +/g, '-')}`;
};

export const getTableOfContentLinks = (body: (SectionStoryblok | WysiwygStoryblok)[] | undefined) => {
  if (!body) {
    return [];
  }

  const texts = body
    .flatMap((blok) => (blok.component === 'section' ? [] : blok.text?.content))
    .filter(Boolean) as RichtextStoryblok[];

  const headings = texts.filter(
    (text) => text.type === 'heading' && text.attrs?.level === 2 && text.content?.[0]?.text,
  );

  return headings.map((heading) => {
    const label = heading.content?.[0]?.text ?? '';

    return {
      label,
      url: `#${getHeadingId(label)}`,
    };
  });
};
