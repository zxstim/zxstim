'use client';

import type { BoxSpec, Pt } from '@/lib/ethereum/iso';
import { backOut, easeInOut, lerp, prog } from '@/lib/ethereum/timeline';
import { IsoFigure, type Step } from './figure';
import { Arrow, Badge, Box, Card, Coins, Phone, Pill, Server, Shadow, Text } from './parts';

/**
 * ERC-4337: the wallet builds a UserOperation and sends it to a separate
 * mempool; a bundler packs several into one ordinary transaction to the
 * EntryPoint contract and pays the gas up front. The EntryPoint first asks
 * each account whether the signature satisfies its rules and the paymaster
 * whether it will pay, then executes, and the fee (from the account or the
 * paymaster) repays the bundler. All contracts, no protocol change.
 */

const DURATION = 13.4;
const PHONE: Pt = [52, 262];
const BUNDLER: Pt = [126, 176];
const BUNDLER_SPEC: BoxSpec = { w: 26, d: 26, h: 34 };
const PILE: Pt = [160, 196];
const ENTRY: Pt = [268, 152];
const ENTRY_SPEC: BoxSpec = { w: 58, d: 58, h: 30 };
const ACCOUNT: Pt = [258, 262];
const ACCOUNT_SPEC: BoxSpec = { w: 38, d: 38, h: 24 };
const PAYMASTER: Pt = [392, 244];
const PAYMASTER_SPEC: BoxSpec = { w: 32, d: 32, h: 20 };
const OP: BoxSpec = { w: 10, d: 10, h: 4 };

const STEPS: Step[] = [
  { at: 0, title: 'The wallet builds a UserOperation', body: 'Instead of a regular transaction, the wallet builds a UserOperation: what you want to do, how it is signed (passkey, multisig…) and who pays the fee. It goes into a separate waiting line for bundlers.' },
  { at: 3, title: 'Bundled, gas paid up front', body: 'A bundler packs several UserOperations into one regular transaction sent to the EntryPoint, the shared entry contract, and pays the gas fee up front itself.' },
  { at: 5.4, title: 'Round 1: checks', body: "The EntryPoint asks each account: does the signature follow the account's rules? Then it asks the paymaster whether it agrees to pay the fee. Any operation that fails is dropped before it runs." },
  { at: 8.6, title: 'Round 2: run and repay', body: 'The EntryPoint runs each operation. The fee comes from the account, or from the paymaster if there is one, and repays the bundler. It is all contracts, so no network upgrade is needed.' },
];

function fly(from: Pt, to: Pt, k: number, arc = 24): Pt {
  const e = easeInOut(k);
  return [lerp(from[0], to[0], e), lerp(from[1], to[1], e) - Math.sin(Math.PI * e) * arc];
}

