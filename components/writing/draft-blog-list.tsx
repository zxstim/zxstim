import { blog } from "@/lib/source";
import BlogCard from "@/components/writing/blog-card";

export default function DraftBlogList() {
  const draftPosts = blog
    .getPages()
    .filter((post) => post.data.status === "draft")
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const columns = [
    { label: "English", posts: draftPosts.filter((p) => p.data.language === "en") },
    { label: "Tiếng Việt", posts: draftPosts.filter((p) => p.data.language === "vi") },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
      {columns.map((column) => (
        <div key={column.label} className="flex flex-col">
          <h2 className="font-bold bg-fd-primary text-fd-secondary px-2 w-fit rounded-none">
            {column.label}
          </h2>
          <div className="grid grid-cols-1 border-2 border-fd-muted-foreground divide-y-2 divide-fd-muted-foreground">
            {column.posts.map((post) => (
              <BlogCard
                key={post.url}
                post={post}
                href={`/writing/draft/${post.slugs[0]}`}
                showDescription={false}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
