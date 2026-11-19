import type { CSSProperties, ReactNode } from 'react';
import type * as PageTree from 'fumadocs-core/page-tree';
import type { LayoutTab } from 'fumadocs-ui/layouts/shared';
import { getBreadcrumbItems } from 'fumadocs-core/breadcrumb';
import { ethereum as source } from '@/lib/source';

/**
 * The Ethereum wiki's sections are the root folders of `content/ethereum`
 * (`"root": true` in their meta.json): Basics, Investors, Enterprise,
 * Government. Fumadocs shows them as the dropdown at the top of the sidebar; the
 * intro page lists them as cards. Each has a colour, `--section-<folder>` in
 * `app/globals.css`.
 */

export interface Section {
  /** folder name without route-group parentheses: "(basics)" → "basics" */
  key: string;
  url: string;
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
}

function sectionKey(node: PageTree.Folder): string {
  return source.getNodeMeta(node)?.path.split('/')[0].replace(/[()]/g, '') ?? '';
}

/** Sets `--section` to the section's colour, for `text-(--section)` and friends. */
export const sectionStyle = (key: string) => ({ '--section': `var(--section-${key}, currentColor)` }) as CSSProperties;

/** Tab transform for `DocsLayout`: tints each section's icon, boxed on phones where Fumadocs draws it larger. */
export function sectionTab(option: LayoutTab, node: PageTree.Folder): LayoutTab {
  if (!option.icon) return option;
  return {
    ...option,
    icon: (
      <span
        className="flex size-full items-center justify-center text-(--section) max-md:border max-md:border-fd-border max-md:bg-(--section)/10 max-md:p-2 [&_svg]:size-full"
        style={sectionStyle(sectionKey(node))}
      >
        {option.icon}
      </span>
    ),
  };
}

/** The sections in sidebar order, linking to each one's first page. */
export function getSections(): Section[] {
  return source
    .getPageTree()
    .children.filter((node): node is PageTree.Folder => node.type === 'folder' && node.root === true)
    .flatMap((node) => {
      const url = node.index?.url ?? node.children.find((child) => child.type === 'page')?.url;
      if (!url) return [];
      return [{ key: sectionKey(node), url, title: node.name, description: node.description, icon: node.icon }];
    });
}

/**
 * Section colours as hex, for places that can't read CSS variables (share
 * images). Dark-theme values of `--section-<folder>` in app/globals.css: keep
 * the two in step.
 */
export const SECTION_HEX: Record<string, string> = {
  basics: '#60a5fa',
  investors: '#fbbf24',
  enterprise: '#34d399',
  government: '#fb7185',
};

/** The section title and the folder path of a page, from the Fumadocs page tree. */
export function pageTrail(page: { url: string; slugs: string[] }) {
  const key = page.slugs[0] ?? '';
  const section = getSections().find((s) => s.key === key);
  const sectionTitle = typeof section?.title === 'string' ? section.title : '';
  // folders between the section and the page (e.g. "How it works"); the section itself is added in front
  const folders = getBreadcrumbItems(page.url, source.getPageTree(), { includePage: false })
    .map((c) => (typeof c.name === 'string' ? c.name : ''))
    .filter((name) => name && name !== sectionTitle);
  const trail = [sectionTitle, ...folders].filter(Boolean);
  return { key, sectionTitle, trail, color: SECTION_HEX[key] };
}
