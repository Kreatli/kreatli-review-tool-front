import '../styles/globals.scss';
import 'react-image-crop/dist/ReactCrop.css';

import { addToast, HeroUIProvider, ToastProvider } from '@heroui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Query, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Head from 'next/head';
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
          content="Supercharge Your Collaboration with Kreatli! All your projects, chats, and files in one place. Organize, collaborate, and create effortlessly."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=1.0, user-scalable=no" />
        <meta property="og:title" content="Kreatli" />
        <meta
          property="og:description"
          content="Supercharge Your Collaboration with Kreatli! All your projects, chats, and files in one place. Organize, collaborate, and create effortlessly."
        />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider id="heroUiProvider">
          <ToastProvider />
          <GoogleOAuthProvider clientId={process.env.GOOGLE_OAUTH_CLIENT_ID as string}>
            <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
          </GoogleOAuthProvider>
        </HeroUIProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
