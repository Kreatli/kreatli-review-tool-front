//@ts-nocheck
/**
 * AUTO_GENERATED Do not change this file directly, use config.ts file instead
 *
 * @version 6
 */

export interface AddonBodyDto {
  count: number;
}

export interface AddonDto {
  count: number;
  id: string;
  price: number;
  type: string;
  value: number;
}

export interface AssetAfterDetails {
  assignee?: UserDetails;
  description?: string;
  name?: string;
  parent?: FolderDetails;
  status?: string;
  statusLabel?: string;
}

export interface AssetBeforeDetails {
  id: string;
  name: string;
  type: 'file' | 'folder';
  assignee?: UserDetails;
  parent?: FolderDetails;
  status?: string;
  statusLabel?: string;
}

export interface AssetCommentAddedLogDto {
  createdAt: string;
  details: FileCommentAddedDetails;
  id: string;
  type: 'ASSET_COMMENT_ADDED';
  user: UserDto;
}

export interface AssetCommentBodyDto {
  /**
   *
   * - maxLength: 1000
   */
  message: string;
  canvas?: AssetCommentCanvas;
  content?: { [x in string | number]: any };
  name?: string;
  parent?: string;
  shareableLinkId?: string;
  timestamp?: number[];
}

export interface AssetCommentCanvas {
  shapes: AssetCommentCanvasShape[];
}

export interface AssetCommentCanvasShape {
  color: 'white' | 'black' | 'red' | 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'cyan' | 'zinc';
  points: number[];
  type: 'line' | 'arrow';
}

export interface AssetCommentDownloadedLogDto {
  createdAt: string;
  details: AssetDownloadedDetails;
  id: string;
  type: 'ASSET_DOWNLOADED';
  user: UserDto;
}

export interface AssetCommentDto {
  /**
   *
   * - Format: date-time
   */
  createdAt: string;
  createdBy: PartialTypeClass;
  id: string;
  isResolved: boolean;
  message: string;
  replies: AssetCommentDto[];
  canvas?: AssetCommentCanvas;
  content?: { [x in string | number]: any };
  parent?: string;
  timestamp?: number[];
}

export interface AssetCommentEditDto {
  isResolved: boolean;
}

export interface AssetCommentResolvedLogDto {
  createdAt: string;
  details: FileCommentResolvedDetails;
  id: string;
  type: 'ASSET_COMMENT_RESOLVED';
  user: UserDto;
}

export interface AssetCommentsResponse {
  comments: AssetCommentDto[];
}

export interface AssetDetails {
  id: string;
  name: string;
  type: 'file' | 'folder';
}

export interface AssetDownloadedDetails {
  asset: AssetDetails;
}

export interface AssetDto {
  description: string;
  fileSize: number;
  fileType: string;
  format: string;
  id: string;
  metadata: { [x in string | number]: any };
  name: string;
  url: string;
  assignee?: UserDto;
  status?: string;
  statusColor?: string;
  statusLabel?: string;
}

export interface AssetMoveBodyDto {
  assetIds: string[];
  fromId?: string;
  toId?: string;
}

export interface AssetNewVersionUploadedLogDto {
  createdAt: string;
  details: FileNewVersionUploadedDetails;
  id: string;
  type: 'ASSET_NEW_VERSION_UPLOADED';
  user: UserDto;
}

export interface AssetRemoveBodyDto {
  assetIds: string[];
}

export interface AssetStatusDto {
  color: string;
  label: string;
  value: string;
}

export interface AssetUpdatedDetails {
  asset: AssetBeforeDetails;
  updatedFields: AssetAfterDetails;
}

export interface AssetUpdatedLogDto {
  createdAt: string;
  details: AssetUpdatedDetails;
  id: string;
  type: 'ASSET_UPDATED';
  user: UserDto;
}

export interface AssetUploadedLogDto {
  createdAt: string;
  details: FileUploadedDetails;
  id: string;
  type: 'ASSET_UPLOADED';
  user: UserDto;
}

export interface AssetsArchivedDetails {
  assets: AssetDetails[];
}

export interface AssetsArchivedLogDto {
  createdAt: string;
  details: AssetsArchivedDetails;
  id: string;
  type: 'ASSETS_ARCHIVED';
  user: UserDto;
}

