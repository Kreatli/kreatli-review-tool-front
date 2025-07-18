import { UserDto } from '../services/types';

export const getCanAddAssets = (user: UserDto, files: File[]) => {
  const totalSize = files.reduce((acc, file) => acc + file.size, 0);

  if (user.subscription.limits.storage.used + totalSize > user.subscription.limits.storage.max) {
    return false;
  }

  return true;
};
