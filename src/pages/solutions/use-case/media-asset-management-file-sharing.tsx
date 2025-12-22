import Head from 'next/head';
import React from 'react';

import { Header } from '../../../components/layout/Header';
import { FooterSection } from '../../../components/home/Footer/FooterSection';
import { useSession } from '../../../hooks/useSession';
import { Decorations } from '../../../components/layout/Storyblok/Decorations';
import { Card, CardBody, Button, Accordion, AccordionItem } from '@heroui/react';
import NextLink from 'next/link';
import { Icon } from '../../../components/various/Icon';

const data = {
  title: 'Media Asset Management & File Sharing',
  problem:
    'Creative teams need to share large media files securely, but email attachments are too small, file transfer services lack security and organization, and cloud storage doesn\'t provide review and approval workflows. Files scattered across multiple platforms, version confusion, and difficulty tracking what\'s been shared and approved.',
  solution:
    'Kreatli provides comprehensive media asset management and secure file sharing in one platform. Upload files, connect cloud storage, organize everything for your team, and share securely with password-protected links. Get client feedback and track approvals - all in one platform designed for creative asset management.',
  detailedDescription:
    'Media asset management and secure file sharing are essential for creative teams working with large files, multiple clients, and sensitive creative work. Kreatli provides a comprehensive solution that combines organized file management, secure sharing, version control, and integrated review workflows. Teams can organize files by project, status, or type, connect existing cloud storage, share files securely with password-protected links, and track all versions and approvals. This eliminates the need for separate file storage, file transfer services, and review tools, consolidating everything into one platform.',
  features: [
    {
      icon: 'folder',
      title: 'Organized File Management',
      description: 'Organize files by project, status, type, and more. Connect existing Google Drive or Dropbox folders. Find what you need instantly with powerful filtering and search.',
    },
    {
      icon: 'link',
      title: 'Secure Shareable Links',
      description: 'Generate password-protected links, set expiration dates, and control access to your creative assets with enterprise-grade security. Share files securely without compromising organization.',
    },
    {
      icon: 'shield',
      title: 'Enterprise-Grade Security',
      description: 'Password protection, access controls, and secure file sharing for sensitive creative work. Your creative assets stay private and secure.',
    },
    {
      icon: 'checkCircle',
      title: 'Version Control',
      description: 'Complete version history for all your files. Never lose work and easily revert to previous versions when needed. Track all revisions and maintain complete project history.',
    },
  ],
  benefits: [
    'Organize all media assets in one centralized platform',
    'Share large files securely with password-protected links',
    'Connect existing Google Drive or Dropbox folders',
    'Maintain complete version history for all files',
    'Track what\'s been shared and approved',
    'Enterprise-grade security for sensitive creative work',
  ],
  metaDescription:
    'Media asset management and secure file sharing platform for creative teams. Organize files, share securely with password-protected links, and track versions and approvals in one platform.',
  faqs: [
    {
      question: 'How does Kreatli help organize media assets?',
      answer:
        'Kreatli provides powerful organization features that allow you to organize files by project, status, type, and custom tags. You can connect existing Google Drive or Dropbox folders, upload files directly, and find what you need instantly with powerful filtering and search. All files are organized in one centralized platform, eliminating the need to search across multiple storage locations.',
    },
    {
      question: 'Can I share large media files securely with clients?',
      answer:
        'Yes! Kreatli allows you to share large media files securely through password-protected links. You can set expiration dates, control access, and share files without file size limitations. This eliminates the need for email attachments (which are too small) or file transfer services (which lack security and organization).',
    },
    {
      question: 'How does version control work in Kreatli?',
      answer:
        'Kreatli maintains complete version history for all your files, making it easy to track revisions, compare versions, and revert to previous iterations when needed. When clients ask to "go back to version 3," you know exactly which version they mean and can deliver it instantly. All versions are organized and accessible, eliminating confusion about which file is current.',
    },
    {
      question: 'Can I connect my existing cloud storage to Kreatli?',
      answer:
        'Yes! Kreatli integrates with Google Drive and Dropbox, allowing you to connect your existing file storage and sync files between platforms. You can continue using your preferred cloud storage while leveraging Kreatli\'s specialized features for media asset management, secure sharing, and review workflows.',
    },
    {
      question: 'What security features does Kreatli offer for file sharing?',
      answer:
        'Kreatli provides enterprise-grade security including password-protected shareable links, granular access controls, secure file encryption, and audit trails. You can set expiration dates on shared links, control who can view, comment, or download files, and maintain complete records of all access and activity. This protects sensitive creative work and meets security requirements.',
    },
  ],
};

export default function MediaAssetManagementFileSharingPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | {data.title} – Creative Production Solution</title>
        <meta name="description" content={data.metaDescription} />
        <meta property="og:title" content={`Kreatli | ${data.title} – Creative Production Solution`} />
        <meta property="og:description" content={data.metaDescription} />
        <meta property="og:type" content="website" />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h1 className="text-2xl sm:text-4xl font-bold font-sans max-w-lg mx-auto">{data.title}</h1>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">{data.solution}</p>
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

      {/* Problem/Solution Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold font-sans mb-4 flex items-center gap-2">
                  <Icon icon="warning" size={24} className="text-warning" />
                  The Problem
                </h2>
                <p className="text-foreground-500">{data.problem}</p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold font-sans mb-4 flex items-center gap-2">
                  <Icon icon="checkCircle" size={24} className="text-success" />
                  The Solution
                </h2>
                <p className="text-foreground-500">{data.solution}</p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Description Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Why Choose Kreatli for {data.title}</h2>
          </div>
          <Card>
            <CardBody className="p-8">
              <p className="text-foreground-600 text-lg leading-relaxed">{data.detailedDescription}</p>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Key Features</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Everything you need to solve your creative production challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.features.map((feature, index) => (
              <Card key={index}>
                <CardBody className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-foreground-100 rounded-full p-2">
                      <Icon icon={feature.icon as any} size={20} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold font-sans">{feature.title}</h3>
                  </div>
                  <p className="text-foreground-500 text-sm">{feature.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Key Benefits</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Discover how {data.title.toLowerCase()} improves your creative workflow.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {data.benefits.map((benefit, index) => (
              <Card key={index}>
                <CardBody className="p-6">
                  <div className="flex items-start gap-3">
                    <Icon icon="checkCircle" size={24} className="text-success flex-shrink-0 mt-0.5" />
                    <p className="text-foreground-600">{benefit}</p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Get detailed answers about how Kreatli addresses {data.title.toLowerCase()} for creative teams.
            </p>
          </div>
          <Accordion variant="splitted">
            {data.faqs.map((faq, index) => (
              <AccordionItem key={index} title={<span className="font-semibold text-base">{faq.question}</span>}>
                <div className="text-foreground-500 space-y-3">{faq.answer}</div>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="max-w-3xl mx-auto flex flex-col gap-4 text-center items-center mt-8">
            <h3 className="text-xl font-sans font-bold">Still Have Questions?</h3>
            <p className="text-foreground-500">
              If you didn't find the answer you were looking for, feel free to contact our support team at{' '}
              <a href="mailto:support@kreatli.com" className="underline underline-offset-2 text-primary">
                support@kreatli.com
              </a>{' '}
              to learn how Kreatli can help your specific workflow.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground-50 lg:py-24 py-16 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h2 className="text-2xl sm:text-4xl font-bold font-sans">Ready to Solve Your Creative Production Challenges?</h2>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Experience how Kreatli addresses {data.title.toLowerCase()} for creative teams. Start using Kreatli today.
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

