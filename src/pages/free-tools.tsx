import { Button, Card, CardBody } from '@heroui/react';
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
    title: 'Social Media Safe Zone Checker',
    description:
      'Preview where UI overlays appear on your Instagram Reels, TikTok videos, and YouTube Shorts to ensure your content stays visible.',
    href: '/social-media-safe-zone-checker',
    icon: 'shield',
    category: 'Creative Tools',
  },
  {
    title: 'YouTube Banner Resizer',
    description:
      'Resize your YouTube banner online for free. Preview safe areas for mobile, desktop, and TV. Export perfectly sized channel art in seconds.',
    href: '/free-tools/youtube-banner-resizer',
    icon: 'file',
    category: 'Creative Tools',
  },
];

const utilityTools = tools.filter((tool) => tool.category === 'Utility Tools');
const creativeTools = tools.filter((tool) => tool.category === 'Creative Tools');

export default function FreeToolsPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Free Tools for Creative Teams | Kreatli</title>
        <meta
          name="description"
          content="Free tools for creative professionals: data transfer calculator, software cost calculator, social media safe zone checker, and YouTube banner resizer."
        />
        <meta property="og:title" content="Free Tools for Creative Teams | Kreatli" />
        <meta
          property="og:description"
          content="Free tools for creative professionals: data transfer calculator, software cost calculator, social media safe zone checker, and YouTube banner resizer."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Tools for Creative Teams | Kreatli" />
        <meta
          name="twitter:description"
          content="Free tools for creative professionals: data transfer calculator, software cost calculator, social media safe zone checker, and YouTube banner resizer."
        />
        <link rel="canonical" href="https://kreatli.com/free-tools" />
      </Head>
      <Header />
      <Decorations />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-3xl font-sans text-3xl font-bold sm:text-5xl">Free Tools for Creative Teams</h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500 sm:text-xl">
            Professional-grade tools designed to help creative professionals work more efficiently. All tools are
            completely free to use—no sign-up required.
          </p>
        </div>
      </section>

      {/* Utility Tools Section */}
      <section className="relative overflow-hidden px-6 py-12">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="mb-2 font-sans text-2xl font-bold sm:text-3xl">Utility Tools</h2>
            <p className="text-foreground-500">Calculate, plan, and optimize your creative workflows.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {utilityTools.map((tool) => (
              <NextLink key={tool.href} href={tool.href} className="h-full">
                <Card className="h-full transition-transform hover:scale-[1.02]">
                  <CardBody className="flex flex-col gap-4 p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 rounded-lg bg-foreground-100 p-3">
                        <Icon icon={tool.icon} size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-2 font-sans text-xl font-semibold">{tool.title}</h3>
                        <p className="text-sm text-foreground-500">{tool.description}</p>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <Button variant="bordered" className="w-full" endContent={<Icon icon="arrowRight" size={16} />}>
                        Use Tool
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </NextLink>
            ))}
          </div>
        </div>
      </section>

      {/* Creative Tools Section */}
      <section className="relative overflow-hidden px-6 py-12 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="mb-2 font-sans text-2xl font-bold sm:text-3xl">Creative Tools</h2>
            <p className="text-foreground-500">Design, resize, and optimize your creative assets.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {creativeTools.map((tool) => (
              <NextLink key={tool.href} href={tool.href} className="h-full">
                <Card className="h-full transition-transform hover:scale-[1.02]">
                  <CardBody className="flex flex-col gap-4 p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 rounded-lg bg-foreground-100 p-3">
                        <Icon icon={tool.icon} size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-2 font-sans text-xl font-semibold">{tool.title}</h3>
                        <p className="text-sm text-foreground-500">{tool.description}</p>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <Button variant="bordered" className="w-full" endContent={<Icon icon="arrowRight" size={16} />}>
                        Use Tool
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </NextLink>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <Card className="border-foreground-300 bg-foreground-50 dark:border">
            <CardBody className="flex flex-col gap-6 p-8 text-center">
              <h2 className="font-sans text-2xl font-bold sm:text-3xl">Need More Than Free Tools?</h2>
              <p className="mx-auto max-w-2xl text-base text-foreground-600 sm:text-lg">
                Kreatli is a production management platform designed for creative teams working with large media files.
                Streamline approvals, manage projects, and collaborate more efficiently.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
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
            </CardBody>
          </Card>
        </div>
      </section>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
