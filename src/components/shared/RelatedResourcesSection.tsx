import { Button, Card, CardBody } from '@heroui/react';
import NextLink from 'next/link';
import React from 'react';

import { RelatedResource } from '../../data/related-resources';
import { Icon } from '../various/Icon';

interface RelatedResourcesSectionProps {
  /** Array of resources to display */
  resources: RelatedResource[];
  /** Custom title for the section */
  title?: string;
  /** Custom description for the section */
  description?: string;
}

export function RelatedResourcesSection({
  resources,
  title = 'Related Resources',
  description = 'Learn more about creative production workflows, asset management, and team collaboration.',
}: RelatedResourcesSectionProps) {
  if (resources.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">{title}</h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">{description}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <NextLink key={resource.href} href={resource.href} className="group h-full">
              <Card className="h-full">
                <CardBody className="flex flex-col gap-4 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-3 transition-all duration-300 group-hover:from-primary/20 group-hover:to-primary/10">
                      <Icon icon={resource.icon} size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 font-sans text-lg font-semibold transition-colors duration-200 group-hover:text-primary">
                        {resource.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-foreground-500">{resource.description}</p>
                    </div>
                  </div>
                  <Button
                    variant="light"
                    size="sm"
                    className="mt-auto w-fit transition-all duration-200 group-hover:bg-primary/10"
                    endContent={
                      <Icon
                        icon="arrowRight"
                        size={16}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    }
                  >
                    {resource.buttonText || 'Learn More'}
                  </Button>
                </CardBody>
              </Card>
            </NextLink>
          ))}
        </div>
      </div>
    </section>
  );
}
