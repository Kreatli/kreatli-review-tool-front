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
        'w-fit cursor-pointer rounded-md border-1 border-foreground-200 bg-foreground-50 p-2 outline outline-1 outline-transparent grayscale transition-all',
        {
          'border-foreground-300 outline-foreground-300 grayscale-0 dark:border-foreground-500 dark:outline-foreground-500':
            isSelected,
        },
      )}
    >
      <input
        className="absolute h-px w-px opacity-0"
        type="checkbox"
        checked={isSelected}
        aria-label={label}
        onChange={(e) => onSelectionChange(e.target.checked)}
      />
      <img
        src={src}
        alt={label}
        className={cn('opacity-75 transition-all dark:opacity-50 dark:grayscale dark:invert', {
          'opacity-100 dark:opacity-100 dark:brightness-50': isSelected,
        })}
        width="96"
        height="20"
      />
    </label>
  );
};
