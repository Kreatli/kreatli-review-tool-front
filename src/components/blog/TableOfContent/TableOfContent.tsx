import { cn } from '@heroui/react';
import Link from 'next/link';
import React from 'react';
import { observe } from 'react-intersection-observer';

const ROOT_MARGIN = '-96px 0px 0px 0px';

interface Props {
  links: {
    label: string;
    url: string;
  }[];
}

export const TableOfContent = ({ links }: Props) => {
  const [anchorsVisibility, setAnchorsVisibility] = React.useState(() => links.map(() => false));
  const [activeIndex, setActiveIndex] = React.useState(0);

  const setObservers = React.useCallback(() => {
    const anchorElements = links.flatMap(({ url }) => document.getElementById(url.replace('#', '')) ?? []);

    return anchorElements.map((element, index) => {
      if (!element) {
        return () => null;
      }

      return observe(
        element,
        (isVisible) => {
          setAnchorsVisibility((visibilities) => Object.assign([], visibilities, { [index]: isVisible }));
        },
        { rootMargin: ROOT_MARGIN },
      );
    });
  }, [links]);

  React.useEffect(() => {
    const observers = setObservers();

    return () => {
      observers.forEach((unobserve) => unobserve());
    };
  }, [setObservers]);

  React.useEffect(() => {
    const index = anchorsVisibility.indexOf(true);

    if (index > -1) {
      setActiveIndex(index);
    }
  }, [anchorsVisibility]);

  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col gap-3">
        {links.map((link, index) => (
          <li key={link.url}>
            <Link
              href={link.url}
              className={cn('block text-sm leading-5 text-foreground-400 transition-all hover:text-foreground-500', {
                'text-shadow-sm text-foreground hover:text-foreground': activeIndex === index,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
