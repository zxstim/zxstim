'use client';

import { useState } from 'react';
import type { BoxSpec, Pt } from '@/lib/ethereum/iso';
import { backOut, easeInOut, lerp, prog } from '@/lib/ethereum/timeline';
import { cn } from '@/lib/utils';
import { IsoFigure, type Step } from './figure';
import { Arrow, Badge, Box, Card, Phone, Pill, Shadow, Text } from './parts';

/**
 * Token allowances. The token contract keeps a second table next to the
 * balances: how much each app may take from you. An unlimited allowance
 * outlives your use of the app; if the app is hacked later, the attacker
 * takes everything left without asking you. An allowance of exactly what you
 * need is used up by the swap, so the hacked app gets nothing.
 */

type Kind = 'unlimited' | 'exact';
const PHONE: Pt = [64, 246];
const TOKEN: Pt = [214, 198];
const TOKEN_SPEC: BoxSpec = { w: 54, d: 54, h: 34 };
const APP: Pt = [370, 236];
const APP_SPEC: BoxSpec = { w: 38, d: 38, h: 26 };
const LEDGER = { x: 104, y: 14, w: 232 };

const STEPS: Record<Kind, Step[]> = {
  unlimited: [
    { at: 0, title: 'Approve spending', body: 'To swap tokens, you sign an approval (approve) letting the app spend your tokens. Many sites ask for an unlimited allowance by default.' },
    { at: 2.8, title: 'The app uses it', body: 'You swap 100 USDC. The app takes the 100 USDC from the token contract itself. The remaining allowance is still unlimited.' },
    { at: 5.6, title: 'The app gets hacked', body: 'Months later, the app is hacked, or was a scam all along. The attacker uses the old allowance to take all your remaining tokens, without you signing anything else.' },
  ],
  exact: [
    { at: 0, title: 'Approve only what you need', body: 'You approve only 100 USDC, exactly the amount you plan to swap. Many wallets let you edit the allowance before you sign.' },
    { at: 2.8, title: 'Used once, then gone', body: 'The app takes 100 USDC, and the allowance drops back to 0.' },
    { at: 5.6, title: 'Nothing for the attacker', body: 'Even if the app is hacked, it cannot take any more, because the allowance is used up. A leftover old allowance can be revoked with a transaction that sets it to 0.' },
  ],
};
const DURATION = 10.5;

function fly(from: Pt, to: Pt, k: number, arc = 24): Pt {
  const e = easeInOut(k);
  return [lerp(from[0], to[0], e), lerp(from[1], to[1], e) - Math.sin(Math.PI * e) * arc];
}

const fmt = new Intl.NumberFormat('en-US');

