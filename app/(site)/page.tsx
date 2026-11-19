import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  Prompt,
  TerminalPane,
  TerminalPanes,
  TerminalWindow,
} from "@/components/terminal/terminal-window";
import { ProjectList } from "@/components/terminal/project-list";
import { StatusBar } from "@/components/terminal/status-bar";
import { siteLinks } from "@/lib/site-nav";

export default function Home() {
  return (
    <>
      <Header />
      <TerminalWindow title="zxstim@web: ~" meta="zsh">
        <TerminalPanes>
          {/* Left pane: who */}
          <TerminalPane>
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
          </TerminalPane>

          {/* Right pane: where to go */}
          <TerminalPane>
            <Prompt command="ls ~/projects" />
            <ProjectList items={siteLinks} />
            <p className="hidden text-sm text-muted-foreground lg:block">
              # press 1–{siteLinks.length} to open, 0 for index, ←/→ for history
            </p>
            <Prompt cursor />
          </TerminalPane>
        </TerminalPanes>
        <StatusBar current="/" />
      </TerminalWindow>
      <Footer />
    </>
  );
}
