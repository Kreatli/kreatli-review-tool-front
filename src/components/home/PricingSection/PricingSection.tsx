import { Button, Card, CardBody, Chip, Tooltip } from '@heroui/react';
import { Icon } from '../../various/Icon';
import Link from 'next/link';

export const PricingSection = () => {
  return (
    <section className="bg-foreground-50 lg:py-32 py-16 px-6">
      <div className="flex flex-col gap-12 items-center">
        <div className="max-w-2xl mx-auto flex flex-col gap-4 w-full">
          <h2 className="text-3xl sm:text-5xl font-bold font-sans text-center">
            Choose the Perfect Plan for Your Creative Journey
          </h2>
          <p className="text-lg text-foreground-500 text-center">
            Flexible options to support your growth and ambition
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center lg:grid-cols-3 gap-8 w-full">
          <Card isHoverable className="dark:border border-foreground-300">
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
              <ul className="text-lg flex flex-col gap-2 text-foreground-500">
                <li className="flex items-start gap-1">
                  <Icon icon="check" className="text-foreground-500" size={24} />1 Project
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
              <Button as={Link} href="/sign-up" size="lg" className="bg-foreground text-content1">
                Get Started for Free
              </Button>
            </CardBody>
          </Card>
          <Card isHoverable className="relative shadow-large">
            <CardBody className="p-6 flex flex-col gap-8">
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
              <ul className="text-lg flex flex-col gap-2 text-foreground-500">
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
              </ul>
              <Button as={Link} href="/sign-up" size="lg" className="bg-foreground text-content1">
                Choose Pro Plan
              </Button>
            </CardBody>
          </Card>
          <Card isHoverable className="dark:border border-foreground-300">
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
              <ul className="text-lg flex flex-col gap-2 text-foreground-500">
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
              <Button as={Link} href="/sign-up" size="lg" className="bg-foreground text-content1">
                Choose Advanced Plan
              </Button>
            </CardBody>
          </Card>
        </div>
        <div>
          <Button as="a" href="https://calendar.app.google/NXbAeTAUwaBGh5x49" target="_blank" size="lg" variant="flat">
            Create your own Plan
          </Button>
        </div>
      </div>
    </section>
  );
};
