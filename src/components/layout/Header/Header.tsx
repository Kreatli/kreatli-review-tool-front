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
                        label: 'Advertising & Content Agencies',
                        href: '/solutions/industry/advertising-content-agencies',
                        description: 'Solutions for creative agencies',
                      },
                      {
                        label: 'In-House Marketing Teams',
                        href: '/solutions/industry/in-house-marketing-teams',
                        description: 'Solutions for marketing teams',
                      },
                      {
                        label: 'Production & Post-Houses',
                        href: '/solutions/industry/production-post-houses',
                        description: 'Solutions for production houses',
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
                        label: 'Remote Video Collaboration',
                        href: '/solutions/use-case/remote-video-collaboration',
                        description: 'Collaborate on video projects remotely',
                      },
                      {
                        label: 'Centralized Feedback & Annotations',
                        href: '/solutions/use-case/centralized-feedback-annotations',
                        description: 'Unified feedback and review system',
                      },
                      {
                        label: 'Secure Client Delivery',
                        href: '/solutions/use-case/secure-client-delivery',
                        description: 'Secure file sharing and delivery',
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
                        href: '/learning/guides',
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
            <div className="font-semibold text-foreground-500 mb-2">Platform</div>
          </NavbarMenuItem>
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
          <NavbarMenuItem>
            <div className="font-semibold text-foreground-500 mb-2 mt-4">Solutions</div>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              as={NextLink}
              href="/solutions/industry/advertising-content-agencies"
              size="lg"
              color="foreground"
              onClick={closeNavbarMenu}
            >
              Advertising & Content Agencies
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              as={NextLink}
              href="/solutions/industry/in-house-marketing-teams"
              size="lg"
              color="foreground"
              onClick={closeNavbarMenu}
            >
              In-House Marketing Teams
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              as={NextLink}
              href="/solutions/industry/production-post-houses"
              size="lg"
              color="foreground"
              onClick={closeNavbarMenu}
            >
              Production & Post-Houses
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              as={NextLink}
              href="/solutions/use-case/creative-production-management"
              size="lg"
              color="foreground"
              onClick={closeNavbarMenu}
            >
              Creative Production Management
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              as={NextLink}
              href="/solutions/use-case/remote-video-collaboration"
              size="lg"
              color="foreground"
              onClick={closeNavbarMenu}
            >
              Remote Video Collaboration
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              as={NextLink}
              href="/solutions/use-case/centralized-feedback-annotations"
              size="lg"
              color="foreground"
              onClick={closeNavbarMenu}
            >
              Centralized Feedback & Annotations
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              as={NextLink}
              href="/solutions/use-case/secure-client-delivery"
              size="lg"
              color="foreground"
              onClick={closeNavbarMenu}
            >
              Secure Client Delivery
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <div className="font-semibold text-foreground-500 mb-2 mt-4">Resources</div>
          </NavbarMenuItem>
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
            <Link as={NextLink} href="/learning" size="lg" color="foreground" onClick={closeNavbarMenu}>
              Learning
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link as={NextLink} href="/blog" size="lg" color="foreground" onClick={closeNavbarMenu}>
              Blog
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <div className="font-semibold text-foreground-500 mb-2 mt-4">Other</div>
          </NavbarMenuItem>
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
