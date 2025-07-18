import { Button, Card, CardBody, Chip } from '@heroui/react';
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
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          <Card isHoverable className="dark:border border-foreground-300">
            <CardBody className="p-6 flex flex-col gap-8">
              <div>
                <Chip size="lg" variant="faded">
                  Free
                </Chip>
                <div className="text-5xl font-bold font-sans mt-4 mb-2">$0</div>
                <p className="text-foreground-500">Ideal for individuals or small teams just getting started.</p>
              </div>
              <ul className="text-lg flex flex-col gap-2 text-foreground-500">
                <li className="flex items-start gap-1">
                  <Icon icon="check" className="text-foreground-500" size={24} />1 Project
                </li>
                <li className="flex items-start gap-1">
                  <Icon icon="check" className="text-foreground-500" size={24} />2 members
                </li>
                <li className="flex items-start gap-1">
                  <Icon icon="check" className="text-foreground-500" size={24} />
                  5GB Total Upload*
                </li>
              </ul>
              <Button as={Link} href="/sign-up" size="lg" className="bg-foreground text-content1">
                Get Started for Free
              </Button>
            </CardBody>
          </Card>
          <Card isHoverable className="dark:border border-foreground-300">
            <CardBody className="p-6 flex flex-col gap-8">
              <div>
                <Chip size="lg" variant="faded">
                  Pro
                </Chip>
                <div className="text-5xl font-bold font-sans mt-4 mb-2">
                  $15<span className="text-foreground-500 text-sm font-normal"> /per user monthly</span>
                </div>
                <p className="text-foreground-500">Ideal for individuals or small teams just getting started.</p>
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
                <li className="flex items-start gap-1">
                  <Icon icon="check" className="text-foreground-500" size={24} />1 TB Storage
                </li>
              </ul>
              <Button as={Link} href="/sign-up" size="lg" className="bg-foreground text-content1">
                Get Started for Free
              </Button>
            </CardBody>
          </Card>
          <Card isHoverable className="dark:border border-foreground-300">
            <CardBody className="p-6 flex flex-col gap-8">
              <div>
                <Chip size="lg" variant="faded">
                  Advanced
                </Chip>
                <div className="text-5xl font-bold font-sans mt-4 mb-2">
                  $20<span className="text-foreground-500 text-sm font-normal"> /per user monthly</span>
                </div>
                <p className="text-foreground-500">Ideal for individuals or small teams just getting started.</p>
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
                <li className="flex items-start gap-1">
                  <Icon icon="check" className="text-foreground-500" size={24} />2 TB Storage
                </li>
              </ul>
              <Button as={Link} href="/sign-up" size="lg" className="bg-foreground text-content1">
                Get Started for Free
              </Button>
            </CardBody>
          </Card>
        </div>
        <p className="text-foreground-500 text-center">
          *"Total upload" tracks the cumulative size of all files a user has uploaded, even if some are later deleted.
          This means deleted files still count toward the user's upload limit.
        </p>
        <div>
          <Button size="lg" variant="flat">
            Contact Sales for Custom Plan
          </Button>
        </div>
      </div>
    </section>
  );
};
