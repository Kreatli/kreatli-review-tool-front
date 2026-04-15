import { TrustBar } from './TrustBar';

interface SolutionBelowHeroProps {
  children: React.ReactNode;
}

/**
 * Trust signals + contextual copy after solution page heroes (industry & use-case).
 */
export function SolutionBelowHero({ children }: SolutionBelowHeroProps) {
  return (
    <>
      <TrustBar />
      <section className="px-6 pb-6 pt-2" aria-label="Trust and related resources">
        <div className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-foreground-600 sm:text-base">
          {children}
        </div>
      </section>
    </>
  );
}
