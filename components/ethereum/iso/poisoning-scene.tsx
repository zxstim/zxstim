'use client';

import type { BoxSpec, Pt } from '@/lib/ethereum/iso';
import { backOut, easeInOut, lerp, prog } from '@/lib/ethereum/timeline';
import { IsoFigure, type Step } from './figure';
import { Badge, Box, Card, Phone, Pill, Shadow, Text } from './parts';

/**
 * Address poisoning: an attacker grinds out an address whose first and last
 * characters match one you send to, then creates a zero-value transaction so
 * it shows up in your history. Shortened, the two rows look the same; copy
 * the wrong one and the money goes to the attacker. Only the full address
 * (or your wallet's address book) tells them apart.
 */

const DURATION = 12.6;
const ME: Pt = [70, 252];
const FRIEND: Pt = [214, 252];
const THIEF: Pt = [372, 252];
const GRINDER: Pt = [372, 168];
const GRINDER_SPEC: BoxSpec = { w: 40, d: 40, h: 24 };
const HISTORY = { x: 14, y: 16, w: 226 };
const REAL = { head: '0x71C7', mid: '656EC7ab88b098defB751B7401B5f6d8', tail: '976F' };
const FAKE = { head: '0x71C7', mid: 'a3E09c1d44B2F0e8C5d6aB91f3E2c7d0', tail: '976F' };
const SHORT = '0x71C7…976F';

const STEPS: Step[] = [
  { at: 0, title: 'The attacker makes a look-alike', body: 'A computer tries billions of addresses until it finds one whose first and last few characters match an address you often send to.' },
  { at: 3, title: 'Slipping into your history', body: 'The attacker creates a zero-value transaction from the fake address so it shows up in your transaction history. Shortened, the two rows look the same.' },
  { at: 5.8, title: 'Copying the wrong one', body: 'Next time, you copy the address from your history and pick the wrong row. 1,000 USDC goes to the attacker, and there is no getting it back.' },
  { at: 9, title: 'Check the whole address', body: "The two addresses only match at the start and the end. Use your wallet's address book, and check the whole address before you send." },
];

/** a pseudo-random shortened address, for the grinder's attempts */
function attempt(n: number) {
  const hex = '0123456789abcdef';
  let x = (n * 2654435761) >>> 0;
  let s = '';
  for (let i = 0; i < 8; i++) {
    x = (x * 1103515245 + 12345) >>> 0;
    s += hex[(x >>> 16) & 15];
  }
  return `0x${s.slice(0, 4)}…${s.slice(4)}`;
}

function fly(from: Pt, to: Pt, k: number, arc = 24): Pt {
  const e = easeInOut(k);
  return [lerp(from[0], to[0], e), lerp(from[1], to[1], e) - Math.sin(Math.PI * e) * arc];
}

const above = (p: Pt): Pt => [p[0] + 8, p[1] - 54];

