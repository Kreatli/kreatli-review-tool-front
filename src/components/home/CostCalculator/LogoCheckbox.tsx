import { cn } from '@heroui/react';

interface Props {
  src: string;
  label: string;
  isSelected: boolean;
  onSelectionChange: (isSelected: boolean) => void;
}

export const LogoCheckbox = ({ src, isSelected, label, onSelectionChange }: Props) => {
  return (
    <label
      className={cn(
        'bg-foreground-50 outline outline-1 outline-transparent rounded-md w-fit transition-all p-2 border-1 cursor-pointer border-foreground-200 grayscale',
        {
          'outline-foreground-300 border-foreground-300 dark:outline-foreground-500 dark:border-foreground-500 grayscale-0':
            isSelected,
        },
      )}
    >
      <input
        className="opacity-0 w-px h-px absolute"
        type="checkbox"
        checked={isSelected}
        aria-label={label}
        onChange={(e) => onSelectionChange(e.target.checked)}
      />
      <img
        src={src}
        className={cn('dark:invert dark:grayscale dark:opacity-50 opacity-75 transition-all', {
          'opacity-100 dark:opacity-100 dark:brightness-50': isSelected,
        })}
        width="96"
        height="20"
      />
    </label>
  );
};
