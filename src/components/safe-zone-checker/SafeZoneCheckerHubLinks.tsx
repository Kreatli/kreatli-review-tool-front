import NextLink from 'next/link';

import { Card, CardBody } from '@heroui/react';

import { Icon, IconType } from '../various/Icon';

const links: Array<{
  href: string;
  title: string;
  description: string;
  icon: IconType;
}> = [
  {
    href: '/safe-zone-checker/tiktok-safe-zone-checker',
    title: 'TikTok safe zone',
    description: '1080×1920 vertical — preview captions vs profile and engagement UI.',
    icon: 'tiktok',
  },
  {
    href: '/safe-zone-checker/instagram-safe-zone-checker',
    title: 'Instagram Reels safe zone',
    description: 'Reels overlays — keep logos and text out of covered areas.',
    icon: 'instagram',
  },
  {
    href: '/safe-zone-checker/youtube-safe-zone-checker',
    title: 'YouTube Shorts safe zone',
    description: 'Shorts UI — channel row, like, comment, and share placement.',
    icon: 'youtube',
  },
  {
    href: '/free-tools/youtube-banner-resizer',
    title: 'YouTube banner resizer',
    description: '2560×1440 channel art with 1546×423px safe zone preview.',
    icon: 'panorama',
  },
];

export function SafeZoneCheckerHubLinks() {
  return (
    <section className="mx-auto mb-10 mt-8 max-w-6xl px-6" aria-labelledby="safe-zone-hub-tools">
      <h2 id="safe-zone-hub-tools" className="mb-2 text-center font-sans text-xl font-bold sm:text-2xl">
        Platform checkers &amp; banner tool
      </h2>
      <p className="mx-auto mb-6 max-w-2xl text-center text-sm text-foreground-500">
        Jump to a dedicated checker or resize channel art with 2026 banner dimensions (2560×1440px, 1546×423px safe
        zone).
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {links.map((item) => (
          <Card key={item.href} className="border border-foreground-200/80 shadow-sm transition-colors hover:border-primary/30">
            <CardBody className="flex flex-col gap-3 p-5">
              <div className="flex items-center gap-2">
                <Icon icon={item.icon} size={22} className="text-primary" />
                <h3 className="font-sans text-base font-semibold">{item.title}</h3>
              </div>
              <p className="flex-1 text-sm text-foreground-500">{item.description}</p>
              <NextLink
                href={item.href}
                className="text-sm font-medium text-primary underline underline-offset-2"
              >
                Open tool
              </NextLink>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}
