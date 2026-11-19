import { BackToHome } from "@/components/back-to-home";
import WritingHero from "@/components/writing/writing-hero";
import BlogList from "@/components/writing/blog-list";

export default function WritingHomePage() {
  return (
    <div className="flex flex-col gap-2 px-4 md:px-16 lg:px-16 pb-12">
      <BackToHome className="mt-6" />
      <WritingHero />
      <BlogList />
    </div>
  );
}
