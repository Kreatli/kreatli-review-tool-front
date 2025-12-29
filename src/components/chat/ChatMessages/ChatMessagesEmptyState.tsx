import { EmptyState } from '../../various/EmptyState';

export const ChatMessagesEmptyState = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div>
        <EmptyState size="sm" title="No messages yet" text="Be the first to start a conversation" />
      </div>
    </div>
  );
};
