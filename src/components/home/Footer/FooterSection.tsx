import { Button } from '@heroui/react';
import Link from 'next/link';

import LogoIcon from '../../../assets/images/logo.svg';
import { Socials } from '../Socials/Socials';

const PLATFORM_NAV = {
  title: 'Platform',
  sections: [
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
  ],
};

const SOLUTIONS_NAV = {
  title: 'Solutions',
  sections: [
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
  ],
};

const RESOURCES_NAV = {
  title: 'Resources',
  sections: [
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
  ],
};

interface Props {
  hideCta?: boolean;
}

export const FooterSection = ({ hideCta = false }: Props) => {
  return (
    <footer className="bg-foreground-50">
      {!hideCta && (
        <div className="flex flex-col items-center gap-8 px-6 pb-12 pt-16 lg:pb-20 lg:pt-32">
          <h2 className="mx-auto max-w-xl text-center font-sans text-3xl font-bold sm:text-5xl">
            Take Control of Your Creative Projects Today!
          </h2>
          <p className="text-center text-lg font-medium text-foreground-500 sm:text-2xl">
            Start using Kreatli for free and experience the value firsthand.
          </p>
          <div className="flex items-center gap-4">
            <Button as={Link} href="/sign-up" size="lg" className="bg-foreground text-content1">
              Start For Free
            </Button>
            <Button
              as="a"
              href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
              target="_blank"
              size="lg"
              variant="light"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      )}
      <div className="mx-auto w-full max-w-6xl px-6 py-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="flex w-full flex-col gap-4 lg:w-auto">
            <Link href="/">
              <LogoIcon viewBox="0 0 90 22" />
            </Link>
            <div className="max-w-64 text-sm text-foreground-500">
              End-to-end creative production platform for creative teams.
            </div>
            <Socials />
          </div>
          <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {/* Platform Navigation */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                {PLATFORM_NAV.title}
              </h3>
              {PLATFORM_NAV.sections.map((section) => (
                <div key={section.title} className="mb-6 last:mb-0">
                  <h4 className="mb-3 text-xs font-semibold text-foreground-600">{section.title}</h4>
                  <ul className="flex flex-col gap-2">
                    {section.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-sm text-foreground-500 underline-offset-2 hover:text-foreground hover:underline"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Solutions Navigation */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                {SOLUTIONS_NAV.title}
              </h3>
              {SOLUTIONS_NAV.sections.map((section) => (
                <div key={section.title} className="mb-6 last:mb-0">
                  <h4 className="mb-3 text-xs font-semibold text-foreground-600">{section.title}</h4>
                  <ul className="flex flex-col gap-2">
                    {section.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-sm text-foreground-500 underline-offset-2 hover:text-foreground hover:underline"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Resources Navigation */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                {RESOURCES_NAV.title}
              </h3>
              {RESOURCES_NAV.sections.map((section) => (
                <div key={section.title} className="mb-6 last:mb-0">
                  <h4 className="mb-3 text-xs font-semibold text-foreground-600">{section.title}</h4>
                  <ul className="flex flex-col gap-2">
                    {section.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-sm text-foreground-500 underline-offset-2 hover:text-foreground hover:underline"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Other Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Other</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    href="/pricing"
                    className="text-sm text-foreground-500 underline-offset-2 hover:text-foreground hover:underline"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:support@kreatli.com"
                    className="text-sm text-foreground-500 underline-offset-2 hover:text-foreground hover:underline"
                  >
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-and-conditions"
                    className="text-sm text-foreground-500 underline-offset-2 hover:text-foreground hover:underline"
                  >
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-sm text-foreground-500 underline-offset-2 hover:text-foreground hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookie-policy"
                    className="text-sm text-foreground-500 underline-offset-2 hover:text-foreground hover:underline"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 text-center text-sm text-foreground-500">
        Copyright {new Date().getFullYear()} Kreatli. All rights reserved.
      </div>
    </footer>
  );
};
