import Head from 'next/head';
import React from 'react';

import { Header } from '../../components/layout/Header';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { useSession } from '../../hooks/useSession';
import { Decorations } from '../../components/layout/Storyblok/Decorations';

export default function GuidesPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Guides – Tutorials and How-To Guides</title>
        <meta
          name="description"
          content="Access step-by-step guides and tutorials to help you master Kreatli's creative production management platform."
        />
        <meta property="og:title" content="Kreatli | Guides – Tutorials and How-To Guides" />
        <meta
          property="og:description"
          content="Learn how to use Kreatli with comprehensive guides and tutorials for creative production management."
        />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h1 className="text-2xl sm:text-4xl font-bold font-sans max-w-lg mx-auto">Guides & Tutorials</h1>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Step-by-step guides and tutorials to help you master Kreatli's creative production management platform.
          </p>
        </div>
      </section>

      {/* Placeholder Content */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <p className="text-foreground-500">Guides coming soon.</p>
        </div>
      </section>

      <FooterSection hideCta={true} />
    </>
  );
}