export interface AssetsDownloadedDetails {
  assets: AssetDetails[];
}

export interface AssetsDownloadedLogDto {
  createdAt: string;
  details: AssetsDownloadedDetails;
  id: string;
  type: 'ASSETS_DOWNLOADED';
  user: UserDto;
}

export interface AssetsDto {
  fileCount: number;
  files: AssetDto[];
}

export interface AssetsMovedDetails {
  assets: AssetDetails[];
  from?: FolderDetails;
  to?: FolderDetails;
}

export interface AssetsMovedLogDto {
  createdAt: string;
  details: AssetsMovedDetails;
  id: string;
  type: 'ASSETS_MOVED';
  user: UserDto;
}

export interface AssetsRemovedDetails {
  assets: AssetDetails[];
}

export interface AssetsRemovedLogDto {
  createdAt: string;
  details: AssetsRemovedDetails;
  id: string;
  type: 'ASSETS_REMOVED';
  user: UserDto;
}

export interface AssetsRestoredDetails {
  assets: AssetDetails[];
}

export interface AssetsRestoredLogDto {
  createdAt: string;
  details: AssetsRestoredDetails;
  id: string;
  type: 'ASSETS_RESTORED';
  user: UserDto;
}

export interface AssetsUploadedLogDto {
  createdAt: string;
  details: FilesUploadedDetails;
  id: string;
  type: 'ASSETS_UPLOADED';
  user: UserDto;
}

export interface Blob {
  [(x in string) | number]: any;
}

export interface ChatBodyDto {
  members: string[];
  name?: string;
}

export interface ChatDto {
  createdAt: string;
  id: string;
  members: UserDto[];
  name: string;
  pinnedMessages: ChatMessageDto[];
  type: 'project' | 'private';
  cover?: InterfaceImageDto;
  createdBy?: UserDto;
  lastMessage?: ChatMessageDto;
  updatedAt?: string;
  updatedBy?: UserDto;
}

export interface ChatEditBodyDto {
  name: string;
}

export interface ChatMessageDto {
  assets: AssetDto[];
  content: string;
  createdAt: string;
  id: string;
  isPinned: boolean;
  readBy: string[];
  sender: UserDto;
}

export interface ChatMessagesDto {
  messages: ChatMessageDto[];
  messagesCount: number;
}

export interface CommentDetails {
  id: string;
}

export interface CreateShareableLinkDto {
  assetId: string;
  id: string;
}

export interface FileCommentAddedDetails {
  asset: FileDetails;
  comment: CommentDetails;
}

export interface FileCommentResolvedDetails {
  asset: FileDetails;
  comment: CommentDetails;
}

export interface FileDetails {
  id: string;
  name: string;
}

export interface FileDto {
  commentsCount: number;
  createdAt: string;
  description: string;
  fileSize: number;
  fileType: string;
  format: string;
  id: string;
  metadata: { [x in string | number]: any };
  name: string;
  path: FolderDto[];
  type: 'file';
  url: string;
  assignee?: UserDto;
  createdBy?: UserDto;
  parent?: FolderDto;
  status?: string;
  statusColor?: string;
  statusLabel?: string;
}

export interface FileEditBodyDto {
  assigneeId?: string;
  description?: string;
  name?: string;
  parentId?: string;
  status?: string;
}

export interface FileNewVersionUploadedDetails {
  asset: FileDetails;
}

export interface FileUploadedDetails {
  asset: FileDetails;
}

export interface FilesUploadedDetails {
  assets: FileDetails[];
}

export interface FolderBodyDto {
  name: string;
  parentId?: string;
}

export interface FolderCreatedDetails {
  folder: FolderDetails;
}

export interface FolderCreatedLogDto {
  createdAt: string;
  details: FolderCreatedDetails;
  id: string;
  type: 'FOLDER_CREATED';
  user: UserDto;
}

export interface FolderDetails {
  id: string;
  name: string;
}

export interface FolderDto {
  /**
   *
   * An array of assets which can be folders or files.
   */
  children: (ProjectFolderDto | ProjectFileDto)[];
  createdAt: string;
  description: string;
  fileCount: number;
  id: string;
  name: string;
  path: FolderDto[];
  totalFileSize: number;
  createdBy?: UserDto;
  parent?: FolderDto;
}

