'use client';

import type { BoxSpec, Pt } from '@/lib/ethereum/iso';
import { backOut, clamp01, easeInOut, lerp, prog } from '@/lib/ethereum/timeline';
import { IsoFigure, type Step } from './figure';
import { Arrow, Badge, Box, Coins, Pill, Shadow, Text } from './parts';

/**
 * The Byzantine Generals Problem: armies around a city must agree on one plan
 * through messengers, while a traitor tells each a different story. Then the
 * fix blockchains use: everyone puts up a stake, votes openly and signed to
 * everyone, 2/3 decides, and saying two things costs the stake.
 */

const DURATION = 14;
const CITY: Pt = [220, 162];
const CAMPS: Pt[] = [
  [88, 162],
  [220, 84],
  [352, 162],
  [220, 246],
];
const NAMES = ['A', 'B', 'C', 'D'];
const TRAITOR = 3;
const TENT: BoxSpec = { w: 20, d: 20, h: 14 };
const LABEL_AT: Pt[] = [
  [88, 194],
  [220, 52],
  [352, 194],
  [220, 280],
];
const top = (p: Pt): Pt => [p[0], p[1] - 22];
/** where the outcome is shown: the empty top-right corner */
const STATUS: Pt = [358, 60];

const STEPS: Step[] = [
  { at: 0, title: 'The problem', body: 'Several armies surround a city and can only talk through messengers. If they attack together they win, but there is a traitor among them.' },
  { at: 2.6, title: 'The traitor says two things', body: 'General D tells B to "retreat" and tells C to "attack". The loyal generals no longer agree.' },
  { at: 6.4, title: 'Stake and vote in the open', body: "Anyone who wants to vote must put up a stake. Every vote is signed and sent to everyone, so no one can fake someone else's word." },
  { at: 9.6, title: '2/3 decides, saying two things costs the stake', body: 'When 2/3 of the votes pick the same course, the whole group follows it. Whoever sends two conflicting votes is caught and loses their stake.' },
];

/** A message pill flying from camp a to camp b during [start, start + dur]. */
function flight(t: number, a: number, b: number, start: number, dur: number) {
  const k = prog(t, start, dur);
  if (k <= 0 || k >= 1) return null;
  const e = easeInOut(k);
  const from = top(CAMPS[a]);
  const to = top(CAMPS[b]);
  return [lerp(from[0], to[0], e), lerp(from[1], to[1], e) - Math.sin(Math.PI * e) * 24] as Pt;
}

