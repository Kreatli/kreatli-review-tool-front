import type { GetServerSideProps } from 'next';

export default function YouTubeDownloaderRedirectPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/free-tools/youtube-shorts-downloader',
      permanent: true,
    },
  };
};
