'use client';

import type { BoxSpec, Pt } from '@/lib/ethereum/iso';
import { leftFace, toPoints } from '@/lib/ethereum/iso';
import { backOut, easeInOut, prog } from '@/lib/ethereum/timeline';
import { IsoFigure, type Step } from './figure';
import { Arrow, Badge, Box, Shadow, Text, type Tone } from './parts';

/**
 * Recovery phrase → private key → public key → address, each step one-way:
 * knowing an address (or a public key) never gives back the private key.
 */

const DURATION = 10;
const Y = 150;
const XS = [72, 192, 312, 418];
const SHEET: BoxSpec = { w: 46, d: 34, h: 4 };
const KEY: BoxSpec = { w: 32, d: 32, h: 30 };
const TAG: BoxSpec = { w: 44, d: 22, h: 10 };

const STAGES: { label: string; sub: string; value: string; tone: Tone; secret: boolean }[] = [
  { label: 'Recovery phrase', sub: '12 or 24 words', value: 'apple · river · …', tone: 'device', secret: true },
  { label: 'Private key', sub: '256-bit number', value: '0x4c08…a1f2', tone: 'key', secret: true },
  { label: 'Public key', sub: 'from private key', value: '0x04b3…9e1c', tone: 'tx', secret: false },
  { label: 'Address', sub: '20 bytes', value: '0x71C7…976F', tone: 'final', secret: false },
];

const STEPS: Step[] = [
  { at: 0, title: 'Recovery phrase', body: 'The wallet generates a very large random number and writes it down as 12 or 24 words. From this phrase, the wallet computes the private key.' },
  { at: 1.6, title: 'Public key', body: 'From the private key, the wallet computes the public key using a math operation that only goes one way.' },
  { at: 3.2, title: 'Address', body: 'Hash the public key and take the last 20 bytes, written as 0x followed by 40 characters. That is your address.' },
  { at: 5.2, title: 'No way back', body: 'Knowing the address or the public key does not let anyone work out the private key. Share your address freely; keep the key and the phrase secret.' },
];

/** When stage i becomes known: the first at 0, then one every 1.6 s. */
const reveal = (i: number) => (i === 0 ? 0 : 0.2 + i * 1.6 - 0.2);

function Stage({ i, t }: { i: number; t: number }) {
  const s = STAGES[i];
  const at: Pt = [XS[i], Y];
  const on = i === 0 ? 1 : prog(t, reveal(i) + 0.6, 0.35);
  const pop = i === 0 ? 1 : backOut(prog(t, reveal(i) + 0.6, 0.35));
  const spec = i === 0 ? SHEET : i === 3 ? TAG : KEY;
  // the phrase: word lines on the sheet's top face; the key: a keyhole on its left face
  const F = leftFace(at[0], at[1], KEY);
  return (
    <g>
      <Shadow at={at} spec={spec} />
      <g opacity={0.25 + 0.75 * on}>
        <Box at={[at[0], at[1] - (1 - pop) * 10]} spec={spec} tone={on > 0.5 ? s.tone : 'device'}>
          {i === 0 &&
            [8, 15, 22].map((v) => (
              <path
                key={v}
                className="vent"
                d={`M${at[0] - 18 + v * 0.3} ${at[1] - 9 + v * 0.55} l${22} ${-12}`}
              />
            ))}
          {i === 1 && <polygon className="rack" points={toPoints([F(13, 9), F(19, 9), F(17.5, 20), F(14.5, 20)])} />}
        </Box>
      </g>
      <Text x={at[0]} y={Y + 40} opacity={0.4 + 0.6 * on}>
        {s.label}
      </Text>
      <Text x={at[0]} y={Y + 55} className={s.secret ? 'iso-sub is-key' : 'iso-sub'} opacity={0.4 + 0.6 * on}>
        {s.secret ? 'keep secret' : 'safe to share'}
      </Text>
      <Text x={at[0]} y={Y - 48} className="iso-sub" opacity={on}>
        {s.sub}
      </Text>
      <Text x={at[0]} y={Y - 64} className={i === 3 ? 'iso-hash is-ok' : 'iso-hash'} opacity={on}>
        {s.value}
      </Text>
    </g>
  );
}

function render(t: number) {
  const back = prog(t, 5.2, 1.2);
  const denied = backOut(prog(t, 6.2, 0.35));
  const fade = 1 - prog(t, 9.3, 0.6);
  return (
    <g opacity={fade < 1 ? 0.35 + 0.65 * fade : 1}>
      {/* forward: one-way arrows, a token runs along each as the next value is computed */}
      {[0, 1, 2].map((i) => {
        const from: Pt = [XS[i] + 32, Y - 14];
        const to: Pt = [XS[i + 1] - 32, Y - 14];
        const run = prog(t, reveal(i + 1), 0.6);
        return (
          <g key={i}>
            <Arrow from={from} to={to} tone={run > 0 ? 'block' : 'lane'} />
            {run > 0 && run < 1 && (
              <circle cx={from[0] + (to[0] - from[0]) * easeInOut(run)} cy={Y - 14} r={4} className="badge-ok" style={{ fill: 'var(--block)' }} />
            )}
          </g>
        );
      })}
      {/* backward: the attempt from the address fails at every step */}
      {back > 0 && (
        <>
          <Arrow from={[XS[3] - 32, Y + 4]} to={[XS[1] + 32, Y + 4]} tone="bad" k={easeInOut(back)} />
          {[0, 1].map((j) => (
            <Badge key={j} at={[(XS[j + 1] + XS[j + 2]) / 2, Y + 4]} ok={false} scale={j === 0 ? denied : backOut(prog(t, 6.0, 0.35))} />
          ))}
          <Text x={(XS[1] + XS[3]) / 2} y={Y + 82} className="iso-note is-bad" opacity={prog(t, 6.3, 0.3)}>
            cannot be reversed
          </Text>
        </>
      )}
      {STAGES.map((_, i) => (
        <Stage key={i} i={i} t={t} />
      ))}
    </g>
  );
}

export function KeysScene() {
  return (
    <IsoFigure
      title="From the recovery phrase to the private key, the public key and then the address; each step only goes one way"
      viewBox="0 0 480 260"
      duration={DURATION}
      poster={7.4}
      steps={STEPS}
      render={render}
    />
  );
}
