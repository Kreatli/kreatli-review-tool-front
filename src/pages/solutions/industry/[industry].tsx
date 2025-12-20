import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';

import { Header } from '../../../components/layout/Header';
import { FooterSection } from '../../../components/home/Footer/FooterSection';
import { useSession } from '../../../hooks/useSession';
import { Decorations } from '../../../components/layout/Storyblok/Decorations';
import { Card, CardBody, Button, Chip } from '@heroui/react';
import NextLink from 'next/link';
import { Icon } from '../../../components/various/Icon';

const industryData: Record<
  string,
  {
    title: string;
    description: string;
    painPoints: string[];
    benefits: string[];
    useCases: string[];
    metaDescription: string;
  }
> = {
  'advertising-content-agencies': {
    title: 'Advertising & Content Agencies',
    description:
      'Perfect for creative agencies and content teams running high-volume client work. Keep every stakeholder aligned, every version under control, and every delivery on time—without duct-taping together five different tools.',
    painPoints: [
      'Coordinating feedback from multiple stakeholders',
      'Version control for large-scale projects',
      'Secure sharing of high-value creative assets',
      'Tracking project timelines and resource allocation',
    ],
    benefits: [
      'Unlimited projects and team members at scale',
      'Advanced review tools for professional workflows',
      'Enterprise-grade security and access controls',
      'Comprehensive project analytics and reporting',
    ],
    useCases: [
      'Post-production houses managing film/TV projects',
      'Advertising agencies coordinating campaign assets',
      'Brand agencies managing multiple client portfolios',
      'Production companies handling complex multi-phase projects',
    ],
    metaDescription:
      'Kreatli helps advertising and content agencies streamline creative production management, media review and approval, and client collaboration. Built for agencies managing multiple client projects.',
  },
  'in-house-marketing-teams': {
    title: 'In-House Marketing Teams',
    description:
      'Ideal for in-house marketing teams managing brand assets, campaign production, and creative workflows. Give your team one organized home for files, feedback, and approvals while maintaining brand consistency.',
    painPoints: [
      'Managing multiple brand campaigns simultaneously',
      'Coordinating with external agencies and freelancers',
      'Maintaining brand consistency across projects',
      'Tracking campaign deliverables and approvals',
    ],
    benefits: [
      'Centralized brand asset management',
      'Streamlined approval workflows for stakeholders',
      'Easy collaboration with external partners',
      'Clear project status tracking and reporting',
    ],
    useCases: [
      'Brand marketing teams managing campaign assets',
      'In-house creative teams coordinating with agencies',
      'Marketing operations managing multiple campaigns',
      'Content teams producing brand content at scale',
    ],
    metaDescription:
      'Kreatli helps in-house marketing teams manage brand assets, campaign production, and creative workflows. Streamline approvals, collaborate with agencies, and maintain brand consistency.',
  },
  'production-post-houses': {
    title: 'Production & Post-Houses',
    description:
      'Built for production and post-production houses managing film, TV, and video projects. Handle complex approval chains, coordinate with multiple stakeholders, and deliver projects on time with professional workflows.',
    painPoints: [
      'Managing complex multi-phase production projects',
      'Coordinating feedback from directors, producers, and clients',
      'Version control for large video files',
      'Tracking deliverables across multiple projects',
    ],
    benefits: [
      'Frame-accurate review for video production',
      'Advanced version control and comparison tools',
      'Professional approval workflows',
      'Scalable infrastructure for large projects',
    ],
    useCases: [
      'Post-production houses managing film/TV projects',
      'Video production companies handling client work',
      'Animation studios coordinating complex projects',
      'Production companies managing multi-phase deliverables',
    ],
    metaDescription:
      'Kreatli helps production and post-production houses manage film, TV, and video projects. Frame-accurate review, version control, and professional approval workflows for production teams.',
  },
};

export default function IndustrySolutionPage() {
  useSession();
  const router = useRouter();
  const { industry } = router.query;

  const industryKey = typeof industry === 'string' ? industry : '';
  const data = industryData[industryKey];

  if (!data) {
    return (
      <>
        <Head>
          <title>Kreatli | Solutions</title>
        </Head>
        <Header />
        <div className="py-16 px-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Industry Solution Not Found</h1>
          <Button as={NextLink} href="/solutions">
            Back to Solutions
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Kreatli | {data.title} – Creative Production Solutions</title>
        <meta name="description" content={data.metaDescription} />
        <meta property="og:title" content={`Kreatli | ${data.title} – Creative Production Solutions`} />
        <meta property="og:description" content={data.metaDescription} />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h1 className="text-2xl sm:text-4xl font-bold font-sans max-w-lg mx-auto">
            Solutions for {data.title}
          </h1>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">{data.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
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
      </section>

      {/* Challenges and Benefits Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold font-sans mb-6 flex items-center gap-2">
                  <Icon icon="warning" size={24} className="text-warning" />
                  Common Challenges
                </h2>
                <ul className="flex flex-col gap-4">
                  {data.painPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-foreground-500">
                      <Icon icon="minus" size={18} className="text-foreground-400 mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold font-sans mb-6 flex items-center gap-2">
                  <Icon icon="checkCircle" size={24} className="text-success" />
                  How Kreatli Helps
                </h2>
                <ul className="flex flex-col gap-4">
                  {data.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3 text-foreground-500">
                      <Icon icon="check" size={18} className="text-success mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Popular Use Cases</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              See how {data.title.toLowerCase()} use Kreatli to streamline their creative production workflows.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {data.useCases.map((useCase, index) => (
              <Chip key={index} size="lg" variant="flat" className="text-base">
                {useCase}
              </Chip>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground-50 lg:py-24 py-16 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h2 className="text-2xl sm:text-4xl font-bold font-sans">Ready to Streamline Your Workflow?</h2>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Join {data.title.toLowerCase()} who have simplified their creative production process with Kreatli.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
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
      </section>
      <FooterSection hideCta={true} />
    </>
  );
}

