import { Icon, IconType } from '../various/Icon';

interface HubPageIntroProps {
  title: string;
  icon?: IconType;
  /** Shown above the title; use for section context (e.g. hub name). */
  eyebrow?: string;
  children: React.ReactNode;
  /** Optional secondary panel (e.g. quick links). Stacks below on small screens. */
  aside?: React.ReactNode;
}

/**
 * Editorial intro for marketing hub pages (free tools, platform, guides, etc.).
 * Matches DefinitionBlock / KeyTakeaways visual language so copy feels native, not bolted on.
 */
export function HubPageIntro({ title, icon = 'infoCircle', eyebrow, children, aside }: HubPageIntroProps) {
  return (
    <div className="w-full">
      <div className="rounded-2xl border border-foreground-200 bg-content1 p-6 shadow-sm sm:p-8">
        <div className={`flex flex-col gap-8 ${aside ? 'lg:flex-row lg:items-stretch lg:gap-10' : ''}`}>
          <div className="flex min-w-0 flex-1 items-start gap-4">
            <div className="mt-0.5 flex-shrink-0 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 p-2.5">
              <Icon icon={icon} size={22} className="text-primary" />
            </div>
            <div className="min-w-0 flex-1 space-y-3">
              {eyebrow && (
                <p className="text-xs font-semibold uppercase tracking-wide text-foreground-400">{eyebrow}</p>
              )}
              <h2 className="font-sans text-lg font-bold sm:text-xl">{title}</h2>
              <div className="space-y-3 text-sm leading-relaxed text-foreground-500 sm:text-base">{children}</div>
            </div>
          </div>
          {aside && (
            <div
              className="w-full shrink-0 rounded-xl border border-primary/15 bg-gradient-to-br from-primary/[0.06] to-transparent p-5 lg:max-w-xs xl:max-w-sm"
              aria-label="Quick links"
            >
              {aside}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
