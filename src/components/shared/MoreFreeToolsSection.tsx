import { Button, Card, CardBody } from '@heroui/react';
import NextLink from 'next/link';
import React from 'react';

import { FREE_TOOLS, FreeTool } from '../../data/free-tools';
import { Icon } from '../various/Icon';

interface MoreFreeToolsSectionProps {
  /** Current page href to exclude from the list */
  excludeHref?: string;
  /** Custom title for the section */
  title?: string;
  /** Custom description for the section */
  description?: string;
  /** Custom tools to display (if not provided, uses all tools except excluded) */
  tools?: FreeTool[];
  /** Show "View All Free Tools" button */
  showViewAllButton?: boolean;
}

export function MoreFreeToolsSection({
  excludeHref,
  title = 'More Free Tools for Video Teams',
  description = 'Explore our collection of free tools designed to help creative professionals work more efficiently.',
  tools,
  showViewAllButton = true,
}: MoreFreeToolsSectionProps) {
  // Filter out the current page tool if excludeHref is provided
  const displayTools = tools
    ? tools
    : FREE_TOOLS.filter((tool) => !excludeHref || tool.href !== excludeHref);

  const limitedTools = displayTools.slice(0, 3);

  if (limitedTools.length === 0) {
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
          {limitedTools.map((tool) => (
            <NextLink
              key={tool.href}
              href={tool.href}
              className="group h-full rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={tool.ariaLabel || tool.title}
            >
              <Card className="h-full border-2 border-transparent transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group-hover:border-primary/20">
                <CardBody className="flex flex-col gap-5 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-3.5 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                      <Icon icon={tool.icon} size={24} className="text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-2 font-sans text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                        {tool.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-foreground-500">{tool.description}</p>
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
                    {tool.buttonText || 'Try Now'}
                  </Button>
                </CardBody>
              </Card>
            </NextLink>
          ))}
        </div>

        {showViewAllButton && (
          <div className="mt-10 text-center">
            <Button
              as={NextLink}
              href="/free-tools"
              variant="bordered"
              size="lg"
              className="group border-foreground-200 px-8 transition-all duration-200 hover:border-primary hover:bg-primary/5 hover:shadow-md"
              endContent={
                <Icon
                  icon="arrowRight"
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              }
            >
              View All Free Tools
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
