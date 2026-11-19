import { useSyncExternalStore } from "react";

const MOBILE_BREAKPOINT = 768;
const QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * Whether the viewport is phone-sized (< 768 px). `undefined` while it can't
 * be known yet: during the server render and hydration.
 */
export function useIsMobile(): boolean | undefined {
  return useSyncExternalStore<boolean | undefined>(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => undefined,
  );
}
