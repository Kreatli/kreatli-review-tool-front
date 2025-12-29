import { Button } from '@heroui/react';
import Link from 'next/link';
import LogoIcon from '../../../assets/images/logo.svg';
import { Socials } from '../Socials/Socials';

const LINKS = [
  {
    label: 'File Sharing vs. File Transfer',
    url: '/blog/file-sharing-vs-file-transfer',
  },
  {
    label: 'Secure Ways to Send Large Video Files',
    url: '/blog/secure-ways-to-send-large-video-files',
  },
  {
    label: 'Best Frame.io Alternatives',
    url: '/blog/best-frameio-alternatives-video-review-2026',
  },
  {
    label: 'Free Online Cloud Storage',
    url: '/blog/free-online-cloud-storage',
  },
  {
    label: 'MAM vs DAM: For Creative Teams',
    url: '/blog/mam-vs-dam-which-asset-system-right-for-creative-teams',
  },
  {
    label: 'Minimal Tech Stack for Small Creative Teams',
    url: '/blog/minimal-tech-stack-small-creative-teams',
  },
  {
    label: 'File Transfer & Cloud Sharing Guide',
    url: '/blog/ultimate-guide-file-transfer-cloud-sharing-video-teams',
  },
];

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
      <div className="mx-auto flex w-full max-w-6xl flex-col items-end justify-between gap-8 px-6 py-8 lg:flex-row">
        <div className="flex w-full flex-col gap-4 lg:w-auto">
          <Link href="/">
            <LogoIcon viewBox="0 0 90 22" />
          </Link>
          <div className="max-w-64 text-sm text-foreground-500">
            Kreatli helps content teams and creators streamline creative production.
          </div>
          <Socials />
        </div>
        <div className="flex w-full flex-col gap-6 md:flex-row md:justify-between lg:w-auto">
          <div>
            <ul className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
              <li key="blog">
                <Link href="/blog" className="font-semibold underline-offset-2 hover:underline">
                  Kreatli Blog
                </Link>
              </li>
              {LINKS.map((link) => (
                <li key={link.url} className="flex overflow-hidden">
                  <Link
                    href={link.url}
                    className="w-fit truncate text-foreground-500 underline-offset-2 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="flex flex-col gap-1 whitespace-nowrap">
              <li>
                <Link
                  href="mailto:support@kreatli.com"
                  className="text-foreground-500 underline-offset-2 hover:underline"
                >
                  Contact us
                </Link>
              </li>
              <li>
                <Link className="text-foreground-500 underline-offset-2 hover:underline" href="/terms-and-conditions">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link className="text-foreground-500 underline-offset-2 hover:underline" href="/privacy-policy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="text-foreground-500 underline-offset-2 hover:underline" href="/cookie-policy">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="p-6 text-center text-sm text-foreground-500">Copyright 2025 Kreatli. All rights reserved.</div>
    </footer>
  );
};
