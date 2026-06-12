import { addToast, Button, Switch } from '@heroui/react';
import { JSONContent } from '@tiptap/react';
import { useEffect, useRef, useState } from 'react';

import { DEFAULT_PROJECT_CONTENT } from '../../../constants/tiptap';
import { queryClient } from '../../../lib/queryClient';
import { usePutUserSettings } from '../../../services/hooks';
import { getShareableLinkAssetId, getUserSettings } from '../../../services/services';
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

  const [shareableLinkDownloadDisabled, setShareableLinkDownloadDisabled] = useState(
    settings.shareableLinkDownloadDisabled,
  );
  const [shareableLinkHeaderHidden, setShareableLinkHeaderHidden] = useState(settings.shareableLinkHeaderHidden);

  const { mutate: saveDescription, isPending: isSavingDescription } = usePutUserSettings();
  const { mutate: saveShareSettings } = usePutUserSettings();

  useEffect(() => {
    setShareableLinkDownloadDisabled(settings.shareableLinkDownloadDisabled);
    setShareableLinkHeaderHidden(settings.shareableLinkHeaderHidden);
  }, [settings.shareableLinkDownloadDisabled, settings.shareableLinkHeaderHidden]);

  const handleShareSettingChange = (
    field: 'shareableLinkDownloadDisabled' | 'shareableLinkHeaderHidden',
    value: boolean,
  ) => {
    if (field === 'shareableLinkDownloadDisabled') {
      setShareableLinkDownloadDisabled(value);
    } else {
      setShareableLinkHeaderHidden(value);
    }

    saveShareSettings(
      { requestBody: { [field]: value } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getShareableLinkAssetId.key] });
          addToast({ title: 'Shareable link settings saved', color: 'success', variant: 'flat' });
        },
        onError: (error) => {
          if (field === 'shareableLinkDownloadDisabled') {
            setShareableLinkDownloadDisabled(settings.shareableLinkDownloadDisabled);
          } else {
            setShareableLinkHeaderHidden(settings.shareableLinkHeaderHidden);
          }
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

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

    saveDescription(
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
          className="max-h-80 min-h-40 overflow-y-auto rounded-medium border border-foreground-300 p-3"
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
          <Button variant="flat" isDisabled={isSavingDescription} onClick={handleReset}>
            <Icon icon="update" size={18} />
            Reset
          </Button>
        )}
        <Button className="bg-foreground text-content1" isLoading={isSavingDescription} onClick={handleSave}>
          <span>Save changes</span>
        </Button>
      </div>

      <div className="flex w-full flex-col gap-4 border-t border-foreground-200 pt-6">
        <div>
          <div className="text-lg font-semibold">Shareable links</div>
          <div className="text-sm text-foreground-500">
            These preferences apply to all shareable links on projects you own.
          </div>
        </div>
        <Switch
          isSelected={shareableLinkDownloadDisabled}
          onValueChange={(value) => handleShareSettingChange('shareableLinkDownloadDisabled', value)}
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">Disable download on shareable links</span>
            <span className="text-sm text-foreground-500">
              People who open shareable links on your projects cannot download files.
            </span>
          </div>
        </Switch>
        <Switch
          isSelected={shareableLinkHeaderHidden}
          onValueChange={(value) => handleShareSettingChange('shareableLinkHeaderHidden', value)}
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">Hide Kreatli header on shareable links</span>
            <span className="text-sm text-foreground-500">
              Shareable links on your projects will not show the Kreatli site header.
            </span>
          </div>
        </Switch>
      </div>
    </div>
  );
};
