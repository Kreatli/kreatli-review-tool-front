import { ChatMessageDto } from '../../../services/types';
import { ChatMessagesItem } from './ChatMessagesItem';

interface Props {
  messages: ChatMessageDto[];
  shouldGroupMessages?: boolean;
}

export const ChatMessagesGroup = ({ messages, shouldGroupMessages = true }: Props) => {
  return (
    <div className="flex flex-col gap-0.5">
      {messages.map((message, idx) => (
        <ChatMessagesItem key={message.id} message={message} shouldShowSenderName={idx === 0 || !shouldGroupMessages} />
      ))}
    </div>
  );
};
