'use client';

import { useState } from 'react';
import type { BoxSpec, Pt } from '@/lib/ethereum/iso';
import { backOut, easeInOut, lerp, prog } from '@/lib/ethereum/timeline';
import { cn } from '@/lib/utils';
import { IsoFigure, type Step } from './figure';
import { Arrow, Badge, Box, Card, Phone, Pill, Shadow, Text } from './parts';

/**
 * Ordinary account vs smart account. An ordinary account (EOA) is one key:
 * it can do anything, and losing it loses everything. A smart account is a
 * contract with rules you set: spending limits, recovery through people you
 * trust, batched actions, fees paid by someone else.
 */

type Kind = 'eoa' | 'smart';
const ACCOUNT: Pt = [228, 178];
const EOA_SPEC: BoxSpec = { w: 34, d: 34, h: 20 };
const SMART_SPEC: BoxSpec = { w: 56, d: 56, h: 40 };
const PHONE: Pt = [70, 252];
const NEW_PHONE: Pt = [140, 262];
const GUARDIANS: Pt[] = [
  [338, 262],
  [400, 262],
];
const RULES = { x: 272, y: 8, w: 164 };

const STEPS: Record<Kind, Step[]> = {
  eoa: [
    { at: 0, title: 'One key does everything', body: 'A regular wallet is an account controlled by a single private key. Whoever has the key has full control.' },
    { at: 2.6, title: 'Lose the key, lose everything', body: 'If you lose both your phone and your recovery phrase, no one can get the account back.' },
    { at: 5, title: 'No rules of its own', body: 'The account cannot limit itself in any way: no spending limit, no second person who has to approve.' },
  ],
  smart: [
    { at: 0, title: 'The account is a contract', body: 'A smart wallet is an account with smart contract code. You set the rules for your own account.' },
    { at: 2.6, title: 'Rules you set', body: 'For example: send at most 1 ETH per day. Anything over the limit is blocked, even if an attacker gets hold of your phone.' },
    { at: 5, title: 'Lost phone, still recoverable', body: 'People you trust (family members, your other devices) confirm together to attach a new key to the account.' },
    { at: 8.6, title: 'Batch actions, let others pay', body: 'Several actions are bundled into one transaction, and the app can pay the gas fee for you.' },
  ],
};
const DURATION: Record<Kind, number> = { eoa: 8, smart: 12 };

function fly(from: Pt, to: Pt, k: number): Pt {
  const e = easeInOut(k);
  return [lerp(from[0], to[0], e), lerp(from[1], to[1], e) - Math.sin(Math.PI * e) * 22];
}

