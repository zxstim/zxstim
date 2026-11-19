'use client';

import type { BoxSpec, Pt } from '@/lib/ethereum/iso';
import { iso } from '@/lib/ethereum/iso';
import { backOut, clamp01, easeInOut, lerp, prog } from '@/lib/ethereum/timeline';
import { IsoFigure, type Step } from './figure';
import { Badge, Box, Card, Coins, Flame, Pill, Server, Shadow, Text } from './parts';

/**
 * Why gas: every computation step costs gas, unused gas is not charged, the
 * base fee is burned and the tip goes to the validator; a program that would
 * run forever runs out of gas, is stopped and reverted, and still pays.
 */

const DURATION = 14;
const EVM: Pt = [222, 214];
const EVM_SPEC: BoxSpec = { w: 76, d: 48, h: 24 };
const OPS = 5;
const OP: BoxSpec = { w: 10, d: 10, h: 8, z: EVM_SPEC.h };
const opAt = (k: number): Pt => iso(EVM[0], EVM[1], -28 + k * 14, 0);
const TANK = { x: 172, top: 36, bottom: 126 };
const FLAME: Pt = [350, 116];
const VALIDATOR: Pt = [392, 232];
const LIMIT = 60000;
const USED = 46000;

const STEPS: Step[] = [
  { at: 0, title: 'Every computation step costs gas', body: 'Every operation on Ethereum has a fixed gas cost. A plain ETH transfer costs 21,000 gas; calling a contract costs more.' },
  { at: 3.4, title: 'Unused gas is not charged', body: 'You set a gas limit for the transaction. When it is done, the gas it did not use is not charged.' },
  { at: 4.6, title: 'The base fee is burned', body: 'The base fee part is burned, removed from circulation. The tip (priority fee) goes to the validator.' },
  { at: 7, title: 'An endless loop has to stop', body: 'A program that would run forever runs out of gas and is stopped. All its changes are reverted, but the fee is still lost. That way, no one can freeze the network.' },
];

const fmt = new Intl.NumberFormat('en-US');

