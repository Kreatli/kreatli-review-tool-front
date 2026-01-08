// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mergeRefs = (...refs: any[]) => {
  return (element: HTMLElement | null) => {
    for (const ref of refs) {
      if (!ref) {
        continue;
      }

      if (typeof ref === 'function') {
        ref(element);
      } else {
        ref.current = element!;
      }
    }
  };
};
