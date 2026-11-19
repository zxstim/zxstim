import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from "fumadocs-ui/layouts/docs/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { ethereum } from "@/lib/source";
import { getMDXComponents } from "@/components/mdx";
import { ethereumMdxComponents } from "@/components/ethereum/mdx";
import { getPageMarkdownUrl } from "@/lib/ethereum/llms";
import { buildMetadata } from "@/lib/ethereum/metadata";
import { pageTrail } from "@/lib/ethereum/sections";

const GITHUB_CONTENT = "https://github.com/zxstim/zxstim/blob/main/content/ethereum";

export default async function Page(props: PageProps<"/ethereum/[...slug]">) {
  const { slug } = await props.params;
  const page = ethereum.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="flex flex-row items-center gap-2 border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`${GITHUB_CONTENT}/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            ...ethereumMdxComponents,
            // links to other pages are written as relative .mdx paths
            a: createRelativeLink(ethereum, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return ethereum.generateParams().filter((p) => p.slug.length > 0);
}

export async function generateMetadata(
  props: PageProps<"/ethereum/[...slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const page = ethereum.getPage(slug);
  if (!page) notFound();

  const { sectionTitle, trail } = pageTrail(page);
  return buildMetadata({
    title: page.data.title,
    description: page.data.description,
    path: page.url,
    type: "article",
    section: sectionTitle,
    tags: trail,
  });
}
