/* eslint-disable @typescript-eslint/no-explicit-any */
import { computePosition, flip, shift } from '@floating-ui/react';
import { Editor, posToDOMRect, ReactRenderer } from '@tiptap/react';

import { EditorMentionList } from '../components/editor/EditorMentionList';

/** Prefer the open dialog so the list stays inside the modal overlay (avoids outside-click dismiss). */
const getMentionPortalParent = (editor: Editor) =>
  editor.view.dom.closest<HTMLElement>('[role="dialog"]') ?? document.body;

const updatePosition = (editor: Editor, element: HTMLElement) => {
  const virtualElement = {
    getBoundingClientRect: () => posToDOMRect(editor.view, editor.state.selection.from, editor.state.selection.to),
  };

  computePosition(virtualElement, element, {
    placement: 'bottom-start',
    // Fixed keeps viewport-relative coords when the portal is inside a modal (not only document.body).
    strategy: 'fixed',
    middleware: [shift(), flip()],
  }).then(({ x, y, strategy }) => {
    element.style.width = 'max-content';
    element.style.position = strategy;
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  });
};

export const editorSuggestion = {
  render: () => {
    let component: ReactRenderer<any>;

    return {
      onStart: (props: any) => {
        component = new ReactRenderer(EditorMentionList, {
          props,
          editor: props.editor,
        });

        if (!props.clientRect) {
          return;
        }

        component.element.style.position = 'fixed';
        component.element.dataset.tiptapMentionList = '';

        const portalParent = getMentionPortalParent(props.editor);
        portalParent.appendChild(component.element);

        updatePosition(props.editor, component.element);
      },

      onUpdate(props: any) {
        component.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        updatePosition(props.editor, component.element);
      },

      onKeyDown(props: any) {
        if (props.event.key === 'Escape') {
          component.destroy();

          return true;
        }

        return component.ref?.onKeyDown(props);
      },

      onExit() {
        component.element.remove();
        component.destroy();
      },
    };
  },
};
