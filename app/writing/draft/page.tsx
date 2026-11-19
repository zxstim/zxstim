import WritingHero from "@/components/writing/writing-hero";
import DraftBlogList from "@/components/writing/draft-blog-list";

export default function DraftListPage() {
  return (
    <div className="flex flex-col gap-2 px-4 md:px-16 lg:px-16 pb-12">
      <WritingHero />
      <DraftBlogList />
    </div>
  );
}
