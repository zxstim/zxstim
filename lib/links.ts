/** True for absolute http(s) URLs, which open in a new tab. */
export function isExternalUrl(url: string): boolean {
  return /^https?:\/\//.test(url);
}

/** Short, terminal-style label: "defi.vn" for external URLs, "works" for "/works". */
export function shortLinkLabel(url: string): string {
  if (isExternalUrl(url)) return new URL(url).hostname.replace(/^www\./, "");
  return url.replace(/^\//, "") || "~";
}
