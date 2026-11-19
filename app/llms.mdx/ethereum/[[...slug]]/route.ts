import { notFound } from "next/navigation";
import { ethereum } from "@/lib/source";
import { ethereumLlms, getPageMarkdownUrl } from "@/lib/ethereum/llms";

export const revalidate = false;

/** Markdown copy of a wiki page, for the "Copy Markdown" / open-in-AI actions. */
export async function GET(
  _req: Request,
  { params }: RouteContext<"/llms.mdx/ethereum/[[...slug]]">,
) {
  const { slug } = await params;
  const page = ethereum.getPage(slug?.slice(0, -1));
  if (!page) notFound();

  return new Response(await ethereumLlms.page(page), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}

export function generateStaticParams() {
  return ethereum.getPages().map((page) => ({
    slug: getPageMarkdownUrl(page).segments,
  }));
}
