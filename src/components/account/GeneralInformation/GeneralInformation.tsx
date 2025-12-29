import { UserDto } from '../../../services/types';
import { GeneralInformationForm } from './GeneralInformationForm';

interface Props {
  user: UserDto;
}

export const GeneralInformation = ({ user }: Props) => {
  return (
    <div className="rounded-medium border-foreground-300 p-4 px-5 shadow-small dark:border">
      <div className="text-xl font-semibold">General information</div>
      <div className="text-foreground-500">Update your general information here.</div>
      <GeneralInformationForm user={user} />
    </div>
  );
};
