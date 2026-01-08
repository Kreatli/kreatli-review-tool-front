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

  useEffect(() => {
    if (data?.hasAccessToProject) {
      router.replace(`/project/${data.projectId}/assets/${data.file.id}`);
    }
  }, [data?.hasAccessToProject]);

  const title = `Kreatli | ${data?.file?.name}`;

  if (isError || !data || !shareableLinkId || data.hasAccessToProject) {
    return null;
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Header />
      <FileStateContextProvider fileId={data.file.id ?? ''} file={data.file}>
        <ShareableAsset file={data.file} shareableLinkId={shareableLinkId.toString()} />
      </FileStateContextProvider>
    </div>
  );
}
