import { useProjectUploadContext } from '../../../contexts/Project/ProjectUploadContext';

export const AssetPanelInput = () => {
  const { getInputProps } = useProjectUploadContext();

  return <input {...getInputProps()} />;
};
