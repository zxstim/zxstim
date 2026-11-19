'use client';

import type { BoxSpec, Pt } from '@/lib/ethereum/iso';
import { backOut, easeInOut, easeOut, lerp, prog } from '@/lib/ethereum/timeline';
import { IsoFigure, type Step } from './figure';
import { Arrow, Badge, Box, Card, Phone, Pill, Server, Shadow, Text } from './parts';

/**
 * EIP-7702: an ordinary account (EOA) signs an authorization naming a
 * contract; a type-4 transaction (sent by anyone, e.g. a sponsor) writes a
 * pointer to that contract into the account. The address, balance and
 * history stay; calls to the account now run the contract's code. The
 * original key keeps full control: a plain transaction it signs skips the
 * rules in the code.
 */

const DURATION = 14;
const PHONE: Pt = [60, 250];
const ACCOUNT: Pt = [196, 208];
const ACCOUNT_SPEC: BoxSpec = { w: 50, d: 50, h: 30 };
const POINTER: BoxSpec = { w: 50, d: 50, h: 6, z: 30 };
const CONTRACT: Pt = [358, 140];
const CONTRACT_SPEC: BoxSpec = { w: 44, d: 44, h: 34 };
const SPONSOR: Pt = [372, 256];
const CODE = '0x63c0…ad55';

const STEPS: Step[] = [
  { at: 0, title: 'Sign an authorization', body: "The account's key signs an authorization: which contract's code to use, and on which network. It travels in a new kind of transaction (type 4), and the sender can be a sponsor who pays the fee for you." },
  { at: 4.2, title: 'The account points to the code', body: "The network writes a pointer to the contract into the account. The address, balance and history stay the same. Anyone who calls the account runs the contract's code, on the account's own balance." },
  { at: 7.4, title: 'Batch actions, let others pay', body: 'The wallet uses the new code to bundle several actions into one transaction, or to let someone else pay the fee. The delegation stays in place until you delegate again or remove it.' },
  { at: 10.2, title: 'The old key keeps full control', body: 'The original key can still sign regular transactions and delegate again. The rules in the code cannot stop that key: if the old recovery phrase leaks, you still lose everything.' },
];

function fly(from: Pt, to: Pt, k: number, arc = 24): Pt {
  const e = easeInOut(k);
  return [lerp(from[0], to[0], e), lerp(from[1], to[1], e) - Math.sin(Math.PI * e) * arc];
}

const above = (p: Pt): Pt => [p[0] + 8, p[1] - 54];

