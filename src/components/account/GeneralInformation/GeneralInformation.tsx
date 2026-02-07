import { UserDto } from '../../../services/types';
import { GeneralInformationForm } from './GeneralInformationForm';

interface Props {
  user: UserDto;
}

export const GeneralInformation = ({ user }: Props) => {
  return (
    <div className="md:rounded-medium md:border-foreground-300 md:p-4 md:px-5 md:shadow-small md:dark:border">
      <div className="text-xl font-semibold">Account</div>
      <div className="text-foreground-500">Update your general information here.</div>
      <GeneralInformationForm user={user} />
    </div>
  );
};
