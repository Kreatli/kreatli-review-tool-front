import { cn } from '@heroui/react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const ChatConversationCloud = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        'z-20 w-fit rounded-full px-4 py-0.5 text-small text-foreground-500 shadow-medium backdrop-blur-md',
        className,
      )}
    >
      {children}
    </div>
  );
};
