import type { Metadata } from "next";
import { BackToHome } from "@/components/back-to-home";
import { Hero } from "@/components/ethereum/hero/hero";
import { buildMetadata } from "@/lib/ethereum/metadata";

const title = "Ethereum Wiki: how a block is born";
const description =
  "An open encyclopedia of Ethereum. From your first wallet to blocks, consensus, smart contracts and Layer 2, explained plainly with animated illustrations.";

export const metadata: Metadata = {
  ...buildMetadata({ title, description, path: "/ethereum" }),
  title: { absolute: title },
};

export default function EthereumHomePage() {
  return (
    <section className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-4 pt-6 pb-20 md:pt-10">
      <BackToHome />
      {/* No visible title: the animation carries the idea. The h1 stays for screen readers and search engines. */}
      <h1 className="sr-only">
        Ethereum Wiki: how an Ethereum block is born and joined to the chain
      </h1>
      <Hero />
    </section>
  );
}
