export const scrollToBottom = <T extends HTMLElement>(ref: React.MutableRefObject<T | null>) => {
  if (ref.current) {
    ref.current.scrollTop = ref.current.scrollHeight;
  }
};