function render(t: number) {
  const fade = 1 - prog(t, DURATION - 0.6, 0.6);
  const mine = prog(t, 0.6, 1.2);
  const other1 = prog(t, 1, 1.1);
  const other2 = prog(t, 1.5, 1.1);
  const bundle = prog(t, 3.1, 1.2);
  const piled = t >= 3.1 ? 0 : (mine >= 1 ? 1 : 0) + (other1 >= 1 ? 1 : 0) + (other2 >= 1 ? 1 : 0);
  const check = prog(t, 5.6, 1);
  const pay = prog(t, 6.8, 1);
  const run = prog(t, 8.8, 1);
  const refund = prog(t, 10.2, 1.4);
  const entryTop: Pt = [ENTRY[0], ENTRY[1] - 60];
  const accTop: Pt = [ACCOUNT[0], ACCOUNT[1] - 46];
  const payTop: Pt = [PAYMASTER[0], PAYMASTER[1] - 40];
  const bundlerTop: Pt = [BUNDLER[0], BUNDLER[1] - 64];

  const pills: { at: Pt; text: string; tone: 'tx' | 'ok' | 'bad' | 'key' | 'lane' }[] = [];
  if (mine > 0 && mine < 1) pills.push({ at: fly([PHONE[0] + 8, PHONE[1] - 54], [PILE[0], PILE[1] - 20], mine), text: 'UserOperation', tone: 'tx' });
  if (other1 > 0 && other1 < 1) pills.push({ at: fly([-10, 150], [PILE[0], PILE[1] - 20], other1), text: 'other op', tone: 'lane' });
  if (other2 > 0 && other2 < 1) pills.push({ at: fly([-10, 210], [PILE[0], PILE[1] - 20], other2), text: 'other op', tone: 'lane' });
  if (bundle > 0 && bundle < 1) pills.push({ at: fly(bundlerTop, entryTop, bundle, 30), text: '1 transaction · 3 ops', tone: 'tx' });
  if (check > 0 && check < 1) pills.push({ at: fly(entryTop, accTop, check, 0), text: 'rules OK?', tone: 'key' });
  if (pay > 0 && pay < 1) pills.push({ at: fly(entryTop, payTop, pay, 0), text: 'pay the fee?', tone: 'key' });
  if (run > 0 && run < 1) pills.push({ at: fly(entryTop, accTop, run, 0), text: 'run: swap 100 USDC', tone: 'tx' });
  if (refund > 0 && refund < 1) pills.push({ at: fly(payTop, bundlerTop, refund, 60), text: 'repay gas fee', tone: 'ok' });

  return (
    <g opacity={fade < 1 ? 0.3 + 0.7 * fade : 1}>
      {/* what the wallet signs */}
      <Card
        x={12}
        y={12}
        w={196}
        title="USEROPERATION"
        rows={['action: swap 100 USDC', 'signature: passkey', 'fee: paymaster pays']}
        opacity={0.4 + 0.6 * (1 - prog(t, 3, 0.4))}
        active={mine > 0 && mine < 1 ? 1 : undefined}
      />

      {/* lines: EntryPoint ↔ account, paymaster */}
      <Arrow from={ENTRY} to={ACCOUNT} head={false} opacity={0.4} />
      <Arrow from={ENTRY} to={PAYMASTER} head={false} opacity={0.4} />

      {/* the bundler and its queue */}
      <Server at={BUNDLER} spec={BUNDLER_SPEC} />
      <Shadow at={PILE} spec={OP} />
      {Array.from({ length: piled }, (_, k) => (
        <Box key={k} at={PILE} spec={{ ...OP, z: k * 5 }} tone="tx" />
      ))}
      <Text x={BUNDLER[0] + 6} y={BUNDLER[1] + 34}>
        Bundler
      </Text>
      <Text x={BUNDLER[0] + 6} y={BUNDLER[1] + 48} className="iso-sub">
        packs operations
      </Text>
      <Coins at={[BUNDLER[0] - 30, BUNDLER[1] + 6]} n={t >= 11.6 ? 3 : t >= 3.1 ? 1 : 3} />
      <Text x={BUNDLER[0] - 2} y={bundlerTop[1] - 8} className="iso-note is-key" opacity={prog(t, 3.4, 0.3) * (1 - prog(t, 5.4, 0.3))}>
        pays gas up front
      </Text>

      {/* the EntryPoint */}
      <Shadow at={ENTRY} spec={ENTRY_SPEC} />
      <Box at={ENTRY} spec={ENTRY_SPEC} tone="block" />
      <Text x={ENTRY[0] + 56} y={ENTRY[1] - 30} anchor="start">
        EntryPoint
      </Text>
      <Text x={ENTRY[0] + 56} y={ENTRY[1] - 16} anchor="start" className="iso-sub">
        entry contract
      </Text>

      {/* your smart account */}
      <Shadow at={ACCOUNT} spec={ACCOUNT_SPEC} />
      <Box at={ACCOUNT} spec={ACCOUNT_SPEC} tone="tx" />
      <Text x={ACCOUNT[0]} y={ACCOUNT[1] + 34}>
        Smart account
      </Text>
      <Badge at={[accTop[0] + 24, accTop[1] + 6]} ok scale={(check >= 1 ? backOut(prog(t, 6.6, 0.3)) : 0) * (1 - prog(t, 8.6, 0.2)) + (run >= 1 ? backOut(prog(t, 9.8, 0.3)) : 0)} r={7} />

      {/* the paymaster */}
      <Shadow at={PAYMASTER} spec={PAYMASTER_SPEC} />
      <Box at={PAYMASTER} spec={PAYMASTER_SPEC} tone="key" />
      <Coins at={[PAYMASTER[0] + 26, PAYMASTER[1] + 4]} n={t >= 10.2 ? 2 : 4} />
      <Text x={PAYMASTER[0]} y={PAYMASTER[1] + 32}>
        Paymaster
      </Text>
      <Text x={PAYMASTER[0]} y={PAYMASTER[1] + 46} className="iso-sub">
        pays your fee
      </Text>
      <Badge at={[payTop[0] + 22, payTop[1] + 8]} ok scale={pay >= 1 ? backOut(prog(t, 7.8, 0.3)) * (1 - prog(t, 10.2, 0.2)) : 0} r={7} />

      {/* you */}
      <Phone at={PHONE} lit={mine > 0 && mine < 0.3} />
      <Text x={PHONE[0] + 8} y={PHONE[1] + 30}>
        Wallet
      </Text>

      {pills.map((p, i) => (
        <Pill key={i} at={p.at} text={p.text} tone={p.tone} />
      ))}
    </g>
  );
}

export function UserOpScene() {
  return (
    <IsoFigure
      title="ERC-4337: the wallet builds a UserOperation; a bundler packs several into one transaction to the EntryPoint and pays the gas up front; the EntryPoint checks each signature against its account's rules and asks the paymaster, then runs the operations and repays the bundler"
      viewBox="0 0 440 300"
      duration={DURATION}
      poster={9.4}
      steps={STEPS}
      render={render}
    />
  );
}
