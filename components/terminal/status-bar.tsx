"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { isExternalUrl, shortLinkLabel } from "@/lib/links";
import type { TerminalLink } from "@/components/terminal/project-list";

const entry =
  "whitespace-nowrap px-1 outline-none hover:bg-primary-foreground hover:text-primary focus-visible:bg-primary-foreground focus-visible:text-primary";

/**
 * tmux-style status line. Lists the window shortcuts (0 = index, 1..n = the
 * given links) as real links, and wires up the matching keyboard shortcuts.
 */
export function StatusBar({
  session,
  items,
}: {
  session: string;
  items: TerminalLink[];
}) {
  const { back, forward } = useKeyboardShortcuts(
    items.map((item, index) => ({ key: String(index + 1), url: item.url })),
  );

  return (
    <nav
      aria-label="Keyboard shortcuts"
      className="flex items-center gap-3 overflow-x-auto bg-primary px-2 py-1 text-sm text-primary-foreground"
    >
      <span className="whitespace-nowrap bg-primary-foreground px-1 font-bold text-primary">
        [{session}]
      </span>
      <Link href="/" className={entry} aria-current="page">
        0:index*
      </Link>
      {items.map((item, index) => {
        const external = isExternalUrl(item.url);
        return (
          <Link
            key={item.url}
            href={item.url}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={entry}
            aria-label={`${index + 1}: ${item.name}`}
          >
            {index + 1}:{shortLinkLabel(item.url)}
          </Link>
        );
      })}
      <span className="ml-auto hidden items-center gap-1 whitespace-nowrap lg:flex">
        <button type="button" className={entry} onClick={back} aria-label="Back">
          <ArrowLeft className="size-3.5" />
        </button>
        <button type="button" className={entry} onClick={forward} aria-label="Forward">
          <ArrowRight className="size-3.5" />
        </button>
        <span className="opacity-70">history</span>
      </span>
    </nav>
  );
}