function render(t: number) {
  const fade = 1 - prog(t, DURATION - 0.6, 0.6);
  const grinding = t >= 0.4 && t < 2.4;
  const found = t >= 2.4;
  const dust = prog(t, 3, 1.2);
  const poisoned = t >= 4.2;
  const copy = prog(t, 5.8, 0.9);
  const send = prog(t, 6.9, 1.2);
  const lost = t >= 8.1;
  const compare = prog(t, 9, 0.5);
  const dim = 1 - compare * 0.75;

  const rows = poisoned
    ? [`from  ${SHORT}       0 USDC`, `to    ${SHORT}     500 USDC`, 'from  0x3f9A…12bE   0.2 ETH']
    : [`to    ${SHORT}     500 USDC`, 'from  0x3f9A…12bE   0.2 ETH'];
  const picked = copy > 0;

  const pills: { at: Pt; text: string; tone: 'tx' | 'ok' | 'bad' | 'key' | 'lane' }[] = [];
  if (dust > 0 && dust < 1) pills.push({ at: fly(above(THIEF), above(ME), dust, 40), text: '0 USDC', tone: 'lane' });
  if (copy > 0 && copy < 1) pills.push({ at: fly([HISTORY.x + 60, HISTORY.y + 34], above(ME), copy, 0), text: 'copy address', tone: 'tx' });
  if (send > 0 && send < 1) pills.push({ at: fly(above(ME), above(THIEF), send, 50), text: `send 1,000 USDC → ${SHORT}`, tone: 'tx' });

  return (
    <g opacity={fade < 1 ? 0.3 + 0.7 * fade : 1}>
      <g opacity={dim}>
        {/* your wallet's history */}
        <Card
          x={HISTORY.x}
          y={HISTORY.y}
          w={HISTORY.w}
          title="TRANSACTION HISTORY"
          rows={rows}
          active={picked && !lost ? 0 : undefined}
          highlight={lost ? 0 : undefined}
        />

        {/* the attacker's address grinder */}
        <Shadow at={GRINDER} spec={GRINDER_SPEC} />
        <Box at={GRINDER} spec={GRINDER_SPEC} tone={grinding ? 'bad' : 'device'} />
        <Text x={GRINDER[0]} y={GRINDER[1] - 50} className={found ? 'iso-hash is-bad' : 'iso-hash'}>
          {found ? SHORT : attempt(Math.floor(t / 0.11))}
        </Text>
        <Text x={GRINDER[0]} y={GRINDER[1] - 66} className="iso-sub">
          {found ? 'start and end match' : 'guessing addresses'}
        </Text>
        <Text x={GRINDER[0]} y={GRINDER[1] + 30} className="iso-sub">
          address generator
        </Text>

        {/* people */}
        <Phone at={ME} lit={copy > 0.8 && send < 0.2} />
        <Text x={ME[0] + 8} y={ME[1] + 30}>
          You
        </Text>
        <Phone at={FRIEND} />
        <Text x={FRIEND[0] + 8} y={FRIEND[1] + 30}>
          Bob
        </Text>
        <Text x={FRIEND[0] + 8} y={FRIEND[1] + 44} className="iso-sub">
          real {SHORT}
        </Text>
        <Badge at={[FRIEND[0] + 8, FRIEND[1] - 62]} ok={false} scale={lost ? backOut(prog(t, 8.1, 0.3)) : 0} r={8} />
        <g className="tone-bad">
          <Phone at={THIEF} />
        </g>
        <Text x={THIEF[0] + 8} y={THIEF[1] + 30} className="iso-note is-bad">
          attacker
        </Text>
        <Text x={THIEF[0] + 8} y={THIEF[1] + 44} className="iso-sub">
          fake {SHORT}
        </Text>
        <Text x={THIEF[0] - 14} y={THIEF[1] - 12} anchor="end" className="iso-note is-bad" opacity={lost ? prog(t, 8.1, 0.3) : 0}>
          sent to attacker
        </Text>

        {pills.map((p, i) => (
          <Pill key={i} at={p.at} text={p.text} tone={p.tone} />
        ))}
      </g>

      {/* the full addresses, side by side */}
      {compare > 0 && (
        <Card
          x={14}
          y={104}
          w={412}
          title="COMPARE IN FULL"
          opacity={compare}
          rows={[
            <>
              {'real  '}
              {REAL.head}
              <tspan style={{ fill: 'var(--vote)', fontWeight: 700 }}>{REAL.mid}</tspan>
              {REAL.tail}
            </>,
            <>
              {'fake  '}
              {FAKE.head}
              <tspan style={{ fill: 'var(--bad)', fontWeight: 700 }}>{FAKE.mid}</tspan>
              {FAKE.tail}
            </>,
          ]}
        />
      )}
    </g>
  );
}

export function PoisoningScene() {
  return (
    <IsoFigure
      title="Address poisoning: an attacker makes an address whose start and end match one you often send to, and slips it into your transaction history with a zero-value transaction; copy the wrong one and the money goes to the attacker; only comparing the whole address shows the difference"
      viewBox="0 0 440 300"
      duration={DURATION}
      poster={7.6}
      steps={STEPS}
      render={render}
    />
  );
}
