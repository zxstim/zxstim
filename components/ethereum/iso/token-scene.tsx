'use client';

import { useState } from 'react';
import type { BoxSpec, Pt } from '@/lib/ethereum/iso';
import { backOut, easeInOut, lerp, prog } from '@/lib/ethereum/timeline';
import { cn } from '@/lib/utils';
import { IsoFigure, type Step } from './figure';
import { Arrow, Badge, Box, Card, Phone, Pill, Server, Shadow, Text } from './parts';

/**
 * Tokens are records in a contract, not coins in a wallet. Three views:
 * a token transfer (the contract's ledger changes, wallets only display it),
 * a stablecoin (backed by reserves held by an issuer: deposit mints, redeem
 * burns), and an NFT (the contract records the owner of #7; the image lives
 * elsewhere).
 */

type Kind = 'token' | 'stable' | 'nft';
const DURATION = 9;
const CONTRACT: Pt = [226, 188];
const SPEC: BoxSpec = { w: 56, d: 56, h: 40 };
const TOP: Pt = [CONTRACT[0], CONTRACT[1] - SPEC.h - 40];
const LEDGER = { x: 290, y: 30, w: 142 };
const AN: Pt = [50, 262];
const BINH: Pt = [134, 262];
const VAULT: Pt = [86, 128];
const STORAGE: Pt = [390, 252];

const STEPS: Record<Kind, Step[]> = {
  token: [
    { at: 0, title: 'Balances live in the contract', body: "A token is a smart contract that keeps a ledger of everyone's balances. The tokens are not inside your wallet." },
    { at: 2.2, title: 'A transfer is an instruction', body: 'Alice sends a transaction to the contract: "send 30 to Bob". The contract subtracts 30 from Alice and adds 30 to Bob.' },
    { at: 5.2, title: 'The wallet only displays it', body: 'The wallet reads the balance from the contract to show it to you. Losing your phone does not lose your tokens, as long as you still have your recovery phrase.' },
  ],
  stable: [
    { at: 0, title: 'Send dollars, get stablecoins', body: 'The issuer takes in real money, holds it as reserves, and then issues the matching amount of stablecoins to you.' },
    { at: 4.4, title: 'Redeeming burns the tokens', body: 'Give the stablecoins back to the issuer to get your money back. Those tokens are burned, and the total supply drops with them.' },
    { at: 6.6, title: 'You have to trust the issuer', body: 'The price stays around 1 USD thanks to the reserves. The issuer can freeze tokens, and if something goes wrong with the reserves, the price can drift.' },
  ],
  nft: [
    { at: 0, title: 'A record of who owns what', body: 'An NFT is a line in a contract: an ID number and its owner. Each ID number is unique.' },
    { at: 2.2, title: 'Transferring an NFT changes the owner', body: 'Transferring an NFT means sending an instruction to the contract to change the owner of that ID, just like transferring a token.' },
    { at: 4.4, title: 'The image usually lives offchain', body: 'The contract usually holds only a link to the image. If the place storing the image shuts down, the image can disappear, even though you still own the NFT.' },
  ],
};

const NAME: Record<Kind, string> = { token: 'Token contract', stable: 'USDC contract', nft: 'NFT contract' };

function fly(from: Pt, to: Pt, k: number): Pt {
  const e = easeInOut(k);
  return [lerp(from[0], to[0], e), lerp(from[1], to[1], e) - Math.sin(Math.PI * e) * 24];
}

/** A small picture: the NFT's image file. */
function Picture({ at, broken }: { at: Pt; broken: boolean }) {
  const [x, y] = at;
  return (
    <g opacity={broken ? 0.35 : 1}>
      <rect x={x - 22} y={y - 16} width={44} height={32} className="card" />
      <circle cx={x + 10} cy={y - 7} r={4} style={{ fill: 'var(--amber)' }} />
      <path d={`M${x - 20} ${y + 14} l12 -14 l9 9 l7 -6 l12 11 Z`} style={{ fill: 'var(--vote)', opacity: 0.8 }} />
    </g>
  );
}

