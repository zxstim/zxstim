import type { Metadata } from "next";

// Drafts are reachable by URL but should not show up in search engines.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DraftLayout({ children }: LayoutProps<"/writing/draft">) {
  return children;
}
