import { UserDto } from '../services/types';

export const getCanAddAssets = (user: UserDto, files: File[]) => {
  const totalSize = files.reduce((acc, file) => acc + file.size, 0);

  if (user.subscription.limits.storage.used + totalSize > user.subscription.limits.storage.max) {
    return false;
  }

  return true;
};

export const getIsValidSize = (user: UserDto, files: File[]) => {
  if (user.subscription.plan === 'free') {
    return !files.some((file) => file.size > 1024 * 1024 * 1024 * 1); // 1GB
  }

  return !files.some((file) => file.size > 1024 * 1024 * 1024 * 10); // 10GB
};
