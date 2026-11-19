'use client';

import type { BoxSpec, Pt } from '@/lib/ethereum/iso';
import { backOut, easeInOut, lerp, prog } from '@/lib/ethereum/timeline';
import { IsoFigure, type Step } from './figure';
import { Arrow, Badge, Box, Card, Phone, Server, Shadow, Text } from './parts';

/**
 * A signed transaction: the wallet signs with its private key; any node can
 * recover the signer from the signature and the content; change the content
 * and the signature no longer matches the sender.
 */

const DURATION = 12;
const PHONE: Pt = [70, 236];
const KEY: Pt = [104, 246];
const KEY_SPEC: BoxSpec = { w: 14, d: 14, h: 12 };
const NODE: Pt = [370, 236];
const CARD_W = 150;
const CARD_FROM: Pt = [14, 40];
const CARD_TO: Pt = [262, 40];

const STEPS: Step[] = [
  { at: 0, title: 'Sign in the wallet', body: 'The wallet uses the private key to sign the transaction contents. The key never leaves the wallet.' },
  { at: 2.2, title: 'Send to the network', body: 'What gets sent is the contents plus the signature. Seeing the signature does not let anyone get the key.' },
  { at: 3.8, title: 'The node checks', body: "From the signature and the contents, the node works out the signer's address. If it matches the sender, the transaction is valid." },
  { at: 6, title: 'Tampering shows', body: 'Changing the amount means the signature no longer matches: the node works out a different address and rejects the transaction.' },
];

function render(t: number) {
  const show = prog(t, 0, 0.5) * (1 - prog(t, 11.2, 0.7));
  const stamp = prog(t, 0.8, 0.9);
  const signed = t >= 1.6;
  const travel = easeInOut(prog(t, 2.2, 1.3));
  const card: Pt = [lerp(CARD_FROM[0], CARD_TO[0], travel), lerp(CARD_FROM[1], CARD_TO[1], travel) - Math.sin(Math.PI * travel) * 14];
  const check1 = prog(t, 3.9, 0.6);
  const ok = backOut(prog(t, 4.6, 0.35)) * (1 - prog(t, 5.8, 0.3));
  const tampered = t >= 6.2;
  const check2 = prog(t, 6.9, 0.6);
  const bad = backOut(prog(t, 7.6, 0.35)) * (1 - prog(t, 11.2, 0.6));
  const recovered = t >= 7.4 ? '0x9e2D…01aF' : '0x71C7…976F';

  const rows = [
    'From      0x71C7…976F',
    'To        0xAb58…3c12',
    `Amount    ${tampered ? '10 ETH' : '0.1 ETH'}`,
    'Nonce     7',
    signed ? 'Signature 0x3f9a…c41b' : 'Signature …',
  ];

  // the key token rises from the wallet to the card while signing
  const keyRun = easeInOut(stamp);
  const keyPos: Pt = [lerp(KEY[0], CARD_FROM[0] + CARD_W - 18, keyRun), lerp(KEY[1] - 14, CARD_FROM[1] + 88, keyRun)];

  return (
    <>
      <Phone at={PHONE} lit={t >= 0.8 && t < 1.8} />
      <Shadow at={KEY} spec={KEY_SPEC} />
      <Box at={KEY} spec={KEY_SPEC} tone="key" />
      <Text x={PHONE[0] + 14} y={PHONE[1] + 34}>
        Wallet
      </Text>
      <Text x={PHONE[0] + 14} y={PHONE[1] + 48} className="iso-sub is-key">
        holds the private key
      </Text>

      <Server at={NODE} />
      <Text x={NODE[0]} y={NODE[1] + 34}>
        Node
      </Text>
      <Text x={NODE[0]} y={NODE[1] + 48} className="iso-sub">
        run by anyone
      </Text>

      {/* signing: the key travels to the card and leaves a signature */}
      {stamp > 0 && stamp < 1 && <circle cx={keyPos[0]} cy={keyPos[1]} r={5} style={{ fill: 'var(--key)' }} />}

      <Card x={card[0]} y={card[1]} w={CARD_W} title="TRANSACTION" rows={rows} opacity={show} highlight={tampered ? 2 : undefined} />
      {tampered && (
        <Text x={card[0] + CARD_W / 2} y={card[1] - 8} className="iso-note is-bad" opacity={prog(t, 6.2, 0.3) * (1 - prog(t, 11.2, 0.6))}>
          someone edits the amount
        </Text>
      )}

      {/* checking: from the signature, the node recovers who signed */}
      {[check1 * (1 - prog(t, 5.8, 0.3)), check2 * (1 - prog(t, 11.2, 0.6))].map((k, i) =>
        k > 0 ? <Arrow key={i} from={[CARD_TO[0] + CARD_W / 2, CARD_TO[1] + 112]} to={[NODE[0], NODE[1] - 58]} tone={i === 0 ? 'ok' : 'bad'} k={easeInOut(k)} /> : null,
      )}
      {(ok > 0 || bad > 0) && (
        <>
          <Text x={NODE[0] - 30} y={NODE[1] - 74} className="iso-sub" anchor="end">
            signer:
          </Text>
          <Text x={NODE[0] - 30} y={NODE[1] - 60} className={bad > 0 ? 'iso-hash is-bad' : 'iso-hash is-ok'} anchor="end">
            {recovered}
          </Text>
        </>
      )}
      <Badge at={[NODE[0] + 24, NODE[1] - 64]} ok scale={ok} />
      <Badge at={[NODE[0] + 24, NODE[1] - 64]} ok={false} scale={bad} />
      <Text x={NODE[0] - 30} y={NODE[1] - 44} className="iso-note is-bad" anchor="end" opacity={Math.min(1, bad)}>
        ≠ sender · rejected
      </Text>
      <Text x={NODE[0] - 30} y={NODE[1] - 44} className="iso-note is-ok" anchor="end" opacity={Math.min(1, ok)}>
        = sender · valid
      </Text>
    </>
  );
}

export function SignatureScene() {
  return (
    <IsoFigure
      title="Digital signature: the wallet signs the transaction with the private key and the node checks who signed it; change the contents and the signature no longer matches"
      viewBox="0 0 440 300"
      duration={DURATION}
      poster={5.2}
      steps={STEPS}
      render={render}
    />
  );
}
