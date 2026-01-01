import { Modal, ModalBody, ModalContent, ModalHeader, ScrollShadow } from '@heroui/react';
import React, { useEffect, useRef } from 'react';

import { ProjectDto } from '../../../services/types';
import { EditorRef, SimpleEditor } from '../../tiptap/components/tiptap-templates/simple/simple-editor';
import { usePutProjectId } from '../../../services/hooks';
import { queryClient } from '../../../lib/queryClient';
import { getProjectId } from '../../../services/services';
import { JSONContent } from '@tiptap/react';

interface Props {
  isOpen: boolean;
  project: ProjectDto;
  onClose: () => void;
}

export const ProjectDescriptionModal = ({ isOpen, project, onClose }: Props) => {
  const editorRef = useRef<EditorRef>(null);
  const editorJsonRef = useRef<JSONContent>();

  const { mutate } = usePutProjectId();

  useEffect(() => {
    if (isOpen && project.content) {
      editorRef.current?.setContent(project.content);
      editorJsonRef.current = project.content as JSONContent;
    }
  }, [isOpen, project.content]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Project Information</ModalHeader>
        <ModalBody className="pb-6 pt-0">
          <ScrollShadow className="max-h-[70vh] overflow-auto">
            <div className="[&_.tiptap-toolbar]:hidden">
              <SimpleEditor
                editorRef={editorRef}
                content={project.content}
                isEditable={false}
                onUpdate={(json) => {
                  editorJsonRef.current = json as JSONContent;
                }}
                onSave={() => {
                  if (!editorJsonRef.current) return;
                  mutate(
                    { id: project.id, requestBody: { content: editorJsonRef.current } },
                    {
                      onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: [getProjectId.key, project.id] });
                      },
                    },
                  );
                }}
              />
            </div>
          </ScrollShadow>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
