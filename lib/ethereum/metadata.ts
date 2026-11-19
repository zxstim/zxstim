import type { Metadata } from "next";

const DEFAULT_IMAGE = { url: "/zxstim-tbn.png", width: 1200, height: 630 };

/**
 * Complete social metadata for one wiki page. Next replaces (doesn't merge)
 * the `openGraph` and `twitter` objects a page returns, so the site-wide
 * fields (site name, locale, card type, image) are repeated for every page.
 * Relative URLs resolve against `metadataBase` in the root layout.
 */
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  section,
  tags,
}: {
  title: string;
  description?: string;
  /** canonical path, e.g. /ethereum/basics */
  path: string;
  type?: "website" | "article";
  section?: string;
  tags?: string[];
}): Metadata {
  const images = [{ ...DEFAULT_IMAGE, alt: title }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "ZxStim",
      locale: "en_US",
      images,
      ...(type === "article" ? { type: "article", section, tags } : { type: "website" }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@zxstim",
      images,
    },
  };
}
