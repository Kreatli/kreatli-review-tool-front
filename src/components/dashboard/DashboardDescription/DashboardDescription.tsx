import { addToast, Button, Card, CardBody, cn, ScrollShadow } from '@heroui/react';
import { ProjectDto } from '../../../services/types';
import { EditorRef, SimpleEditor } from '../../tiptap/components/tiptap-templates/simple/simple-editor';
import { Icon } from '../../various/Icon';
import { useRef, useState } from 'react';

import { getIsContentEmpty } from '../../tiptap/lib/tiptap-utils';
import { DEFAULT_PROJECT_CONTENT } from '../../../constants/tiptap';
import { usePutProjectId } from '../../../services/hooks';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { JSONContent } from '@tiptap/react';
import { queryClient } from '../../../lib/queryClient';
import { getProjectId } from '../../../services/services';

interface Props {
  project: ProjectDto;
}

export const DashboardDescription = ({ project }: Props) => {
  const [isEditable, setIsEditable] = useState(false);
  const editorJsonRef = useRef<JSONContent>();
  const editorRef = useRef<EditorRef>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { mutate, isPending } = usePutProjectId();

  const handleEdit = () => {
    setIsEditable(true);

    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  const handleSave = () => {
    if (!editorJsonRef.current) {
      return;
    }

    const isContentEmpty = getIsContentEmpty(editorJsonRef.current);
    const sanitizedContent = {
      ...editorJsonRef.current,
      content: editorJsonRef.current.content?.at(-1)?.content
        ? editorJsonRef.current.content
        : editorJsonRef.current.content?.slice(0, -1),
    };

    mutate(
      {
        id: project.id,
        requestBody: { content: isContentEmpty ? DEFAULT_PROJECT_CONTENT : sanitizedContent },
      },
      {
        onSuccess: ({ content }) => {
          queryClient.invalidateQueries({ queryKey: [getProjectId.key, project.id] });
          editorRef.current?.setContent(content);
          setIsEditable(false);

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

  const handleCancel = () => {
    editorRef.current?.setContent(project.content);
    setIsEditable(false);

    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  const handleUpdate = (editorJson: Record<string, any>) => {
    editorJsonRef.current = editorJson;
  };

  return (
    <Card>
      <CardBody className="p-0">
        <ScrollShadow
          isEnabled={!isEditable}
          ref={scrollRef}
          className={cn('p-3 px-4 overflow-auto max-h-96', { 'max-h-[70vh]': isEditable })}
        >
          <SimpleEditor editorRef={editorRef} content={project.content} isEditable={isEditable} onUpdate={handleUpdate}>
            {isEditable && (
              <div className="flex justify-end gap-2">
                <Button size="sm" variant="light" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button size="sm" variant="flat" isLoading={isPending} color="primary" onClick={handleSave}>
                  Save
                </Button>
              </div>
            )}
          </SimpleEditor>
          {!isEditable && (
            <Button
              isIconOnly
              className="absolute top-2 right-2"
              size="sm"
              variant="flat"
              color="primary"
              radius="full"
              onClick={handleEdit}
            >
              <Icon icon="edit" size={16} />
            </Button>
          )}
        </ScrollShadow>
      </CardBody>
    </Card>
  );
};
