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
  /** When true, show YouTube Banner Resizer instead of Software Cost Calculator in the first 4 tools (used on platform pages) */
  useBannerResizerInsteadOfCostCalculator?: boolean;
  /**
   * When provided, shows a prominent "Try [tool] free" CTA banner above the tool grid,
   * linking directly to the most relevant free-tool page. Pass the href of the primary
   * free tool (e.g. "/free-tools/video-annotator").
   */
  primaryToolHref?: string;
}

export function MoreFreeToolsSection({
  excludeHref,
  title = 'More Free Tools for Video Teams',
  description = "Sign up free — no credit card required — and try these tools in Exploration Mode. Start a 7-day free trial when you’re ready for unlimited access.",
  tools,
  showViewAllButton = true,
  useBannerResizerInsteadOfCostCalculator = false,
  primaryToolHref,
}: MoreFreeToolsSectionProps) {
  // Filter out the current page tool if excludeHref is provided
  let displayTools = tools ? tools : FREE_TOOLS.filter((tool) => !excludeHref || tool.href !== excludeHref);

  // On platform pages: show YouTube Banner Resizer instead of Software Cost Calculator
  if (useBannerResizerInsteadOfCostCalculator && !tools) {
    const bannerResizer = FREE_TOOLS.find((t) => t.href === '/free-tools/youtube-banner-resizer');
    displayTools = displayTools.map((t) =>
      t.href === '/free-tools/cost-calculator' && bannerResizer ? bannerResizer : t,
    );
    displayTools = displayTools.filter((t, i, arr) => arr.findIndex((x) => x.href === t.href) === i);
  }

  const limitedTools = displayTools.slice(0, 4);

  if (limitedTools.length === 0) {
    return null;
  }

  const primaryTool = primaryToolHref ? FREE_TOOLS.find((t) => t.href === primaryToolHref) : null;

  return (
    <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
      <div className="relative z-10 mx-auto max-w-6xl">
        {primaryTool && (
          <div className="mb-10 flex flex-col items-center gap-3 rounded-2xl border border-primary-200 bg-primary-50/50 px-6 py-6 text-center dark:border-primary-800 dark:bg-primary-950/20 sm:flex-row sm:text-left">
            <div className="flex-1">
              <p className="font-semibold text-foreground">Try {primaryTool.title} — free</p>
              <p className="mt-0.5 text-sm text-foreground-500">
                Sign up in seconds, no credit card required. Use in Exploration Mode immediately.
              </p>
            </div>
            <Button
              as={NextLink}
              href="/sign-up"
              size="sm"
              className="shrink-0 bg-foreground text-content1"
            >
              Try free — no card
            </Button>
          </div>
        )}
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">{title}</h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">{description}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {limitedTools.map((tool) => (
            <NextLink
              key={tool.href}
              href={tool.href}
              className="group h-full rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={tool.ariaLabel || tool.title}
            >
              <Card className="h-full border border-foreground-200 bg-content1 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/20">
                <CardBody className="flex flex-col gap-4 p-6">
                  <div className="mb-2 flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:from-primary/30 group-hover:to-primary/20">
                      <Icon icon={tool.icon} size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 font-sans text-lg font-semibold leading-tight transition-colors duration-200 group-hover:text-primary">
                        {tool.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-foreground-500">{tool.description}</p>
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

        {showViewAllButton && (
          <div className="mt-10 flex justify-center">
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
