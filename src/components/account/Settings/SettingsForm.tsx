import { addToast, Button } from '@heroui/react';
import { JSONContent } from '@tiptap/react';
import { useRef, useState } from 'react';

import { DEFAULT_PROJECT_CONTENT } from '../../../constants/tiptap';
import { queryClient } from '../../../lib/queryClient';
import { usePutUserSettings } from '../../../services/hooks';
import { getUserSettings } from '../../../services/services';
import { SettingsDto } from '../../../services/types';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { EditorRef, SimpleEditor } from '../../tiptap/components/tiptap-templates/simple/simple-editor';
import { getIsContentEmpty, getSanitizedContent } from '../../tiptap/lib/tiptap-utils';
import { Icon } from '../../various/Icon';

interface Props {
  settings: SettingsDto;
}

export const SettingsForm = ({ settings }: Props) => {
  const editorRef = useRef<EditorRef>(null);
  const editorJsonRef = useRef<JSONContent>(undefined);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isTouched, setIsTouched] = useState(false);

  const { mutate, isPending } = usePutUserSettings();

  const handleUpdate = (editorJson: Record<string, unknown>) => {
    editorJsonRef.current = editorJson;
    setIsTouched(true);
  };

  const handleReset = () => {
    editorRef.current?.setContent(settings.defaultProjectContent);
    setIsTouched(false);
  };

  const handleSave = () => {
    if (!editorJsonRef.current) {
      return;
    }

    const isContentEmpty = getIsContentEmpty(editorJsonRef.current);
    const sanitizedContent = getSanitizedContent(editorJsonRef.current);

    mutate(
      {
        requestBody: { defaultProjectContent: isContentEmpty ? DEFAULT_PROJECT_CONTENT : sanitizedContent },
      },
      {
        onSuccess: ({ defaultProjectContent }) => {
          queryClient.invalidateQueries({ queryKey: [getUserSettings.key] });
          editorRef.current?.setContent(defaultProjectContent);
          setIsTouched(false);

          if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
          }
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-4 pt-4">
      <div className="flex w-full flex-col gap-2">
        <div className="text-lg font-semibold">Project default description</div>
        <div
          ref={scrollRef}
          className="max-h-80 min-h-40 overflow-y-auto rounded-medium border border-foreground-300 p-3 dark:bg-foreground-50"
        >
          <SimpleEditor
            content={settings.defaultProjectContent}
            editorRef={editorRef}
            isEditable
            onUpdate={handleUpdate}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        {isTouched && (
          <Button variant="flat" isDisabled={isPending} onClick={handleReset}>
            <Icon icon="update" size={18} />
            Reset
          </Button>
        )}
        <Button className="bg-foreground text-content1" isLoading={isPending} onClick={handleSave}>
          <span>Save changes</span>
        </Button>
      </div>
    </div>
  );
};
