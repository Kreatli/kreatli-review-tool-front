import { Button } from '@heroui/react';
import Link from 'next/link';

export const FooterSection = () => {
  return (
    <footer className="bg-foreground-50">
      <div className="px-6 lg:py-32 py-16 flex flex-col items-center gap-8">
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
      <div className="text-center px-6 pb-4 flex flex-col md:flex-row gap-2 text-sm justify-center text-foreground-500">
        <span>Copyright 2025 Kreatli. All rights reserved.</span>
        <Link className="underline underline-offset-2" href="/terms-and-conditions">
          Terms and Conditions
        </Link>
        <Link className="underline underline-offset-2" href="/privacy-policy">
          Privacy Policy
        </Link>
        <Link className="underline underline-offset-2" href="/cookie-policy">
          Cookie Policy
        </Link>
      </div>
    </footer>
  );
};
