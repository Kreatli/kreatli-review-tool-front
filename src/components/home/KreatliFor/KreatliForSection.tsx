import { Button, Card, CardBody } from '@heroui/react';
import { default as Link, default as NextLink } from 'next/link';

import { Icon, IconType } from '../../various/Icon';

const industryCards = [
  {
    title: 'Advertising & Marketing Agencies',
    description: 'Streamline campaign production with frame-accurate review and no-signup client links.',
    icon: 'building',
    href: '/solutions/industry/advertising-marketing-agencies',
  },
  {
    title: 'Video Production & Animation Studios',
    description: 'Frame-accurate feedback, version control, and collaboration for video teams.',
    icon: 'addVideo',
    href: '/solutions/industry/video-production-animation-studios',
  },
  {
    title: 'In-House Creative & Content Teams',
    description: 'Centralized brand asset management and streamlined approval workflows.',
    icon: 'group',
    href: '/solutions/industry/in-house-creative-content-teams',
  },
];

export const KreatliForSection = () => {
  return (
    <section id="for-whom" className="px-6 py-16 backdrop-blur-lg lg:py-24 lg:mt-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 sm:gap-12">
        <div className="flex w-full flex-col gap-4">
          <h2 className="text-center font-sans text-3xl font-bold sm:text-4xl">Who is Kreatli for?</h2>
          <p className="mx-auto max-w-2xl text-center text-lg text-foreground-500">
            Creative teams, agencies, and studios who want to streamline their production workflow—from upload to
            approval to delivery.
          </p>
        </div>
        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industryCards.map((card, index) => (
            <Card
              key={index}
              as={NextLink}
              href={card.href}
              isPressable
              className="group h-full border border-foreground-200 bg-content1 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/20"
            >
              <CardBody className="flex h-full flex-col items-center gap-5 p-8">
                <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:from-primary/30 group-hover:to-primary/20">
                  <Icon
                    icon={card.icon as IconType}
                    size={28}
                    className="text-primary transition-colors duration-300"
                  />
                </div>
                <div className="flex flex-1 flex-col items-center gap-2 text-center">
                  <h3 className="font-sans text-xl font-semibold transition-colors duration-200 group-hover:text-primary">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground-500">{card.description}</p>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span>Learn more</span>
                  <Icon icon="arrowRight" size={16} />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
          <Button as={Link} href="/sign-up" size="lg" className="bg-foreground text-content1">
            Start For Free
          </Button>
          <Button as="a" href="https://calendar.app.google/NXbAeTAUwaBGh5x49" target="_blank" size="lg" variant="light">
            Book a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};
