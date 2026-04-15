import { Icon } from '../various/Icon';

interface KeyTakeawaysProps {
  items: string[];
}

/**
 * Branded "Key takeaways" summary block for guides, blog posts, and comparison articles.
 * Placed after the intro and before the first H2 to give AI engines an extractable summary.
 */
export function KeyTakeaways({ items }: KeyTakeawaysProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="my-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.04] to-transparent p-6 sm:p-8">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex-shrink-0 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 p-2">
          <Icon icon="checkCircle" size={18} className="text-primary" />
        </div>
        <p className="font-sans text-base font-bold">Key takeaways</p>
      </div>
      <ul className="space-y-2.5 pl-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-foreground-600 sm:text-base">
            <span className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
