import { Button, Card, CardBody } from '@heroui/react';
import { ISbStoryData } from '@storyblok/react';
import NextLink from 'next/link';

import { FREE_TOOLS } from '../../../data/free-tools';
import { PageStoryblok } from '../../../typings/storyblok';
import { BlogArticle } from '../../blog/BlogArticle/BlogArticle';
import { Icon } from '../../various/Icon';

// Filter to show the 4 tools: Video Frame Extractor, Safe Zone Checker, Banner Resizer, Data Transfer Calculator
const freeTools = FREE_TOOLS.filter(
  (tool) =>
    tool.title === 'Video Frame Extractor' ||
    tool.title === 'Social Media Safe Zone Checker' ||
    tool.title === 'YouTube Banner Resizer' ||
    tool.title === 'Data Transfer Calculator',
);

interface Props {
  comparisons?: ISbStoryData<PageStoryblok>[];
}

export const ResourcesSection = ({ comparisons = [] }: Props) => {
  // Get the 3 most recent comparisons
  const recentComparisons = comparisons.slice(0, 3);
  return (
    <section id="resources" className="px-6 py-16 backdrop-blur-lg lg:mt-8 lg:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 sm:gap-20 lg:gap-24">
        {/* Free Tools Section */}
        <div className="flex flex-col gap-8 sm:gap-10">
          <div className="flex flex-col gap-4 text-center">
            <h2 className="font-sans text-3xl font-bold sm:text-4xl">Free Tools & Resources</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Access our free calculators and tools to optimize your creative workflow.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {freeTools.map((tool) => (
              <NextLink key={tool.href} href={tool.href} className="group h-full">
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
          <div className="flex justify-center">
            <Button as={NextLink} href="/free-tools" size="lg" variant="bordered">
              View All Free Tools
            </Button>
          </div>
        </div>

        {/* Comparisons Section */}
        {recentComparisons.length > 0 && (
          <div className="flex flex-col gap-8 sm:gap-10">
            <div className="flex flex-col gap-4 text-center">
              <h2 className="font-sans text-3xl font-bold sm:text-4xl">Helpful Guides & Tutorials</h2>
              <p className="mx-auto max-w-2xl text-lg text-foreground-500">
                Compare Kreatli with other platforms and discover the best solution for your team.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentComparisons.map((comparison) => (
                <BlogArticle key={comparison.id} article={comparison} />
              ))}
            </div>
            <div className="flex justify-center">
              <Button as={NextLink} href="/comparisons" size="lg" variant="bordered">
                View All Comparisons
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