export interface FolderEditBodyDto {
  children?: string[];
  description?: string;
  name?: string;
  parentId?: string;
}

export interface FoldersDto {
  folders: FolderDto[];
  foldersCount: number;
}

export interface GetAssetFileIdCommentsQueryParams {
  shareableLinkId: string;
}

export interface GetAssetFileIdDownloadQueryParams {
  shareableLinkId: string;
}

export interface GetAssetsFoldersQueryParams {
  limit: number;
  offset: number;
  projectId: string;
  query: string;
  skipIds: string[];
}

export interface GetAssetsQueryParams {
  limit: number;
  offset: number;
  projectId: string;
  query: string;
  skipIds: string[];
}

export interface GetConversationIdMessagesQueryParams {
  limit: number;
  offset: number;
  search: string;
}

export interface GetNotificationsQueryParams {
  limit: number;
  offset: number;
}

export interface GetProjectIdLogsQueryParams {
  createAtFrom?: string;
  createAtTo?: string;
  limit?: number;
  offset?: number;
  userIds?: string;
}

export interface GetProjectsQueryParams {
  search?: string;
  status?: 'all' | 'active' | 'completed' | 'archived';
}

export interface InterfaceImageDto {
  createdAt: string;
  description: string;
  fileSize: number;
  height: number;
  originalFileName: string;
  url: string;
  width: number;
}

export interface InvoiceDto {
  amount: number;
  createdAt: string;
  lines: InvoiceLineDto[];
  description?: string;
  id?: string;
  invoicePdf?: string;
  status?: string;
}

export interface InvoiceLineDto {
  amount: number;
  id: string;
  quantity: number;
  description?: string;
  price?: number;
}

export interface Limit {
  max: number;
  used: number;
}

export interface LimitsDto {
  projectsCount: Limit;
  storage: Limit;
  usersCount: Limit;
}

export interface MarkAsReadBodyDto {
  /**
   *
   * Whether the notification is read
   */
  isRead: boolean;
}

export interface MemberDetails {
  email: string;
}

export interface MultipartPresignedUrlBodyDto {
  key: string;
  partNumber: number;
  uploadId: string;
}

export interface MultipartPresignedUrlDto {
  url: string;
}

export interface MultipartUploadCompleteBodyDto {
  key: string;
  parts: array;
  uploadId: string;
}

export interface MultipartUploadCompleteDto {
  url: string;
}

export interface MultipartUploadStartBodyDto {
  contentType: string;
  fileName: string;
  projectId: string;
}

export interface MultipartUploadStartDto {
  fileId: string;
  key: string;
  uploadId: string;
}

export interface NewPasswordBodyDto {
  password: string;
  token: string;
}

export interface NotificationData {
  chatId?: string;
  chatName?: string;
  commentId?: string;
  commentMessage?: string;
  fileId?: string;
  fileName?: string;
  projectId?: string;
  projectName?: string;
  userId?: string;
  userName?: string;
}

export interface NotificationDto {
  /**
   *
   * - Format: date-time
   */
  createdAt: string;
  data: NotificationData;
  id: string;
  isRead: boolean;
  type:
    | 'project_member_removed'
    | 'project_member_left'
    | 'project_member_joined'
    | 'file_status_changed'
    | 'file_assigned'
    | 'file_comment_added'
    | 'file_comment_reply'
    | 'file_comment_resolve'
    | 'file_comment_mention'
    | 'chat_message_unread';
  /**
   *
   * - Format: date-time
   */
  updatedAt: string;
  userId: string;
}

export interface NotificationsDto {
  notifications: NotificationDto[];
  total: number;
  unreadCount: number;
}

export interface PartialTypeClass {
  avatar?: InterfaceImageDto;
  email?: string;
  id?: string;
  name?: string;
  subscription?: SubscriptionDto;
}

export interface PresignedUrlBodyDto {
  contentType: string;
  fileName: string;
  projectId: string;
}

export interface PresignedUrlDto {
  fileId: string;
  key: string;
  url: string;
}

export interface ProjectArchivedAssetsDto {
  /**
   *
   * An array of assets which can be folders or files.
   */
  assets: (ProjectFolderDto | ProjectFileDto)[];
  /**
   *
   * An array of files.
   */
  files: ProjectFileDto[];
  /**
   *
   * An array of folders.
   */
  folders: ProjectFolderDto[];
}

