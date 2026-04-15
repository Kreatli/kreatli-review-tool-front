import { PLATFORM_PAGES } from '../../data/platform-pages';

import { DefinitionBlock } from './DefinitionBlock';

function displayTerm(label: string): string {
  return label.replace(/^The /, '');
}

interface PlatformDefinitionBlockProps {
  href: string;
}

/**
 * "What is X?" block for platform feature pages, backed by the platform registry
 * so copy stays aligned with navigation cards.
 */
export function PlatformDefinitionBlock({ href }: PlatformDefinitionBlockProps) {
  const page = PLATFORM_PAGES.find((p) => p.href === href);
  if (!page) return null;

  return (
    <DefinitionBlock term={displayTerm(page.label)}>
      {page.description} It is part of Kreatli&apos;s video collaboration and review platform for creative teams who
      need frame-accurate feedback, organized assets, and clear approvals in one workspace.
    </DefinitionBlock>
  );
}
