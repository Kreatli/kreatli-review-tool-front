import { cn } from '@heroui/react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const ChatConversationCloud = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        'w-fit px-4 py-0.5 backdrop-blur-md rounded-full text-small shadow-medium text-foreground-500 z-20',
        className,
      )}
    >
      {children}
    </div>
  );
};
