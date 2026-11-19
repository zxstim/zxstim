"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isExternalUrl } from "@/lib/links";

export interface Shortcut {
  /** Single key, e.g. "1". */
  key: string;
  url: string;
}

function isEditable(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      target.closest("input, textarea, select") !== null)
  );
}

/**
 * Site-wide terminal-style shortcuts: the given keys open their URLs, "0" goes
 * home, ←/→ walk browser history. Ignored while typing in a field or when a
 * modifier is held, so browser shortcuts like ⌘1 or ⌘← keep working.
 */
export function useKeyboardShortcuts(shortcuts: Shortcut[]) {
  const router = useRouter();

  const go = useCallback(
    (url: string) => {
      if (isExternalUrl(url)) window.open(url, "_blank", "noopener,noreferrer");
      else router.push(url);
    },
    [router],
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) return;
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      if (isEditable(event.target)) return;

      const key = event.key.toLowerCase();
      const match = shortcuts.find((s) => s.key.toLowerCase() === key);
      if (match) go(match.url);
      else if (key === "0") router.push("/");
      else if (key === "arrowleft") router.back();
      else if (key === "arrowright") router.forward();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [shortcuts, go, router]);

  return { go, back: router.back, forward: router.forward };
}
