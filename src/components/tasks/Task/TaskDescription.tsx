import { addToast, Button } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { JSONContent } from '@tiptap/react';
import { useRef, useState } from 'react';

import { usePatchTaskId } from '../../../services/hooks';
import { getTaskId } from '../../../services/services';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { EditorRef, SimpleEditor } from '../../tiptap/components/tiptap-templates/simple/simple-editor';
import { getIsContentEmpty, getSanitizedContent } from '../../tiptap/lib/tiptap-utils';
import { Icon } from '../../various/Icon';

interface Props {
  taskId: string;
  content: JSONContent;
}

export const TaskDescription = ({ taskId, content }: Props) => {
  const editorRef = useRef<EditorRef>(null);
  const editorJsonRef = useRef<JSONContent>(undefined);
  const [isEditable, setIsEditable] = useState(false);

  const queryClient = useQueryClient();
  const { mutate, isPending } = usePatchTaskId();

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleUpdate = (editorJson: Record<string, unknown>) => {
    editorJsonRef.current = editorJson;
  };

  const handleEditorAutoSave = () => {
    if (!editorJsonRef.current) {
      return;
    }

    mutate(
      {
        id: taskId,
        requestBody: { content: editorJsonRef.current },
      },
      {
        onSuccess: (data) => {
          queryClient.setQueryData([getTaskId.key, taskId], data);
        },
      },
    );
  };

  const handleCancel = () => {
    setIsEditable(false);
  };

  const handleSave = () => {
    const sanitizedContent = getSanitizedContent(editorJsonRef.current);

    mutate(
      { id: taskId, requestBody: { content: sanitizedContent } },
      {
        onSuccess: (data) => {
          editorRef.current?.setContent(data.content);
          queryClient.setQueryData([getTaskId.key, taskId], data);
          setIsEditable(false);
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  const isContentEmpty = getIsContentEmpty(content);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <div className="pl-3 font-semibold">Description</div>
        {!isEditable && (
          <Button size="sm" variant="light" radius="full" isIconOnly onClick={handleEdit}>
            <Icon icon="edit" size={16} />
          </Button>
        )}
      </div>
      {isContentEmpty && !isEditable ? (
        <Button className="w-fit" size="sm" variant="flat" onClick={handleEdit}>
          Add description
        </Button>
      ) : (
        <div className="rounded-medium bg-foreground-100 p-3">
          <SimpleEditor
            editorRef={editorRef}
            content={content}
            isEditable={isEditable}
            onUpdate={handleUpdate}
            onSave={handleEditorAutoSave}
          >
            {isEditable && (
              <div className="flex justify-end gap-2">
                <Button size="sm" variant="light" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button size="sm" variant="flat" isLoading={isPending} color="primary" onClick={handleSave}>
                  <span>Save</span>
                </Button>
              </div>
            )}
          </SimpleEditor>
        </div>
      )}
    </div>
  );
};
