export type AmplitudeEvent =
  | 'create_project_click'
  | 'create_project_success'
  | 'create_project_failure'
  | 'upload_file_click'
  | 'upload_file_success'
  | 'upload_file_failure'
  | 'open_asset_view'
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
  | 'edit_project_overview_failure'
  | 'invite_member_click'
  | 'invite_member_success'
  | 'invite_member_failure'
  | 'account_signup_completed'
  | 'plans_modal_viewed'
  | 'trial_checkout_started'
  | 'trial_checkout_redirect'
  | 'trial_checkout_failed'
  | 'free_trial_started'
  | 'subscription_converted'
  | 'subscription_checkout_cancelled'
  | 'subscription_cancel_started'
  | 'subscription_cancel_feedback_submitted'
  | 'subscription_cancelled'
  | 'subscription_limit_hit'
  | 'explore_mode_banner_viewed'
  | 'signup_cta_clicked';

export interface AmplitudeEventProperties {
  set_file_status_click: {
    status: string;
  };
  account_signup_completed: {
    signup_method: string;
  };
  plans_modal_viewed: {
    entry: string;
  };
  trial_checkout_started: {
    plan_id: string;
    plan_price_usd?: number;
    plans_modal_entry: string;
  };
  trial_checkout_redirect: {
    plan_id: string;
    plan_price_usd?: number;
    plans_modal_entry: string;
  };
  trial_checkout_failed: {
    plan_id: string;
    plans_modal_entry: string;
    error_message?: string;
  };
  free_trial_started: {
    plan_key: string;
    plan_name: string;
    price_usd: number;
    plans_modal_entry: string;
    subscription_lifecycle: string;
  };
  subscription_converted: {
    plan_key: string;
    plan_name: string;
    price_usd: number;
    plans_modal_entry: string;
    conversion_source: 'checkout_success' | 'trial_ended';
    subscription_lifecycle: string;
  };
  subscription_checkout_cancelled: {
    plan_id: string;
    plans_modal_entry: string;
    plan_price_usd?: number;
  };
  subscription_cancel_started: {
    plan_key: string;
    plan_name: string;
    price_usd: number;
  };
  subscription_cancel_feedback_submitted: {
    plan_key: string;
    feedback_length: number;
  };
  subscription_cancelled: {
    plan_key: string;
    plan_name: string;
    price_usd: number;
  };
  subscription_limit_hit: {
    limit_type: 'uploads' | 'storage';
    surface: string;
    is_project_owner: boolean;
    subscription_lifecycle: string;
  };
  explore_mode_banner_viewed: {
    subscription_lifecycle: string;
    has_used_trial: boolean;
  };
  signup_cta_clicked: {
    location: string;
    label?: string;
  };
}
