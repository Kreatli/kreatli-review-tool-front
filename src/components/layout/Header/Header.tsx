import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@heroui/react';
import NextLink from 'next/link';
import React, { useState } from 'react';

import LogoIcon from '../../../assets/images/logo.svg';
import { useSession } from '../../../hooks/useSession';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { Layout } from '../../../typings/layout';
import { Icon } from '../../various/Icon';
import { UserWidget } from './UserWidget';
import { Notifications } from '../Notifications/Notifications';
import { ProjectUploadsButton } from '../../project/ProjectUploads';

export const Header = () => {
  const { isSignedIn } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const closeNavbarMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} maxWidth="full">
      <NavbarContent className="lg:gap-12">
        {!isSignedIn && <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="lg:hidden" />}
        <NavbarItem>
          <NavbarBrand>
            <NextLink href="/" onClick={closeNavbarMenu}>
              <LogoIcon viewBox="0 0 90 22" />
            </NextLink>
          </NavbarBrand>
        </NavbarItem>
        {!isSignedIn && (
          <NavbarContent className="hidden lg:flex">
            <NavbarItem>
              <Link href="#product" color="foreground">
                Features
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="#software-cost-calculator" color="foreground">
                Cost Calculator
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="#for-whom" color="foreground">
                Who We Help
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="#how-it-works" color="foreground">
                How it Works
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="#pricing" color="foreground">
                Pricing
              </Link>
            </NavbarItem>
          </NavbarContent>
        )}
      </NavbarContent>
      <NavbarContent justify="end">
        {isSignedIn && (
          <>
            <NavbarItem>
              <ProjectUploadsButton />
            </NavbarItem>
            <NavbarItem>
              <Notifications />
            </NavbarItem>
          </>
        )}
        <NavbarItem>
          <Button isIconOnly aria-label="Toggle theme" variant="light" radius="full" onClick={toggleTheme}>
            <Icon icon={theme === 'dark' ? 'sun' : 'moon'} size={18} />
          </Button>
        </NavbarItem>
        {isSignedIn && (
          <NavbarItem>
            <UserWidget />
          </NavbarItem>
        )}
        {!isSignedIn && (
          <>
            <NavbarItem>
              <Link as={NextLink} href="/sign-in" color="foreground">
                Sign in
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={NextLink} href="/sign-up" className="text-content1 bg-foreground">
                <span className="hidden sm:inline">Start for Free</span>
                <span className="sm:hidden">Sign up</span>
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
      {!isSignedIn && (
        <NavbarMenu className="pl-16">
          <NavbarMenuItem>
            <Link href="#product" size="lg" color="foreground" onClick={closeNavbarMenu}>
              Features
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="#software-cost-calculator" size="lg" color="foreground" onClick={closeNavbarMenu}>
              Cost Calculator
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="#for-whom" size="lg" color="foreground" onClick={closeNavbarMenu}>
              Who We Help
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="#how-it-works" size="lg" color="foreground" onClick={closeNavbarMenu}>
              How it Works
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="#pricing" size="lg" color="foreground" onClick={closeNavbarMenu}>
              Pricing
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      )}
    </Navbar>
  );
};
