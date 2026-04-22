import type { GetServerSideProps } from 'next';

export default function InstagramDownloaderRedirectPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/free-tools/instagram-reel-downloader',
      permanent: true,
    },
  };
};
