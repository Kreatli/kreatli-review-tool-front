import { Icon } from '../various/Icon';

interface DefinitionBlockProps {
  term: string;
  children: React.ReactNode;
}

function articleFor(term: string): 'an' | 'a' {
  return /^[aeiou]/i.test(term) ? 'an' : 'a';
}

/**
 * Branded "What is X?" definition block for tool and platform pages.
 * Uses the Kreatli primary-gradient icon style and card borders.
 */
export function DefinitionBlock({ term, children }: DefinitionBlockProps) {
  return (
    <section className="px-6 pb-10">
      <div className="mx-auto max-w-4xl rounded-2xl border border-foreground-200 bg-content1 p-6 shadow-sm sm:p-8">
        <div className="flex items-start gap-4">
          <div className="mt-0.5 flex-shrink-0 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 p-2.5">
            <Icon icon="info" size={20} className="text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="mb-2 font-sans text-lg font-bold sm:text-xl">
              What is {articleFor(term)} {term}?
            </h2>
            <p className="text-sm leading-relaxed text-foreground-500 sm:text-base">{children}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
