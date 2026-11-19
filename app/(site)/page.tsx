import Header from "@/components/header";
import Footer from "@/components/footer";
import { Prompt, TerminalWindow } from "@/components/terminal/terminal-window";
import { ProjectList, type TerminalLink } from "@/components/terminal/project-list";
import { StatusBar } from "@/components/terminal/status-bar";

// Single source for the listing *and* the keyboard shortcuts: an item's
// position is its number, so the two can never drift apart.
const projects: TerminalLink[] = [
  { name: "DeFi Vietnam", url: "https://www.defi.vn" },
  { name: "ETH Vietnam", url: "https://www.eth.vn" },
  { name: "Works", url: "/works" },
  { name: "Labs", url: "/labs" },
  { name: "CV", url: "/cv" },
  { name: "Writing", url: "/writing" },
];

export default function Home() {
  return (
    <>
      <Header />
      <TerminalWindow title="zxstim@web: ~" meta="zsh">
        <div className="grid grid-cols-1 divide-primary max-md:divide-y-2 md:grid-cols-2 md:divide-x-2">
          {/* Left pane: who */}
          <div className="flex flex-col gap-4 p-4 md:p-6">
            <Prompt command="whoami" />
            <h1 className="text-xl font-bold md:text-3xl">Currently on oss arc</h1>
            <Prompt command="cat about.md" />
            <div className="flex max-w-prose flex-col gap-4 text-muted-foreground">
              <p>
                Long time Ethereum holder. Crash of 2018 survivor. DeFi summer
                survivor. NFT mania survivor. FTX survivor.
              </p>
              <p>
                Currently, I am building open source software products for
                developers and DeFi protocols.
              </p>
              <p>
                I firmly believe that the future of the internet is onchain,
                that we can build a better money for everyone, and that our
                conviction will make a lasting impact.
              </p>
            </div>
          </div>

          {/* Right pane: where to go */}
          <div className="flex flex-col gap-4 p-4 md:p-6">
            <Prompt command="ls ~/projects" />
            <ProjectList items={projects} />
            <p className="hidden text-sm text-muted-foreground lg:block">
              # press 1–{projects.length} to open, 0 for index, ←/→ for history
            </p>
            <Prompt cursor />
          </div>
        </div>
        <StatusBar session="zxstim" items={projects} />
      </TerminalWindow>
      <Footer />
    </>
  );
}
