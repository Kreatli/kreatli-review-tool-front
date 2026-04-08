import { BreadcrumbItem, Breadcrumbs, ScrollShadow } from '@heroui/react';
import Link from 'next/link';
import { ReactNode } from 'react';

import { formatDate } from '../../utils/dates';
import { TableOfContent } from '../blog/TableOfContent/TableOfContent';
import { Header } from '../layout/Header';
import { Decorations } from '../layout/Storyblok/Decorations';
import { SeoHead } from '../shared/SeoHead';
import { Icon } from '../various/Icon';

export interface GuideTocLink {
  label: string;
  url: string;
}

interface Props {
  /** Shown in <title> after "Kreatli | " */
  documentTitle: string;
  metaDescription: string;
  canonicalPath: string;
  ogImageUrl?: string;
  ogImageAlt?: string;
  publishDate: string;
  readTimeMinutes: string;
  breadcrumbLabel: string;
  tocLinks: GuideTocLink[];
  children: ReactNode;
}

export function GuidePageLayout({
  documentTitle,
  metaDescription,
  canonicalPath,
  ogImageUrl,
  ogImageAlt,
  publishDate,
  readTimeMinutes,
  breadcrumbLabel,
  tocLinks,
  children,
}: Props) {
  const title = `Kreatli | ${documentTitle}`;

  return (
    <>
      <SeoHead
        title={title}
        description={metaDescription}
        canonicalPath={canonicalPath}
        ogType="article"
        imageUrl={ogImageUrl}
        imageAlt={ogImageAlt ?? documentTitle}
      />
      <Header />
      <Decorations />
      <div className="backdrop-blur-lg">
        <div className="mx-auto grid w-full max-w-7xl items-start px-6 py-8 md:grid-cols-[175px,1fr] lg:grid-cols-[200px,1fr] xl:grid-cols-[200px,1fr,200px]">
          <ScrollShadow className="sticky top-24 hidden h-[calc(100vh-8rem)] md:block" hideScrollBar>
            <TableOfContent links={tocLinks} />
          </ScrollShadow>
          <div className="w-full overflow-hidden md:pl-8 md:pr-2 lg:pl-16 lg:pr-14">
            <Breadcrumbs className="mb-4">
              <BreadcrumbItem>
                <Link href="/">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link href="/guides">Guides</Link>
              </BreadcrumbItem>
              <BreadcrumbItem classNames={{ base: 'overflow-hidden', item: 'truncate block' }}>
                {breadcrumbLabel}
              </BreadcrumbItem>
            </Breadcrumbs>
            <div className="flex items-center gap-3">
              <div className="mb-1 flex items-center gap-1 font-medium text-primary">
                <Icon icon="calendar" size={18} />
                {formatDate(publishDate)}
              </div>
              <div className="mb-1 flex items-center gap-1 font-medium text-foreground-500">
                <Icon icon="time" size={18} />
                {readTimeMinutes} minutes read
              </div>
            </div>
            <div className="flex w-full flex-col gap-8">{children}</div>
          </div>
          <div />
        </div>
      </div>
    </>
  );
}
