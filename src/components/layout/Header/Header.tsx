import {
  Button,
  cn,
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
import React, { useRef, useState } from 'react';

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

  const headerRef = useRef<HTMLElement>(null);

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
    <Navbar ref={headerRef} isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} maxWidth="full">
      <NavbarContent className="xl:gap-12">
        {!isSignedIn && <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="xl:hidden" />}
        <NavbarItem>
          <NavbarBrand>
            <NextLink href="/" onClick={closeNavbarMenu}>
              <LogoIcon viewBox="0 0 90 22" />
            </NextLink>
          </NavbarBrand>
        </NavbarItem>
        {!isSignedIn && (
          <NavbarContent className="hidden xl:flex">
            <NavbarItem>
              <Link as={NextLink} href="/features" color="foreground">
                Features
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link as={NextLink} href="/cost-calculator" color="foreground">
                Cost Calculator
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link as={NextLink} href="/who-we-help" color="foreground">
                Who We Help
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link as={NextLink} href="/how-it-works" color="foreground">
                How it Works
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link as={NextLink} href="/pricing" color="foreground">
                Pricing
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link as={NextLink} href="/blog" color="foreground">
                Blog
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link as={NextLink} href="/social-media-safe-zone-checker" color="foreground">
                Safe Zone Checker
              </Link>
            </NavbarItem>
          </NavbarContent>
        )}
      </NavbarContent>
      <NavbarContent justify="end" className={cn({ 'gap-1': isSignedIn })}>
        {isSignedIn && (
          <>
            <NavbarItem>
              <ProjectUploadsButton headerRef={headerRef} />
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
            <Link as={NextLink} href="/features" size="lg" color="foreground" onClick={closeNavbarMenu}>
              Features
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link as={NextLink} href="/cost-calculator" size="lg" color="foreground" onClick={closeNavbarMenu}>
              Cost Calculator
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link as={NextLink} href="/who-we-help" size="lg" color="foreground" onClick={closeNavbarMenu}>
              Who We Help
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link as={NextLink} href="/how-it-works" size="lg" color="foreground" onClick={closeNavbarMenu}>
              How it Works
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link as={NextLink} href="/pricing" size="lg" color="foreground" onClick={closeNavbarMenu}>
              Pricing
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link as={NextLink} href="/blog" size="lg" color="foreground" onClick={closeNavbarMenu}>
              Blog
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              as={NextLink}
              href="/social-media-safe-zone-checker"
              size="lg"
              color="foreground"
              onClick={closeNavbarMenu}
            >
              Safe Zone Checker
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      )}
    </Navbar>
  );
};
