import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { isExternalUrl, shortLinkLabel } from "@/lib/links";
import type { TerminalLink } from "@/lib/site-nav";

/** Row style for terminal listings: highlights like a selection on hover/focus. */
export const listRowClass =
  "group -mx-2 flex w-[calc(100%+1rem)] items-baseline gap-3 px-2 py-1 text-left outline-none hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground";

/** Muted text inside a listing row that inverts along with the row. */
export const listRowMutedClass =
  "text-muted-foreground group-hover:text-primary-foreground group-focus-visible:text-primary-foreground";

/** Dotted leader between a row's name and its target. */
export function DottedLeader() {
  return (
    <span
      aria-hidden
      className="min-w-4 flex-1 -translate-y-1 border-b-2 border-dotted border-current opacity-30"
    />
  );
}

/**
 * `ls`-style listing of links. Numbered rows (`[1]`) show each item's
 * position, which on the home page is also its keyboard shortcut; pass
 * `numbered={false}` where those numbers would not match the shortcuts.
 */
export function ProjectList({
  items,
  numbered = true,
}: {
  items: TerminalLink[];
  numbered?: boolean;
}) {
  return (
    <ul className="flex flex-col">
      {items.map((item, index) => {
        const external = isExternalUrl(item.url);
        return (
          <li key={item.url}>
            <Link
              href={item.url}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className={listRowClass}
            >
              <span className={listRowMutedClass}>
                {numbered ? `[${index + 1}]` : ">"}
              </span>
              <span className="font-bold">{item.name}</span>
              <DottedLeader />
              <span className={`flex items-center gap-1 ${listRowMutedClass}`}>
                {shortLinkLabel(item.url)}
                {external && (
                  <ArrowUpRight aria-label="opens in a new tab" className="size-3.5" />
                )}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
