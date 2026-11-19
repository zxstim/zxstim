import { cn } from "@/lib/utils";

/** A square, monochrome terminal window: title bar on top, content below. */
export function TerminalWindow({
  title,
  meta,
  className,
  children,
}: {
  title: string;
  /** Right-hand title bar text, e.g. the shell name. */
  meta?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-label={title}
      className={cn(
        "flex w-full flex-col border-2 border-primary print:border-0",
        className,
      )}
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 bg-primary px-3 py-1.5 text-primary-foreground print:hidden">
        {/* Decorative window controls, kept square to match the site. */}
        <div aria-hidden className="flex gap-1.5">
          <span className="size-3 border-2 border-primary-foreground" />
          <span className="size-3 border-2 border-primary-foreground" />
          <span className="size-3 bg-primary-foreground" />
        </div>
        <p className="truncate text-sm font-bold">{title}</p>
        <p aria-hidden className="justify-self-end text-sm">
          {meta}
        </p>
      </div>
      {children}
    </section>
  );
}

/** Two side-by-side panes (stacked on mobile) separated by a rule. */
export function TerminalPanes({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 divide-primary max-md:divide-y-2 md:grid-cols-2 md:divide-x-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Padding/stacking for the content of one pane. */
export function TerminalPane({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-4 p-4 md:p-6", className)}>
      {children}
    </div>
  );
}

/** One shell prompt line: `zxstim@web:~/path$ <command>`, optionally with a cursor. */
export function Prompt({
  path = "~",
  command,
  cursor = false,
}: {
  path?: string;
  command?: string;
  cursor?: boolean;
}) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-2 print:hidden">
      <span className="text-muted-foreground">
        <span className="font-bold text-foreground">zxstim@web</span>:{path}$
      </span>
      {command && <span>{command}</span>}
      {cursor && (
        <span
          aria-hidden
          className="inline-block h-[1.1em] w-[0.6em] translate-y-[0.15em] bg-foreground motion-safe:animate-blink"
        />
      )}
    </p>
  );
}
