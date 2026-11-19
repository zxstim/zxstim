import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { buttonVariants } from "@/components/ui/button";
import { ethereumOptions } from "@/lib/layout.shared";
import { cn } from "@/lib/utils";

/** The wiki's landing page: the block animation, with a way into the wiki. */
export default function EthereumHomeLayout({ children }: { children: React.ReactNode }) {
  const base = ethereumOptions();
  return (
    <HomeLayout
      {...base}
      nav={{
        ...base.nav,
        // `order-last` keeps it in the header's right corner at every width
        children: (
          <Link href="/ethereum/basics" className={cn(buttonVariants(), "order-last ms-2")}>
            Read the wiki
            <ArrowRight data-icon="inline-end" />
          </Link>
        ),
      }}
    >
      {children}
    </HomeLayout>
  );
}
