import '../styles/globals.scss';
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

interface QueryErrorMeta {
  showErrorNotification?: boolean;
  errorMessage?: string;
}

const App = ({ Component, pageProps }: AppProps) => {
  // @ts-ignore
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>Kreatli</title>
        <meta
          name="description"
          content="We help Creative Teams streamline post production processes and optimize workflows. No more juggling between Slack, Discord, GSheets, Docs, WeTransfer, etc."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=1.0, user-scalable=no" />
        <meta property="og:url" content="https://kreatli.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kreatli" />
        <meta
          property="og:description"
          content="We help Creative Teams streamline post production processes and optimize workflows. No more juggling between Slack, Discord, GSheets, Docs, WeTransfer, etc."
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
    </>
  );
};

export default App;
