import { Card, CardBody } from '@heroui/react';
import { Icon } from '../../various/Icon';
import { Button } from '@heroui/react';
import Link from 'next/link';

export const HowItWorksSection = () => {
  return (
    <section className="backdrop-blur-lg lg:py-32 py-16 px-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-16 items-center">
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-3xl sm:text-5xl font-bold font-sans text-center">How Does Kreatli Work?</h2>
          <p className="text-lg text-foreground-500 text-center">Get started in 4 simple steps.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-4 w-full">
          <div className="flex flex-col gap-6 items-center">
            <div className="size-12 text-foreground-500 font-bold font-sans text-lg bg-foreground-100 rounded-full flex items-center justify-center">
              1
            </div>
            <div className="flex flex-col gap-2 items-center">
              <h3 className="text-lg font-semibold text-center">Set Up Projects</h3>
              <p className="text-foreground-500 text-center">
                Create your project workspace and invite team members and freelancers to collaborate.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6 items-center">
            <div className="size-12 text-foreground-500 font-bold font-sans text-lg bg-foreground-100 rounded-full flex items-center justify-center">
              2
            </div>
            <div className="flex flex-col gap-2 items-center">
              <h3 className="text-lg font-semibold text-center">Collaborate in Real Time </h3>
              <p className="text-foreground-500 text-center">
                Chat with your team and track project progress with real-time updates and notifications.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6 items-center">
            <div className="size-12 text-foreground-500 font-bold font-sans text-lg bg-foreground-100 rounded-full flex items-center justify-center">
              3
            </div>
            <div className="flex flex-col gap-2 items-center">
              <h3 className="text-lg font-semibold text-center">Organize Your Files</h3>
              <p className="text-foreground-500 text-center">
                Upload and categorize all your project files by type and relevance for easy access.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6 items-center">
            <div className="size-12 text-foreground-500 font-bold font-sans text-lg bg-foreground-100 rounded-full flex items-center justify-center">
              4
            </div>
            <div className="flex flex-col gap-2 items-center">
              <h3 className="text-lg font-semibold text-center">Track Progress</h3>
              <p className="text-foreground-500 text-center">
                Monitor project timelines and milestones to ensure everything stays on track.
              </p>
            </div>
          </div>
        </div>
        <div>
          <Button as={Link} href="/sign-up" size="lg" className="text-content1 bg-foreground">
            Start Now for Free
          </Button>
        </div>
      </div>
    </section>
  );
};
