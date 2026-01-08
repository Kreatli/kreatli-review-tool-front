/* eslint-disable @typescript-eslint/no-explicit-any */
import { computePosition, flip, shift } from '@floating-ui/react';
import { Editor, posToDOMRect, ReactRenderer } from '@tiptap/react';

import { ReviewToolEditorMentionList } from './ReviewToolEditorMentionList';

const updatePosition = (editor: Editor, element: HTMLElement) => {
  const virtualElement = {
    getBoundingClientRect: () => posToDOMRect(editor.view, editor.state.selection.from, editor.state.selection.to),
  };

  computePosition(virtualElement, element, {
    placement: 'bottom-start',
    strategy: 'absolute',
    middleware: [shift(), flip()],
  }).then(({ x, y, strategy }) => {
    element.style.width = 'max-content';
    element.style.position = strategy;
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  });
};

export const reviewToolEditorSuggestion = {
  render: () => {
    let component: ReactRenderer<any>;

    return {
      onStart: (props: any) => {
        component = new ReactRenderer(ReviewToolEditorMentionList, {
          props,
          editor: props.editor,
        });

        if (!props.clientRect) {
          return;
        }

        component.element.style.position = 'absolute';

        document.body.appendChild(component.element);

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
