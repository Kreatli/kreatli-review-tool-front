import { UserDto } from '../../../services/types';
import { GeneralInformationForm } from './GeneralInformationForm';

interface Props {
  user: UserDto;
}

export const GeneralInformation = ({ user }: Props) => {
  return (
    <div className="shadow-small rounded-medium dark:border border-foreground-300 px-5 p-4">
      <div className="text-xl font-semibold">General information</div>
      <div className="text-foreground-500">Update your general information here.</div>
      <GeneralInformationForm user={user} />
    </div>
  );
};
