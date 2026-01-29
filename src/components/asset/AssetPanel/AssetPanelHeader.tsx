import { Button } from '@heroui/react';
import React, { useRef } from 'react';

import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { Layout } from '../../../typings/layout';
import { UserWidget } from '../../layout/Header/UserWidget';
import { Notifications } from '../../layout/Notifications/Notifications';
import { ProjectUploadsButton } from '../../project/ProjectUploads';
import { Icon } from '../../various/Icon';

export const AssetPanelHeader = () => {
  const [theme, setTheme] = useLocalStorage<Layout.Theme>({ key: 'theme', defaultValue: 'light' });
  const headerRef = useRef<HTMLDivElement>(null);

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
    <div ref={headerRef} className="hidden h-16 items-center justify-end gap-1 bg-foreground-50 p-3 px-6 md:flex">
      <ProjectUploadsButton headerRef={headerRef} />
      <Notifications />
      <Button isIconOnly aria-label="Toggle theme" variant="light" radius="full" onClick={toggleTheme}>
        <Icon icon={theme === 'dark' ? 'sun' : 'moon'} size={18} />
      </Button>
      <UserWidget />
    </div>
  );
};
