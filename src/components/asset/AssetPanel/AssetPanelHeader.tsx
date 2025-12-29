import { Button } from '@heroui/react';
import React from 'react';

import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { Layout } from '../../../typings/layout';
import { Icon } from '../../various/Icon';
import { UserWidget } from '../../layout/Header/UserWidget';
import { Notifications } from '../../layout/Notifications/Notifications';

export const AssetPanelHeader = () => {
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
    <div className="hidden h-16 items-center justify-end gap-1 bg-foreground-50 p-3 px-6 md:flex">
      <Notifications />
      <Button isIconOnly aria-label="Toggle theme" variant="light" radius="full" onClick={toggleTheme}>
        <Icon icon={theme === 'dark' ? 'sun' : 'moon'} size={18} />
      </Button>
      <UserWidget />
    </div>
  );
};
