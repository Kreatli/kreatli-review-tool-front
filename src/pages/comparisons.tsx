import Head from 'next/head';
import React from 'react';

import { Header } from '../components/layout/Header';
import { FooterSection } from '../components/home/Footer/FooterSection';
import { useSession } from '../hooks/useSession';
import { Decorations } from '../components/layout/Storyblok/Decorations';

export default function ComparisonsPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Comparisons – Creative Production Platform Comparisons</title>
        <meta
          name="description"
          content="Compare Kreatli with other creative production and media review platforms. See how Kreatli stacks up against alternatives."
        />
        <meta property="og:title" content="Kreatli | Comparisons – Creative Production Platform Comparisons" />
        <meta
          property="og:description"
          content="Compare Kreatli with other creative production and media review platforms to find the best solution for your team."
        />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h1 className="text-2xl sm:text-4xl font-bold font-sans max-w-lg mx-auto">Comparisons</h1>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Compare Kreatli with other creative production and media review platforms.
          </p>
        </div>
      </section>

      {/* Placeholder Content */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <p className="text-foreground-500">Content coming soon.</p>
        </div>
      </section>

      <FooterSection hideCta={true} />
    </>
  );
}

