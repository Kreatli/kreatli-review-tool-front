import { Button, Card, CardBody } from '@heroui/react';
import Link from 'next/link';

import { Icon, IconType } from '../../various/Icon';

const steps = [
  {
    number: 1,
    title: 'Create a Project',
    description: 'Upload your files or connect Google Drive/Dropbox.',
    icon: 'folder',
  },
  {
    number: 2,
    title: 'Invite Collaborators',
    description: 'Invite team members or send no-signup guest links to clients.',
    icon: 'userPlus',
  },
  {
    number: 3,
    title: 'Review & Collaborate',
    description:
      'Add frame-accurate comments, compare versions side-by-side, and collaborate with your team in real-time.',
    icon: 'chat',
  },
  {
    number: 4,
    title: 'Deliver & Approve',
    description: 'Get client approvals, track deliverables, and export final assets—all in one place.',
    icon: 'checkCircle',
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="px-6 py-16 backdrop-blur-lg lg:py-24 lg:mt-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-16">
        <div className="flex w-full flex-col gap-4">
          <h2 className="text-center font-sans text-3xl font-bold sm:text-4xl">How Does Kreatli Work?</h2>
          <p className="mx-auto max-w-2xl text-center text-lg text-foreground-500">
            Get started in 4 simple steps. From project setup to final delivery, streamline your entire creative
            workflow.
          </p>
        </div>
        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="group h-full border border-foreground-200 bg-content1 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/20"
            >
              <CardBody className="flex h-full flex-col items-center gap-6 p-6">
                <div className="relative">
                  <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:from-primary/30 group-hover:to-primary/20">
                    <Icon
                      icon={step.icon as IconType}
                      size={28}
                      className="text-primary transition-colors duration-300"
                    />
                  </div>
                  <div className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-foreground font-sans text-sm font-bold text-content1 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
                    {step.number}
                  </div>
                </div>
                <div className="flex flex-1 flex-col items-center gap-2 text-center">
                  <h3 className="font-sans text-lg font-semibold transition-colors duration-200 group-hover:text-primary">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground-500">{step.description}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
          <Button as={Link} href="/sign-up" size="lg" className="bg-foreground text-content1">
            Start For Free
          </Button>
          <Button as="a" href="https://calendar.app.google/NXbAeTAUwaBGh5x49" target="_blank" size="lg" variant="light">
            Book a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};
