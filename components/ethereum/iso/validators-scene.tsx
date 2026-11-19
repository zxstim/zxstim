'use client';

import type { BoxSpec, Pt } from '@/lib/ethereum/iso';
import { COS30, iso } from '@/lib/ethereum/iso';
import { backOut, easeInOut, hash01, lerp, prog } from '@/lib/ethereum/timeline';
import { IsoFigure, type Step } from './figure';
import { Box, Coins, Phone, Pill, Shadow, Text } from './parts';

/**
 * Validators: to take part you lock up ETH in the deposit contract; validators
 * run all over the world; doing the job earns rewards; signing two conflicting
 * blocks gets a validator slashed and removed.
 */

const DURATION = 12;
const WORLD: Pt = [220, 186];
const TILE_H = 3;
const VAL: BoxSpec = { w: 9, d: 9, h: 11, z: TILE_H };

/**
 * Stylised continents, placed by rough longitude/latitude (−1…1) so west is
 * left and north is up. Not a map; `n` is how many validators to scatter.
 */
const REGIONS = [
  { name: 'N. America', lon: -0.62, lat: 0.45, w: 60, d: 46, n: 7 },
  { name: 'S. America', lon: -0.45, lat: -0.45, w: 34, d: 40, n: 2 },
  { name: 'Europe', lon: 0.02, lat: 0.55, w: 40, d: 34, n: 7 },
  { name: 'Africa', lon: 0.08, lat: -0.15, w: 40, d: 46, n: 2 },
  { name: 'Asia', lon: 0.55, lat: 0.4, w: 66, d: 50, n: 6 },
  { name: 'Oceania', lon: 0.72, lat: -0.5, w: 34, d: 26, n: 2 },
] as const;
const K = 115;
const centre = (r: (typeof REGIONS)[number]): Pt => [WORLD[0] + 2 * r.lon * K * COS30, WORLD[1] - r.lat * K];

/** Validators: a deterministic scatter inside each continent, appearing one by one from t = 2.8. */
const VALIDATORS = REGIONS.flatMap((r, ri) =>
  Array.from({ length: r.n }, (_, k) => {
    const c = centre(r);
    const x = (hash01(ri * 31 + k, 1) - 0.5) * (r.w - 14);
    const y = (hash01(ri * 31 + k, 2) - 0.5) * (r.d - 14);
    return { region: ri, at: iso(c[0], c[1], x, y) };
  }),
)
  .sort((a, b) => a.at[1] - b.at[1])
  .map((v, i) => ({ ...v, appear: 2.8 + hash01(i, 5) * 2.8 }));
/** "yours", in South-East Asia, and the one that cheats, in Europe */
const YOURS = iso(centre(REGIONS[4])[0], centre(REGIONS[4])[1], 8, 16);
const EUROPE = 2;
const CHEAT = VALIDATORS.findIndex((v) => v.region === EUROPE);
const YOURS_LABEL: Pt = [436, 104];

const DEPOSIT: Pt = [120, 56];
const PHONE: Pt = [34, 70];

const STEPS: Step[] = [
  { at: 0, title: 'Stake to take part', body: 'To become a validator, you lock at least 32 ETH in the deposit contract. No stake, no vote.' },
  { at: 2.8, title: 'All over the world', body: 'Validators run at home, in offices and in data centers on every continent. No single place controls the network.' },
  { at: 6.4, title: 'Doing the job earns rewards', body: 'Proposing blocks and voting on time earns extra ETH. Being offline costs a little.' },
  { at: 9, title: 'Cheating is punished hard', body: 'Signing two conflicting blocks for the same slot is cheating: part of the stake is slashed and the validator is removed from the network.' },
];

