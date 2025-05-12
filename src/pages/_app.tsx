import '../styles/globals.scss';
import 'react-image-crop/dist/ReactCrop.css';

import { addToast, HeroUIProvider, ToastProvider } from '@heroui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Query, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import React from 'react';

import { Layout } from '../components/layout/Layout';
import { getErrorMessage } from '../utils/getErrorMessage';

interface QueryErrorMeta {
  showErrorNotification?: boolean;
  errorMessage?: string;
}

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
            retry: false,
          },
        },
        queryCache: new QueryCache({
          onError: (error, meta: Query<any, any, any> & QueryErrorMeta) => {
            if (!meta.showErrorNotification && !meta.errorMessage) {
              return;
            }

            addToast({
              title: meta.errorMessage || getErrorMessage(error),
              color: 'danger',
              variant: 'flat',
            });
          },
        }),
      }),
  );

  // @ts-ignore
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>Kreatli</title>
        <meta
          name="description"
          content="Kreatli is a place where Editors, Designers, and Producers find YouTube Creators to work with and build a professional network."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=1.0, user-scalable=no" />
      </Head>
      <QueryClientProvider client={queryClient}>
        {/* @ts-ignore */}
        <HeroUIProvider id="heroUiProvider">
          <ToastProvider />
          <GoogleOAuthProvider clientId={process.env.GOOGLE_OAUTH_CLIENT_ID as string}>
            <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
          </GoogleOAuthProvider>
        </HeroUIProvider>
      </QueryClientProvider>
      {process.env.ENABLE_REDDIT_PIXEL === 'true' && (
        <Script
          id="reddit-pixel"
          dangerouslySetInnerHTML={{
            // eslint-disable-next-line max-len
            __html:
              // eslint-disable-next-line max-len, @typescript-eslint/quotes
              `!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','a2_erzexreig3w8');rdt('track', 'PageVisit');`,
          }}
        />
      )}
    </>
  );
};

export default App;
