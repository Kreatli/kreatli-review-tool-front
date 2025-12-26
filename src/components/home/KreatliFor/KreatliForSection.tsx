import { Button, Card, CardBody } from '@heroui/react';
import { Icon } from '../../various/Icon';
import Link from 'next/link';
import NextLink from 'next/link';

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
    <section id="for-whom" className="backdrop-blur-lg lg:py-32 py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-8 sm:gap-12 items-center">
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-3xl sm:text-5xl font-bold font-sans text-center">Who is Kreatli for?</h2>
          <p className="text-lg text-foreground-500 text-center max-w-2xl mx-auto">
            Creative teams, agencies, and studios who want to streamline their production workflow—from upload to
            approval to delivery.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {industryCards.map((card, index) => (
            <Card
              key={index}
              as={NextLink}
              href={card.href}
              isPressable
              className="group h-full border border-foreground-200 hover:border-foreground-300 transition-all duration-300 hover:shadow-md"
            >
              <CardBody className="flex flex-col gap-5 items-center p-8 h-full">
                <div className="bg-foreground-100 rounded-full size-16 flex items-center justify-center transition-all duration-300 group-hover:bg-foreground-200 group-hover:scale-105">
                  <Icon
                    icon={card.icon as any}
                    size={28}
                    className="text-foreground-500 group-hover:text-primary transition-colors duration-300"
                  />
                </div>
                <div className="flex flex-col gap-2 items-center text-center flex-1">
                  <h3 className="text-xl font-semibold font-sans">{card.title}</h3>
                  <p className="text-sm text-foreground-500 leading-relaxed">{card.description}</p>
                </div>
                <div className="flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Learn more</span>
                  <Icon icon="arrowRight" size={16} />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
          <Button 
            as={Link} 
            href="/sign-up" 
            size="lg" 
            className="text-content1 bg-foreground min-h-[44px] sm:min-h-[48px] transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-100 w-full sm:w-auto"
          >
            Start For Free
          </Button>
          <Button 
            as="a" 
            href="https://calendar.app.google/NXbAeTAUwaBGh5x49" 
            target="_blank" 
            size="lg" 
            variant="light"
            className="min-h-[44px] sm:min-h-[48px] transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-100 w-full sm:w-auto"
          >
            Book a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};