function render(t: number) {
  const fade = 1 - prog(t, 13.3, 0.7);
  const exposed = t >= 2.6;
  const confused = t >= 3.8 && t < 6.2;
  const stake = clamp01(prog(t, 6.4, 0.8));
  const voting = prog(t, 7.4, 1.4);
  const decided = backOut(prog(t, 9.6, 0.4));
  const slashed = prog(t, 10.4, 1);

  // phase A: A's order, then D's two different relays
  const pills: { at: Pt; text: string; tone: 'lane' | 'ok' | 'bad' }[] = [];
  for (const b of [1, 2, 3]) {
    const at = flight(t, 0, b, 0.5, 1.2);
    if (at) pills.push({ at, text: 'attack', tone: 'lane' });
  }
  const lie = flight(t, TRAITOR, 1, 2.6, 1.2);
  if (lie) pills.push({ at: lie, text: 'retreat', tone: 'lane' });
  const half = flight(t, TRAITOR, 2, 2.6, 1.2);
  if (half) pills.push({ at: half, text: 'attack', tone: 'lane' });

  // phase B: every camp sends a signed vote to every other camp
  const votes: { at: Pt; ok: boolean }[] = [];
  if (voting > 0 && voting < 1) {
    for (let a = 0; a < 4; a++) {
      for (let b = 0; b < 4; b++) {
        if (a === b) continue;
        const at = flight(t, a, b, 7.4, 1.4);
        // the traitor votes "attack" to A, "retreat" to B and C
        if (at) votes.push({ at, ok: a !== TRAITOR || b === 0 });
      }
    }
  }

  return (
    <g opacity={fade < 1 ? 0.3 + 0.7 * fade : 1}>
      {/* messenger routes */}
      {CAMPS.map((a, i) =>
        CAMPS.map((b, j) =>
          j > i ? (
            <Arrow
              key={`${i}${j}`}
              from={top(a)}
              to={top(b)}
              head={false}
              tone={voting > 0 && voting < 1 ? (i === TRAITOR || j === TRAITOR ? 'bad' : 'ok') : 'lane'}
              opacity={voting > 0 && voting < 1 ? 0.8 : 0.45}
            />
          ) : null,
        ),
      )}

      {/* the city */}
      <Shadow at={CITY} spec={{ w: 46, d: 46, h: 26 }} />
      <Box at={CITY} spec={{ w: 46, d: 46, h: 26 }} />
      <Box at={CITY} spec={{ w: 16, d: 16, h: 22, z: 26 }} />
      <Text x={CITY[0] + 40} y={CITY[1] + 26} className="iso-sub" anchor="start">
        city
      </Text>

      {/* the camps, their generals and their stakes */}
      {CAMPS.map((c, i) => {
        const traitor = i === TRAITOR && exposed;
        const coinAt: Pt = [c[0] + 26, c[1] + 6];
        return (
          <g key={i}>
            <Shadow at={c} spec={TENT} />
            <Box at={c} spec={TENT} tone={traitor ? 'bad' : 'key'} />
            <path className="iso-line" d={`M${c[0]} ${c[1] - 20} V${c[1] - 38}`} />
            <path d={`M${c[0]} ${c[1] - 38} l12 4 l-12 4 Z`} style={{ fill: traitor ? 'var(--bad)' : 'var(--key)' }} />
            {stake > 0 && <Coins at={coinAt} n={3 * stake} tone={i === TRAITOR && slashed > 0.3 ? 'bad' : 'key'} opacity={i === TRAITOR ? 1 - slashed : 1} />}
            <Text x={LABEL_AT[i][0]} y={LABEL_AT[i][1]}>
              General {NAMES[i]}
            </Text>
            {traitor && (
              <Text x={LABEL_AT[i][0]} y={LABEL_AT[i][1] + 14} className="iso-note is-bad">
                traitor
              </Text>
            )}
          </g>
        );
      })}

      {/* what B and C ended up believing */}
      {confused && (
        <>
          <Pill at={[CAMPS[1][0] - 66, CAMPS[1][1] - 12]} text="B: retreat?" tone="bad" />
          <Pill at={[CAMPS[2][0], CAMPS[2][1] - 60]} text="C: attack?" tone="ok" />
          <Badge at={STATUS} ok={false} scale={backOut(prog(t, 4.4, 0.3))} r={10} />
          <Text x={STATUS[0]} y={STATUS[1] + 26} className="iso-note is-bad" opacity={prog(t, 4.4, 0.3)}>
            no agreement
          </Text>
        </>
      )}

      {pills.map((p, i) => (
        <Pill key={i} at={p.at} text={p.text} tone={p.tone} />
      ))}
      {votes.map((v, i) => (
        <circle key={i} cx={v.at[0]} cy={v.at[1]} r={4.5} className={v.ok ? 'badge-ok' : 'badge-bad'} />
      ))}

      {/* the decision, and the traitor's stake */}
      {decided > 0 && (
        <>
          <Badge at={STATUS} ok scale={decided} r={10} />
          <Pill at={[STATUS[0], STATUS[1] + 26]} text="attack · 3/4 votes" tone="ok" opacity={Math.min(1, decided)} />
        </>
      )}
      <Text x={CAMPS[TRAITOR][0] + 64} y={CAMPS[TRAITOR][1] + 2} className="iso-note is-bad" anchor="start" opacity={slashed > 0 ? Math.min(1, slashed * 2) : 0}>
        two conflicting votes
      </Text>
      <Text x={CAMPS[TRAITOR][0] + 64} y={CAMPS[TRAITOR][1] + 16} className="iso-note is-bad" anchor="start" opacity={slashed > 0 ? Math.min(1, slashed * 2) : 0}>
        → loses stake
      </Text>
    </g>
  );
}

export function ByzantineScene() {
  return (
    <IsoFigure
      title="The Byzantine Generals Problem: a traitor who says two different things leaves the generals divided; when everyone stakes and votes in the open, 2/3 decides and the one who said two things loses their stake"
      viewBox="0 0 440 300"
      duration={DURATION}
      poster={10.9}
      steps={STEPS}
      render={render}
    />
  );
}
