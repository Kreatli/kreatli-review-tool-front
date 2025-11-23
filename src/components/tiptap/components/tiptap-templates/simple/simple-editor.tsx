'use client';

import React, { Ref, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { Content, EditorContent, EditorContext, JSONContent, useEditor } from '@tiptap/react';

import { StarterKit } from '@tiptap/starter-kit';
import { Image } from '@tiptap/extension-image';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { Typography } from '@tiptap/extension-typography';
import { Highlight } from '@tiptap/extension-highlight';
import { Placeholder, Selection } from '@tiptap/extensions';

import { Button } from '../../tiptap-ui-primitive/button';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from '../../tiptap-ui-primitive/toolbar';

import { HorizontalRule } from '../../tiptap-node/horizontal-rule-node/horizontal-rule-node-extension';

import { HeadingDropdownMenu } from '../../tiptap-ui/heading-dropdown-menu';
import { ListDropdownMenu } from '../../tiptap-ui/list-dropdown-menu';
import { BlockquoteButton } from '../../tiptap-ui/blockquote-button';
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from '../../tiptap-ui/color-highlight-popover';
import { LinkPopover, LinkContent, LinkButton } from '../../tiptap-ui/link-popover';
import { MarkButton } from '../../tiptap-ui/mark-button';
import { UndoRedoButton } from '../../tiptap-ui/undo-redo-button';

import { ArrowLeftIcon } from '../../tiptap-icons/arrow-left-icon';
import { HighlighterIcon } from '../../tiptap-icons/highlighter-icon';
import { LinkIcon } from '../../tiptap-icons/link-icon';

import { useIsBreakpoint } from '../../../hooks/use-is-breakpoint';
import UniqueID from '@tiptap/extension-unique-id';
import { updateTaskItemState } from '../../../lib/tiptap-utils';
import { useDebounceCallback } from '../../../../../hooks/useDebounceCallback';

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
}: {
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  isMobile: boolean;
}) => {
  return (
    <>
      {!isMobile && (
        <>
          <ToolbarGroup>
            <UndoRedoButton action="undo" />
            <UndoRedoButton action="redo" />
          </ToolbarGroup>
          <ToolbarSeparator />
        </>
      )}

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[2, 3, 4]} portal={isMobile} />
        <ListDropdownMenu types={['bulletList', 'orderedList', 'taskList']} portal={isMobile} />
        <BlockquoteButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        {!isMobile && (
          <>
            <MarkButton type="bold" />
            <MarkButton type="italic" />
            <MarkButton type="strike" />
            <MarkButton type="underline" />
          </>
        )}
        {!isMobile ? <ColorHighlightPopover /> : <ColorHighlightPopoverButton onClick={onHighlighterClick} />}
        {!isMobile ? <LinkPopover autoOpenOnLinkActive={false} /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>
    </>
  );
};

const MobileToolbarContent = ({ type, onBack }: { type: 'highlighter' | 'link'; onBack: () => void }) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === 'highlighter' ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === 'highlighter' ? <ColorHighlightPopoverContent /> : <LinkContent />}
  </>
);

export interface EditorRef {
  setContent: (content: Content) => void;
}

interface Props {
  isEditable?: boolean;
  content: JSONContent;
  editorRef: Ref<EditorRef>;
  children?: React.ReactNode;
  onUpdate: (json: Record<string, any>) => void;
  onSave: () => void;
}

export const SimpleEditor = ({ content, isEditable = false, editorRef, children, onUpdate, onSave }: Props) => {
  const isMobile = useIsBreakpoint();
  const [mobileView, setMobileView] = useState<'main' | 'highlighter' | 'link'>('main');
  const toolbarRef = useRef<HTMLDivElement>(null);
  const editorJsonRef = useRef(content);

  const autoSave = useDebounceCallback(() => {
    onSave();
  }, 500);

  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        'aria-label': 'Main content area, start typing to enter text.',
        class: 'simple-editor',
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      UniqueID.configure({ types: ['taskList', 'taskItem'] }),
      Placeholder.configure({
        placeholder: 'Write something...',
        showOnlyWhenEditable: true,
      }),
      HorizontalRule,
      TaskList,
      TaskItem.configure({
        nested: true,
        onReadOnlyChecked: (node, checked) => {
          if (!editorJsonRef.current) {
            return true;
          }

          const checkbox = document.querySelector(`[data-id="${node.attrs.id}"]`);
          const json = updateTaskItemState(editorJsonRef.current, node.attrs.id, checked);

          checkbox?.setAttribute('data-checked', `${checked}`);
          checkbox?.querySelector('input')?.setAttribute('checked', `${checked}`);

          editorJsonRef.current = json;
          onUpdate(json);
          autoSave();

          return true;
        },
      }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Selection,
    ],
    content,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();

      editorJsonRef.current = json;
      onUpdate(json);
    },
  });

  useLayoutEffect(() => {
    editor?.setEditable(isEditable);
    if (isEditable) {
      editor?.commands.focus('start');
    } else {
      editor?.commands.blur();
    }
  }, [isEditable]);

  useImperativeHandle(editorRef, () => ({
    setContent: (content: Content) => {
      editor?.commands.setContent(content);
    },
  }));

  useEffect(() => {
    if (!isMobile && mobileView !== 'main') {
      setMobileView('main');
    }
  }, [isMobile, mobileView]);

  return (
    <div className="simple-editor-wrapper">
      <EditorContext.Provider value={{ editor }}>
        <Toolbar ref={toolbarRef}>
          {mobileView === 'main' ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView('highlighter')}
              onLinkClick={() => setMobileView('link')}
              isMobile={isMobile}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === 'highlighter' ? 'highlighter' : 'link'}
              onBack={() => setMobileView('main')}
            />
          )}
          {children && mobileView === 'main' && <div className="ml-auto">{children}</div>}
        </Toolbar>

        <EditorContent editor={editor} role="presentation" className="simple-editor-content" />
      </EditorContext.Provider>
    </div>
  );
};
