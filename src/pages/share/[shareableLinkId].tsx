import { useRouter } from 'next/router';
import { useGetShareableLinkAssetId } from '../../services/hooks';
import { useAppLoader } from '../../hooks/useAppLoader';
import { useEffect } from 'react';
import Head from 'next/head';
import { Header } from '../../components/layout/Header';
import { FileStateContextProvider } from '../../contexts/File';
import { ShareableAsset } from '../../components/asset/ShareableAsset';

export default function SharePage() {
  const setIsLoading = useAppLoader((state) => state.setIsLoading);
  const router = useRouter();
  const { shareableLinkId } = router.query;

  const { data, isPending, isError } = useGetShareableLinkAssetId(shareableLinkId?.toString() ?? '', {
    enabled: !!shareableLinkId,
  });

  useEffect(() => {
    if (!isPending) {
      setIsLoading(false);
    }
  }, [isPending]);

  useEffect(() => {
    if (isError) {
      router.replace('/404');
    }
  }, [isError, router]);

  const title = `Kreatli | ${data?.name}`;

  if (isError || !data || !shareableLinkId) {
    return null;
  }

  const fileUrl = data.fileType.startsWith('image') ? data.url : data.metadata.thumbnailUrl;

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="robots" content="noindex" />
        <meta property="og:title" content={title} />
        {fileUrl && <meta property="og:image" content={fileUrl} />}
      </Head>
      <Header />
      <FileStateContextProvider fileId={data?.id ?? ''} file={data}>
        <ShareableAsset file={data} shareableLinkId={shareableLinkId.toString()} />
      </FileStateContextProvider>
    </div>
  );
}
