export type AmplitudeEvent =
  | 'create_project_click'
  | 'create_project_success'
  | 'create_project_failure'
  | 'upload_file_click'
  | 'upload_file_success'
  | 'upload_file_failure'
  | 'create_folder_click'
  | 'create_folder_success'
  | 'create_folder_failure'
  | 'use_comment_drawings'
  | 'leave_comment_click'
  | 'leave_comment_success'
  | 'leave_comment_failure'
  | 'assign_member_click'
  | 'assign_member_success'
  | 'assign_member_failure'
  | 'set_file_status_click'
  | 'set_file_status_success'
  | 'set_file_status_failure'
  | 'compare_files_click'
  | 'check_safe_zones_click'
  | 'edit_project_overview_click'
  | 'edit_project_overview_save'
  | 'edit_project_overview_success'
  | 'edit_project_overview_failure';

export interface AmplitudeEventProperties {
  set_file_status_click: {
    status: string;
  };
}
