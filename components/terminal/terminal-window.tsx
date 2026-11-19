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
      className={cn("flex w-full flex-col border-2 border-primary", className)}
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 bg-primary px-3 py-1.5 text-primary-foreground">
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

/** One shell prompt line: `zxstim@web:~$ <command>`, optionally with a cursor. */
export function Prompt({
  command,
  cursor = false,
}: {
  command?: string;
  cursor?: boolean;
}) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-2">
      <span className="text-muted-foreground">
        <span className="font-bold text-foreground">zxstim@web</span>:~$
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