function render(t: number) {
  const loop = t >= 7;
  const fade = 1 - prog(t, 13.4, 0.6);

  // gas left, as a share of the limit
  let left: number;
  let lit = -1;
  if (!loop) {
    const run = prog(t, 0.8, 2.4);
    left = 1 - (USED / LIMIT) * run;
    if (run > 0 && run < 1) lit = Math.min(OPS - 1, Math.floor(run * OPS));
  } else {
    const run = prog(t, 7.4, 3);
    left = 1 - run;
    if (run > 0 && run < 1) lit = Math.floor((t - 7.4) / 0.32) % OPS;
  }
  const done = !loop && t >= 3.4;
  const outOfGas = loop && t >= 10.4;
  const pay = loop ? prog(t, 11.2, 1.1) : prog(t, 4.6, 1.4);

  const fly = (to: Pt, k: number): Pt => {
    const e = easeInOut(k);
    return [lerp(EVM[0], to[0], e), lerp(EVM[1] - 40, to[1], e) - Math.sin(Math.PI * e) * 26];
  };

  return (
    <g opacity={fade < 1 ? 0.3 + 0.7 * fade : 1}>
      {/* the transaction and its gas */}
      <Card
        x={12}
        y={30}
        w={146}
        title="TRANSACTION"
        rows={[loop ? 'endless loop' : 'call a contract', `gas limit ${fmt.format(LIMIT)}`]}
        highlight={loop ? 0 : undefined}
      />
      <rect x={TANK.x - 5} y={TANK.top} width={10} height={TANK.bottom - TANK.top} className="card" />
      <rect
        x={TANK.x - 5}
        y={TANK.bottom - (TANK.bottom - TANK.top) * left}
        width={10}
        height={(TANK.bottom - TANK.top) * left}
        style={{ fill: done ? 'var(--vote)' : outOfGas ? 'var(--bad)' : 'var(--tx)' }}
      />
      <Text x={TANK.x} y={TANK.bottom + 16} className="iso-sub">
        gas left
      </Text>
      {done && (
        <Pill at={[TANK.x + 4, TANK.top - 14]} text={`${fmt.format(LIMIT - USED)} unused: not charged`} tone="ok" opacity={Math.min(1, prog(t, 3.4, 0.3)) * (1 - prog(t, 6.6, 0.3))} />
      )}
      {outOfGas && <Pill at={[TANK.x + 4, TANK.top - 14]} text="out of gas: stop" tone="bad" opacity={1 - prog(t, 13.2, 0.3)} />}

      {/* the EVM, running the steps */}
      <Shadow at={EVM} spec={EVM_SPEC} />
      <Box at={EVM} spec={EVM_SPEC} tone={outOfGas ? 'bad' : 'block'} />
      {Array.from({ length: OPS }, (_, k) => (
        <Box key={k} at={opAt(k)} spec={OP} tone={k === lit ? (loop ? 'bad' : 'tx') : 'device'} />
      ))}
      {loop && t < 10.4 && t >= 7.4 && (
        <path
          className="iso-line"
          data-tone="bad"
          d={`M${opAt(OPS - 1)[0] + 6} ${opAt(OPS - 1)[1] - 40} Q${EVM[0]} ${EVM[1] - 92} ${opAt(0)[0] - 6} ${opAt(0)[1] - 40}`}
        />
      )}
      <Text x={EVM[0]} y={EVM[1] + 48}>
        EVM
      </Text>
      <Text x={EVM[0]} y={EVM[1] + 62} className="iso-sub">
        every node runs each step
      </Text>
      <Badge at={[EVM[0] + 54, EVM[1] - 52]} ok scale={done ? backOut(prog(t, 3.2, 0.3)) * (1 - prog(t, 6.6, 0.3)) : 0} r={9} />
      <Badge at={[EVM[0] + 54, EVM[1] - 52]} ok={false} scale={outOfGas ? backOut(prog(t, 10.4, 0.3)) : 0} r={9} />
      {outOfGas && (
        <Text x={EVM[0] + 68} y={EVM[1] - 48} className="iso-note is-bad" anchor="start">
          reverted
        </Text>
      )}

      {/* the fee: base fee burned, tip to the validator */}
      <Flame at={FLAME} scale={1 + 0.15 * Math.sin(t * 9) * (pay > 0 && pay < 1 ? 1 : 0.3)} />
      <Text x={FLAME[0]} y={FLAME[1] + 18} className="iso-sub">
        base fee: burned
      </Text>
      <Server at={VALIDATOR} spec={{ w: 20, d: 20, h: 26 }} />
      <Coins at={[VALIDATOR[0] - 26, VALIDATOR[1] + 6]} n={t >= 12.3 ? 3 : t >= 6 ? 2 : 0} />
      <Text x={VALIDATOR[0] - 4} y={VALIDATOR[1] + 34} className="iso-sub">
        tip:
      </Text>
      <Text x={VALIDATOR[0] - 4} y={VALIDATOR[1] + 47} className="iso-sub">
        to validator
      </Text>
      {pay > 0 && pay < 1 && (
        <>
          <Box at={fly([FLAME[0], FLAME[1] - 10], clamp01(pay * 1.2))} spec={{ w: 10, d: 10, h: 3 }} tone="key" />
          <Box at={fly([VALIDATOR[0] - 26, VALIDATOR[1] - 4], clamp01(pay * 1.2 - 0.2))} spec={{ w: 10, d: 10, h: 3 }} tone="key" />
        </>
      )}
      {loop && t >= 11.2 && (
        <Text x={EVM[0]} y={EVM[1] - 108} className="iso-note is-bad" opacity={1 - prog(t, 13.2, 0.3)}>
          fee still lost
        </Text>
      )}
    </g>
  );
}

export function GasScene() {
  return (
    <IsoFigure
      title="Gas: every computation step costs gas, unused gas is not charged, the base fee is burned and the tip goes to the validator; a program that would run forever runs out of gas, is stopped and reverted, but still pays the fee"
      viewBox="0 0 440 300"
      duration={DURATION}
      poster={5.6}
      steps={STEPS}
      render={render}
    />
  );
}
