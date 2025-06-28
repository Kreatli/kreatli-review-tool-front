import { FileDto } from '../../../../services/types';

interface Props {
  audioFile: FileDto;
}

export const ReviewToolAudio = ({ audioFile }: Props) => {
  return (
    <div>
      <audio src={audioFile.url} controls />
    </div>
  );
};
