import Head from 'next/head';
import React from 'react';

import { Header } from '../components/layout/Header';
import { useSession } from '../hooks/useSession';
import { SocialMediaSafeZoneChecker } from '../components/safe-zone-checker/SocialMediaSafeZoneChecker';
import { Decorations } from '../components/layout/Storyblok/Decorations';
import { FooterSection } from '../components/home/Footer/FooterSection';
import { SafeZoneScreenGuide } from '../components/safe-zone-checker/SafeZoneScreenGuide';

export default function ProjectsPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Social Media Safe Zone Checker: TikTok, Reels, Shorts</title>
        <meta
          name="description"
          content="Preview your content with platform-specific safe zones and UI overlays for TikTok, Instagram Reels, and YouTube Shorts. Ensure your videos look perfect on every platform."
        />
        <meta property="og:title" content="Kreatli | Social Media Safe Zone Checker: TikTok, Reels, Shorts" />
        <meta
          property="og:description"
          content="Preview your content with platform-specific safe zones and UI overlays for TikTok, Instagram Reels, and YouTube Shorts. Ensure your videos look perfect on every platform."
        />
      </Head>
      <Header />
      <Decorations />
      <SocialMediaSafeZoneChecker />
      <SafeZoneScreenGuide />
      <FooterSection hideCta />
    </>
  );
}
