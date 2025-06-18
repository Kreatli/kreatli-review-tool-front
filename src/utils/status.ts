export const STATUS_LABEL = {
  none: 'No status',
  'in-progress': 'In progress',
  'changes-required': 'Changes required',
  'review-needed': 'Review needed',
  approved: 'Approved',
} as Record<string, string>;

export const STATUS_COLOR = {
  none: 'default',
  'in-progress': 'primary',
  'changes-required': 'danger',
  'review-needed': 'warning',
  approved: 'success',
} as Record<string, 'default' | 'primary' | 'danger' | 'warning' | 'success'>;