function render(t: number, kind: Kind) {
  const fade = 1 - prog(t, 8.4, 0.6);
  let rows: string[] = [];
  let active: number | undefined;
  const pills: { at: Pt; text: string; tone: 'tx' | 'ok' | 'bad' | 'key' }[] = [];
  let anShow = '';
  let binhShow = '';

  if (kind === 'token') {
    const send = prog(t, 2.4, 1.2);
    const done = t >= 3.8;
    rows = [done ? 'Alice    70' : 'Alice   100', done ? 'Bob      80' : 'Bob      50'];
    if (t >= 3.8 && t < 4.8) active = 0;
    if (send > 0 && send < 1) pills.push({ at: fly([AN[0] + 20, AN[1] - 50], TOP, send), text: 'send 30 to Bob', tone: 'tx' });
    anShow = done ? '70' : '100';
    binhShow = done ? '80' : '50';
  } else if (kind === 'stable') {
    const pay = prog(t, 0.4, 1.4);
    const mint = t >= 2.2 && t < 5.6;
    const redeem = prog(t, 4.4, 1.2);
    const burned = t >= 5.6;
    const back = prog(t, 5.8, 1.1);
    rows = [`Alice    ${mint ? '100' : '0'} USDC`, `Supply   ${mint ? '100' : '0'}`];
    if ((t >= 2.2 && t < 3.2) || (t >= 5.6 && t < 6.6)) active = 0;
    if (pay > 0 && pay < 1) pills.push({ at: fly([AN[0] + 20, AN[1] - 50], [VAULT[0], VAULT[1] - 44], pay), text: '100 USD', tone: 'ok' });
    if (redeem > 0 && redeem < 1) pills.push({ at: fly([AN[0] + 20, AN[1] - 50], TOP, redeem), text: 'redeem 100 USDC', tone: 'tx' });
    if (back > 0 && back < 1) pills.push({ at: fly([VAULT[0], VAULT[1] - 44], [AN[0] + 20, AN[1] - 50], back), text: '100 USD', tone: 'ok' });
    anShow = mint ? '100 USDC' : '';
    if (burned && t < 7.4) pills.push({ at: [TOP[0], TOP[1] - 6], text: 'burn 100', tone: 'bad' });
  } else {
    const send = prog(t, 2.4, 1.2);
    const done = t >= 3.8;
    rows = [done ? '#7  →  Bob' : '#7  →  Alice', '#8  →  Carol'];
    if (t >= 3.8 && t < 4.8) active = 0;
    if (send > 0 && send < 1) pills.push({ at: fly([AN[0] + 20, AN[1] - 50], TOP, send), text: 'send #7 to Bob', tone: 'tx' });
  }

  const offline = kind === 'nft' && t >= 6.6;

  return (
    <g opacity={fade < 1 ? 0.3 + 0.7 * fade : 1}>
      {/* the contract and its ledger */}
      <Shadow at={CONTRACT} spec={SPEC} />
      <Box at={CONTRACT} spec={SPEC} tone="block" />
      <Text x={CONTRACT[0]} y={CONTRACT[1] + 62}>
        {NAME[kind]}
      </Text>
      <Card x={LEDGER.x} y={LEDGER.y} w={LEDGER.w} title={kind === 'nft' ? 'OWNERS' : 'BALANCES'} rows={rows} active={active} />
      <Arrow from={[LEDGER.x - 4, LEDGER.y + 30]} to={[CONTRACT[0] + 30, TOP[1] + 6]} head={false} tone="block" opacity={0.5} />

      {/* wallets display what the contract says */}
      {[AN, BINH].map((p, i) => (
        <g key={i}>
          <Arrow from={[p[0] + 20, p[1] - 22]} to={[CONTRACT[0] - 50, CONTRACT[1] - 10]} head={false} opacity={kind === 'token' && t >= 5.2 ? 0.9 : 0.35} tone={kind === 'token' && t >= 5.2 ? 'tx' : 'lane'} />
          <Phone at={p} lit={pills.length > 0 && i === 0} />
          <Text x={p[0] + 10} y={p[1] + 30} className="iso-sub">
            {i === 0 ? 'Alice' : 'Bob'}
          </Text>
          {(i === 0 ? anShow : binhShow) && (
            <Text x={p[0] + 10} y={p[1] - 54} className="iso-note is-tx">
              {i === 0 ? anShow : binhShow}
            </Text>
          )}
        </g>
      ))}
      {kind === 'token' && t >= 5.2 && (
        <Text x={(AN[0] + BINH[0]) / 2 + 10} y={AN[1] - 74} className="iso-note is-tx" opacity={prog(t, 5.2, 0.3)}>
          wallets only read
        </Text>
      )}

      {/* stablecoin: the issuer and its reserve */}
      {kind === 'stable' && (
        <g>
          <Shadow at={VAULT} spec={{ w: 44, d: 44, h: 30 }} />
          <Box at={VAULT} spec={{ w: 44, d: 44, h: 30 }} tone="final" />
          <Text x={VAULT[0]} y={VAULT[1] + 38}>
            Issuer
          </Text>
          <Text x={VAULT[0]} y={VAULT[1] + 52} className="iso-sub">
            reserve: {t >= 1.8 && t < 6.9 ? '100' : '0'} USD
          </Text>
          <Badge at={[VAULT[0] + 34, VAULT[1] - 40]} ok={false} scale={backOut(prog(t, 6.8, 0.3))} r={8} />
          <Text x={VAULT[0] + 46} y={VAULT[1] - 36} className="iso-note is-bad" anchor="start" opacity={prog(t, 6.8, 0.3)}>
            can freeze
          </Text>
        </g>
      )}

      {/* NFT: the picture lives somewhere else */}
      {kind === 'nft' && (
        <g>
          <Arrow from={[CONTRACT[0] + 46, CONTRACT[1] - 10]} to={[STORAGE[0] - 22, STORAGE[1] - 30]} head={false} tone={offline ? 'bad' : 'lane'} opacity={0.8} />
          <Server at={STORAGE} spec={{ w: 22, d: 22, h: 28 }} opacity={offline ? 0.4 : 1} />
          <Picture at={[STORAGE[0] - 2, STORAGE[1] - 68]} broken={offline} />
          <Text x={STORAGE[0]} y={STORAGE[1] + 30} className="iso-sub">
            image host
          </Text>
          {t >= 4.4 && t < 6.6 && (
            <Text x={(CONTRACT[0] + STORAGE[0]) / 2 + 10} y={CONTRACT[1] + 22} className="iso-note is-tx" opacity={prog(t, 4.4, 0.3)}>
              just a link
            </Text>
          )}
          <Badge at={[(CONTRACT[0] + STORAGE[0]) / 2 + 16, (CONTRACT[1] + STORAGE[1]) / 2 - 22]} ok={false} scale={backOut(prog(t, 6.8, 0.3))} r={8} />
        </g>
      )}

      {pills.map((p, i) => (
        <Pill key={i} at={p.at} text={p.text} tone={p.tone} />
      ))}
    </g>
  );
}

export function TokenScene() {
  const [kind, setKind] = useState<Kind>('token');
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
      title="Tokens, stablecoins and NFTs: balances and ownership live in a smart contract, and wallets only display them; a stablecoin is backed by its issuer's reserves; an NFT's image usually lives offchain"
      viewBox="0 0 440 300"
      duration={DURATION}
      poster={5.4}
      steps={STEPS[kind]}
      render={(t) => render(t, kind)}
      controls={
        <div className="flex shrink-0 border border-fd-border">
          {tab('token', 'Token')}
          {tab('stable', 'Stablecoin')}
          {tab('nft', 'NFT')}
        </div>
      }
    />
  );
}
