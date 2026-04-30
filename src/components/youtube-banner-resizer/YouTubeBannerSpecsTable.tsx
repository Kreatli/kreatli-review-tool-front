import NextLink from 'next/link';

import { YOUTUBE_CHANNEL_BANNER_SPECS } from './youtubeChannelBannerSpecs';

type Props = {
  /** When set, show a CTA under the table */
  toolHref?: string;
  toolLabel?: string;
  className?: string;
  /** Set false when a parent section already provides the H2 */
  showHeading?: boolean;
};

const rowClass = 'border-b border-foreground-200 last:border-b-0';

export function YouTubeBannerSpecsTable({ toolHref, toolLabel, className = '', showHeading = true }: Props) {
  const rows: { label: string; value: string }[] = [
    { label: 'Recommended size', value: YOUTUBE_CHANNEL_BANNER_SPECS.recommendedSize },
    { label: 'Safe zone (text & logos)', value: YOUTUBE_CHANNEL_BANNER_SPECS.safeZone },
    { label: 'Minimum size', value: YOUTUBE_CHANNEL_BANNER_SPECS.minimumSize },
    { label: 'Max file size', value: YOUTUBE_CHANNEL_BANNER_SPECS.maxFileSize },
    { label: 'Accepted formats', value: YOUTUBE_CHANNEL_BANNER_SPECS.formats },
  ];

  return (
    <div className={className}>
      {showHeading ? (
        <h2 className="mb-4 font-sans text-xl font-bold sm:text-2xl">YouTube channel banner dimensions (2026)</h2>
      ) : null}
      <p className="mb-4 text-sm text-foreground-500">
        Use these specs when designing channel art. Always confirm current requirements in YouTube Studio before
        publishing.
      </p>
      <div className="overflow-hidden rounded-xl border border-foreground-200 bg-content1/30">
        <table className="w-full text-left text-sm">
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className={rowClass}>
                <th scope="row" className="w-[40%] px-4 py-3 font-semibold text-foreground-700 sm:w-[36%]">
                  {row.label}
                </th>
                <td className="px-4 py-3 text-foreground-600">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {toolHref ? (
        <p className="mt-4 text-sm">
          <NextLink href={toolHref} className="font-medium text-primary underline underline-offset-2">
            {toolLabel ?? 'Open the free YouTube banner resizer'}
          </NextLink>{' '}
          to preview safe zones on desktop, mobile, tablet, and TV.
        </p>
      ) : null}
    </div>
  );
}
