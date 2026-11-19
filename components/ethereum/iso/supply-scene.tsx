'use client';

import type { BoxSpec, Pt } from '@/lib/ethereum/iso';
import { boxEdges } from '@/lib/ethereum/iso';
import { prog } from '@/lib/ethereum/timeline';
import { IsoFigure, type Step } from './figure';
import { Box, Flame, Pill, Server, Shadow, Text } from './parts';

/**
 * ETH supply, as a mechanism only (no figures): new ETH is issued to
 * validators at a rate the protocol sets; the base fee of every transaction
 * is burned. When the network is busy the burn can exceed issuance and the
 * total supply falls; when it is quiet the supply grows slowly.
 */

const DURATION = 13.4;
const TANK: Pt = [220, 214];
const TANK_SPEC: BoxSpec = { w: 66, d: 66, h: 72 };
const VALIDATORS: Pt[] = [
  [58, 222],
  [96, 246],
];
const FLAME: Pt = [376, 222];
const COIN: BoxSpec = { w: 9, d: 9, h: 3 };
const ISSUE_FROM: Pt = [84, 168];
const ISSUE_TO: Pt = [200, 116];
const BURN_FROM: Pt = [240, 116];
const BURN_TO: Pt = [372, 182];

/** px of tank level per second */
const ISSUE = 3;
const PHASES = [
  { until: 3, burn: 0, label: '' },
  { until: 5.6, burn: 2.4, label: 'normal' },
  { until: 9.4, burn: 6.6, label: 'busy' },
  { until: DURATION, burn: 0.9, label: 'quiet' },
];
const START_LEVEL = 30;

const STEPS: Step[] = [
  { at: 0, title: 'New issuance', body: 'The protocol creates new ETH to reward validators, at a rate the protocol sets. This makes the total supply grow.' },
  { at: 3, title: 'The base fee is burned', body: 'Every transaction pays a base fee, and that part is burned, meaning it is permanently removed from the total supply.' },
  { at: 5.6, title: 'Busy network: more is burned', body: 'When many people are transacting, the base fee is high. The amount of ETH burned can exceed the amount issued, and the total supply falls.' },
  { at: 9.4, title: 'Quiet network: supply grows slightly', body: 'When the network is quiet, fees are low and less is burned than issued, so the total supply grows slightly. Real figures are on sites like ultrasound.money.' },
];

function phaseAt(t: number) {
  return PHASES.find((p) => t < p.until) ?? PHASES[PHASES.length - 1];
}

/** tank level in px: the integral of issuance minus burn */
function level(t: number) {
  let lv = START_LEVEL;
  let from = 0;
  for (const p of PHASES) {
    const to = Math.min(t, p.until);
    if (to > from) lv += (ISSUE - p.burn) * (to - from);
    if (t <= p.until) break;
    from = p.until;
  }
  return lv;
}

/** a stream of coins along an arc, denser for a higher `rate` */
function stream(t: number, from: Pt, to: Pt, rate: number, key: string, start: number) {
  if (rate <= 0 || t < start) return null;
  // the number of coins in flight shows the rate; they all move at one speed
  const n = Math.max(1, Math.min(8, Math.round(rate * 1.2)));
  return Array.from({ length: n }, (_, k) => {
    const p = ((t - start) * 0.7 + k / n) % 1;
    const at: Pt = [from[0] + (to[0] - from[0]) * p, from[1] + (to[1] - from[1]) * p - Math.sin(Math.PI * p) * 36];
    return <Box key={`${key}${k}`} at={at} spec={COIN} tone="key" opacity={Math.min(1, p * 6, (1 - p) * 6)} />;
  });
}

function render(t: number) {
  const fade = 1 - prog(t, DURATION - 0.6, 0.6);
  const phase = phaseAt(t);
  const lv = Math.max(4, Math.min(TANK_SPEC.h - 2, level(t)));
  const net = ISSUE - phase.burn;
  const burnRate = phase.burn / ISSUE;

  return (
    <g opacity={fade < 1 ? 0.3 + 0.7 * fade : 1}>
      {/* the state of the network, and the net change */}
      {phase.label && (
        <Text x={14} y={26} anchor="start" className="iso-lbl">
          network: {phase.label}
        </Text>
      )}
      <Pill
        at={[phase.label ? 190 : 72, 21]}
        text={net > 0.5 ? 'supply rising' : net < -0.5 ? 'supply falling' : 'almost unchanged'}
        tone={net > 0.5 ? 'ok' : net < -0.5 ? 'bad' : undefined}
        opacity={prog(t, 0.6, 0.4)}
      />

      {/* issuance: validators → supply */}
      {VALIDATORS.map((v, i) => (
        <Server key={i} at={v} spec={{ w: 22, d: 22, h: 28 }} />
      ))}
      <Text x={80} y={278} className="iso-sub">
        validators
      </Text>
      <Text x={(ISSUE_FROM[0] + ISSUE_TO[0]) / 2 - 6} y={78} className="iso-note is-ok">
        new issuance
      </Text>
      {stream(t, ISSUE_FROM, ISSUE_TO, ISSUE, 'i', 0.4)}

      {/* the total supply */}
      <Shadow at={TANK} spec={TANK_SPEC} />
      <Box at={TANK} spec={{ ...TANK_SPEC, h: lv }} tone="block" />
      <path className="iso-line" d={boxEdges(TANK[0], TANK[1], TANK_SPEC)} strokeDasharray="2 2" />
      <Text x={TANK[0]} y={TANK[1] + 52}>
        Total ETH supply
      </Text>

      {/* burn: base fees → flame */}
      <Text x={(BURN_FROM[0] + BURN_TO[0]) / 2 + 20} y={78} className="iso-note is-bad" opacity={phase.burn > 0 ? 1 : 0.3}>
        base fees burned
      </Text>
      {stream(t, BURN_FROM, BURN_TO, phase.burn, 'b', 3)}
      <Flame at={FLAME} scale={(phase.burn > 0 ? 0.8 + 0.35 * burnRate : 0.4) * (1 + 0.08 * Math.sin(t * 9))} />
      <Text x={FLAME[0]} y={FLAME[1] + 22} className="iso-sub">
        burn
      </Text>
    </g>
  );
}

export function SupplyScene() {
  return (
    <IsoFigure
      title="ETH supply: new ETH is issued to reward validators and the base fee of every transaction is burned; when the network is busy, more can be burned than issued and the total supply falls; when it is quiet, the total supply grows slightly"
      viewBox="0 0 440 290"
      duration={DURATION}
      poster={7.6}
      steps={STEPS}
      render={render}
    />
  );
}
