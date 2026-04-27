import type { GetServerSideProps } from 'next';

export default function FrameRateConverterRedirectPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/free-tools/video-frame-rate-converter',
      permanent: true,
    },
  };
};
