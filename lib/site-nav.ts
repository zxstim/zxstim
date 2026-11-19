export interface TerminalLink {
  name: string;
  url: string;
  /** Right-hand text in a listing; defaults to the URL's host or path. */
  label?: string;
}

/**
 * Site-wide navigation. An item's position is its keyboard shortcut on every
 * page (1 = DeFi Vietnam … 7 = Ethereum; 0 is always the index), and the same
 * list feeds the home `ls ~/projects` listing and every status bar.
 */
export const siteLinks: TerminalLink[] = [
  { name: "DeFi Vietnam", url: "https://www.defi.vn" },
  { name: "ETH Vietnam", url: "https://www.eth.vn" },
  { name: "Works", url: "/works" },
  { name: "Labs", url: "/labs" },
  { name: "CV", url: "/cv" },
  { name: "Writing", url: "/writing" },
  { name: "Ethereum", url: "/ethereum" },
];

/** Social handles, listed in the home terminal (`cat socials.txt`). */
export const socialLinks: TerminalLink[] = [
  { name: "X", url: "https://x.com/zxstim", label: "@zxstim" },
  { name: "GitHub", url: "https://github.com/zxstim", label: "zxstim" },
  { name: "YouTube", url: "https://youtube.com/@zxstim", label: "@zxstim" },
  { name: "Telegram", url: "https://t.me/zxstimlabs", label: "zxstimlabs" },
];
