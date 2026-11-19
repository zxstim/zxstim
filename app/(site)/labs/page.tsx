import {
  Prompt,
  TerminalPane,
  TerminalPanes,
  TerminalWindow,
} from "@/components/terminal/terminal-window";
import { ProjectList } from "@/components/terminal/project-list";
import { StatusBar } from "@/components/terminal/status-bar";

const focus = [
  "Contribute and maintain open source UX libraries for onchain applications.",
  "Research and develop techniques to improve onchain user experience.",
  "Build tools and frameworks to help developers build onchain applications faster and easier.",
];

export default function Labs() {
  return (
    <TerminalWindow title="zxstim@web: ~/labs" meta="zsh">
      <TerminalPanes>
        <TerminalPane>
          <Prompt path="~/labs" command="cat README.md" />
          <h1 className="text-xl font-bold md:text-3xl">Software studio</h1>
          <ul className="flex max-w-prose flex-col gap-4 text-muted-foreground">
            {focus.map((line) => (
              <li key={line} className="flex gap-3">
                <span aria-hidden className="text-foreground">-</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </TerminalPane>
        <TerminalPane>
          <Prompt path="~/labs" command="ls projects/" />
          <p className="text-muted-foreground">loading...</p>
          <Prompt path="~/labs" command="ls related/" />
          <ProjectList items={[{ name: "CV", url: "/cv" }]} numbered={false} />
          <Prompt path="~/labs" cursor />
        </TerminalPane>
      </TerminalPanes>
      <StatusBar current="/labs" />
    </TerminalWindow>
  );
}
