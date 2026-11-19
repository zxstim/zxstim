'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import { BlockScene } from './block-scene';
import { BlockSceneMobile } from './block-scene-mobile';
import { HeroSkeleton } from './hero-skeleton';

/**
 * Picks the hero for the screen: `BlockSceneMobile` below 768 px,
 * `BlockScene` above. Only one is ever mounted.
 *
 * The width can't be known during the server render (or hydration), so the
 * static HTML holds a skeleton shaped by CSS breakpoints instead; the real
 * scene replaces it at the same size once the media query has answered.
 */
export function Hero() {
  const isMobile = useIsMobile();
  if (isMobile === undefined) return <HeroSkeleton />;
  return isMobile ? <BlockSceneMobile /> : <BlockScene />;
}
