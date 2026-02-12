import { addToast, Button, Card, CardBody, cn, ScrollShadow } from '@heroui/react';
import { JSONContent } from '@tiptap/react';
import { useRef, useState } from 'react';

import { trackEvent } from '../../../lib/amplitude';
import { queryClient } from '../../../lib/queryClient';
import { usePutProjectId } from '../../../services/hooks';
import { getProjectId } from '../../../services/services';
import { ProjectDto } from '../../../services/types';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { EditorRef, SimpleEditor } from '../../tiptap/components/tiptap-templates/simple/simple-editor';
import { getIsContentEmpty, getSanitizedContent } from '../../tiptap/lib/tiptap-utils';
import { Icon } from '../../various/Icon';

interface Props {
  project: ProjectDto;
}

export const DashboardDescription = ({ project }: Props) => {
  const [isEditable, setIsEditable] = useState(false);
  const editorJsonRef = useRef<JSONContent>(undefined);
  const editorRef = useRef<EditorRef>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { mutate, isPending } = usePutProjectId();

  const handleEdit = () => {
    setIsEditable(true);

    trackEvent('edit_project_overview_click');

    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  const handleSave = () => {
    if (!editorJsonRef.current) {
      return;
    }

    const isContentEmpty = getIsContentEmpty(editorJsonRef.current);
    const sanitizedContent = getSanitizedContent(editorJsonRef.current);

    trackEvent('edit_project_overview_save');

    mutate(
      {
        id: project.id,
        requestBody: { content: isContentEmpty ? {} : sanitizedContent },
      },
      {
        onSuccess: ({ content }) => {
          queryClient.invalidateQueries({ queryKey: [getProjectId.key, project.id] });
          editorRef.current?.setContent(content);
          setIsEditable(false);

          trackEvent('edit_project_overview_success');

          if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
          }
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
          trackEvent('edit_project_overview_failure');
        },
      },
    );
  };

  const handleEditorAutoSave = () => {
    if (!editorJsonRef.current) {
      return;
    }

    mutate(
      {
        id: project.id,
        requestBody: { content: editorJsonRef.current },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getProjectId.key, project.id] });
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

  const handleUpdate = (editorJson: Record<string, unknown>) => {
    editorJsonRef.current = editorJson;
  };

  return (
    <Card>
      <CardBody className="p-0">
        <ScrollShadow
          isEnabled={!isEditable}
          ref={scrollRef}
          className={cn('max-h-96 overflow-auto p-3 px-4', { 'max-h-[70vh]': isEditable })}
        >
          <SimpleEditor
            editorRef={editorRef}
            content={project.content}
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
          {!isEditable && (
            <Button
              isIconOnly
              className="absolute right-2 top-2"
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