function render(t: number) {
  const fade = 1 - prog(t, 11.4, 0.6);
  const send = prog(t, 0.4, 1.2);
  const mine = backOut(prog(t, 1.8, 0.4));
  const reward = t >= 6.4 && t < 9;
  const cheat = prog(t, 9, 0.6);
  const gone = prog(t, 10, 0.8);

  return (
    <g opacity={fade < 1 ? 0.3 + 0.7 * fade : 1}>
      {/* the world: continents, west on the left, north up */}
      {REGIONS.map((r) => (
        <g key={r.name}>
          <Shadow at={centre(r)} spec={{ w: r.w, d: r.d, h: TILE_H }} />
          <Box at={centre(r)} spec={{ w: r.w, d: r.d, h: TILE_H }} tone="final" />
        </g>
      ))}

      {/* validators, back to front */}
      {VALIDATORS.map((v, i) => {
        const pop = backOut(prog(t, v.appear, 0.35));
        if (pop <= 0) return null;
        const isCheat = i === CHEAT && t >= 9;
        const drop = isCheat ? gone : 0;
        return (
          <g key={i} opacity={1 - drop}>
            <Box at={[v.at[0], v.at[1] + drop * 10 - (1 - pop) * 8]} spec={VAL} tone={isCheat ? 'bad' : 'device'} />
            {reward && hash01(i, Math.floor(t * 2)) > 0.55 && (
              <text x={v.at[0] + 7} y={v.at[1] - 20} className="iso-note is-ok">
                +
              </text>
            )}
          </g>
        );
      })}
      {/* yours */}
      {mine > 0 && (
        <g>
          <Box at={[YOURS[0], YOURS[1] - (1 - mine) * 10]} spec={VAL} tone="key" />
          <path className="iso-line" data-tone="key" d={`M${YOURS_LABEL[0] - 56} ${YOURS_LABEL[1] + 4} L${YOURS[0] + 4} ${YOURS[1] - 16}`} opacity={mine} />
          <Text x={YOURS_LABEL[0]} y={YOURS_LABEL[1]} className="iso-note is-key" anchor="end">
            yours
          </Text>
          {reward && (
            <Text x={YOURS_LABEL[0]} y={YOURS_LABEL[1] + 15} className="iso-note is-ok" anchor="end">
              + reward
            </Text>
          )}
        </g>
      )}

      {/* region names, on top */}
      {REGIONS.map((r) => {
        const c = centre(r);
        return (
          <Text key={r.name} x={c[0]} y={c[1] + (r.w + r.d) / 4 + 14} className="iso-sub">
            {r.name}
          </Text>
        );
      })}

      {/* depositing the stake */}
      <Phone at={PHONE} />
      <Box at={DEPOSIT} spec={{ w: 26, d: 26, h: 18 }} tone="block" />
      <Text x={DEPOSIT[0] + 26} y={DEPOSIT[1] - 6} className="iso-sub" anchor="start">
        deposit contract
      </Text>
      {t < 9 && <Coins at={[DEPOSIT[0] + 2, DEPOSIT[1] - 22]} n={send >= 1 ? 4 : 0} />}
      {send > 0 && send < 1 && (
        <Pill
          at={[lerp(PHONE[0] + 10, DEPOSIT[0], easeInOut(send)), lerp(PHONE[1] - 46, DEPOSIT[1] - 30, easeInOut(send)) - Math.sin(Math.PI * send) * 16]}
          text="32 ETH"
          tone="key"
        />
      )}

      {/* the cheat */}
      {cheat > 0 && (
        <>
          <Pill at={[centre(REGIONS[EUROPE])[0], centre(REGIONS[EUROPE])[1] - 58]} text="signs 2 conflicting blocks" tone="bad" opacity={Math.min(1, cheat * 2) * (1 - prog(t, 10, 0.4))} />
          <Text x={centre(REGIONS[EUROPE])[0]} y={centre(REGIONS[EUROPE])[1] - 52} className="iso-note is-bad" opacity={prog(t, 10.4, 0.4)}>
            slashed · removed
          </Text>
        </>
      )}
    </g>
  );
}

export function ValidatorsScene() {
  return (
    <IsoFigure
      title="Validators: stake 32 ETH to take part, run on every continent, earn rewards for doing the job right, and get slashed and removed for cheating"
      viewBox="0 0 440 300"
      duration={DURATION}
      poster={7.2}
      steps={STEPS}
      render={render}
    />
  );
}
