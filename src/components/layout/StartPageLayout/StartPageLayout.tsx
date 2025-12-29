import { Button, Image } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

import LogoIcon from '../../../assets/images/logo-dark.svg';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { Layout } from '../../../typings/layout';
import { Icon } from '../../various/Icon';

interface Props {
  title: string;
  backgroundUrl?: string;
  backgroundType?: 'dark' | 'light';
}

const BACKGROUNDS = [
  'https://images.pexels.com/photos/3780104/pexels-photo-3780104.png',
  'https://images.pexels.com/photos/2693208/pexels-photo-2693208.png',
];

export const StartPageLayout = ({
  backgroundUrl,
  backgroundType = 'dark',
  children,
  title,
}: React.PropsWithChildren<Props>) => {
  const [theme, setTheme] = useLocalStorage<Layout.Theme>({ key: 'theme', defaultValue: 'light' });

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');

      return;
    }

    document.documentElement.classList.remove('dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="md:mt-none mt-auto flex h-full md:flex-1">
      <div className="relative z-20 flex w-full shrink-0 flex-col items-center justify-center overflow-hidden rounded-t-xl bg-background md:max-w-[50%] lg:max-w-lg">
        <div className="w-full p-6 md:max-w-md">
          <Link href="/" className="block w-fit">
            <LogoIcon viewBox="0 0 90 22" width="135" height="33" className="mb-4" />
          </Link>
          <h2 className="mb-6 text-3xl font-semibold">{title}</h2>
          <div className="w-full">{children}</div>
        </div>
        <Button
          isIconOnly
          aria-label="Toggle theme"
          variant="light"
          className="absolute right-4 top-4"
          radius="full"
          onClick={toggleTheme}
        >
          <Icon icon={theme === 'dark' ? 'sun' : 'moon'} size={18} />
        </Button>
      </div>
      <div className="absolute inset-0 flex-1 select-none md:relative">
        <Image
          src={backgroundUrl ?? (backgroundType === 'dark' ? BACKGROUNDS[0] : BACKGROUNDS[1])}
          radius="none"
          removeWrapper
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
};
