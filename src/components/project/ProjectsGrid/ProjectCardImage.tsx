import { Image } from '@heroui/react';

import { InterfaceImageDto } from '../../../services/types';
import { Icon } from '../../various/Icon';

interface Props {
  image?: InterfaceImageDto;
  alt?: string;
}

export const ProjectCardImage = ({ image, alt }: Props) => {
  if (!image) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl bg-foreground-100">
        <Icon icon="slides" size={36} className="text-foreground-400" />
      </div>
    );
  }

  const { url } = image;

  return (
    <Image
      src={url}
      alt={alt || 'Project cover image'}
      removeWrapper
      className="pointer-events-none aspect-video w-full object-cover"
    />
  );
};