function render(t: number, kind: Kind) {
  const dur = DURATION[kind];
  const fade = 1 - prog(t, dur - 0.6, 0.6);
  const top: Pt = [ACCOUNT[0], ACCOUNT[1] - (kind === 'smart' ? SMART_SPEC.h + 40 : EOA_SPEC.h + 26)];
  const pills: { at: Pt; text: string; tone: 'tx' | 'ok' | 'bad' | 'key' }[] = [];

  if (kind === 'eoa') {
    const sign = prog(t, 0.4, 1.2);
    const lost = prog(t, 2.6, 0.6);
    if (sign > 0 && sign < 1) pills.push({ at: fly([PHONE[0] + 20, PHONE[1] - 50], top, sign), text: 'signed with 1 key', tone: 'key' });
    return (
      <g opacity={fade < 1 ? 0.3 + 0.7 * fade : 1}>
        <Shadow at={ACCOUNT} spec={EOA_SPEC} />
        <Box at={ACCOUNT} spec={EOA_SPEC} tone={t >= 3 ? 'bad' : 'tx'} />
        <Text x={ACCOUNT[0]} y={ACCOUNT[1] + 40}>
          Regular account
        </Text>
        <Text x={ACCOUNT[0]} y={ACCOUNT[1] + 54} className="iso-sub">
          one private key
        </Text>
        <Badge at={[top[0], top[1] - 6]} ok scale={backOut(prog(t, 1.6, 0.3)) * (1 - prog(t, 2.6, 0.3))} r={8} />
        <Phone at={PHONE} opacity={1 - lost * 0.75} />
        <Box at={[PHONE[0] + 26, PHONE[1] + 6]} spec={{ w: 12, d: 12, h: 10 }} tone="key" opacity={1 - lost} />
        <Text x={PHONE[0] + 10} y={PHONE[1] + 32}>
          {lost > 0.5 ? 'phone lost' : 'Wallet'}
        </Text>
        {t >= 3 && (
          <>
            <Badge at={[top[0], top[1] - 6]} ok={false} scale={backOut(prog(t, 3, 0.3))} r={9} />
            <Text x={top[0] + 16} y={top[1] - 2} className="iso-note is-bad" anchor="start">
              key lost: account lost
            </Text>
          </>
        )}
        {t >= 5 && (
          <Card x={RULES.x} y={RULES.y} w={RULES.w} title="OWN RULES" rows={['limit: none', 'recovery: none', 'approver: none']} highlight={[0, 1, 2]} opacity={prog(t, 5, 0.4)} />
        )}
        {pills.map((p, i) => (
          <Pill key={i} at={p.at} text={p.text} tone={p.tone} />
        ))}
      </g>
    );
  }

  // smart account
  const small = prog(t, 0.6, 1.2);
  const big = prog(t, 2.8, 1.2);
  const blocked = t >= 4 && t < 5;
  const lost = prog(t, 5, 0.5);
  const approve = (i: number) => prog(t, 5.8 + i * 0.4, 1);
  const recovered = t >= 7.4;
  const batch = prog(t, 8.8, 1.3);
  if (small > 0 && small < 1) pills.push({ at: fly([PHONE[0] + 20, PHONE[1] - 50], top, small), text: 'send 0.2 ETH', tone: 'tx' });
  if (big > 0 && big < 1) pills.push({ at: fly([PHONE[0] + 20, PHONE[1] - 50], top, big), text: 'send 5 ETH', tone: 'bad' });
  GUARDIANS.forEach((g, i) => {
    const k = approve(i);
    if (k > 0 && k < 1) pills.push({ at: fly([g[0] + 10, g[1] - 50], top, k), text: 'approve ✓', tone: 'ok' });
  });
  const phoneAt = recovered ? NEW_PHONE : PHONE;
  if (batch > 0 && batch < 1) pills.push({ at: fly([phoneAt[0] + 20, phoneAt[1] - 50], top, batch), text: 'approve + swap · 1 tx', tone: 'tx' });

  return (
    <g opacity={fade < 1 ? 0.3 + 0.7 * fade : 1}>
      <Shadow at={ACCOUNT} spec={SMART_SPEC} />
      <Box at={ACCOUNT} spec={SMART_SPEC} tone="block" />
      <Text x={ACCOUNT[0]} y={ACCOUNT[1] + 60}>
        Smart account
      </Text>
      <Card
        x={RULES.x}
        y={RULES.y}
        w={RULES.w}
        title="YOUR RULES"
        rows={['limit 1 ETH/day', 'recovery: 2 guardians', 'fees: paid by app']}
        highlight={blocked ? 0 : undefined}
        active={t >= 5.6 && t < 8 ? 1 : t >= 9.6 && t < 11 ? 2 : undefined}
      />
      <Arrow from={[RULES.x - 4, RULES.y + 40]} to={[ACCOUNT[0] + 34, ACCOUNT[1] - 64]} head={false} tone="block" opacity={0.5} />

      <Badge at={[top[0], top[1] - 6]} ok scale={backOut(prog(t, 1.8, 0.3)) * (1 - prog(t, 2.6, 0.3))} r={8} />
      <Badge at={[top[0], top[1] - 6]} ok={false} scale={blocked ? backOut(prog(t, 4, 0.3)) : 0} r={9} />
      {blocked && (
        <Text x={top[0] + 16} y={top[1] - 2} className="iso-note is-bad" anchor="start">
          over limit: blocked
        </Text>
      )}

      {/* your phone; lost, then replaced */}
      <Phone at={PHONE} opacity={recovered ? 0 : 1 - lost * 0.75} />
      {!recovered && (
        <Text x={PHONE[0] + 10} y={PHONE[1] + 32}>
          {lost > 0.5 ? 'phone lost' : 'Wallet'}
        </Text>
      )}
      {recovered && (
        <g opacity={prog(t, 7.4, 0.4)}>
          <Phone at={NEW_PHONE} />
          <Text x={NEW_PHONE[0] + 10} y={NEW_PHONE[1] + 32} className="iso-note is-ok">
            new key ✓
          </Text>
        </g>
      )}

      {/* people you trust */}
      {GUARDIANS.map((g, i) => (
        <g key={i}>
          <Phone at={g} lit={approve(i) > 0 && approve(i) < 0.3} />
        </g>
      ))}
      <Text x={(GUARDIANS[0][0] + GUARDIANS[1][0]) / 2 + 10} y={GUARDIANS[0][1] + 32} className="iso-sub">
        guardians
      </Text>

      {t >= 10.2 && t < 11.4 && <Pill at={[top[0], top[1] - 30]} text="fees: paid by app" tone="ok" />}
      {pills.map((p, i) => (
        <Pill key={i} at={p.at} text={p.text} tone={p.tone} />
      ))}
    </g>
  );
}

export function SmartWalletScene() {
  const [kind, setKind] = useState<Kind>('smart');
  const tab = (k: Kind, label: string) => (
    <button
      type="button"
      aria-pressed={kind === k}
      onClick={() => setKind(k)}
      className={cn('px-2 py-1 text-[11px] transition-colors', kind === k ? 'bg-fd-foreground text-fd-background' : 'text-fd-muted-foreground hover:text-fd-foreground')}
    >
      {label}
    </button>
  );
  return (
    <IsoFigure
      title="Smart wallet: a regular account is controlled by one key, and losing it means losing everything; a smart account has its own rules, such as spending limits, social recovery, batched actions and sponsored fees"
      viewBox="0 0 440 300"
      duration={DURATION[kind]}
      poster={kind === 'smart' ? 7.8 : 4}
      steps={STEPS[kind]}
      render={(t) => render(t, kind)}
      controls={
        <div className="flex shrink-0 border border-fd-border">
          {tab('eoa', 'Regular wallet')}
          {tab('smart', 'Smart wallet')}
        </div>
      }
    />
  );
}
