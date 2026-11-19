import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, BadgeCheck } from "lucide-react";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import type { InferPageType } from "fumadocs-core/source";
import { getMDXComponents } from "@/components/mdx";
import CopyButton from "@/components/writing/copy-button";
import type { blog } from "@/lib/source";

/** Full post page: author header, back/copy-link row, thumbnail, title, inline TOC, body. */
export default function PostView({
  page,
  backHref,
}: {
  page: InferPageType<typeof blog>;
  backHref: string;
}) {
  const Mdx = page.data.body;
  return (
    <div className="flex flex-col py-12 gap-4 px-4">
      <div className="flex flex-col gap-8 w-full max-w-175 mx-auto">
        <div className="flex flex-row gap-4">
          <Image
            src="/zxstim-mini.png"
            alt="Author"
            width={55}
            height={55}
            className="rounded-full"
          />
          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-1 items-center">
              <p className="font-medium">ZxStim</p>
              <BadgeCheck className="w-5 h-5 fill-blue-400 stroke-fd-secondary" />
            </div>
            <p className="font-sm text-fd-muted-foreground">
              {page.data.date.toLocaleDateString("en-CA", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between gap-4">
          <Link
            href={backHref}
            className="flex flex-row items-center gap-2 hover:underline hover:underline-offset-4"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
          <CopyButton />
        </div>
        <div className="flex flex-col gap-6">
          {page.data.thumbnail && (
            <Image
              src={`/blog-images/thumbnails/${page.data.thumbnail}`}
              alt={page.data.title}
              width={1200}
              height={630}
              className="rounded-none"
              loading="eager"
            />
          )}
          <h1 className="mb-2 text-3xl font-bold">{page.data.title}</h1>
        </div>
      </div>
      <article className="w-full max-w-175 mx-auto flex flex-col">
        <div className="prose min-w-0">
          <InlineTOC items={page.data.toc} />
          <Mdx components={getMDXComponents()} />
        </div>
      </article>
    </div>
  );
}
