import { forwardRef } from 'react';
// import '../../tiptap-ui-primitive/badge/badge-colors.scss';
// import '../../tiptap-ui-primitive/badge/badge-group.scss';
// import '../../tiptap-ui-primitive/badge/badge.scss';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'small';
  appearance?: 'default' | 'subdued' | 'emphasized';
  trimText?: boolean;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ size = 'default', appearance = 'default', trimText = false, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`tiptap-badge ${className || ''}`}
        data-size={size}
        data-appearance={appearance}
        data-text-trim={trimText ? 'on' : 'off'}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Badge.displayName = 'Badge';

export default Badge;