export interface ProjectAssetEditDto {
  project: ProjectDto;
  file?: ProjectFileDto;
  folder?: FolderDto;
  parent?: FolderDto;
}

export interface ProjectAssetsResponseDto {
  /**
   *
   * An array of assets which can be folders or files.
   */
  assets: (ProjectFolderDto | ProjectFileDto)[];
  /**
   *
   * An array of files.
   */
  files: ProjectFileDto[];
  /**
   *
   * An array of folders.
   */
  folders: ProjectFolderDto[];
}

export interface ProjectBodyDto {
  description: string;
  name: string;
  members?: string[];
}

export interface ProjectCoverDto {
  /**
   *
   * - Format: binary
   */
  cover?: Blob;
}

export interface ProjectCreatedLogDto {
  createdAt: string;
  details: { [x in string | number]: any };
  id: string;
  type: 'PROJECT_CREATED';
  user: UserDto;
}

export interface ProjectDto {
  assetStatuses: AssetStatusDto[];
  /**
   *
   * An array of assets which can be folders or files.
   */
  assets: (ProjectFolderDto | ProjectFileDto)[];
  content: { [x in string | number]: any };
  createdAt: string;
  description: string;
  fileCount: number;
  id: string;
  members: ProjectMemberDto[];
  name: string;
  status: 'active' | 'completed' | 'archived';
  totalFileSize: number;
  cover?: InterfaceImageDto;
  createdBy?: UserDto;
  updatedAt?: string;
  updatedBy?: UserDto;
}

export interface ProjectEditBodyDto {
  assetStatuses?: AssetStatusDto[];
  assets?: string[];
  content?: { [x in string | number]: any };
  description?: string;
  name?: string;
}

export interface ProjectFileBodyDto {
  contentType: string;
  fileId: string;
  fileOriginalName: string;
  fileSize: number;
  key: string;
  parentId?: string;
}

export interface ProjectFileDto {
  commentsCount: number;
  createdAt: string;
  description: string;
  fileSize: number;
  fileType: string;
  format: string;
  id: string;
  metadata: { [x in string | number]: any };
  name: string;
  type: 'file';
  url: string;
  assignee?: UserDto;
  createdBy?: UserDto;
  parentId?: string;
  status?: string;
  statusColor?: string;
  statusLabel?: string;
}

export interface ProjectFolderChild {
  description: string;
  id: string;
  name: string;
  type: 'folder' | 'file';
  url?: string;
}

export interface ProjectFolderDto {
  children: ProjectFolderChild[];
  createdAt: string;
  description: string;
  fileCount: number;
  id: string;
  name: string;
  totalFileSize: number;
  type: 'folder';
  createdBy?: UserDto;
  parentId?: string;
}

export interface ProjectInvitationDto {
  email: string;
  hasAccount: boolean;
  projectId: string;
  projectName: string;
  projectCover?: InterfaceImageDto;
}

export interface ProjectLogsDto {
  /**
   *
   * An array of assets which can be folders or files.
   */
  logs: (
    | AssetCommentAddedLogDto
    | AssetCommentResolvedLogDto
    | AssetCommentDownloadedLogDto
    | AssetNewVersionUploadedLogDto
    | AssetsArchivedLogDto
    | AssetsDownloadedLogDto
    | AssetsMovedLogDto
    | AssetsRemovedLogDto
    | AssetsRestoredLogDto
    | AssetsUploadedLogDto
    | AssetUpdatedLogDto
    | AssetUploadedLogDto
    | FolderCreatedLogDto
    | ProjectCreatedLogDto
    | ProjectMemberInvitedLogDto
    | ProjectMemberJoinedLogDto
    | ProjectMemberLeftLogDto
    | ProjectMemberRemovedLogDto
    | ProjectRemovedLogDto
    | ProjectUpdatedLogDto
  )[];
  logsCount: number;
}

export interface ProjectMemberBodyDto {
  email: string;
  role: 'owner' | 'contributor';
}

export interface ProjectMemberDto {
  email: string;
  id: string;
  invitedAt: string;
  role: 'owner' | 'contributor';
  status: 'invited' | 'joined' | 'removed' | 'left';
  user?: UserDto;
}

