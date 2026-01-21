import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../components/home/Footer/FooterSection';
import { Header } from '../components/layout/Header';
import { Decorations } from '../components/layout/Storyblok/Decorations';
import { Icon, IconType } from '../components/various/Icon';
import { useSession } from '../hooks/useSession';

interface Tool {
  title: string;
  description: string;
  href: string;
  icon: IconType;
  category: 'Utility Tools' | 'Creative Tools';
}

const tools: Tool[] = [
  {
    title: 'Data Transfer Calculator',
    description:
      'Calculate how long it takes to upload or download large files. Perfect for video editors, post-production teams, and creative professionals working with heavy media files.',
    href: '/free-tools/data-transfer-calculator',
    icon: 'upload',
    category: 'Utility Tools',
  },
  {
    title: 'Software Cost Calculator',
    description:
      "Calculate how much you're spending on multiple creative tools and see how much you could save by consolidating with Kreatli.",
    href: '/free-tools/cost-calculator',
    icon: 'dollar',
    category: 'Utility Tools',
  },
  {
    title: 'Video Frame Extractor',
    description:
      'Scrub a video, capture multiple moments, compare two frames side-by-side, and download PNG/JPG stills instantly—right in your browser.',
    href: '/free-tools/video-frame-extractor',
    icon: 'panorama',
    category: 'Creative Tools',
  },
  {
    title: 'Social Media Safe Zone Checker',
    description:
      'Preview where UI overlays appear on your Instagram Reels, TikTok videos, and YouTube Shorts to ensure your content stays visible.',
    href: '/social-media-safe-zone-checker',
    icon: 'shield',
    category: 'Creative Tools',
  },
  {
    title: 'Instagram Reels Safe Zone Checker',
    description:
      'Check your Instagram Reels safe zone before posting. Preview where profile picture, username, like button, comment button, and music display appear.',
    href: '/social-media-safe-zone-checker/instagram-safe-zone-checker',
    icon: 'instagram',
    category: 'Creative Tools',
  },
  {
    title: 'TikTok Safe Zone Checker',
    description:
      'Check your TikTok video safe zones before posting. Preview where profile picture, username, music track, and engagement buttons appear.',
    href: '/social-media-safe-zone-checker/tiktok-safe-zone-checker',
    icon: 'tiktok',
    category: 'Creative Tools',
  },
  {
    title: 'YouTube Shorts Safe Zone Checker',
    description:
      'Test your YouTube Shorts video layout before publishing. Preview where channel name, subscribe button, like button, comments, and video controls appear.',
    href: '/social-media-safe-zone-checker/youtube-safe-zone-checker',
    icon: 'youtube',
    category: 'Creative Tools',
  },
  {
    title: 'YouTube Banner Resizer',
    description:
      'Resize your YouTube banner online for free. Preview safe areas for mobile, desktop, and TV. Export perfectly sized channel art in seconds.',
    href: '/free-tools/youtube-banner-resizer',
    icon: 'youtube',
    category: 'Creative Tools',
  },
];

const utilityTools = tools.filter((tool) => tool.category === 'Utility Tools');
const creativeTools = tools.filter((tool) => tool.category === 'Creative Tools');

const faqs = [
  {
    question: 'Are these tools really free to use?',
    answer:
      'Yes, all tools on this page are completely free to use with no hidden costs, no sign-up required, and no credit card needed. These are professional-grade tools designed to help video professionals and video teams work more efficiently. We believe in providing value to the video community, which is why we offer these tools at no cost.',
  },
  {
    question: 'Do I need to create an account to use these tools?',
    answer:
      "No account is required to use any of our free tools. You can access the Data Transfer Calculator, Software Cost Calculator, Social Media Safe Zone Checker, and YouTube Banner Resizer immediately without signing up. Simply visit the tool page and start using it right away. If you decide to use Kreatli's Video Collaboration & Review Platform later, you can create a free account then.",
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
    question: 'What is the Social Media Safe Zone Checker?',
    answer:
      "The Social Media Safe Zone Checker helps you preview where UI overlays (like profile pictures, like buttons, and text) appear on your Instagram Reels, TikTok videos, and YouTube Shorts. This ensures your important content stays visible and isn't covered by platform UI elements. Simply upload your video or image, select the platform, and see exactly where the safe zones are. This prevents common mistakes that can make your content look unprofessional.",
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

  return (
    <>
      <Head>
        <title>Kreatli | Free Tools for Video Teams – Professional Creative Tools</title>
        <meta
          name="description"
          content="Free professional tools for video teams and video professionals. Calculate data transfer times, estimate software costs, check social media safe zones, and resize YouTube banners. All tools are free to use—no sign-up required."
        />
        <link rel="canonical" href="https://kreatli.com/free-tools" />
        <meta property="og:url" content="https://kreatli.com/free-tools" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kreatli | Free Tools for Video Teams – Professional Creative Tools" />
        <meta
          property="og:description"
          content="Free professional tools for video teams and video professionals. Calculate data transfer times, estimate software costs, check social media safe zones, and resize YouTube banners. All tools are free to use—no sign-up required."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Kreatli | Free Tools for Video Teams – Professional Creative Tools" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kreatli | Free Tools for Video Teams – Professional Creative Tools" />
        <meta
          name="twitter:description"
          content="Free professional tools for video teams and creative professionals. Calculate data transfer times, estimate software costs, check social media safe zones, and resize YouTube banners."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <Header />
      <Decorations />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-lg font-sans text-2xl font-bold sm:text-4xl">Free Tools for Video Teams</h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Professional-grade tools designed to help video professionals work more efficiently. All tools are
            completely free to use—no sign-up required.
          </p>
        </div>
      </section>

      {/* Creative Tools Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Creative Tools</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Design, resize, and optimize your creative assets.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {creativeTools.map((tool) => (
              <NextLink key={tool.href} href={tool.href} className="group h-full">
                <Card className="h-full">
                  <CardBody className="flex flex-col gap-4 p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 rounded-lg bg-foreground-100 p-3">
                        <Icon icon={tool.icon} size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-2 font-sans text-lg font-semibold transition-colors duration-200 group-hover:text-primary">
                          {tool.title}
                        </h3>
                        <p className="text-sm text-foreground-500">{tool.description}</p>
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
                      Learn More
                    </Button>
                  </CardBody>
                </Card>
              </NextLink>
            ))}
          </div>
        </div>
      </section>

      {/* Utility Tools Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Utility Tools</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Calculate, plan, and optimize your video workflows.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {utilityTools.map((tool) => (
              <NextLink key={tool.href} href={tool.href} className="group h-full">
                <Card className="h-full">
                  <CardBody className="flex flex-col gap-4 p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 rounded-lg bg-foreground-100 p-3">
                        <Icon icon={tool.icon} size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-2 font-sans text-lg font-semibold transition-colors duration-200 group-hover:text-primary">
                          {tool.title}
                        </h3>
                        <p className="text-sm text-foreground-500">{tool.description}</p>
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
                      Learn More
                    </Button>
                  </CardBody>
                </Card>
              </NextLink>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get answers to common questions about our free tools for video teams and creative professionals.
            </p>
          </div>
          <Accordion variant="splitted" className="gap-2">
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
            <h2 className="font-sans text-2xl font-bold sm:text-4xl">Need More Than Free Tools?</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Kreatli is a Video Collaboration & Review Platform designed for video teams working with large video
              files.
              Streamline approvals, manage projects, and collaborate more efficiently.
            </p>
            <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
                Get Started for Free
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
