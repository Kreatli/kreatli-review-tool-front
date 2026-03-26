import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import NextLink from 'next/link';
import { useMemo, useState } from 'react';

import { SignUpModal } from '../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../components/home/Footer/FooterSection';
import { Header } from '../components/layout/Header';
import { Decorations } from '../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../components/shared/BreadcrumbStructuredData';
import { FAQStructuredData } from '../components/shared/FAQStructuredData';
import { SeoHead } from '../components/shared/SeoHead';
import { Icon } from '../components/various/Icon';
import {
  FREE_TOOLS,
  FREE_TOOLS_FILTER_OPTIONS,
  type FreeToolFilterTag,
} from '../data/free-tools';
import { useSession } from '../hooks/useSession';

const faqs = [
  {
    question: 'Are these tools really free to use?',
    answer:
      'Yes, all tools on this page are completely free to use with no hidden costs, no sign-up required, and no credit card needed. These are professional-grade tools designed to help video professionals and video teams work more efficiently. We believe in providing value to the video community, which is why we offer these tools at no cost.',
  },
  {
    question: 'Do I need to create an account to use these tools?',
    answer:
      "No account is required to use any of our free tools. You can access the Data Transfer Calculator, Software Cost Calculator, Safe Zone Checker, and YouTube Banner Resizer immediately without signing up. Simply visit the tool page and start using it right away. If you decide to use Kreatli's Video Collaboration & Review Platform later, you can create a free account then.",
  },
  {
    question: 'What is the Data Transfer Calculator used for?',
    answer:
      'The Data Transfer Calculator helps video editors, post-production teams, and creative professionals estimate how long it will take to upload or download large media files. Simply enter your file size and internet connection speed, and the calculator will show you the estimated transfer time. This is especially useful when working with 4K footage, large project files, or when planning file transfers for client deliveries.',
  },
  {
    question: 'How does the Software Cost Calculator work?',
    answer:
      "The Software Cost Calculator helps you understand how much you're spending on multiple creative tools and subscriptions. Add all the tools your team uses (video editing software, project management tools, file storage, review platforms, etc.) and see your total monthly and annual costs. The calculator also shows potential savings if you consolidate multiple tools into Kreatli's unified platform, which can reduce costs by 40-70% while replacing 4-5 separate tools.",
  },
  {
    question: 'What is the Safe Zone Checker?',
    answer:
      "The Safe Zone Checker helps you preview where UI overlays (like profile pictures, like buttons, and text) appear on your Instagram Reels, TikTok videos, and YouTube Shorts. This ensures your important content stays visible and isn't covered by platform UI elements. Simply upload your video or image, select the platform, and see exactly where the safe zones are. This prevents common mistakes that can make your content look unprofessional.",
  },
  {
    question: 'Can I use the YouTube Banner Resizer for other platforms?',
    answer:
      "The YouTube Banner Resizer is specifically designed for YouTube channel art, which has unique dimensions and safe zones for mobile, desktop, and TV displays. However, the tool shows you the safe areas and helps you understand how your banner will appear across different devices. For other platforms like Twitter, Facebook, or LinkedIn, you'll need different dimensions, but the concept of safe zones applies to all social media banners.",
  },
  {
    question: 'Are these tools suitable for professional use?',
    answer:
      'Absolutely. These tools are designed with professional video teams and creative professionals in mind. The calculations are accurate, the safe zone overlays match platform specifications, and the banner resizer produces production-ready results. Many agencies, post-production houses, and independent creators use these tools as part of their daily workflow.',
  },
  {
    question: 'Will you add more free tools in the future?',
    answer:
      'Yes, we plan to add more free tools based on feedback from the video community. Our goal is to provide valuable resources that help video professionals and video teams work more efficiently. If you have suggestions for tools that would be helpful, feel free to reach out to us at support@kreatli.com.',
  },
  {
    question: "How do these free tools relate to Kreatli's main platform?",
    answer:
      "These free tools are standalone utilities that anyone can use, regardless of whether they use Kreatli's Video Collaboration & Review Platform. However, if you find these tools useful, you might be interested in Kreatli's full platform, which includes frame-accurate video review, project management, team collaboration, and secure file storage—all in one unified workspace. The free tools demonstrate our commitment to helping video professionals, while the main platform provides comprehensive video collaboration for teams.",
  },
  {
    question: 'Can I share these tools with my team or clients?',
    answer:
      'Yes, feel free to share these tools with anyone who might find them useful. There are no restrictions on sharing the tool links. Many teams bookmark these tools and use them regularly in their workflows. If you find them valuable, we encourage you to share them with colleagues, clients, or anyone in the creative community who could benefit from them.',
  },
];

