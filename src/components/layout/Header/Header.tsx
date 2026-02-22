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
import { getPlatformPagesBySection } from '../../../data/platform-pages';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { usePlansModalVisibility } from '../../../hooks/usePlansModalVisibility';
import { useSession } from '../../../hooks/useSession';
import { Layout } from '../../../typings/layout';
import { ProjectUploadsButton } from '../../project/ProjectUploads';
import { Icon } from '../../various/Icon';
import { Notifications } from '../Notifications/Notifications';
import { NavigationDropdown } from './NavigationDropdown';
import { UserWidget } from './UserWidget';

const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

export const Header = () => {
  const { isSignedIn, user } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useLocalStorage<Layout.Theme>({ key: 'theme', defaultValue: 'light' });

  const headerRef = useRef<HTMLElement>(null);

  const setIsPlansModalVisible = usePlansModalVisibility((state) => state.setIsVisible);

  const [bannerClosedAt, setBannerClosedAt] = useLocalStorage<Date | null>({
    key: 'bannerClosedAt',
    defaultValue: null,
  });

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');

      return;
    }

    document.documentElement.classList.remove('dark');
  }, [theme]);

  const isBannerDismissed = React.useMemo(() => {
    // eslint-disable-next-line react-hooks/purity
    return bannerClosedAt && new Date(bannerClosedAt).getTime() + DAY_IN_MILLISECONDS * 7 > Date.now();
  }, [bannerClosedAt]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const closeNavbarMenu = () => {
    setIsMenuOpen(false);
  };

  const handleBannerClose = () => {
    setBannerClosedAt(new Date());
  };

  const freeTrialEndsIn = user?.subscription.startTrialDate
    ? // eslint-disable-next-line react-hooks/purity
      Math.max(0, new Date(user.subscription.startTrialDate).getTime() + DAY_IN_MILLISECONDS * 7 - Date.now())
    : null;

  const freeTrialEndsInDays = freeTrialEndsIn ? Math.ceil(freeTrialEndsIn / DAY_IN_MILLISECONDS) : null;

  // Get platform pages grouped by section for navigation
  const platformPagesBySection = React.useMemo(() => getPlatformPagesBySection(), []);

  // Transform platform pages into navigation dropdown format
  // Limit to 3 items in Core Platform section (exclude Video Annotation from navbar)
  const platformSections = React.useMemo(
    () =>
      Object.entries(platformPagesBySection).map(([sectionTitle, pages]) => {
        // For Core Platform section, limit to first 3 items (exclude Video Annotation)
        if (sectionTitle === 'Core Platform') {
          return {
            title: sectionTitle,
            items: pages
              .filter((page) => page.href !== '/platform/video-annotation')
              .slice(0, 3)
              .map((page) => ({
                label: page.label,
                href: page.href,
                description: page.description,
              })),
          };
        }
        return {
          title: sectionTitle,
          items: pages.map((page) => ({
            label: page.label,
            href: page.href,
            description: page.description,
          })),
        };
      }),
    [platformPagesBySection],
  );

  return (
    <>
      {(user?.subscription.isTrial || (!user?.subscription.isActive && user?.subscription.hasUsedTrial)) &&
        !isBannerDismissed && (
          <div className="sticky top-0 flex h-auto items-center justify-between bg-primary-50 px-3 xs:px-6">
            <div />
            <div className="flex items-center justify-center gap-3 py-1.5 text-primary">
              <div className="flex items-center gap-1.5">
                <Icon icon="time" size={18} />
                {user?.subscription.isTrial ? (
                  `Free trial ends in ${freeTrialEndsInDays} day${freeTrialEndsInDays === 1 ? '' : 's'}`
                ) : (
                  <>
                    Your trial has ended.{' '}
                    <span className="hidden sm:inline">Select a plan to continue using Kreatli.</span>
                  </>
                )}
              </div>
              <Button size="sm" variant="flat" color="primary" onClick={() => setIsPlansModalVisible(true)}>
                <span>
                  Upgrade <span className="hidden xs:inline">now</span>
                </span>
              </Button>
            </div>
            <div>
              <Button size="sm" variant="light" color="primary" isIconOnly radius="full" onClick={handleBannerClose}>
                <Icon icon="cross" size={18} />
              </Button>
            </div>
          </div>
        )}
      <Navbar
        ref={headerRef}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="full"
        classNames={{ wrapper: 'px-3 xs:px-6' }}
      >
        <NavbarContent className="xl:gap-12">
          {!isSignedIn && (
            <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="xl:hidden" />
          )}
          <NavbarItem>
            <NavbarBrand>
              <NextLink href="/" onClick={closeNavbarMenu}>
                <LogoIcon viewBox="0 0 90 22" />
              </NextLink>
            </NavbarBrand>
          </NavbarItem>
          {!isSignedIn && (
            <NavbarContent className="hidden xl:flex" justify="center">
              <NavbarItem>
                <NavigationDropdown
                  triggerLabel="Platform"
                  triggerHref="/platform"
                  sections={platformSections}
                  headerLink={{ label: 'See All Features', href: '/platform' }}
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
                  triggerLabel="Free Tools"
                  triggerHref="/free-tools"
                  headerLink={{ label: 'View All Tools', href: '/free-tools' }}
                  sections={[
                    {
                      title: 'Creative Tools',
                      items: [
                        {
                          label: 'Video Frame Extractor',
                          href: '/free-tools/video-frame-extractor',
                          description: 'Capture and download frames from any video',
                        },
                        {
                          label: 'YouTube Banner Resizer',
                          href: '/free-tools/youtube-banner-resizer',
                          description: 'Resize and optimize YouTube channel banners',
                        },
                        {
                          label: 'Safe Zone Checker',
                          href: '/safe-zone-checker',
                          description: 'Free tool for safe zone checking',
                          children: [
                            {
                              label: 'Instagram Reels Checker',
                              href: '/safe-zone-checker/instagram-safe-zone-checker',
                              description: 'Preview Instagram Reels safe zones',
                            },
                            {
                              label: 'TikTok Checker',
                              href: '/safe-zone-checker/tiktok-safe-zone-checker',
                              description: 'Preview TikTok safe zones',
                            },
                            {
                              label: 'YouTube Shorts Checker',
                              href: '/safe-zone-checker/youtube-safe-zone-checker',
                              description: 'Preview YouTube Shorts safe zones',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: 'Utility Tools',
                      items: [
                        {
                          label: 'Data Transfer Calculator',
                          href: '/free-tools/data-transfer-calculator',
                          description: 'Calculate data transfer times and costs',
                        },
                        {
                          label: 'Software Cost Calculator',
                          href: '/free-tools/cost-calculator',
                          description: 'Calculate your tool stack savings',
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
                      title: 'Support & Updates',
                      items: [
                        {
                          label: 'Help Center',
                          href: '/help',
                          description: 'FAQs and support resources',
                        },
                        {
                          label: 'Blog',
                          href: '/blog',
                          description: 'Latest articles and updates',
                        },
                      ],
                    },
                    {
                      title: 'Learning & Comparisons',
                      items: [
                        {
                          label: 'Guides',
                          href: '/guides',
                          description: 'Learning guides and tutorials',
                        },
                        {
                          label: 'Comparisons',
                          href: '/comparisons',
                          description: 'Compare Kreatli with alternatives',
                        },
                      ],
                    },
                  ]}
                />
              </NavbarItem>
              <NavbarItem>
                <Link as={NextLink} href="/pricing" color="foreground" className="font-medium">
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
            {Object.entries(platformPagesBySection).map(([sectionTitle, pages]) => {
              // For Core Platform section, limit to first 3 items (exclude Video Annotation)
              const filteredPages =
                sectionTitle === 'Core Platform'
                  ? pages.filter((page) => page.href !== '/platform/video-annotation').slice(0, 3)
                  : pages;
              return (
                <React.Fragment key={sectionTitle}>
                  {filteredPages.map((page) => (
                    <NavbarMenuItem key={page.href}>
                      <Link as={NextLink} href={page.href} size="lg" color="foreground" onClick={closeNavbarMenu}>
                        {page.label}
                      </Link>
                    </NavbarMenuItem>
                  ))}
                </React.Fragment>
              );
            })}
            <NavbarMenuItem>
              <Link
                as={NextLink}
                href="/platform"
                size="lg"
                color="primary"
                className="font-semibold"
                onClick={closeNavbarMenu}
              >
                See All Features
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
            <div className="mb-1 mt-4 font-semibold">Free Tools</div>
            <NavbarMenuItem>
              <Link as={NextLink} href="/free-tools" color="foreground" size="lg" onClick={closeNavbarMenu}>
                All Free Tools
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                as={NextLink}
                href="/free-tools/video-frame-extractor"
                size="lg"
                color="foreground"
                onClick={closeNavbarMenu}
              >
                Video Frame Extractor
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                as={NextLink}
                href="/free-tools/youtube-banner-resizer"
                size="lg"
                color="foreground"
                onClick={closeNavbarMenu}
              >
                YouTube Banner Resizer
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                as={NextLink}
                href="/safe-zone-checker"
                size="lg"
                color="foreground"
                onClick={closeNavbarMenu}
              >
                Safe Zone Checker
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                as={NextLink}
                href="/free-tools/data-transfer-calculator"
                size="lg"
                color="foreground"
                onClick={closeNavbarMenu}
              >
                Data Transfer Calculator
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                as={NextLink}
                href="/free-tools/cost-calculator"
                size="lg"
                color="foreground"
                onClick={closeNavbarMenu}
              >
                Cost Calculator
              </Link>
            </NavbarMenuItem>
            <div className="mb-1 mt-4 font-semibold">Resources</div>
            <NavbarMenuItem>
              <Link as={NextLink} href="/help" size="lg" color="foreground" onClick={closeNavbarMenu}>
                Help Center
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link as={NextLink} href="/guides" size="lg" color="foreground" onClick={closeNavbarMenu}>
                Guides
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link as={NextLink} href="/comparisons" size="lg" color="foreground" onClick={closeNavbarMenu}>
                Comparisons
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
    </>
  );
};
