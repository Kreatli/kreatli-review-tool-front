import { useRouter } from 'next/router';

export function useTaskModalVisibility() {
  const router = useRouter();

  const openTaskModal = (taskId: string, commentId?: string) => {
    const [pathname, query] = router.asPath.split('?');
    const params = new URLSearchParams(query || '');
    params.set('taskId', taskId);
    if (commentId) {
      params.set('commentId', commentId);
    }
    router.replace(`${pathname}?${params.toString()}`, undefined, { scroll: false });
  };

  const closeTaskModal = () => {
    const [pathname, query] = router.asPath.split('?');
    const params = new URLSearchParams(query || '');
    params.delete('taskId');
    params.delete('commentId');
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newUrl, undefined, { scroll: false });
  };

  return { openTaskModal, closeTaskModal };
}
