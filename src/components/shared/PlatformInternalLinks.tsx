import { Button, Card, CardBody } from '@heroui/react';
import NextLink from 'next/link';
import React from 'react';

import { RelatedResource } from '../../data/related-resources';
import { Icon } from '../various/Icon';

interface PlatformInternalLinksProps {
  /** Array of platform resources to link to */
  resources: RelatedResource[];
  /** Custom title for the section */
  title?: string;
  /** Custom description/intro text */
  description?: string;
}

/**
 * Component for cross-linking within the platform cluster
 * Used to link between related platform pages (e.g., Creative Workspace -> Review & Approval)
 */
export function PlatformInternalLinks({
  resources,
  title = 'Related Platform Features',
  description,
}: PlatformInternalLinksProps) {
  if (resources.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">{title}</h2>
          {description && (
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">{description}</p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <NextLink key={resource.href} href={resource.href} className="group h-full">
              <Card className="h-full border border-foreground-200 bg-content1 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/20">
                <CardBody className="flex flex-col gap-4 p-6">
                  <div className="mb-2 flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:from-primary/30 group-hover:to-primary/20">
                      <Icon icon={resource.icon} size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 font-sans text-lg font-semibold leading-tight transition-colors duration-200 group-hover:text-primary">
                        {resource.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-foreground-500">{resource.description}</p>
                    </div>
                    <div className="flex-shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                      <Icon icon="arrowRight" size={20} className="text-primary" />
                    </div>
                  </div>
                  <div className="mt-auto flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span>Learn more</span>
                  </div>
                </CardBody>
              </Card>
            </NextLink>
          ))}
        </div>
      </div>
    </section>
  );
}
