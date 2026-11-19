import { Prompt, TerminalWindow } from "@/components/terminal/terminal-window";
import { FileBrowser, type TerminalFile } from "@/components/terminal/file-browser";
import { StatusBar } from "@/components/terminal/status-bar";

const works: TerminalFile[] = [
  {
    file: "head-of-devrel-bifrost.md",
    label: "Head of DevRel at Bifrost",
    contents: [
      "Crosschain Liquid Staking Protocol for Polkadot and Ethereum ecosystems.",
    ],
  },
  {
    file: "devrel-engineer-kaia.md",
    label: "DevRel Engineer at Kaia Foundation",
    contents: [
      "A leading Layer 1 public blockchain with a strong integration with Line Messenger.",
    ],
  },
  {
    file: "apac-growth-lead-unlimit.md",
    label: "APAC Growth Lead at Unlimit",
    contents: [
      "Next generation fiat on-ramp backed by a battled-tested payment enterprise with global coverage and over 1000+ payment methods.",
    ],
  },
  {
    file: "vp-of-product-vietpay.md",
    label: "VP of Product at Vietpay",
    contents: [
      "Innovative commercial banking platform for Vietnamese SMEs that help them to accept payments, and scale at a push of button.",
    ],
  },
];

export default function Works() {
  return (
    <TerminalWindow title="zxstim@web: ~/works" meta="zsh">
      <FileBrowser
        path="~/works"
        files={works}
        related={[{ name: "CV", url: "/cv" }]}
        intro={
          <>
            <Prompt path="~/works" command="cat README.md" />
            <h1 className="text-xl font-bold md:text-3xl">
              A collection of my previous works
            </h1>
            <p className="max-w-prose text-muted-foreground">
              Many L1/L2 ecosystems are struggling to attract developers to
              build on their platforms. Worse, they also usually encounter:
            </p>
          </>
        }
      />
      <StatusBar current="/works" />
    </TerminalWindow>
  );
}
