import { Button } from '@heroui/react';
import Link from 'next/link';

export const FooterSection = () => {
  return (
    <footer className="bg-foreground-50 px-6 lg:py-32 py-16 flex flex-col items-center gap-8">
      <h2 className="text-3xl sm:text-5xl font-bold font-sans text-center max-w-xl mx-auto">
        Take Control of Your Creative Projects Today!
      </h2>
      <p className="text-lg text-center sm:text-2xl text-foreground-500 font-medium">
        Sign up for a free trial and experience effortless collaboration.
      </p>
      <div className="flex items-center gap-4">
        <Button as={Link} href="/sign-up" size="lg" className="bg-foreground text-content1">
          Get Started for Free
        </Button>
        <Button as="a" href="https://calendar.app.google/NXbAeTAUwaBGh5x49" target="_blank" size="lg" variant="light">
          Book a Demo
        </Button>
      </div>
    </footer>
  );
};
