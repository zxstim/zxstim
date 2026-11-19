import Link from "next/link";
import type { InferPageType } from "fumadocs-core/source";
import type { blog } from "@/lib/source";

export default function BlogCard({
  post,
  href = post.url,
  showDescription = true,
}: {
  post: InferPageType<typeof blog>;
  /** Defaults to the post's canonical /writing/<slug> URL. */
  href?: string;
  showDescription?: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-1 rounded-none overflow-hidden p-4 hover:bg-fd-accent"
    >
      <h2 className="text-xl font-semibold mb-2">{post.data.title}</h2>
      {showDescription && (
        <p className="text-sm text-fd-muted-foreground mb-2">
          {post.data.description ?? ""}
        </p>
      )}
      <div className="flex flex-row gap-1">
        <p className="text-sm text-fd-muted-foreground">
          {post.data.date.toLocaleDateString("en-CA", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        </p>
        <p className="text-fd-muted-foreground">·</p>
        <p className="text-sm text-fd-muted-foreground">
          {post.data.language === "vi" ? "Tiếng Việt" : "English"}
        </p>
      </div>
    </Link>
  );
}
