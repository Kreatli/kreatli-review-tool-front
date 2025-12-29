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
import { NavigationDropdown } from './NavigationDropdown';

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
              <NavigationDropdown
                triggerLabel="Platform"
                sections={[
                  {
                    title: 'Core Platform',
                    items: [
                      {
                        label: 'The Creative Workspace',
                        href: '/platform/creative-workspace',
                        description: 'Unified workspace for creative production',
                      },
                      {
                        label: 'Review & Approval',
                        href: '/platform/review-approval',
                        description: 'Frame-accurate revisions and approvals',
                      },
                      {
                        label: 'Project Orchestration',
                        href: '/platform/project-orchestration',
                        description: 'Centralized project management',
                      },
                    ],
                  },
                  {
                    title: 'Storage & Integrations',
                    items: [
                      {
                        label: 'Secure Asset Storage',
                        href: '/platform/secure-asset-storage',
                        description: 'Reliable media storage and organization',
                      },
                      {
                        label: 'Integrations',
                        href: '/platform/integrations',
                        description: 'Google Drive and Dropbox integrations',
                      },
                    ],
                  },
                ]}
              />
            </NavbarItem>
            <NavbarItem>
              <NavigationDropdown
                triggerLabel="Solutions"
                sections={[
                  {
                    title: 'By Industry',
                    items: [
                      {
                        label: 'Advertising & Marketing Agencies',
                        href: '/solutions/industry/advertising-marketing-agencies',
                        description: 'Solutions for creative agencies',
                      },
                      {
                        label: 'Video Production & Animation Studios',
                        href: '/solutions/industry/video-production-animation-studios',
                        description: 'Solutions for production teams',
                      },
                      {
                        label: 'In-House Creative & Content Teams',
                        href: '/solutions/industry/in-house-creative-content-teams',
                        description: 'Solutions for in-house teams',
                      },
                    ],
                  },
                  {
                    title: 'By Use-Case',
                    items: [
                      {
                        label: 'Creative Production Management',
                        href: '/solutions/use-case/creative-production-management',
                        description: 'End-to-end production workflows',
                      },
                      {
                        label: 'Client Approvals',
                        href: '/solutions/use-case/client-approvals',
                        description: 'Version-specific client approvals',
                      },
                      {
                        label: 'Creative Proofing',
                        href: '/solutions/use-case/creative-proofing',
                        description: 'Turn feedback into trackable work',
                      },
                    ],
                  },
                ]}
              />
            </NavbarItem>
            <NavbarItem>
              <NavigationDropdown
                triggerLabel="Resources"
                sections={[
                  {
                    title: 'Support & Learning',
                    items: [
                      {
                        label: 'Help Center',
                        href: '/help',
                        description: 'FAQs and support resources',
                      },
                      {
                        label: 'Guides',
                        href: '/guides',
                        description: 'Learning guides and tutorials',
                      },
                      {
                        label: 'Blog',
                        href: '/blog',
                        description: 'Latest articles and updates',
                      },
                    ],
                  },
                  {
                    title: 'Tools & Comparisons',
                    items: [
                      {
                        label: 'Comparisons',
                        href: '/comparisons',
                        description: 'Compare Kreatli with alternatives',
                      },
                      {
                        label: 'Safe Zone Checker',
                        href: '/social-media-safe-zone-checker',
                        description: 'Free tool for safe zone checking',
                      },
                      {
                        label: 'Software Cost Calculator',
                        href: '/cost-calculator',
                        description: 'Calculate your tool stack savings',
                      },
                    ],
                  },
                ]}
              />
            </NavbarItem>
            <NavbarItem>
              <Link as={NextLink} href="/pricing" color="foreground">
                Pricing
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
              <Button as={NextLink} href="/sign-up" className="bg-foreground text-content1">
                <span className="hidden sm:inline">Start for Free</span>
                <span className="sm:hidden">Sign up</span>
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
      {!isSignedIn && (
        <NavbarMenu className="sm:pl-16">
          <div className="mb-2 font-semibold">Platform</div>
          <NavbarMenuItem>
            <Link
              as={NextLink}
              href="/platform/creative-workspace"
              size="lg"
              color="foreground"
              onClick={closeNavbarMenu}
            >
              The Creative Workspace
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link as={NextLink} href="/platform/review-approval" size="lg" color="foreground" onClick={closeNavbarMenu}>
              Review & Approval
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              as={NextLink}
              href="/platform/project-orchestration"
              size="lg"
              color="foreground"
              onClick={closeNavbarMenu}
            >
              Project Orchestration
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              as={NextLink}
              href="/platform/secure-asset-storage"
              size="lg"
              color="foreground"
              onClick={closeNavbarMenu}
            >
              Secure Asset Storage
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link as={NextLink} href="/platform/integrations" size="lg" color="foreground" onClick={closeNavbarMenu}>
              Integrations
            </Link>
          </NavbarMenuItem>
          <div className="mb-1 mt-4 font-semibold">Solutions</div>
          <div className="mb-1 text-sm text-foreground-500">By Industry</div>
          <NavbarMenuItem>
            <Link
              as={NextLink}
              href="/solutions/industry/advertising-marketing-agencies"
              size="lg"
              color="foreground"
              onClick={closeNavbarMenu}
            >
              Advertising & Marketing Agencies
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              as={NextLink}
              href="/solutions/industry/video-production-animation-studios"
              size="lg"
              color="foreground"
              onClick={closeNavbarMenu}
            >
              Video Production & Animation Studios
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              as={NextLink}
              href="/solutions/industry/in-house-creative-content-teams"
              size="lg"
              color="foreground"
              onClick={closeNavbarMenu}
            >
              In-House Creative & Content Teams
            </Link>
          </NavbarMenuItem>
          <div className="mb-1 mt-2 text-sm text-foreground-500">By Use-Case</div>
          <NavbarMenuItem>
            <Link
              as={NextLink}
              href="/solutions/use-case/creative-production-management"
              size="lg"
              color="foreground"
              onClick={closeNavbarMenu}
            >
              Production Management
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              as={NextLink}
              href="/solutions/use-case/client-approvals"
              size="lg"
              color="foreground"
              onClick={closeNavbarMenu}
            >
              Client Approvals
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              as={NextLink}
              href="/solutions/use-case/creative-proofing"
              size="lg"
              color="foreground"
              onClick={closeNavbarMenu}
            >
              Creative Proofing
            </Link>
          </NavbarMenuItem>
          <div className="mb-1 mt-4 font-semibold">Resources</div>
          <NavbarMenuItem>
            <Link as={NextLink} href="/help" size="lg" color="foreground" onClick={closeNavbarMenu}>
              Help Center
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link as={NextLink} href="/comparisons" size="lg" color="foreground" onClick={closeNavbarMenu}>
              Comparisons
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
          <NavbarMenuItem>
            <Link as={NextLink} href="/cost-calculator" size="lg" color="foreground" onClick={closeNavbarMenu}>
              Cost Calculator
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link as={NextLink} href="/guides" size="lg" color="foreground" onClick={closeNavbarMenu}>
              Guides
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link as={NextLink} href="/blog" size="lg" color="foreground" onClick={closeNavbarMenu}>
              Blog
            </Link>
          </NavbarMenuItem>
          <div className="mb-1 mt-4 font-semibold">Other</div>
          <NavbarMenuItem>
            <Link as={NextLink} href="/pricing" size="lg" color="foreground" onClick={closeNavbarMenu}>
              Pricing
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      )}
    </Navbar>
  );
};
