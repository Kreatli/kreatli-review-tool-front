import { Button, cn } from '@heroui/react';
import NextLink from 'next/link';

export function HeroCtaButtons({ className }: { className?: string }) {
  return (
    <div className={cn('mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row', className)}>
      <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
        Start 7-day trial
      </Button>
      <Button
        as="a"
        href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
        target="_blank"
        size="lg"
        variant="bordered"
      >
        Book a Demo
      </Button>
    </div>
  );
}

