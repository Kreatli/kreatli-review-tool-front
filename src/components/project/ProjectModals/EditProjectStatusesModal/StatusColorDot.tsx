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
        'relative w-3 h-3 outline-2 cursor-pointer outline-foreground-300 hover:outline-foreground-400 transition-all outline outline-offset-2 shrink-0 rounded-full z-10',
        'after:-inset-1 after:absolute',
        {
          'outline-focus': isSelected,
        },
      )}
      onClick={onClick}
    />
  );
};
