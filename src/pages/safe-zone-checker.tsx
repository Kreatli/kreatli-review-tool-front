import Head from 'next/head';
import React from 'react';

import { Header } from '../components/layout/Header';
import { FooterSection } from '../components/home/Footer/FooterSection';
import { Decorations } from '../components/layout/Storyblok/Decorations';
import { SafeZoneChecker } from '../components/safe-zone-checker/SafeZoneChecker';

export default function SafeZoneCheckerPage() {
  return (
    <>
      <Head>
        <title>Kreatli | Safe Zone Checker - Preview Content for TikTok, Instagram Reels & YouTube Shorts</title>
        <meta
          name="description"
          content="Preview your content with platform-specific safe zones and UI overlays for TikTok, Instagram Reels, and YouTube Shorts. Ensure your videos look perfect on every platform."
        />
        <meta property="og:title" content="Kreatli | Safe Zone Checker - Preview Content for TikTok, Instagram Reels & YouTube Shorts" />
        <meta
          property="og:description"
          content="Test how your vertical videos will look on TikTok, Instagram Reels, and YouTube Shorts with accurate platform UI overlays and safe zone indicators."
        />
        <meta property="og:type" content="website" />
      </Head>
      <Header />
      <Decorations />
      <SafeZoneChecker />
      <FooterSection hideCta={true} />
    </>
  );
}

