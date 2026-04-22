/**
 * Decode HTML/XML character references (decimal &#64; / hex &#x410; / named &amp;).
 * Multiple passes so values like &amp;#064; resolve to @.
 */
export function decodeHtmlEntities(input: string): string {
  let out = input;
  for (let pass = 0; pass < 4; pass++) {
    const prev = out;
    out = out
      .replace(/&#x([\da-fA-F]{1,6});/gi, (_, hex: string) => {
        const cp = parseInt(hex, 16);
        if (!Number.isFinite(cp) || cp < 0 || cp > 0x10ffff) return _;
        try {
          return String.fromCodePoint(cp);
        } catch {
          return _;
        }
      })
      .replace(/&#(\d{1,7});/g, (_, dec: string) => {
        const cp = parseInt(dec, 10);
        if (!Number.isFinite(cp) || cp < 0 || cp > 0x10ffff) return _;
        try {
          return String.fromCodePoint(cp);
        } catch {
          return _;
        }
      })
      .replace(/&nbsp;/gi, ' ')
      .replace(/&apos;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
    if (out === prev) break;
  }
  return out;
}
