import { Divider } from '@heroui/react';

import { SettingsDto } from '../../../services/types';
import { ProjectDescriptionForm } from './ProjectDescriptionForm';
import { ShareableLinksForm } from './ShareableLinksForm';

interface Props {
  settings: SettingsDto;
}

export const SettingsForm = ({ settings }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <ProjectDescriptionForm defaultProjectContent={settings.defaultProjectContent} />
      <Divider />
      <ShareableLinksForm
        shareableLinkDownloadDisabled={settings.shareableLinkDownloadDisabled}
        shareableLinkHeaderHidden={settings.shareableLinkHeaderHidden}
      />
    </div>
  );
};
