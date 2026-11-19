'use client';

import { useState } from 'react';
import type { BoxSpec, Pt } from '@/lib/ethereum/iso';
import { backOut, easeInOut, lerp, prog } from '@/lib/ethereum/timeline';
import { cn } from '@/lib/utils';
import { IsoFigure, type Step } from './figure';
import { Arrow, Badge, Box, Card, Phone, Pill, Server, Shadow, Text } from './parts';

/**
 * The wallet doesn't hold the money. Lost phone: the balance stays on every
 * node; the recovery phrase in another wallet app gives back the same key,
 * the same address and the same balance. Leaked phrase: someone else's wallet
 * derives the same key and moves everything, and the network accepts it,
 * because whoever holds the key is the owner.
 */

type Kind = 'lost' | 'leak';
const ME: Pt = [96, 228];
const NEW_PHONE: Pt = [180, 240];
const THIEF: Pt = [404, 252];
const PAPER: Pt = [60, 118];
const PAPER_SPEC: BoxSpec = { w: 30, d: 22, h: 2 };
const NODES: Pt[] = [
  [250, 158],
  [314, 126],
  [378, 158],
];
const NODE_SPEC: BoxSpec = { w: 24, d: 24, h: 30 };
const LEDGER = { x: 214, y: 16, w: 210 };
const ADDRESS = '0x71C7…976F';

const STEPS: Record<Kind, Step[]> = {
  lost: [
    { at: 0, title: 'The money lives on the network', body: "The address's balance is recorded on every Ethereum node. The wallet on your phone only reads that balance, and holds the key to sign transactions." },
    { at: 2.6, title: 'Lost phone', body: 'The phone is lost or broken, but the balance was never on the device. On the network, your address still has 1.5 ETH.' },
    { at: 4.8, title: 'Enter the phrase in a new wallet', body: 'Reinstall the wallet, or use almost any other wallet that follows the same standard, and enter the 12 words. The wallet recomputes the exact same private key.' },
    { at: 7.6, title: 'Same address, same balance', body: 'Same key, same address. The new wallet reads the balance from the network, and you carry on as before.' },
  ],
  leak: [
    { at: 0, title: 'The phrase leaks', body: 'A screenshot, a note in the cloud, or a fake website: an attacker gets hold of your 12 words.' },
    { at: 2.6, title: 'The attacker has the same key', body: "The attacker's wallet computes exactly your key and your address. No password needed, and no need for your phone." },
    { at: 4.8, title: 'Everything moved, no way back', body: 'The transaction has a valid signature, so the network accepts it. On Ethereum, whoever holds the key is the owner, and a sent transaction cannot be reversed.' },
  ],
};
const DURATION: Record<Kind, number> = { lost: 11, leak: 9 };

function fly(from: Pt, to: Pt, k: number, arc = 24): Pt {
  const e = easeInOut(k);
  return [lerp(from[0], to[0], e), lerp(from[1], to[1], e) - Math.sin(Math.PI * e) * arc];
}

const above = (p: Pt): Pt => [p[0] + 8, p[1] - 52];

function Network({ balance, drained, note }: { balance: string; drained: boolean; note?: string }) {
  return (
    <>
      {NODES.map((a, i) => (
        <Arrow key={i} from={a} to={NODES[(i + 1) % NODES.length]} head={false} opacity={0.5} />
      ))}
      {NODES.map((n, i) => (
        <Server key={i} at={n} spec={NODE_SPEC} />
      ))}
      <Text x={NODES[1][0]} y={NODES[0][1] + 34} className={note ? 'iso-note is-bad' : 'iso-sub'}>
        {note ?? 'every Ethereum node'}
      </Text>
      <Card x={LEDGER.x} y={LEDGER.y} w={LEDGER.w} title="BALANCE ON THE NETWORK" rows={[`${ADDRESS}   ${balance}`]} highlight={drained ? 0 : undefined} />
      <Arrow from={[LEDGER.x + LEDGER.w / 2, LEDGER.y + 40]} to={[NODES[1][0], NODES[1][1] - 66]} head={false} opacity={0.5} />
    </>
  );
}

