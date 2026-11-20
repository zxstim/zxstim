'use client';

import type { ReactNode } from 'react';
import type { BoxSpec, Pt } from '@/lib/ethereum/iso';
import { clamp01, easeInOut, easeOut, lerp, prog } from '@/lib/ethereum/timeline';
import { IsoFigure, type Step } from './figure';
import { Box, Card, Cube, Pill, Shadow, Text } from './parts';

/**
 * `count = count + 1` on the EVM, with `count` in storage slot 0 holding 5:
 * PUSH0 SLOAD PUSH1 1 ADD PUSH0 SSTORE. The stack is a tower of cubes, storage
 * a striped vault with its slot shown on a card, and the gas bar shows that
 * the two storage opcodes cost 5,000 of the 5,010 gas.
 *
 * The figures were checked on anvil (Foundry 1.5, Fusaka rules): runtime code
 * 0x5f546001015f5500 against slot 0 = 5 used 26,010 gas, i.e. 21,000 + 5,010
 * (SLOAD cold 2,100; SSTORE warm, nonzero → nonzero 2,900).
 */

const DURATION = 15.5;
const OP_LEN = 1.2;
const SUMMARY = 11;

type Item = { v: string; key?: boolean };
const OPS: { code: string; name: string; at: number; gas: number; does: string }[] = [
  { code: '5f   ', name: 'PUSH0', at: 0.6, gas: 2, does: 'push 0 (the slot number)' },
  { code: '54   ', name: 'SLOAD', at: 2.2, gas: 2100, does: 'pop the slot, read slot 0: 5' },
  { code: '60 01', name: 'PUSH1 1', at: 4.4, gas: 3, does: 'push 1' },
  { code: '01   ', name: 'ADD', at: 5.8, gas: 3, does: 'pop 5 and 1, push 6' },
  { code: '5f   ', name: 'PUSH0', at: 7.4, gas: 2, does: 'push 0 (the slot number)' },
  { code: '55   ', name: 'SSTORE', at: 8.8, gas: 2900, does: 'pop slot and value, write 6 to slot 0' },
];
/** the stack before each op, and after the last */
const STACKS: Item[][] = [
  [],
  [{ v: '0', key: true }],
  [{ v: '5' }],
  [{ v: '5' }, { v: '1' }],
  [{ v: '6' }],
  [{ v: '6' }, { v: '0', key: true }],
  [],
];
const TOTAL = OPS.reduce((s, o) => s + o.gas, 0);
const isStorage = (i: number) => i === 1 || i === 5;

const STACK: Pt = [245, 210];
const CELL: BoxSpec = { w: 36, d: 36, h: 16 };
const RISE = 20;
const BASE: BoxSpec = { w: 48, d: 48, h: 3 };
const VAULT: Pt = [402, 210];
const VAULT_SPEC: BoxSpec = { w: 44, d: 44, h: 28 };
const SLOT_CARD = { x: 350, y: 84, w: 104 };
/** where values leave and reach storage: just left of the slot card */
const SLOT_PORT: Pt = [SLOT_CARD.x - 16, SLOT_CARD.y + 30];
const BAR = { x: 60, y: 266, w: 360, h: 10 };

const STEPS: Step[] = [
  {
    at: 0,
    title: 'Read storage',
    body: 'PUSH0 puts the slot number (0) on the stack. SLOAD pops it, reads slot 0 in storage and pushes the value, 5. It is the first time the transaction touches this slot, so it costs 2,100 gas.',
  },
  {
    at: 4.4,
    title: 'Compute on the stack',
    body: 'PUSH1 pushes the number 1. ADD pops the top two numbers and pushes their sum, 6. Each of these costs only 3 gas.',
  },
  {
    at: 7.4,
    title: 'Write storage',
    body: 'PUSH0 puts the slot number on top. SSTORE pops the slot number and the value and writes 6 to slot 0: 2,900 gas. If the slot held 0, the write would cost 20,000 gas.',
  },
  {
    at: SUMMARY,
    title: 'Storage is almost all the cost',
    body: 'The six opcodes cost 5,010 gas, and 5,000 of that is reading and writing storage. The whole transaction costs 21,000 + 5,010 = 26,010 gas, exactly what a test run on anvil used.',
  },
];

