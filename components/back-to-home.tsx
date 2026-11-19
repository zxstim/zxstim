import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

/** Square "Back to home" button (links to the site index); hidden when printing. */
export function BackToHome({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex w-fit items-center gap-2 border-2 border-primary px-3 py-1 text-sm font-bold outline-none hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground print:hidden",
        className,
      )}
    >
      <ChevronLeft className="size-4" />
      Back to home
    </Link>
  );
}
