import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { ShareableAsset } from '../../components/asset/ShareableAsset';
import { Header } from '../../components/layout/Header';
import { FileStateContextProvider } from '../../contexts/File';
import { useAppLoader } from '../../hooks/useAppLoader';
import { useGetShareableLinkAssetId } from '../../services/hooks';

export default function SharePage() {
  const setIsLoading = useAppLoader((state) => state.setIsLoading);
  const router = useRouter();
  const { shareableLinkId } = router.query;

  const { data, isPending, isError } = useGetShareableLinkAssetId(shareableLinkId?.toString() ?? '', {
    enabled: !!shareableLinkId,
    staleTime: 0,
    refetchOnMount: 'always',
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

  const title = `Kreatli | ${data?.file?.name}`;

  if (isError || !data || !shareableLinkId) {
    return null;
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      {!data.shareableLinkHeaderHidden && <Header />}
      <FileStateContextProvider fileId={data.file.id ?? ''} file={data.file}>
        <ShareableAsset
          file={data.file}
          shareableLinkId={shareableLinkId.toString()}
          downloadDisabled={data.shareableLinkDownloadDisabled}
          headerHidden={data.shareableLinkHeaderHidden}
        />
      </FileStateContextProvider>
    </div>
  );
}
