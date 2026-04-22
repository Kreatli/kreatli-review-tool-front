import type { GetServerSideProps } from 'next';

export default function TikTokDownloaderRedirectPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/free-tools/tiktok-video-downloader',
      permanent: true,
    },
  };
};

