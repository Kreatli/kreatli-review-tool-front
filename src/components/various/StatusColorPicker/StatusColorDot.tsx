import { cn } from '@heroui/react';

interface Props {
  color: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const StatusColorDot = ({ color, isSelected, onClick }: Props) => {
  return (
    <button
      type="button"
      aria-label={`Select ${color} color`}
      style={{ backgroundColor: color }}
      className={cn(
        'relative z-10 h-3 w-3 shrink-0 cursor-pointer rounded-full outline outline-2 outline-offset-2 outline-foreground-300 transition-all hover:outline-foreground-400',
        'after:absolute after:-inset-1',
        {
          'outline-focus': isSelected,
        },
      )}
      onClick={onClick}
    />
  );
};