function Paper({ opacity }: { opacity?: number }) {
  return (
    <g opacity={opacity}>
      <Shadow at={PAPER} spec={PAPER_SPEC} />
      <Box at={PAPER} spec={PAPER_SPEC} tone="key" />
      <Text x={PAPER[0]} y={PAPER[1] + 28} className="iso-sub">
        recovery phrase
      </Text>
      <Text x={PAPER[0]} y={PAPER[1] + 41} className="iso-sub">
        (12 words)
      </Text>
    </g>
  );
}

function render(t: number, kind: Kind) {
  const dur = DURATION[kind];
  const fade = 1 - prog(t, dur - 0.6, 0.6);
  const pills: { at: Pt; text: string; tone: 'tx' | 'ok' | 'bad' | 'key' }[] = [];

  if (kind === 'lost') {
    const read = prog(t, 0.6, 1.2);
    const lost = prog(t, 2.6, 0.6);
    const words = prog(t, 5, 1.3);
    const derived = t >= 6.4;
    const read2 = prog(t, 7.6, 1.2);
    const ok = t >= 8.8;
    if (read > 0 && read < 1) pills.push({ at: fly(NODES[0], above(ME), read), text: '1.5 ETH', tone: 'ok' });
    if (words > 0 && words < 1) pills.push({ at: fly(PAPER, above(NEW_PHONE), words, 34), text: '12 words', tone: 'key' });
    if (read2 > 0 && read2 < 1) pills.push({ at: fly(NODES[0], above(NEW_PHONE), read2), text: '1.5 ETH', tone: 'ok' });
    return (
      <g opacity={fade < 1 ? 0.3 + 0.7 * fade : 1}>
        <Network balance="1.5 ETH" drained={false} />
        <Paper />

        {/* your phone, then lost */}
        <Phone at={ME} opacity={1 - lost * 0.8} />
        {lost > 0 && <Box at={[ME[0] + 2, ME[1] + 2]} spec={{ w: 6, d: 24, h: 40 }} tone="bad" opacity={lost * 0.6 * (1 - prog(t, 4.6, 0.5))} />}
        <Text x={ME[0] + 8} y={ME[1] + 30} className={lost > 0.5 ? 'iso-note is-bad' : 'iso-lbl'}>
          {lost > 0.5 ? 'phone lost' : 'Wallet A'}
        </Text>
        <Text x={ME[0] + 8} y={ME[1] + 44} className="iso-sub" opacity={1 - lost}>
          {t >= 1.8 ? '1.5 ETH' : ''}
        </Text>
        <Badge at={[ME[0] + 8, ME[1] - 58]} ok={false} scale={backOut(prog(t, 2.8, 0.3)) * (1 - prog(t, 4.6, 0.4))} r={8} />
        <Text x={NODES[1][0]} y={NODES[0][1] + 48} className="iso-note is-ok" opacity={prog(t, 3.2, 0.4) * (1 - prog(t, 4.8, 0.4))}>
          balance still there
        </Text>

        {/* a new phone with another wallet app */}
        <g opacity={prog(t, 4.6, 0.4)}>
          <Phone at={NEW_PHONE} lit={words > 0.9 && !derived} />
          <Text x={NEW_PHONE[0] + 8} y={NEW_PHONE[1] + 30}>
            Wallet B
          </Text>
          <Text x={NEW_PHONE[0] + 8} y={NEW_PHONE[1] + 44} className={ok ? 'iso-sub is-ok' : 'iso-sub'}>
            {ok ? '1.5 ETH' : 'another app'}
          </Text>
        </g>
        {derived && (
          <g opacity={prog(t, 6.4, 0.4)}>
            <Box at={[NEW_PHONE[0] + 28, NEW_PHONE[1] + 6]} spec={{ w: 12, d: 12, h: 10 }} tone="key" />
            <Text x={NEW_PHONE[0] + 44} y={NEW_PHONE[1] + 12} anchor="start" className="iso-note is-key">
              same key → {ADDRESS}
            </Text>
          </g>
        )}
        <Badge at={[NEW_PHONE[0] + 8, NEW_PHONE[1] - 68]} ok scale={ok ? backOut(prog(t, 8.8, 0.3)) : 0} r={8} />

        {pills.map((p, i) => (
          <Pill key={i} at={p.at} text={p.text} tone={p.tone} />
        ))}
      </g>
    );
  }

  // the phrase leaks
  const leak = prog(t, 0.6, 1.6);
  const derived = t >= 2.6;
  const send = prog(t, 4.8, 1.3);
  const drained = t >= 6.1;
  if (leak > 0 && leak < 1) pills.push({ at: fly(PAPER, above(THIEF), leak, 70), text: '12 words', tone: 'bad' });
  if (send > 0 && send < 1) pills.push({ at: fly(above(THIEF), [NODES[2][0], NODES[2][1] - 52], send), text: 'send 1.5 ETH', tone: 'bad' });
  return (
    <g opacity={fade < 1 ? 0.3 + 0.7 * fade : 1}>
      <Network balance={drained ? '0 ETH' : '1.5 ETH'} drained={drained} note={t >= 6.4 ? 'valid signature: accepted' : undefined} />
      <Paper />
      <Text x={PAPER[0]} y={PAPER[1] - 22} className="iso-note is-bad" opacity={prog(t, 0.4, 0.3) * (1 - prog(t, 2.6, 0.3))}>
        screenshot
      </Text>

      {/* your phone, still in your hand */}
      <Phone at={ME} />
      <Text x={ME[0] + 8} y={ME[1] + 30}>
        Your wallet
      </Text>
      <Text x={ME[0] + 8} y={ME[1] + 44} className={drained ? 'iso-sub is-bad' : 'iso-sub'}>
        {drained ? '0 ETH' : '1.5 ETH'}
      </Text>

      {/* someone else's wallet */}
      <g className="tone-bad">
        <Phone at={THIEF} lit={leak > 0.9 && !derived} />
      </g>
      <Text x={THIEF[0] + 8} y={THIEF[1] + 30} className="iso-note is-bad">
        attacker
      </Text>
      {derived && (
        <g opacity={prog(t, 2.6, 0.4)}>
          <Box at={[THIEF[0] - 20, THIEF[1] + 6]} spec={{ w: 12, d: 12, h: 10 }} tone="key" />
          <Text x={THIEF[0] - 36} y={THIEF[1] + 12} anchor="end" className="iso-note is-key">
            same key → {ADDRESS}
          </Text>
        </g>
      )}
      <Badge at={[NODES[2][0] + 24, NODES[2][1] - 48]} ok scale={drained ? backOut(prog(t, 6.1, 0.3)) : 0} r={8} />

      {pills.map((p, i) => (
        <Pill key={i} at={p.at} text={p.text} tone={p.tone} />
      ))}
    </g>
  );
}

export function RecoveryScene() {
  const [kind, setKind] = useState<Kind>('lost');
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
      title="The wallet does not hold the money: the balance lives on the network; if you lose your phone, enter the recovery phrase in another wallet to get the same address and balance back; if the phrase leaks, an attacker gets the same key and moves everything"
      viewBox="0 0 440 300"
      duration={DURATION[kind]}
      poster={kind === 'lost' ? 9.4 : 7}
      steps={STEPS[kind]}
      render={(t) => render(t, kind)}
      controls={
        <div className="flex shrink-0 border border-fd-border">
          {tab('lost', 'Lost phone')}
          {tab('leak', 'Leaked phrase')}
        </div>
      }
    />
  );
}
