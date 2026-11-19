import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Ethereum Wiki", template: "%s | Ethereum Wiki" },
  description: "An open encyclopedia of Ethereum, explained plainly.",
};

/** Shared by the landing page (home) and the wiki pages (docs). */
export default function EthereumLayout({ children }: LayoutProps<"/ethereum">) {
  return children;
}
