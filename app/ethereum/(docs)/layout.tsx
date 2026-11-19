import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { ethereum } from "@/lib/source";
import { ethereumOptions } from "@/lib/layout.shared";
import { sectionTab } from "@/lib/ethereum/sections";
import { BackToHome } from "@/components/back-to-home";

/** The wiki pages: sidebar with the four sections as tabs. */
export default function EthereumDocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <DocsLayout
      tree={ethereum.getPageTree()}
      tabs={{ transform: sectionTab }}
      // top of the sidebar (also the menu drawer on phones)
      sidebar={{ banner: <BackToHome className="w-full justify-center" /> }}
      {...ethereumOptions()}
    >
      {children}
    </DocsLayout>
  );
}
