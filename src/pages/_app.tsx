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
        <meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=1.0, user-scalable=no" />
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
