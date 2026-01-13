import { Button, Card, CardBody, Chip, Tooltip } from '@heroui/react';
import Link from 'next/link';

import { Icon } from '../../various/Icon';

interface PricingSectionProps {
  titleClassName?: string;
  showDetailedFeatures?: boolean;
}

const PLANS_DATA = [
  {
    id: 'creator',
    name: 'Creator',
    price: 7,
    description: 'Designed for solo creators and teams who want to organize projects, review work, and create faster.',
    previousPlan: null,
    limits: [
      { label: 'Up to 3 members' },
      { label: '500GB Storage', tooltip: '$3 per month per additional 100GB' },
      { label: 'Unlimited projects & reviewers' },
    ],
    uniqueFeatures: [{ label: 'Frame-accurate video review' }, { label: 'Shared asset libraries' }],
  },
  {
    id: 'team',
    name: 'Team',
    price: 19,
    description:
      'Built for established teams running multiple projects with shared assets, structured reviews, and consistent workflows.',
    previousPlan: 'Creator',
    limits: [{ label: 'Up to 10 members' }, { label: '2TB Storage', tooltip: '$3 per month per additional 100GB' }],
    uniqueFeatures: [
      { label: 'File organization and management' },
      { label: 'Versioning and comparison' },
      { label: 'Asset-linked conversations' },
      { label: 'Guest review links' },
      { label: 'Comment threads and annotations' },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: null,
    description:
      'Tailored for enterprise organizations that need advanced controls, custom workflows, and dedicated support.',
    previousPlan: 'Team',
    limits: [{ label: 'Custom members' }, { label: 'Custom storage' }],
    uniqueFeatures: [
      { label: 'Single Sign-On (SSO)' },
      { label: 'Dedicated Account Manager' },
      { label: 'Custom Integrations & Features' },
    ],
  },
];

export const PricingSection = ({ titleClassName }: PricingSectionProps) => {
  return (
    <section id="pricing" className="bg-foreground-50 px-6 py-16 lg:py-32">
      <div className="flex flex-col items-center gap-12">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
          <h2 className={titleClassName || 'text-center font-sans text-3xl font-bold sm:text-5xl'}>
            Choose the Perfect Plan for Your Creative Journey
          </h2>
          <p className="text-center text-lg text-foreground-500">
            Choose a plan and start your 7-day free trial. No credit card required.
          </p>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PLANS_DATA.map((plan) => {
            type FeatureItem = { label: string; tooltip?: string; isBold?: boolean };

            const features: FeatureItem[] = [
              ...(plan.previousPlan ? [{ label: `Everything in ${plan.previousPlan}`, isBold: true }] : []),
              ...plan.limits,
              ...plan.uniqueFeatures,
            ];

            return (
              <Card
                key={plan.id}
                isHoverable
                className={`relative overflow-visible ${
                  plan.id === 'team' ? 'border border-foreground' : 'border-foreground-300 dark:border'
                }`}
              >
                {plan.id === 'team' && (
                  <Chip className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-foreground text-content1">
                    Best Cost/Value Ratio
                  </Chip>
                )}
                <CardBody className={`flex flex-col gap-8 p-6 ${plan.id === 'team' ? 'py-10' : ''}`}>
                  <div>
                    <Chip size="lg" variant="faded">
                      {plan.name}
                    </Chip>
                    <div className={`mb-4 mt-4 flex items-end gap-2 ${plan.price === null ? 'mb-2' : ''}`}>
                      {plan.price !== null ? (
                        <>
                          <span className="font-sans text-5xl font-bold leading-10">${plan.price}</span>
                          <span className="text-sm leading-4 text-foreground-500">
                            per user <br /> per month
                          </span>
                        </>
                      ) : (
                        <div className="font-sans text-2xl font-bold">Custom</div>
                      )}
                    </div>
                    <p className="text-foreground-500">{plan.description}</p>
                  </div>
                  <ul className="flex flex-col gap-1 text-lg text-foreground-500">
                    {features.map((feature, idx) => (
                      <li key={`${plan.id}-feature-${idx}`} className="flex items-center gap-1">
                        <Icon icon="check" className="text-foreground-500" size={18} />
                        <span className={feature.isBold ? 'font-semibold text-foreground-600' : ''}>
                          {feature.label}
                        </span>
                        {feature.tooltip && (
                          <Tooltip content={feature.tooltip} className="max-w-sm">
                            <div>
                              <Icon icon="infoCircle" size={18} className="ml-1 text-foreground-500" />
                            </div>
                          </Tooltip>
                        )}
                      </li>
                    ))}
                  </ul>
                  {plan.price !== null ? (
                    <div className="flex flex-col gap-2">
                      <Button
                        as={Link}
                        href="/sign-up"
                        size="lg"
                        className={plan.id === 'team' ? 'bg-foreground text-content1' : ''}
                        variant={plan.id === 'team' ? 'solid' : 'bordered'}
                      >
                        Start free trial
                      </Button>
                      <p className="text-center text-sm text-foreground-500">No credit card required.</p>
                    </div>
                  ) : (
                    <Button
                      as="a"
                      href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
                      target="_blank"
                      size="lg"
                      variant="bordered"
                    >
                      Book a demo
                    </Button>
                  )}
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
