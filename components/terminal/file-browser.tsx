"use client";

import { useState } from "react";
import {
  Prompt,
  TerminalPane,
  TerminalPanes,
} from "@/components/terminal/terminal-window";
import {
  DottedLeader,
  ProjectList,
  listRowClass,
  listRowMutedClass,
} from "@/components/terminal/project-list";
import type { TerminalLink } from "@/lib/site-nav";

export interface TerminalFile {
  /** File name shown in the listing, e.g. "devrel-engineer-kaia.md". */
  file: string;
  /** Human label for the row. */
  label: string;
  /** Lines printed when the file is `cat`-ed. */
  contents: string[];
}

/**
 * Two-pane "file browser": the left pane shows `intro` then an `ls` of the
 * files; selecting one `cat`s it in the right pane, followed by related links.
 */
export function FileBrowser({
  path,
  intro,
  files,
  related,
}: {
  path: string;
  intro: React.ReactNode;
  files: TerminalFile[];
  related: TerminalLink[];
}) {
  const [selected, setSelected] = useState(files[0]?.file);
  const current = files.find((f) => f.file === selected);

  return (
    <TerminalPanes>
      <TerminalPane>
        {intro}
        <Prompt path={path} command="ls" />
        <ul className="flex flex-col">
          {files.map((f) => {
            const active = f.file === selected;
            return (
              <li key={f.file}>
                <button
                  type="button"
                  onClick={() => setSelected(f.file)}
                  aria-pressed={active}
                  className={`${listRowClass} cursor-pointer aria-pressed:bg-primary aria-pressed:text-primary-foreground`}
                >
                  <span
                    className={`${listRowMutedClass} group-aria-pressed:text-primary-foreground`}
                  >
                    {active ? ">" : "-"}
                  </span>
                  <span className="font-bold">{f.label}</span>
                  <DottedLeader />
                  <span
                    className={`hidden sm:inline ${listRowMutedClass} group-aria-pressed:text-primary-foreground`}
                  >
                    {f.file}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </TerminalPane>

      <TerminalPane>
        {current && (
          <>
            <Prompt path={path} command={`cat ${current.file}`} />
            <div aria-live="polite" className="flex flex-col gap-2 text-muted-foreground">
              {current.contents.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </>
        )}
        <Prompt path={path} command="ls related/" />
        <ProjectList items={related} numbered={false} />
        <Prompt path={path} cursor />
      </TerminalPane>
    </TerminalPanes>
  );
}
