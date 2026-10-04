/** Header and meta must agree with siteConfig.indexable. A hostname is not the signal. */

export function robotsHeaderProblem(indexable: boolean, header: string | undefined): string | null {
  const hasNoindex = /noindex/i.test(header ?? "");
  if (!indexable && !hasNoindex) return "siteConfig.indexable is false, but X-Robots-Tag does not send noindex.";
  if (indexable && hasNoindex) return "siteConfig.indexable is true, but X-Robots-Tag still sends noindex.";
  return null;
}

export function metaRobotsNoindex(html: string): boolean {
  return /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)
    || /<meta\b[^>]*content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["']/i.test(html);
}

/** Review builds need both signals. Live builds need neither. */
export function hostedIndexProblems(indexable: boolean, header: string, html: string): string[] {
  const headerNoindex = /noindex/i.test(header);
  const metaNoindex = metaRobotsNoindex(html);
  if (!indexable) {
    const problems: string[] = [];
    if (!headerNoindex) problems.push("Review build is missing noindex on X-Robots-Tag.");
    if (!metaNoindex) problems.push("Review build is missing noindex on the robots meta tag.");
    return problems;
  }
  const problems: string[] = [];
  if (headerNoindex) problems.push("Live build still sends noindex on X-Robots-Tag.");
  if (metaNoindex) problems.push("Live build still sends noindex on the robots meta tag.");
  return problems;
}
