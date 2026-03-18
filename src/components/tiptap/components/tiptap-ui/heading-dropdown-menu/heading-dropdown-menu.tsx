import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { forwardRef, useCallback, useState } from 'react';

// --- Hooks ---
import { useTiptapEditor } from '../../../hooks/use-tiptap-editor';
// --- Icons ---
import { ChevronDownIcon } from '../../tiptap-icons/chevron-down-icon';
// --- Tiptap UI ---
import { HeadingButton } from '../../tiptap-ui/heading-button';
import type { UseHeadingDropdownMenuConfig } from '../../tiptap-ui/heading-dropdown-menu';
import { useHeadingDropdownMenu } from '../../tiptap-ui/heading-dropdown-menu';
// --- UI Primitives ---
import type { ButtonProps } from '../../tiptap-ui-primitive/button';
import { Button } from '../../tiptap-ui-primitive/button';

export interface HeadingDropdownMenuProps extends Omit<ButtonProps, 'type'>, UseHeadingDropdownMenuConfig {
  /**
   * Whether to render the dropdown menu in a portal
   * @default false
   */
  portal?: boolean;
  /**
   * Callback for when the dropdown opens or closes
   */
  onOpenChange?: (isOpen: boolean) => void;
}

/**
 * Dropdown menu component for selecting heading levels in a Tiptap editor.
 *
 * For custom dropdown implementations, use the `useHeadingDropdownMenu` hook instead.
 */
export const HeadingDropdownMenu = forwardRef<HTMLButtonElement, HeadingDropdownMenuProps>(
  (
    { editor: providedEditor, levels = [1, 2, 3, 4, 5, 6], hideWhenUnavailable = false, onOpenChange, ...buttonProps },
    ref,
  ) => {
    const { editor } = useTiptapEditor(providedEditor);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { isVisible, isActive, canToggle, Icon } = useHeadingDropdownMenu({
      editor,
      levels,
      hideWhenUnavailable,
    });

    const handleOpenChange = useCallback(
      (open: boolean) => {
        if (!editor || !canToggle) return;
        setIsOpen(open);
        onOpenChange?.(open);
      },
      [canToggle, editor, onOpenChange],
    );

    if (!isVisible) {
      return null;
    }

    return (
      <Dropdown isOpen={isOpen} onOpenChange={handleOpenChange}>
        <DropdownTrigger asChild>
          <Button
            type="button"
            data-style="ghost"
            data-active-state={isActive ? 'on' : 'off'}
            role="button"
            tabIndex={-1}
            disabled={!canToggle}
            data-disabled={!canToggle}
            aria-label="Format text as heading"
            aria-pressed={isActive}
            tooltip="Heading"
            {...buttonProps}
            ref={ref}
          >
            <Icon className="tiptap-button-icon" />
            <ChevronDownIcon className="tiptap-button-dropdown-small" />
          </Button>
        </DropdownTrigger>

        <DropdownMenu variant="flat">
          {levels.map((level) => (
            <DropdownItem key={`heading-${level}`} className="p-0">
              <HeadingButton editor={editor} level={level} text={`Heading ${level}`} showTooltip={false} />
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  },
);

HeadingDropdownMenu.displayName = 'HeadingDropdownMenu';

export default HeadingDropdownMenu;
