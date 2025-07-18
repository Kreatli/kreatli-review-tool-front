import { Button, Card, CardBody } from '@heroui/react';
import { Icon } from '../../various/Icon';
import Link from 'next/link';

export const KreatliForSection = () => {
  return (
    <section className="bg-foreground-50 lg:py-32 py-16 px-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-8 sm:gap-16 items-center">
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-3xl sm:text-5xl font-bold font-sans text-center">Who is Kreatli for?</h2>
          <p className="text-lg text-foreground-500 text-center">
            Whether you're a YouTube creator or a freelancer, Kreatli simplifies your project management.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 w-full">
          <Card className="dark:border border-foreground-300">
            <CardBody className="flex flex-col gap-4 items-center p-8">
              <div className="bg-foreground-100 rounded-full size-12 flex items-center justify-center">
                <Icon icon="play" className="text-foreground-400 dark:text-foreground-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold font-sans">YouTube Creators</h3>
              <p className="text-foreground-500 text-center">
                Manage your content workflow, keep track of projects, and collaborate seamlessly with your freelancers.
              </p>
            </CardBody>
          </Card>
          <Card className="dark:border border-foreground-300">
            <CardBody className="flex flex-col gap-4 items-center p-8">
              <div className="bg-foreground-100 rounded-full size-12 flex items-center justify-center">
                <Icon icon="user" className="text-foreground-400 dark:text-foreground-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold font-sans">Creative Freelancers</h3>
              <p className="text-foreground-500 text-center">
                Organize your projects, communicate easily with clients, and ensure smooth file sharing for faster
                project delivery.
              </p>
            </CardBody>
          </Card>
        </div>
        <div>
          <Button as={Link} href="/sign-up" size="lg" className="text-content1 bg-foreground">
            Join Kreatli
          </Button>
        </div>
      </div>
    </section>
  );
};
