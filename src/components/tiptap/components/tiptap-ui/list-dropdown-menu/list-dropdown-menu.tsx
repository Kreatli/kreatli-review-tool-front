import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { type Editor } from '@tiptap/react';
import { useCallback, useState } from 'react';

// --- Hooks ---
import { useTiptapEditor } from '../../../hooks/use-tiptap-editor';
// --- Icons ---
import { ChevronDownIcon } from '../../tiptap-icons/chevron-down-icon';
// --- Tiptap UI ---
import { ListButton, type ListType } from '../../tiptap-ui/list-button';
import { useListDropdownMenu } from '../../tiptap-ui/list-dropdown-menu/use-list-dropdown-menu';
// --- UI Primitives ---
import type { ButtonProps } from '../../tiptap-ui-primitive/button';
import { Button } from '../../tiptap-ui-primitive/button';

export interface ListDropdownMenuProps extends Omit<ButtonProps, 'type'> {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor;
  /**
   * The list types to display in the dropdown.
   */
  types?: ListType[];
  /**
   * Whether the dropdown should be hidden when no list types are available
   * @default false
   */
  hideWhenUnavailable?: boolean;
  /**
   * Callback for when the dropdown opens or closes
   */
  onOpenChange?: (isOpen: boolean) => void;
  /**
   * Whether to render the dropdown menu in a portal
   * @default false
   */
  portal?: boolean;
}

export function ListDropdownMenu({
  editor: providedEditor,
  types = ['bulletList', 'orderedList', 'taskList'],
  hideWhenUnavailable = false,
  onOpenChange,
  ...props
}: ListDropdownMenuProps) {
  const { editor } = useTiptapEditor(providedEditor);
  const [isOpen, setIsOpen] = useState(false);

  const { filteredLists, canToggle, isActive, isVisible, Icon } = useListDropdownMenu({
    editor,
    types,
    hideWhenUnavailable,
  });

  const handleOnOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      onOpenChange?.(open);
    },
    [onOpenChange],
  );

  if (!isVisible || !editor || !editor.isEditable) {
    return null;
  }

  return (
    <Dropdown isOpen={isOpen} onOpenChange={handleOnOpenChange}>
      <DropdownTrigger>
        <Button
          type="button"
          data-style="ghost"
          data-active-state={isActive ? 'on' : 'off'}
          role="button"
          tabIndex={-1}
          disabled={!canToggle}
          data-disabled={!canToggle}
          aria-label="List options"
          tooltip="List"
          {...props}
        >
          <Icon className="tiptap-button-icon" />
          <ChevronDownIcon className="tiptap-button-dropdown-small" />
        </Button>
      </DropdownTrigger>

      <DropdownMenu variant="flat">
        {filteredLists.map((option) => (
          <DropdownItem key={option.type} className="p-0">
            <ListButton editor={editor} type={option.type} text={option.label} showTooltip={false} />
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default ListDropdownMenu;
