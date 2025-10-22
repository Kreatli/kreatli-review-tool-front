import { Button } from '@heroui/react';
import Link from 'next/link';
import LogoIcon from '../../../assets/images/logo.svg';
import { Icon } from '../../various/Icon';

interface Props {
  links?: {
    label: string;
    url: string;
  }[];
}

export const FooterSection = ({ links = [] }: Props) => {
  return (
    <footer className="bg-foreground-50">
      <div className="px-6 lg:pt-32 pt-16 pb-12 lg:pb-20 flex flex-col items-center gap-8">
        <h2 className="text-3xl sm:text-5xl font-bold font-sans text-center max-w-xl mx-auto">
          Take Control of Your Creative Projects Today!
        </h2>
        <p className="text-lg text-center sm:text-2xl text-foreground-500 font-medium">
          Start using Kreatli for free and experience the value firsthand.
        </p>
        <div className="flex items-center gap-4">
          <Button as={Link} href="/sign-up" size="lg" className="bg-foreground text-content1">
            Get Started for Free
          </Button>
          <Button as="a" href="https://calendar.app.google/NXbAeTAUwaBGh5x49" target="_blank" size="lg" variant="light">
            Book a Demo
          </Button>
        </div>
      </div>
      <div className="px-6 w-full max-w-6xl mx-auto py-8 flex flex-col lg:flex-row justify-between items-end gap-8">
        <div className="flex flex-col gap-4 w-full lg:w-auto">
          <Link href="/">
            <LogoIcon viewBox="0 0 90 22" />
          </Link>
          <div className="text-sm text-foreground-500 max-w-64">
            We help Creative Teams streamline post production processes and optimize workflows
          </div>
          <div className="flex gap-3">
            <a href="https://www.linkedin.com/company/kreatli" target="_blank">
              <Icon icon="linkedin" size={24} />
            </a>
            <a href="https://x.com/kreatli" target="_blank">
              <Icon icon="x" size={24} />
            </a>
            <a href="https://www.tiktok.com/@kreatli" target="_blank">
              <Icon icon="tiktok" size={24} />
            </a>
            <a href="https://www.facebook.com/people/Kreatli/61581649865831" target="_blank">
              <Icon icon="facebook" size={24} />
            </a>
          </div>
        </div>
        <div className="flex md:flex-row md:justify-between flex-col gap-3 w-full lg:w-auto">
          {links.length > 0 && (
            <div>
              <ul className="grid sm:grid-cols-2 gap-y-1 gap-x-3">
                {links.map((link) => (
                  <li key={link.url}>
                    <Link href={link.url} className="text-foreground-500 hover:underline underline-offset-2">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <ul className="flex flex-col gap-1">
              <li>
                <Link
                  href="mailto:support@kreatli.com"
                  className="text-foreground-500 hover:underline underline-offset-2"
                >
                  Contact us
                </Link>
              </li>
              <li>
                <Link className="text-foreground-500 hover:underline underline-offset-2" href="/terms-and-conditions">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link className="text-foreground-500 hover:underline underline-offset-2" href="/privacy-policy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="text-foreground-500 hover:underline underline-offset-2" href="/cookie-policy">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-sm text-foreground-500 p-6 text-center">Copyright 2025 Kreatli. All rights reserved.</div>
    </footer>
  );
};
