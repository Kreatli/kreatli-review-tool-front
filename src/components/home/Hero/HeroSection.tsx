import { Button, Card, CardBody, Chip, Modal, ModalContent } from '@heroui/react';
import NextLink from 'next/link';
import { Icon } from '../../various/Icon';
import styles from './HeroSection.module.css';
import { useState } from 'react';

export const HeroSection = () => {
  const [isArcadeModalOpen, setIsArcadeModalOpen] = useState(false);

  const handleSeeHowItWorks = () => {
    setIsArcadeModalOpen(true);
  };

  return (
    <section className="relative h-[calc(100vh-4rem)] min-h-fit flex items-center justify-center overflow-hidden">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-16 px-6 pt-4 pb-20 relative z-10">
        <div className="flex flex-col items-center gap-4">
          <Chip size="lg" variant="faded">
            All-in-One Collaboration Platform
          </Chip>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-sans">
            Stop Drowning in Emails, Slack & Dropbox
          </h1>
          <p className="text-lg sm:text-xl text-foreground-500 font-sans">
            Kreatli helps Creative Teams streamline and simplify post-production workflows. No more juggling multiple
            platforms. All projects, chats, and files in one place.
          </p>
        </div>
        <div className="flex flex-wrap justify-between gap-4 items-center w-full md:w-auto">
          <Card isHoverable isPressable className="flex-1 md:min-w-36 dark:border border-foreground-300">
            <CardBody className="flex flex-col gap-2 text-foreground-500 text-xs sm:text-medium">
              <Icon icon="folder" className="text-foreground-600" />
              Organized <br />
              Files
            </CardBody>
          </Card>
          <Card isHoverable isPressable className="flex-1 md:min-w-36 dark:border border-foreground-300">
            <CardBody className="flex flex-col gap-2 text-foreground-500 text-xs sm:text-medium">
              <Icon icon="chat" className="text-foreground-600" />
              Team <br />
              Collaboration
            </CardBody>
          </Card>
          <Card isHoverable isPressable className="flex-1 md:min-w-36 dark:border border-foreground-300">
            <CardBody className="flex flex-col gap-2 text-foreground-500 text-xs sm:text-medium">
              <Icon icon="bell" className="text-foreground-600" />
              Real-Time <br />
              Updates
            </CardBody>
          </Card>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
            Start your journey
            <Icon icon="arrowRight" />
          </Button>
          <Button variant="light" size="lg" onClick={handleSeeHowItWorks}>
            <Icon icon="monitorPlay" />
            Discover demo
          </Button>
        </div>
      </div>

      <div className="fixed inset-y-8 inset-x-0 pointer-events-none">
        <div
          className={`absolute top-20 left-24 w-32 h-32 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full ${styles.animateFloatSlow}`}
        />
        <div
          className={`absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-pink-300/30 to-orange-300/30 rounded-full ${styles.animateFloatMedium}`}
        />
        <div
          className={`absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-green-300/30 to-blue-300/30 rounded-full ${styles.animateFloatFast}`}
        />
        <div
          className={`absolute bottom-20 right-1/4 w-28 h-28 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full ${styles.animateFloatSlow}`}
        />

        <div
          className={`absolute top-1/3 left-1/4 w-16 h-16 bg-gradient-to-br from-yellow-300/25 to-orange-300/25 rounded-full ${styles.animateFloatMedium}`}
        />
        <div
          className={`absolute top-1/2 right-1 left-12 w-12 h-12 bg-gradient-to-br from-cyan-300/25 to-blue-300/25 rounded-full ${styles.animateFloatFast}`}
        />
        <div
          className={`absolute bottom-1/3 left-1/2 w-14 h-14 bg-gradient-to-br from-pink-300/25 to-purple-300/25 rounded-full ${styles.animateFloatSlow}`}
        />

        <div className={`absolute top-16 left-1/3 w-3 h-3 bg-blue-400/50 rounded-full ${styles.animateFloatFast}`} />
        <div
          className={`absolute top-24 right-1/4 w-2 h-2 bg-purple-400/50 rounded-full ${styles.animateFloatMedium}`}
        />
        <div className={`absolute top-1/2 left-1/3 w-4 h-4 bg-pink-400/50 rounded-full ${styles.animateFloatSlow}`} />
        <div className={`absolute top-2/3 right-16 w-3 h-3 bg-green-400/50 rounded-full ${styles.animateFloatFast}`} />
        <div
          className={`absolute bottom-24 left-1/4 w-2 h-2 bg-orange-400/50 rounded-full ${styles.animateFloatMedium}`}
        />
        <div className={`absolute bottom-32 right-24 w-3 h-3 bg-cyan-400/50 rounded-full ${styles.animateFloatSlow}`} />
        <div
          className={`absolute bottom-16 left-1/2 w-2 h-2 bg-yellow-400/50 rounded-full ${styles.animateFloatFast}`}
        />
        <div
          className={`absolute bottom-28 right-1 left-10 w-4 h-4 bg-indigo-400/50 rounded-full ${styles.animateFloatMedium}`}
        />
      </div>
      <Modal
        isOpen={isArcadeModalOpen}
        size="4xl"
        placement="center"
        onClose={() => {
          setIsArcadeModalOpen(false);
        }}
      >
        <ModalContent>
          <div className="relative h-0 w-full -my-1 pb-[calc(51%)]">
            <iframe
              src="https://demo.arcade.software/VjKossEqxy9whTH4jioe?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true"
              title="All-in-One Collaboration Platform"
              frameBorder="0"
              loading="lazy"
              allowFullScreen
              allow="clipboard-write"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                colorScheme: 'light',
              }}
            />
          </div>
        </ModalContent>
      </Modal>
    </section>
  );
};
