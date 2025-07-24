import { Button } from '@heroui/react';
import Link from 'next/link';
import { Icon } from '../../various/Icon';

export const FooterSection = () => {
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
      <div className="px-6 py-6 text-sm text-foreground-500">
        <div className="grid sm:grid-cols-[1fr_auto] xl:grid-cols-3 gap-2 items-center">
          <div className="flex flex-col sm:flex-row gap-y-2 gap-x-4">
            <Link className="hover:underline underline-offset-2" href="/terms-and-conditions">
              Terms and Conditions
            </Link>
            <Link className="hover:underline underline-offset-2" href="/privacy-policy">
              Privacy Policy
            </Link>
            <Link className="hover:underline underline-offset-2" href="/cookie-policy">
              Cookie Policy
            </Link>
          </div>
          <span className="order-1 sm:order-none sm:text-end xl:text-center">
            Copyright 2025 Kreatli. All rights reserved.
          </span>
          <div className="flex flex-col sm:items-center xl:justify-end sm:flex-row gap-y-2 gap-x-4">
            <Link
              href="mailto:support@kreatli.com"
              className="flex items-center gap-1 hover:underline underline-offset-2"
            >
              Contact us
            </Link>
            <span className="flex items-center gap-2">
              Meet out founder:
              <a href="https://www.linkedin.com/in/heorhi-talochka" target="_blank">
                <Icon icon="linkedin" size={18} />
              </a>
              <a href="https://x.com/georgegiom" target="_blank">
                <Icon icon="x" size={18} />
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
