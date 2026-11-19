import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blog } from "@/lib/source";
import PostView from "@/components/writing/post-view";

export default async function Page(props: PageProps<"/writing/draft/[slug]">) {
  const { slug } = await props.params;
  const page = blog.getPage([slug]);
  if (!page) notFound();
  return <PostView page={page} backHref="/writing/draft" />;
}

export function generateStaticParams(): { slug: string }[] {
  return blog
    .getPages()
    .filter((page) => page.slugs[0] !== undefined)
    .map((page) => ({ slug: page.slugs[0]! }));
}

export async function generateMetadata(
  props: PageProps<"/writing/draft/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const page = blog.getPage([slug]);
  if (!page) notFound();
  return {
    title: page.data.title,
    description: page.data.description,
  };
}
