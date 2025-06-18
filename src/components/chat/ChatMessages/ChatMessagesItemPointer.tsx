interface Props {
  className?: string;
}

export const ChatMessagesItemPointer = ({ className }: Props) => {
  return (
    <svg width="19" height="26" viewBox="0 0 19 26" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M0.214165 1.74347C-0.236115 1.0262 0.282529 0 1.12942 0H17.6112C18.2942 0 18.7762 0.669392 18.5596 1.31709L16 8.97283C16 8.97283 6.5 36.0283 6 21.9303C5.63746 11.7082 2.12056 4.78022 0.214165 1.74347Z"
        fill="currentColor"
      />
    </svg>
  );
};
