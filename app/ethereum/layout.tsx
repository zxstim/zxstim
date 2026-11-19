import type { Metadata } from "next";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { ethereum } from "@/lib/source";
import { ethereumOptions } from "@/lib/layout.shared";
import { sectionTab } from "@/lib/ethereum/sections";
import { BackToHome } from "@/components/back-to-home";

export const metadata: Metadata = {
  title: { default: "Ethereum Wiki", template: "%s | Ethereum Wiki" },
  description: "An open encyclopedia of Ethereum, explained plainly.",
};

export default function EthereumLayout({ children }: LayoutProps<"/ethereum">) {
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