export default function FreeToolsPage() {
  useSession();
  const [selectedFilter, setSelectedFilter] = useState<'All' | FreeToolFilterTag>('All');
  const title = 'Kreatli | Free Tools for Video Teams';
  const description =
    'Free tools for video teams, including a data transfer calculator, software cost calculator, safe zone checker, and YouTube banner resizer. No sign-up required.';

  const filteredTools = useMemo(() => {
    const list =
      selectedFilter === 'All'
        ? FREE_TOOLS
        : FREE_TOOLS.filter((tool) => tool.tags?.includes(selectedFilter));
    return [...list].sort((a, b) => a.title.localeCompare(b.title));
  }, [selectedFilter]);

  return (
    <>
      <SeoHead title={title} description={description} canonicalPath="/free-tools" />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
        ]}
      />
      <FAQStructuredData faqs={faqs} />
      <Header />
      <Decorations />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">Free Tools for Video Teams</h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Professional-grade tools designed to help video professionals work more efficiently. All tools are
            completely free to use—no sign-up required.
          </p>
        </div>
      </section>

      {/* Free Tools Section with filter */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Free Tools</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Professional-grade tools for video teams. Filter by category to find what you need.
            </p>
          </div>
          <div className="mb-10 flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-foreground-200 bg-content1/60 px-4 py-3 shadow-sm backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setSelectedFilter('All')}
                aria-pressed={selectedFilter === 'All'}
                aria-label="Show all tools"
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  selectedFilter === 'All'
                    ? 'border border-primary bg-gradient-to-br from-primary/20 to-primary/10 text-primary shadow-sm'
                    : 'border border-transparent text-foreground-600 hover:border-primary/40 hover:bg-primary/5 hover:text-primary'
                }`}
              >
                All
              </button>
              {FREE_TOOLS_FILTER_OPTIONS.map((option) => {
                const isSelected = selectedFilter === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedFilter(option.id)}
                    aria-pressed={isSelected}
                    aria-label={`Filter tools by ${option.label}`}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      isSelected
                        ? 'border border-primary bg-gradient-to-br from-primary/20 to-primary/10 text-primary shadow-sm'
                        : 'border border-transparent text-foreground-600 hover:border-primary/40 hover:bg-primary/5 hover:text-primary'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTools.length === 0 ? (
              <p className="col-span-full text-center text-foreground-500">No tools match this filter.</p>
            ) : (
              filteredTools.map((tool) => (
                <Card
                  key={tool.href}
                  as={NextLink}
                  href={tool.href}
                  isPressable
                  className="group h-full border border-foreground-200 bg-content1 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/20"
                >
                  <CardBody className="flex h-full flex-col gap-4 p-6">
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
              ))
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get answers to common questions about our free tools for video teams and creative professionals.
            </p>
          </div>
          <Accordion variant="splitted" aria-label="Free tools FAQs" className="gap-2">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                title={<span className="text-base font-semibold sm:text-lg">{faq.question}</span>}
                className="py-2"
              >
                <div className="text-sm leading-relaxed text-foreground-500 sm:text-base">{faq.answer}</div>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-4 text-center">
            <h3 className="font-sans text-xl font-bold">Still Have Questions?</h3>
            <p className="text-foreground-500">
              If you didn't find the answer you were looking for, feel free to contact our support team at{' '}
              <a href="mailto:support@kreatli.com" className="font-medium text-primary underline underline-offset-2">
                support@kreatli.com
              </a>{' '}
              or check out our{' '}
              <NextLink href="/help" className="font-medium text-primary underline underline-offset-2">
                Help Center
              </NextLink>{' '}
              for more information.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="overflow-hidden bg-foreground-50 px-6 py-16 lg:py-24">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="flex flex-col gap-6 text-center">
            <h2 className="font-sans text-2xl font-bold sm:text-3xl">Need More Than Free Tools?</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Kreatli is a Video Collaboration & Review Platform designed for video teams working with large video
              files.
              Streamline approvals, manage projects, and collaborate more efficiently.
            </p>
            <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
                Start 7-day trial
              </Button>
              <Button
                as="a"
                href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
                target="_blank"
                size="lg"
                variant="bordered"
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
