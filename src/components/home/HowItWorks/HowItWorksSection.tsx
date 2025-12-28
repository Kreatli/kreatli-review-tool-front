import { Card, CardBody } from '@heroui/react';
import { Icon } from '../../various/Icon';
import { Button } from '@heroui/react';
import Link from 'next/link';

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
    <section id="how-it-works" className="backdrop-blur-lg lg:py-32 py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-16 items-center">
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-3xl sm:text-5xl font-bold font-sans text-center">How Does Kreatli Work?</h2>
          <p className="text-lg text-foreground-500 text-center max-w-2xl mx-auto">
            Get started in 4 simple steps. From project setup to final delivery, streamline your entire creative
            workflow.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {steps.map((step, index) => (
            <Card key={index} className="group h-full">
              <CardBody className="flex flex-col gap-6 items-center p-6 h-full">
                <div className="relative">
                  <div className="bg-foreground-100 rounded-full size-16 flex items-center justify-center transition-all duration-300 group-hover:bg-foreground-200 group-hover:scale-105">
                    <Icon
                      icon={step.icon as any}
                      size={28}
                      className="text-foreground-500 group-hover:text-primary transition-colors duration-300"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-foreground text-content1 font-bold font-sans text-sm rounded-full size-7 flex items-center justify-center shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
                    {step.number}
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-center text-center flex-1">
                  <h3 className="text-lg font-semibold font-sans">{step.title}</h3>
                  <p className="text-sm text-foreground-500 leading-relaxed">{step.description}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
          <Button as={Link} href="/sign-up" size="lg" className="text-content1 bg-foreground">
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
