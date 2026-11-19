"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { isExternalUrl, shortLinkLabel } from "@/lib/links";
import { siteLinks, type TerminalLink } from "@/lib/site-nav";

const entry =
  "whitespace-nowrap px-1 outline-none hover:bg-primary-foreground hover:text-primary focus-visible:bg-primary-foreground focus-visible:text-primary aria-[current=page]:font-bold";

/**
 * tmux-style status line: `0:index` plus one numbered "window" per site link,
 * the current page marked with `*`. Entries are real links, and the same
 * numbers work as keyboard shortcuts.
 */
export function StatusBar({
  current = "/",
  session = "zxstim",
  items = siteLinks,
}: {
  /** Path of the page being shown, e.g. "/works". */
  current?: string;
  session?: string;
  items?: TerminalLink[];
}) {
  const { back, forward } = useKeyboardShortcuts(
    items.map((item, index) => ({ key: String(index + 1), url: item.url })),
  );

  return (
    <nav
      aria-label="Site navigation and keyboard shortcuts"
      className="flex items-center gap-3 overflow-x-auto bg-primary px-2 py-1 text-sm text-primary-foreground print:hidden"
    >
      <span className="whitespace-nowrap bg-primary-foreground px-1 font-bold text-primary">
        [{session}]
      </span>
      <Link href="/" className={entry} aria-current={current === "/" ? "page" : undefined}>
        0:index{current === "/" && "*"}
      </Link>
      {items.map((item, index) => {
        const external = isExternalUrl(item.url);
        const active = item.url === current;
        return (
          <Link
            key={item.url}
            href={item.url}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={entry}
            aria-current={active ? "page" : undefined}
            aria-label={`${index + 1}: ${item.name}`}
          >
            {index + 1}:{shortLinkLabel(item.url)}
            {active && "*"}
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
