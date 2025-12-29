import { Button, Card, CardBody, Chip, Tooltip } from '@heroui/react';
import { Icon } from '../../various/Icon';
import Link from 'next/link';

export const PricingSection = ({ titleClassName }: { titleClassName?: string }) => {
  return (
    <section id="pricing" className="bg-foreground-50 px-6 py-16 lg:py-32">
      <div className="flex flex-col items-center gap-12">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
          <h2 className={titleClassName || 'text-center font-sans text-3xl font-bold sm:text-5xl'}>
            Choose the Perfect Plan for Your Creative Journey
          </h2>
          <p className="text-center text-lg text-foreground-500">
            Flexible options to support your growth and ambition
          </p>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card isHoverable className="border-foreground-300 dark:border">
            <CardBody className="flex flex-col gap-8 p-6">
              <div>
                <Chip size="lg" variant="faded">
                  Free
                </Chip>
                <div className="mb-4 mt-4 flex items-end gap-2">
                  <span className="font-sans text-5xl font-bold leading-10">$0</span>
                </div>
                <p className="text-foreground-500">Ideal for individuals or small teams just getting started.</p>
              </div>
              <ul className="flex flex-col gap-1 text-lg text-foreground-500">
                <li className="flex items-center gap-1">
                  <Icon icon="check" className="text-foreground-500" size={18} />2 Projects
                </li>
                <li className="flex items-center gap-1">
                  <Icon icon="check" className="text-foreground-500" size={18} />2 members
                </li>
                <li className="flex items-center gap-1">
                  <Icon icon="check" className="text-foreground-500" size={18} />
                  5GB Total Upload*
                  <Tooltip
                    content="“Total upload” tracks the cumulative size of all files a user has uploaded, even if some are later deleted. This means deleted files still count toward the user's upload limit."
                    className="max-w-sm"
                  >
                    <div>
                      <Icon icon="infoCircle" size={18} className="ml-1 text-foreground-500" />
                    </div>
                  </Tooltip>
                </li>
              </ul>
              <Button as={Link} href="/sign-up" size="lg" variant="bordered">
                Start For Free
              </Button>
            </CardBody>
          </Card>
          <Card isHoverable className="relative overflow-visible border border-foreground">
            <Chip className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-foreground text-content1">
              Best Cost/Value Ratio
            </Chip>
            <CardBody className="flex flex-col gap-8 p-6 py-10">
              <div className="w-full">
                <div className="flex w-full items-center justify-between">
                  <Chip size="lg" variant="faded">
                    Pro
                  </Chip>
                </div>
                <div className="mb-4 mt-4 flex items-end gap-2">
                  <span className="font-sans text-5xl font-bold leading-10">$15</span>
                  <span className="text-sm leading-4 text-foreground-500">
                    per user <br /> per month
                  </span>
                </div>
                <p className="text-foreground-500">
                  Perfect for small teams looking to manage multiple projects efficiently.
                </p>
              </div>
              <ul className="flex flex-col gap-1 text-lg text-foreground-500">
                <li className="flex items-center gap-1">
                  <Icon icon="check" className="text-foreground-500" size={18} />
                  Up to 10 Projects
                </li>
                <li className="flex items-center gap-1">
                  <Icon icon="check" className="text-foreground-500" size={18} />
                  Up to 5 Members
                </li>
                <li className="flex items-center gap-1">
                  <Icon icon="check" className="text-foreground-500" size={18} />1 TB Storage
                  <Tooltip content="$5 per month per additional 100GB" className="max-w-sm">
                    <div>
                      <Icon icon="infoCircle" size={18} className="ml-1 text-foreground-500" />
                    </div>
                  </Tooltip>
                </li>
                <li className="flex items-center gap-1">
                  <Icon icon="check" className="text-foreground-500" size={18} />
                  Google Drive/Dropbox Upload
                </li>
                <li className="flex items-center gap-1">
                  <Icon icon="check" className="text-foreground-500" size={18} />
                  Guest links
                </li>
                <li className="flex items-center gap-1">
                  <Icon icon="check" className="text-foreground-500" size={18} />
                  Shareable Projects
                </li>
                <li className="flex items-center gap-1">
                  <Icon icon="check" className="text-foreground-500" size={18} />
                  Watermarked Media
                </li>
              </ul>
              <Button as={Link} href="/sign-up" size="lg" className="bg-foreground text-content1">
                Choose Pro Plan
              </Button>
            </CardBody>
          </Card>
          <Card isHoverable className="border-foreground-300 dark:border">
            <CardBody className="flex flex-col gap-8 p-6">
              <div>
                <Chip size="lg" variant="faded">
                  Advanced
                </Chip>
                <div className="mb-4 mt-4 flex items-end gap-2">
                  <span className="font-sans text-5xl font-bold leading-10">$20</span>
                  <span className="text-sm leading-4 text-foreground-500">
                    per user <br /> per month
                  </span>
                </div>
                <p className="text-foreground-500">
                  Designed for growing teams needing more extensive collaboration tools.
                </p>
              </div>
              <ul className="flex flex-col gap-1 text-lg text-foreground-500">
                <li className="flex items-center gap-1">Everything in Pro, plus:</li>
                <li className="flex items-center gap-1">
                  <Icon icon="check" className="text-foreground-500" size={18} />
                  Unlimited Projects
                </li>
                <li className="flex items-center gap-1">
                  <Icon icon="check" className="text-foreground-500" size={18} />
                  Unlimited Members
                </li>
                <li className="flex items-center gap-1">
                  <Icon icon="check" className="text-foreground-500" size={18} />2 TB Storage
                  <Tooltip content="$3 per month per additional 100GB" className="max-w-sm">
                    <div>
                      <Icon icon="infoCircle" size={18} className="ml-1 text-foreground-500" />
                    </div>
                  </Tooltip>
                </li>
              </ul>
              <Button as={Link} href="/sign-up" size="lg" variant="bordered">
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
          >
            Create your own Plan
          </Button>
        </div>
      </div>
    </section>
  );
};
