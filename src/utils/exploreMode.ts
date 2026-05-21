import { ProjectAssetsResponseDto, ProjectFileDto, ProjectStackDto, UserDto } from '../services/types';

export type ExploreModeAssetCounts = {
  video: number;
  image: number;
};

export type ExploreModeUploadBlockReason = 'new_version' | 'asset_limit';

/**
 * Full platform access: active paid subscription, in-trial, or AppSumo.
 * API sets `isActive` for all of these; `isTrial` is an extra guard for in-trial users.
 */
export const hasFullPlatformAccess = (user: UserDto | null | undefined): boolean =>
  !!user && (user.subscription.isActive || user.subscription.isTrial);

/** Pre-trial or expired-trial users without an active subscription. */
export const isExploreMode = (user: UserDto | null | undefined): boolean =>
  !!user && !hasFullPlatformAccess(user);

/** Opens the plans modal and returns true when the action should not proceed. */
export const blockIfExploreMode = (
  user: UserDto | null | undefined,
  openPlansModal: (entry: string) => void,
  entry: string,
): boolean => {
  if (hasFullPlatformAccess(user)) {
    return false;
  }

  openPlansModal(entry);

  return true;
};

/**
 * Within a project, an invited user has full access when the project owner has an active plan or trial.
 * Always grants access if the session user themselves has full platform access.
 */
export const hasProjectAccess = (
  user: UserDto | null | undefined,
  projectOwner: UserDto | null | undefined,
): boolean => hasFullPlatformAccess(user) || hasFullPlatformAccess(projectOwner);

/**
 * Project-aware gate: opens the plans modal and returns true when the action should not proceed,
 * deferring to the project owner's subscription for invited users.
 */
export const blockIfNoProjectAccess = (
  user: UserDto | null | undefined,
  projectOwner: UserDto | null | undefined,
  openPlansModal: (entry: string) => void,
  entry: string,
): boolean => {
  if (hasProjectAccess(user, projectOwner)) {
    return false;
  }

  openPlansModal(entry);

  return true;
};

export const getExploreModeAssetFileType = (asset: ProjectFileDto | ProjectStackDto): string | undefined => {
  if (asset.type === 'stack') {
    return asset.active?.fileType ?? asset.files[0]?.fileType;
  }

  return asset.fileType;
};

export const countExploreModeAssets = (assets: (ProjectFileDto | ProjectStackDto)[]): ExploreModeAssetCounts => {
  let video = 0;
  let image = 0;

  for (const asset of assets) {
    const fileType = getExploreModeAssetFileType(asset);

    if (fileType?.startsWith('video')) {
      video++;
    } else if (fileType?.startsWith('image')) {
      image++;
    }
  }

  return { video, image };
};

export const countIncomingExploreModeFiles = (files: File[]): ExploreModeAssetCounts => ({
  video: files.filter((file) => file.type.startsWith('video')).length,
  image: files.filter((file) => file.type.startsWith('image')).length,
});

export const collectProjectAssetsFromResponse = (
  response: ProjectAssetsResponseDto | undefined,
): (ProjectFileDto | ProjectStackDto)[] => response?.files ?? [];

export const mergeExploreModeAssets = (
  assetsLists: (ProjectFileDto | ProjectStackDto)[][],
): (ProjectFileDto | ProjectStackDto)[] => {
  const byId = new Map<string, ProjectFileDto | ProjectStackDto>();

  for (const assets of assetsLists) {
    for (const asset of assets) {
      byId.set(asset.id, asset);
    }
  }

  return Array.from(byId.values());
};

export const getExploreModeUploadBlockReason = ({
  isExploreModeUser,
  isNewVersionUpload,
  existing,
  incoming,
}: {
  isExploreModeUser: boolean;
  isNewVersionUpload: boolean;
  existing: ExploreModeAssetCounts;
  incoming: ExploreModeAssetCounts;
}): ExploreModeUploadBlockReason | null => {
  if (!isExploreModeUser) {
    return null;
  }

  if (isNewVersionUpload) {
    return 'new_version';
  }

  const existingTotal = existing.video + existing.image;
  const incomingTotal = incoming.video + incoming.image;

  if (existingTotal + incomingTotal > 2) {
    return 'asset_limit';
  }

  return null;
};
