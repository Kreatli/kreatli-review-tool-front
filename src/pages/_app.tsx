import 'react-image-crop/dist/ReactCrop.css';
import '../styles/globals.scss';
import '../styles/tiptap.scss';

import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { GoogleTagManager } from '@next/third-parties/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Layout } from '../components/layout/Layout';
import { StoryblokProvider } from '../components/layout/Storyblok/StoryblokProvider';
import { queryClient } from '../lib/queryClient';

const App = ({ Component, pageProps }: AppProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <StoryblokProvider>
      <Head>
        <title>Kreatli | Video Collaboration & Review Platform</title>
        <meta
          name="description"
          content="Kreatli is a Video Collaboration & Review Platform that helps video teams streamline video production workflows. Get frame-accurate feedback, manage projects, collaborate in real-time, and deliver faster—all in one place."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=1.0, user-scalable=no" />
        <meta property="og:url" content="https://kreatli.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kreatli | Video Collaboration & Review Platform" />
        <meta
          property="og:description"
          content="Kreatli is a Video Collaboration & Review Platform that helps video teams streamline video production workflows. Get frame-accurate feedback, manage projects, collaborate in real-time, and deliver faster—all in one place."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Kreatli | Video Collaboration & Review Platform" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kreatli | Video Collaboration & Review Platform" />
        <meta
          name="twitter:description"
          content="Kreatli is a Video Collaboration & Review Platform that helps video teams streamline video production workflows. Get frame-accurate feedback, manage projects, collaborate in real-time, and deliver faster—all in one place."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider id="heroUiProvider">
          <ToastProvider />
          <GoogleOAuthProvider clientId={process.env.GOOGLE_OAUTH_CLIENT_ID as string}>
            <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
          </GoogleOAuthProvider>
        </HeroUIProvider>
      </QueryClientProvider>
      {process.env.GTM_ID && <GoogleTagManager gtmId={process.env.GTM_ID} />}
    </StoryblokProvider>
  );
};

export default App;
