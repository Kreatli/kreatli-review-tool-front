import { useRouter } from 'next/router';

export function useDeliverableModalVisibility() {
  const router = useRouter();

  const openDeliverableModal = (deliverableId: string, state?: 'push' | 'replace') => {
    const [pathname, query] = router.asPath.split('?');
    const params = new URLSearchParams(query || '');
    params.delete('taskId');
    params.delete('commentId');
    params.set('deliverableId', deliverableId);
    router[state ?? 'replace'](`${pathname}?${params.toString()}`, undefined, { scroll: false });
  };

  const closeDeliverableModal = () => {
    const [pathname, query] = router.asPath.split('?');
    const params = new URLSearchParams(query || '');
    params.delete('deliverableId');
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newUrl, undefined, { scroll: false });
  };

  return { openDeliverableModal, closeDeliverableModal };
}