function render(t: number, kind: Kind) {
  const fade = 1 - prog(t, DURATION - 0.6, 0.6);
  const unlimited = kind === 'unlimited';
  const approve = prog(t, 0.4, 1.2);
  const approved = t >= 1.6;
  const swap = prog(t, 2.8, 1);
  const take = prog(t, 3.9, 1);
  const swapped = t >= 4.9;
  const hacked = prog(t, 5.6, 0.4);
  const steal = prog(t, 6.6, 1.1);
  const stolen = unlimited && t >= 7.7;
  const refused = !unlimited && t >= 7.7;

  const balance = stolen ? 0 : swapped ? 900 : 1000;
  const allowance = !approved ? '0' : unlimited ? 'unlimited' : swapped ? '0' : '100';
  const tokenTop: Pt = [TOKEN[0], TOKEN[1] - 62];
  const appTop: Pt = [APP[0], APP[1] - 48];

  const pills: { at: Pt; text: string; tone: 'tx' | 'ok' | 'bad' | 'key' }[] = [];
  if (approve > 0 && approve < 1) pills.push({ at: fly([PHONE[0] + 8, PHONE[1] - 54], tokenTop, approve), text: unlimited ? 'approve: unlimited' : 'approve: 100', tone: 'key' });
  if (swap > 0 && swap < 1) pills.push({ at: fly([PHONE[0] + 8, PHONE[1] - 54], appTop, swap, 40), text: 'swap 100 USDC', tone: 'tx' });
  if (take > 0 && take < 1) pills.push({ at: fly(appTop, tokenTop, take), text: 'take 100', tone: 'tx' });
  if (steal > 0 && steal < 1) pills.push({ at: fly(appTop, tokenTop, steal), text: 'take 900', tone: 'bad' });

  return (
    <g opacity={fade < 1 ? 0.3 + 0.7 * fade : 1}>
      {/* what the token contract keeps */}
      <Card
        x={LEDGER.x}
        y={LEDGER.y}
        w={LEDGER.w}
        title="USDC CONTRACT LEDGER"
        rows={[`your balance     ${fmt.format(balance)}`, `allowance for X  ${allowance}`]}
        highlight={stolen ? [0, 1] : unlimited && approved ? 1 : undefined}
        active={!unlimited && approved && !swapped ? 1 : undefined}
      />
      <Arrow from={[LEDGER.x + LEDGER.w / 2, LEDGER.y + 54]} to={[TOKEN[0], TOKEN[1] - 66]} head={false} opacity={0.5} />

      <Shadow at={TOKEN} spec={TOKEN_SPEC} />
      <Box at={TOKEN} spec={TOKEN_SPEC} tone="block" />
      <Text x={TOKEN[0]} y={TOKEN[1] + 44}>
        USDC contract
      </Text>
      <Badge at={[tokenTop[0] + 34, tokenTop[1] + 6]} ok scale={stolen ? backOut(prog(t, 7.7, 0.3)) : 0} r={8} />
      <Badge at={[tokenTop[0] + 34, tokenTop[1] + 6]} ok={false} scale={refused ? backOut(prog(t, 7.7, 0.3)) : 0} r={8} />
      <Text x={TOKEN[0]} y={TOKEN[1] + 58} className={stolen ? 'iso-note is-bad' : 'iso-note is-ok'} opacity={prog(t, 8, 0.4)}>
        {stolen ? 'allowance left: accepted' : 'allowance 0: rejected'}
      </Text>

      {/* you */}
      <Phone at={PHONE} lit={approve > 0 && approve < 0.3} />
      <Text x={PHONE[0] + 8} y={PHONE[1] + 30}>
        You
      </Text>
      <Text x={PHONE[0] + 8} y={PHONE[1] - 64} className="iso-note is-bad" anchor="middle" opacity={stolen ? prog(t, 8.2, 0.4) : 0}>
        you sign nothing
      </Text>

      {/* the app, later hacked */}
      <Shadow at={APP} spec={APP_SPEC} />
      <Box at={APP} spec={APP_SPEC} tone={hacked > 0.5 ? 'bad' : 'device'} />
      <Text x={APP[0]} y={APP[1] + 36} className={hacked > 0.5 ? 'iso-note is-bad' : 'iso-lbl'}>
        {hacked > 0.5 ? 'X hacked' : 'App X'}
      </Text>
      <Text x={APP[0]} y={APP[1] + 50} className="iso-sub" opacity={hacked}>
        months later
      </Text>

      {pills.map((p, i) => (
        <Pill key={i} at={p.at} text={p.text} tone={p.tone} />
      ))}
    </g>
  );
}

export function ApprovalScene() {
  const [kind, setKind] = useState<Kind>('unlimited');
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
      title="Token spending approvals: an unlimited allowance stays in place after you are done with the app, so when the app is hacked, the attacker takes all your remaining tokens; an exact allowance is used up once spent"
      viewBox="0 0 440 300"
      duration={DURATION}
      poster={8.4}
      steps={STEPS[kind]}
      render={(t) => render(t, kind)}
      controls={
        <div className="flex shrink-0 border border-fd-border">
          {tab('unlimited', 'Unlimited')}
          {tab('exact', 'Exact')}
        </div>
      }
    />
  );
}
