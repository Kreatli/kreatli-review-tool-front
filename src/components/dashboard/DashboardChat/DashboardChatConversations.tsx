import { ChatDto } from '../../../services/types';
import { DashboardChatConversation } from './DashboardChatConversation';

interface Props {
  projectId: string;
  conversations: ChatDto[];
}

export const DashboardChatConversations = ({ projectId, conversations }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-3">
      {conversations.map((conversation) => (
        <DashboardChatConversation key={conversation.id} projectId={projectId} conversation={conversation} />
      ))}
    </div>
  );
};
