import { Extension } from '@tiptap/react';

export const ReviewToolEditorSubmit = Extension.create({
  name: 'submitOnEnter',
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        this.options.onSubmit(editor);
        return true;
      },
      'Shift-Enter': () => {
        return this.editor.commands.first(({ commands }) => [
          () => commands.newlineInCode(),
          () => commands.createParagraphNear(),
          () => commands.liftEmptyBlock(),
          () => commands.splitBlock(),
        ]);
      },
    };
  },
});
