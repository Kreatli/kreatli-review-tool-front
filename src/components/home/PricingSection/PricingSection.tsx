import { Button, Card, CardBody, Chip, Tooltip } from '@heroui/react';
import { Icon } from '../../various/Icon';
import Link from 'next/link';

export const PricingSection = ({ titleClassName }: { titleClassName?: string }) => {
  return (
    <section id="pricing" className="bg-foreground-50 lg:py-32 py-16 px-6">
      <div className="flex flex-col gap-12 items-center">
        <div className="max-w-2xl mx-auto flex flex-col gap-4 w-full">
          <h2
            className={
              titleClassName || 'text-3xl sm:text-5xl font-bold font-sans text-center'
            }
          >
            Choose the Perfect Plan for Your Creative Journey
          </h2>
          <p className="text-lg text-foreground-500 text-center">
            Flexible options to support your growth and ambition
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center lg:grid-cols-3 gap-8 w-full">
          <Card isHoverable className="dark:border border-foreground-300 transition-all duration-200 hover:shadow-lg">
            <CardBody className="p-6 flex flex-col gap-8">
              <div>
                <Chip size="lg" variant="faded">
                  Free
                </Chip>
                <div className="flex items-end gap-2 mt-4 mb-4">
                  <span className="text-5xl font-bold font-sans leading-10">$0</span>
                </div>
                <p className="text-foreground-500">Ideal for individuals or small teams just getting started.</p>
              </div>
              <ul className="text-lg flex flex-col gap-1 text-foreground-500">
                <li className="flex items-start gap-1">
                  <Icon icon="check" className="text-foreground-500" size={24} />2 Projects
                </li>
                <li className="flex items-start gap-1">
                  <Icon icon="check" className="text-foreground-500" size={24} />2 members
                </li>
                <li className="flex items-center gap-1">
                  <Icon icon="check" className="text-foreground-500" size={24} />
                  5GB Total Upload*
                  <Tooltip
                    content="“Total upload” tracks the cumulative size of all files a user has uploaded, even if some are later deleted. This means deleted files still count toward the user's upload limit."
                    className="max-w-sm"
                  >
                    <div>
                      <Icon icon="infoCircle" size={18} className="text-foreground-500 ml-1" />
                    </div>
                  </Tooltip>
                </li>
              </ul>
              <Button 
                as={Link} 
                href="/sign-up" 
                size="lg" 
                variant="bordered"
                className="min-h-[44px] sm:min-h-[48px] transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-100"
              >
                Start For Free
              </Button>
            </CardBody>
          </Card>
          <Card isHoverable className="relative border border-foreground overflow-visible transition-all duration-200 hover:shadow-xl hover:scale-[1.02]">
            <Chip className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-foreground text-content1">
              Best Cost/Value Ratio
            </Chip>
            <CardBody className="p-6 py-10 flex flex-col gap-8">
              <div className="w-full">
                <div className="w-full flex items-center justify-between">
                  <Chip size="lg" variant="faded">
                    Pro
                  </Chip>
                </div>
                <div className="flex items-end gap-2 mt-4 mb-4">
                  <span className="text-5xl font-bold font-sans leading-10">$15</span>
                  <span className="text-foreground-500 text-sm leading-4">
                    per user <br /> per month
                  </span>
                </div>
                <p className="text-foreground-500">
                  Perfect for small teams looking to manage multiple projects efficiently.
                </p>
              </div>
              <ul className="text-lg flex flex-col gap-1 text-foreground-500">
                <li className="flex items-start gap-1">
                  <Icon icon="check" className="text-foreground-500" size={24} />
                  Up to 10 Projects
                </li>
                <li className="flex items-start gap-1">
                  <Icon icon="check" className="text-foreground-500" size={24} />
                  Up to 5 Members
                </li>
                <li className="flex items-center gap-1">
                  <Icon icon="check" className="text-foreground-500" size={24} />1 TB Storage
                  <Tooltip content="$5 per month per additional 100GB" className="max-w-sm">
                    <div>
                      <Icon icon="infoCircle" size={18} className="text-foreground-500 ml-1" />
                    </div>
                  </Tooltip>
                </li>
                <li className="flex items-start gap-1">
                  <Icon icon="check" className="text-foreground-500" size={24} />
                  Google Drive/Dropbox Upload
                </li>
                <li className="flex items-start gap-1">
                  <Icon icon="check" className="text-foreground-500" size={24} />
                  Guest links
                </li>
                <li className="flex items-start gap-1">
                  <Icon icon="check" className="text-foreground-500" size={24} />
                  Shareable Projects
                </li>
                <li className="flex items-start gap-1">
                  <Icon icon="check" className="text-foreground-500" size={24} />
                  Watermarked Media
                </li>
              </ul>
              <Button 
                as={Link} 
                href="/sign-up" 
                size="lg" 
                className="bg-foreground text-content1 min-h-[44px] sm:min-h-[48px] transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-100"
              >
                Choose Pro Plan
              </Button>
            </CardBody>
          </Card>
          <Card isHoverable className="dark:border border-foreground-300 transition-all duration-200 hover:shadow-lg">
            <CardBody className="p-6 flex flex-col gap-8">
              <div>
                <Chip size="lg" variant="faded">
                  Advanced
                </Chip>
                <div className="flex items-end gap-2 mt-4 mb-4">
                  <span className="text-5xl font-bold font-sans leading-10">$20</span>
                  <span className="text-foreground-500 text-sm leading-4">
                    per user <br /> per month
                  </span>
                </div>
                <p className="text-foreground-500">
                  Designed for growing teams needing more extensive collaboration tools.
                </p>
              </div>
              <ul className="text-lg flex flex-col gap-1 text-foreground-500">
                <li className="flex items-start gap-1">Everything in Pro, plus:</li>
                <li className="flex items-start gap-1">
                  <Icon icon="check" className="text-foreground-500" size={24} />
                  Unlimited Projects
                </li>
                <li className="flex items-start gap-1">
                  <Icon icon="check" className="text-foreground-500" size={24} />
                  Unlimited Members
                </li>
                <li className="flex items-center gap-1">
                  <Icon icon="check" className="text-foreground-500" size={24} />2 TB Storage
                  <Tooltip content="$3 per month per additional 100GB" className="max-w-sm">
                    <div>
                      <Icon icon="infoCircle" size={18} className="text-foreground-500 ml-1" />
                    </div>
                  </Tooltip>
                </li>
              </ul>
              <Button 
                as={Link} 
                href="/sign-up" 
                size="lg" 
                variant="bordered"
                className="min-h-[44px] sm:min-h-[48px] transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-100"
              >
                Choose Advanced Plan
              </Button>
            </CardBody>
          </Card>
        </div>
        <div>
          <Button
            as="a"
            href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
            target="_blank"
            size="lg"
            variant="bordered"
            className="min-h-[44px] sm:min-h-[48px] transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-100"
          >
            Create your own Plan
          </Button>
        </div>
      </div>
    </section>
  );
};