const fmt = (n: number) => Math.round(n).toLocaleString('en-US');
const cellZ = (j: number) => j * RISE;
/** top of stack cell j, in screen space, for flying values */
const cellTop = (j: number): Pt => [STACK[0], STACK[1] - cellZ(j) - CELL.h - 18];

function Cell({ j, item, dz = 0, opacity = 1, flash = false }: { j: number; item: Item; dz?: number; opacity?: number; flash?: boolean }) {
  const z = cellZ(j) + dz;
  return (
    <g opacity={opacity}>
      <Box at={STACK} spec={{ ...CELL, z }} tone={item.key ? 'device' : flash ? 'final' : 'tx'} />
      <Text x={STACK[0] + 42} y={STACK[1] - z - 4} anchor="start" className={item.key ? 'iso-hash' : 'iso-hash is-tx'}>
        {item.v}
      </Text>
      {item.key && (
        <Text x={STACK[0] + 56} y={STACK[1] - z - 4} anchor="start" className="iso-sub">
          slot
        </Text>
      )}
    </g>
  );
}

function render(t: number) {
  const fade = 1 - prog(t, DURATION - 0.6, 0.6);
  const i = OPS.findLastIndex((o) => t >= o.at);
  const k = i < 0 ? 1 : prog(t, OPS[i].at, OP_LEN);
  const op = i < 0 ? undefined : OPS[i];
  const before = STACKS[Math.max(0, i)];
  const after = STACKS[i + 1] ?? [];
  const done = i < 0 ? 0 : k >= 1 ? i + 1 : i; // ops fully executed
  const stored = i === 5 ? k >= 0.8 : i > 5;
  const summary = prog(t, SUMMARY, 0.5);

  // the stack, with this op's transition
  const cells: ReactNode[] = [];
  const pills: { at: Pt; text: string }[] = [];
  if (i < 0 || k >= 1) {
    (i < 0 ? STACKS[0] : after).forEach((item, j) => cells.push(<Cell key={j} j={j} item={item} />));
  } else if (op?.name.startsWith('PUSH')) {
    before.forEach((item, j) => cells.push(<Cell key={j} j={j} item={item} />));
    const e = easeOut(clamp01(k / 0.6));
    const j = after.length - 1;
    cells.push(<Cell key="new" j={j} item={after[j]} dz={(1 - e) * 24} opacity={e} />);
  } else if (op?.name === 'SLOAD') {
    const out = clamp01(k / 0.35);
    cells.push(<Cell key="key" j={0} item={before[0]} dz={out * 16} opacity={1 - out} />);
    const fly = clamp01((k - 0.3) / 0.45);
    if (fly > 0 && fly < 1) pills.push({ at: flight(SLOT_PORT, cellTop(0), fly), text: '5' });
    const e = easeOut(clamp01((k - 0.7) / 0.3));
    if (e > 0) cells.push(<Cell key="val" j={0} item={after[0]} dz={(1 - e) * 24} opacity={e} />);
  } else if (op?.name === 'ADD') {
    const sink = easeInOut(clamp01(k / 0.5));
    const merged = k >= 0.5;
    cells.push(<Cell key="a" j={0} item={merged ? after[0] : before[0]} flash={merged && k < 0.85} />);
    if (!merged) cells.push(<Cell key="b" j={1} item={before[1]} dz={-sink * RISE} opacity={1 - sink} />);
  } else if (op?.name === 'SSTORE') {
    const outTop = clamp01(k / 0.3);
    const outVal = clamp01((k - 0.1) / 0.3);
    cells.push(<Cell key="v" j={0} item={before[0]} dz={outVal * 16} opacity={1 - outVal} />);
    cells.push(<Cell key="k" j={1} item={before[1]} dz={outTop * 16} opacity={1 - outTop} />);
    const fly = clamp01((k - 0.3) / 0.5);
    if (fly > 0 && fly < 1) pills.push({ at: flight(cellTop(0), SLOT_PORT, fly), text: '6' });
  }

  // the gas bar: one segment per op, the storage ones in amber
  let x = BAR.x;
  const segs = OPS.map((o, j) => {
    const w = (o.gas / TOTAL) * BAR.w;
    const fill = j < done ? 1 : j === i ? clamp01(k / 0.8) : 0;
    const seg = { x, w, fill, storage: isStorage(j) };
    x += w;
    return seg;
  });
  const used = OPS.reduce((s, o, j) => s + o.gas * (j < done ? 1 : j === i ? clamp01(k / 0.8) : 0), 0);

  return (
    <g opacity={fade < 1 ? 0.35 + 0.65 * fade : 1}>
      {/* the bytecode, current op highlighted */}
      <Card
        x={12}
        y={84}
        w={124}
        title="BYTECODE"
        rows={OPS.map((o) => `${o.code}  ${o.name}`)}
        active={i >= 0 && t < SUMMARY ? i : undefined}
      />

      {/* what the current op does, and what it costs */}
      {op && t < SUMMARY && (
        <g opacity={prog(t, op.at, 0.25)}>
          <Text x={STACK[0]} y={30}>
            {op.name}
          </Text>
          <Text x={STACK[0]} y={47} className="iso-sub">
            {op.does}
          </Text>
          <Pill at={[STACK[0], 66]} text={`+${fmt(op.gas)} gas`} tone={isStorage(i) ? 'key' : 'tx'} />
        </g>
      )}
      {summary > 0 && (
        <g opacity={summary}>
          <Text x={STACK[0]} y={30}>
            6 opcodes: {fmt(TOTAL)} gas
          </Text>
          <Text x={STACK[0]} y={47} className="iso-sub is-key">
            storage reads and writes alone: 5,000 gas
          </Text>
          <Pill at={[STACK[0], 66]} text="whole tx: 21,000 + 5,010 = 26,010 gas" />
        </g>
      )}

      {/* the stack */}
      <Shadow at={STACK} spec={BASE} />
      <Box at={STACK} spec={BASE} />
      {cells}
      <Text x={STACK[0]} y={STACK[1] + 40} className="iso-sub">
        stack
      </Text>

      {/* storage: the vault and its slot */}
      <path className="iso-line" d={`M${VAULT[0]} ${SLOT_CARD.y + 39} V${VAULT[1] - VAULT_SPEC.h - 20}`} style={{ strokeDasharray: '3 3' }} />
      <Shadow at={VAULT} spec={VAULT_SPEC} />
      <Cube at={VAULT} spec={VAULT_SPEC} tone="block" />
      <Text x={VAULT[0]} y={VAULT[1] + 40} className="iso-sub">
        storage
      </Text>
      <Card
        x={SLOT_CARD.x}
        y={SLOT_CARD.y}
        w={SLOT_CARD.w}
        title="STORAGE"
        rows={[`slot 0 = ${stored ? 6 : 5}`]}
        active={(i === 1 || i === 5) && k < 1 ? 0 : undefined}
      />

      {pills.map((p, n) => (
        <Pill key={n} at={p.at} text={p.text} tone="key" />
      ))}

      {/* gas used so far */}
      <Text x={BAR.x - 8} y={BAR.y + 9} anchor="end" className="iso-sub">
        gas
      </Text>
      <rect className="card" x={BAR.x} y={BAR.y} width={BAR.w} height={BAR.h} />
      {segs.map((s, j) =>
        s.fill > 0 ? (
          <rect
            key={j}
            x={s.x}
            y={BAR.y}
            width={Math.max(0.8, s.w * s.fill)}
            height={BAR.h}
            style={{ fill: s.storage ? 'var(--key)' : 'var(--tx)' }}
          />
        ) : null,
      )}
      <Text x={BAR.x + BAR.w + 8} y={BAR.y + 9} anchor="start" className="iso-hash">
        {fmt(used)}
      </Text>
      {segs.map((s, j) =>
        s.storage ? (
          <Text key={j} x={s.x + s.w / 2} y={BAR.y + 26} className="iso-sub is-key" opacity={s.fill}>
            {`${OPS[j].name} ${fmt(OPS[j].gas)}`}
          </Text>
        ) : null,
      )}
    </g>
  );
}

/** a value flying in a shallow arc */
function flight(from: Pt, to: Pt, k: number): Pt {
  const e = easeInOut(k);
  return [lerp(from[0], to[0], e), lerp(from[1], to[1], e) - Math.sin(Math.PI * e) * 28];
}

export function EvmScene() {
  return (
    <IsoFigure
      title="The EVM runs count = count + 1: PUSH0, SLOAD reads 5 from storage, PUSH1 1, ADD gives 6, PUSH0, SSTORE writes 6 to storage; 5,010 gas in total, 5,000 of it for reading and writing storage"
      viewBox="0 0 480 300"
      duration={DURATION}
      poster={12.5}
      steps={STEPS}
      render={render}
    />
  );
}

