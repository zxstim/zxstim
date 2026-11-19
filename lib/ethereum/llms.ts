import { createGetUrl, llms } from "fumadocs-core/source";
import { ethereum } from "@/lib/source";

/** Public origin; Markdown copies are read away from the site, so links must be absolute. */
export const siteUrl = "https://www.zxstim.com";
export const ethereumRoute = "/ethereum";
const markdownRoute = "/llms.mdx/ethereum";

const getMarkdownUrl = createGetUrl(markdownRoute);

/** Where a page's Markdown copy lives: /ethereum/a/b -> /llms.mdx/ethereum/a/b/content.md */
export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, "content.md"];
  return { segments, url: getMarkdownUrl(segments, page.locale) };
}

/**
 * Makes every link in a page's Markdown absolute. Links to other wiki pages
 * (written `./x.mdx`, or `/ethereum/...`) point at those pages' Markdown
 * copies; other site paths just get the domain.
 */
export function absoluteLinks(markdown: string, dir = "") {
  return markdown.replace(/\]\(([^)\s]+)\)/g, (match, href: string) => {
    if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("#")) return match;
    const [path, hash] = href.split("#", 2);
    const anchor = hash ? `#${hash}` : "";
    if (/\.mdx?$/.test(path)) {
      const found = ethereum.getPageByHref(path, { dir });
      return found ? `](${siteUrl}${getPageMarkdownUrl(found.page).url}${anchor})` : match;
    }
    if (!path.startsWith("/")) return match;
    if (path === ethereumRoute || path.startsWith(`${ethereumRoute}/`)) {
      const page = ethereum.getPage(path.slice(ethereumRoute.length).split("/").filter(Boolean));
      if (page) return `](${siteUrl}${getPageMarkdownUrl(page).url}${anchor})`;
    }
    return `](${siteUrl}${href})`;
  });
}

export const ethereumLlms = llms(ethereum, {
  renderPage: async (page) => `# ${page.data.title} (${siteUrl}${page.url})

${absoluteLinks(await page.data.getText("processed"), page.path.split("/").slice(0, -1).join("/"))}`,
});
