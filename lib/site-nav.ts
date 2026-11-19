export interface TerminalLink {
  name: string;
  url: string;
}

/**
 * Site-wide navigation. An item's position is its keyboard shortcut on every
 * page (1 = DeFi Vietnam … 6 = Writing; 0 is always the index), and the same
 * list feeds the home `ls ~/projects` listing and every status bar.
 */
export const siteLinks: TerminalLink[] = [
  { name: "DeFi Vietnam", url: "https://www.defi.vn" },
  { name: "ETH Vietnam", url: "https://www.eth.vn" },
  { name: "Works", url: "/works" },
  { name: "Labs", url: "/labs" },
  { name: "CV", url: "/cv" },
  { name: "Writing", url: "/writing" },
];
