import '../styles/globals.scss';
import '../styles/tiptap.scss';
import 'react-image-crop/dist/ReactCrop.css';

import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { GoogleTagManager } from '@next/third-parties/google';
import Head from 'next/head';
import React from 'react';

import { Layout } from '../components/layout/Layout';
import { queryClient } from '../lib/queryClient';
import { StoryblokProvider } from '../components/layout/Storyblok/StoryblokProvider';

const App = ({ Component, pageProps }: AppProps) => {
  // @ts-ignore
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <StoryblokProvider>
      <Head>
        <title>Kreatli | End-to-End Production Management Platform</title>
        <meta
          name="description"
          content="Kreatli helps content teams and creators streamline creative production. Upload media, manage projects, get precise feedback, chat, and share - in one place."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=1.0, user-scalable=no" />
        <meta property="og:url" content="https://kreatli.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kreatli - End-to-End Production Management Platform" />
        <meta
          property="og:description"
          content="Kreatli helps content teams and creators streamline creative production. Upload media, manage projects, get precise feedback, chat, and share - in one place."
        />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
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
