import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blog } from "@/lib/source";
import PostView from "@/components/writing/post-view";

export default async function Page(props: PageProps<"/writing/[slug]">) {
  const { slug } = await props.params;
  const page = blog.getPage([slug]);
  if (!page) notFound();
  return <PostView page={page} backHref="/writing" />;
}

// Every post gets a page, drafts included: `status` only controls which list a
// post appears in, so a draft is still reachable at its direct URL.
export function generateStaticParams(): { slug: string }[] {
  return blog
    .getPages()
    .filter((page) => page.slugs[0] !== undefined)
    .map((page) => ({ slug: page.slugs[0]! }));
}

export async function generateMetadata(
  props: PageProps<"/writing/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const page = blog.getPage([slug]);
  if (!page) notFound();

  const { title, description, thumbnail, author, date, language } = page.data;

  // Next.js does NOT deep-merge `openGraph`/`twitter` from parent layouts — a
  // per-route definition replaces the parent's entirely. So re-declare the
  // shared fields and fall back to the site default image when a post has no
  // thumbnail. Relative URLs resolve against `metadataBase` in the root layout.
  const imageUrl = thumbnail
    ? `/blog-images/thumbnails/${thumbnail}`
    : "/zxstim-tbn.png";
  const images = [{ url: imageUrl, width: 1200, height: 630, alt: title }];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: page.url,
      siteName: "ZxStim",
      locale: language === "vi" ? "vi_VN" : "en_US",
      type: "article",
      publishedTime: date.toISOString(),
      authors: [author],
      images,
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
