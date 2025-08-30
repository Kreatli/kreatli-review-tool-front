import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { ChatDto } from '../../../services/types';
import { Icon } from '../../various/Icon';
import { ChatConversationRenameModal } from './ChatConversationRenameModal';
import React from 'react';

interface Props {
  chat: ChatDto;
  isDisabled?: boolean;
}

export const ChatConversationOptions = ({ chat, isDisabled = false }: Props) => {
  const [isRenameModalVisible, setIsRenameModalVisible] = React.useState(false);

  return (
    <>
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <Button size="sm" isDisabled={isDisabled} variant="light" isIconOnly radius="full">
            <Icon icon="dots" size={20} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="flat">
          <DropdownItem
            key="rename"
            startContent={<Icon icon="edit" size={18} />}
            onClick={() => setIsRenameModalVisible(true)}
          >
            Rename
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <ChatConversationRenameModal
        chat={chat}
        isVisible={isRenameModalVisible}
        onClose={() => setIsRenameModalVisible(false)}
      />
    </>
  );
};