export interface ProjectMemberInvitedDetails {
  user: MemberDetails;
}

export interface ProjectMemberInvitedLogDto {
  createdAt: string;
  details: ProjectMemberInvitedDetails;
  id: string;
  type: 'PROJECT_MEMBER_INVITED';
  user: UserDto;
}

export interface ProjectMemberJoinedDetails {
  user: UserDetails;
}

export interface ProjectMemberJoinedLogDto {
  createdAt: string;
  details: ProjectMemberJoinedDetails;
  id: string;
  type: 'PROJECT_MEMBER_JOINED';
  user: UserDto;
}

export interface ProjectMemberLeftLogDto {
  createdAt: string;
  details: { [x in string | number]: any };
  id: string;
  type: 'PROJECT_MEMBER_LEFT';
  user: UserDto;
}

export interface ProjectMemberRemovedDetails {
  user: UserDetails;
}

export interface ProjectMemberRemovedLogDto {
  createdAt: string;
  details: ProjectMemberRemovedDetails;
  id: string;
  type: 'PROJECT_MEMBER_REMOVED';
  user: UserDto;
}

export interface ProjectPathDto {
  id: string;
  name: string;
  path: ProjectPathFolderDto[];
}

export interface ProjectPathFolderDto {
  id: string;
  name: string;
}

export interface ProjectRemovedLogDto {
  createdAt: string;
  details: { [x in string | number]: any };
  id: string;
  type: 'PROJECT_REMOVED';
  user: UserDto;
}

export interface ProjectStatusBodyDto {
  status: 'active' | 'completed' | 'archived';
}

export interface ProjectTotals {
  active: number;
  all: number;
  archived: number;
  completed: number;
}

export interface ProjectUpdatedDetails {
  description?: string;
  isAssetStatusesChanged?: boolean;
  isAssetsOrderChanged?: boolean;
  isContentChanged?: boolean;
  isCoverChanged?: boolean;
  name?: string;
  status?: 'active' | 'completed' | 'archived';
}

export interface ProjectUpdatedLogDto {
  createdAt: string;
  details: ProjectUpdatedDetails;
  id: string;
  type: 'PROJECT_UPDATED';
  user: UserDto;
}

export interface ProjectsResponseDto {
  projects: ProjectDto[];
  totals: ProjectTotals;
}

export interface ResetPasswordBodyDto {
  email: string;
}

export interface ShareableAssetDto {
  commentsCount: number;
  createdAt: string;
  description: string;
  fileSize: number;
  fileType: string;
  format: string;
  id: string;
  metadata: { [x in string | number]: any };
  name: string;
  path: array;
  type: 'file';
  url: string;
}

export interface ShareableLinkBody {
  assetId: string;
}

export interface ShareableLinkDto {
  file: ShareableAssetDto;
  hasAccessToProject: boolean;
  projectId?: string;
}

export interface ShareableLinkSendEmailBodyDto {
  emails: string[];
  url: string;
}

export interface SignInBodyDto {
  email: string;
  password: string;
}

export interface SignInResultDto {
  token: string;
  user: UserDto;
}

export interface SignUpBodyDto {
  email: string;
  name: string;
  password: string;
}

export interface SignUpResultDto {
  user: UserDto;
}

export interface SignUpWithTokenBodyDto {
  name: string;
  password: string;
  token: string;
}

export interface SubscriptionBodyDto {
  plan: 'free' | 'pro' | 'advanced';
}

export interface SubscriptionDto {
  addons: AddonDto[];
  limits: LimitsDto;
  plan: 'free' | 'pro' | 'advanced';
  planName: string;
  price: number;
}

export interface SubscriptionResponseDto {
  url: string;
}

export interface TokenBodyDto {
  token: string;
}

export interface UpdateProjectMemberDto {
  token: string;
}

export interface UpdateUserDto {
  /**
   *
   * - Format: binary
   */
  avatar?: Blob;
  name?: string;
}

export interface UserDetails {
  id: string;
  name: string;
}

export interface UserDto {
  email: string;
  id: string;
  name: string;
  subscription: SubscriptionDto;
  avatar?: InterfaceImageDto;
}