function render(t: number) {
  const fade = 1 - prog(t, DURATION - 0.6, 0.6);
  const sign = prog(t, 0.4, 1.3);
  const send = prog(t, 1.9, 1.3);
  const pointer = prog(t, 4.2, 0.5);
  const link = easeInOut(prog(t, 4.6, 0.7));
  const batch = prog(t, 7.6, 1.2);
  const ran = t >= 8.8 && t < 10.2;
  const rules = prog(t, 10.2, 0.4);
  const bypass = prog(t, 10.8, 1.2);
  const drained = t >= 12;
  const accTop: Pt = [ACCOUNT[0], ACCOUNT[1] - 64];

  const pills: { at: Pt; text: string; tone: 'tx' | 'ok' | 'bad' | 'key' }[] = [];
  if (sign > 0 && sign < 1) pills.push({ at: fly(above(PHONE), [SPONSOR[0], SPONSOR[1] - 56], sign, 30), text: 'authorize', tone: 'key' });
  if (send > 0 && send < 1) pills.push({ at: fly([SPONSOR[0], SPONSOR[1] - 56], accTop, send), text: 'type 4 transaction', tone: 'tx' });
  if (batch > 0 && batch < 1) pills.push({ at: fly(above(PHONE), accTop, batch, 34), text: 'approve + swap · 1 tx', tone: 'tx' });
  if (bypass > 0 && bypass < 1) pills.push({ at: fly(above(PHONE), accTop, bypass, 6), text: 'old key: send 2 ETH', tone: 'bad' });

  return (
    <g opacity={fade < 1 ? 0.3 + 0.7 * fade : 1}>
      {/* what the key signs */}
      <Card
        x={12}
        y={14}
        w={182}
        title="AUTHORIZATION"
        rows={[`use code: ${CODE}`, 'network: Ethereum']}
        opacity={0.35 + 0.65 * Math.max(sign > 0 && t < 4.2 ? 1 : 0, 1 - prog(t, 4.2, 0.4))}
        active={sign > 0 && t < 4.2 ? 0 : undefined}
      />

      {/* the contract whose code the account points to */}
      <Shadow at={CONTRACT} spec={CONTRACT_SPEC} />
      <Box at={CONTRACT} spec={CONTRACT_SPEC} tone={ran ? 'tx' : 'block'} />
      <Text x={CONTRACT[0]} y={CONTRACT[1] + 42}>
        Wallet contract
      </Text>
      <Text x={CONTRACT[0]} y={CONTRACT[1] + 56} className="iso-sub">
        {CODE}
      </Text>
      {rules > 0 && (
        <Card x={262} y={14} w={170} title="RULES IN THE CODE" rows={['max 1 ETH/day']} opacity={rules} highlight={drained ? 0 : undefined} />
      )}

      {/* the pointer */}
      <Arrow from={[ACCOUNT[0] + 36, ACCOUNT[1] - 52]} to={[CONTRACT[0] - 36, CONTRACT[1] - 26]} tone="block" k={link} />
      <Text x={(ACCOUNT[0] + CONTRACT[0]) / 2 + 4} y={(ACCOUNT[1] + CONTRACT[1]) / 2 - 50} className="iso-sub" opacity={link}>
        pointer
      </Text>

      {/* your account: same address, same balance */}
      <Shadow at={ACCOUNT} spec={ACCOUNT_SPEC} />
      <Box at={ACCOUNT} spec={ACCOUNT_SPEC} tone="tx" />
      {pointer > 0 && (
        <Box at={[ACCOUNT[0], ACCOUNT[1] - (1 - easeOut(pointer)) * 24]} spec={POINTER} tone="block" opacity={pointer} />
      )}
      <Text x={ACCOUNT[0]} y={ACCOUNT[1] + 46}>
        Your account
      </Text>
      <Text x={ACCOUNT[0]} y={ACCOUNT[1] + 60} className={drained ? 'iso-sub is-bad' : 'iso-sub'}>
        0x71C7…976F · {drained ? '0 ETH' : '2 ETH'}
      </Text>
      <Text x={16} y={140} anchor="start" className="iso-note is-ok" opacity={prog(t, 5.2, 0.4) * (1 - prog(t, 7.4, 0.3))}>
        same address, same balance
      </Text>
      <Badge at={[accTop[0], accTop[1] - 4]} ok scale={(ran ? backOut(prog(t, 8.8, 0.3)) : 0) + (drained ? backOut(prog(t, 12, 0.3)) : 0)} r={8} />
      <Text x={16} y={140} anchor="start" className="iso-note is-bad" opacity={drained ? prog(t, 12, 0.3) : 0}>
        rules bypassed
      </Text>

      {/* you, and a sponsor paying the gas */}
      <Phone at={PHONE} lit={(sign > 0 && sign < 0.3) || (batch > 0 && batch < 0.3)} />
      <Box at={[PHONE[0] + 28, PHONE[1] + 6]} spec={{ w: 12, d: 12, h: 10 }} tone="key" />
      <Text x={PHONE[0] + 10} y={PHONE[1] + 32}>
        Your wallet
      </Text>
      <Server at={SPONSOR} spec={{ w: 22, d: 22, h: 28 }} />
      <Text x={SPONSOR[0]} y={SPONSOR[1] + 32} className="iso-sub">
        sponsor
      </Text>

      {pills.map((p, i) => (
        <Pill key={i} at={p.at} text={p.text} tone={p.tone} />
      ))}
    </g>
  );
}

export function DelegationScene() {
  return (
    <IsoFigure
      title="EIP-7702: a regular account signs an authorization, and a type 4 transaction writes a pointer to a contract's code into the account; the address and balance stay the same and the account can batch actions, but the original key keeps full control and can bypass the rules in the code"
      viewBox="0 0 440 300"
      duration={DURATION}
      poster={9.2}
      steps={STEPS}
      render={render}
    />
  );
}
