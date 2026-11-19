import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { isExternalUrl, shortLinkLabel } from "@/lib/links";

export interface TerminalLink {
  name: string;
  url: string;
}

/**
 * `ls`-style listing. Each row is numbered by position (that number is also
 * its keyboard shortcut) and highlights like a terminal selection on
 * hover/focus.
 */
export function ProjectList({ items }: { items: TerminalLink[] }) {
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
              className="group -mx-2 flex items-baseline gap-3 px-2 py-1 outline-none hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground"
            >
              <span className="text-muted-foreground group-hover:text-primary-foreground group-focus-visible:text-primary-foreground">
                [{index + 1}]
              </span>
              <span className="font-bold">{item.name}</span>
              {/* Dotted leader between the name and its target. */}
              <span
                aria-hidden
                className="min-w-4 flex-1 -translate-y-1 border-b-2 border-dotted border-current opacity-30"
              />
              <span className="flex items-center gap-1 text-muted-foreground group-hover:text-primary-foreground group-focus-visible:text-primary-foreground">
                {shortLinkLabel(item.url)}
                {external && <ArrowUpRight aria-label="opens in a new tab" className="size-3.5" />}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
