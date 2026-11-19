import { createSearchAPI } from "fumadocs-core/search/server";
import type { StructuredData } from "fumadocs-core/mdx-plugins/remark-structure";
import { ethereum, source } from "@/lib/source";

/**
 * Ethereum wiki text left out of the index because it only repeats other
 * pages and then outranks them: link lists ("Read next", "Sources",
 * "Reading order") and the lesson tables on group intro pages (index.mdx).
 */
const SKIP_SECTIONS = new Set([
  "read-next",
  "sources",
  "reading-order",
  "sources-for-this-section",
]);
const isTable = (text: string) => text.trimStart().startsWith("|");

function trimWikiIndex(data: StructuredData, isIntro: boolean): StructuredData {
  return {
    ...data,
    headings: data.headings.filter((h) => !SKIP_SECTIONS.has(h.id)),
    contents: data.contents.filter(
      (c) => !(c.heading && SKIP_SECTIONS.has(c.heading)) && !(isIntro && isTable(c.content)),
    ),
  };
}

export const { GET } = createSearchAPI("advanced", {
  language: "english",
  indexes: () => [
    ...source.getPages().map((page) => ({
      id: page.url,
      url: page.url,
      title: page.data.title,
      description: page.data.description,
      structuredData: page.data.structuredData,
      tag: "docs",
    })),
    ...ethereum.getPages().map((page) => ({
      id: page.url,
      url: page.url,
      title: page.data.title,
      description: page.data.description,
      structuredData: trimWikiIndex(page.data.structuredData, page.path.endsWith("index.mdx")),
      tag: "ethereum",
    })),
  ],
});
