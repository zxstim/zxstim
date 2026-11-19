'use client';

import { useState } from 'react';
import type { BoxSpec, Pt } from '@/lib/ethereum/iso';
import { COS30 } from '@/lib/ethereum/iso';
import { backOut, easeInOut, lerp, prog } from '@/lib/ethereum/timeline';
import { cn } from '@/lib/utils';
import { IsoFigure, type Step } from './figure';
import { Arrow, Badge, Box, Cube, Phone, Shadow, Text } from './parts';

/**
 * A rollup: transactions run on Layer 2, are batched, and the batch's data is
 * posted to Ethereum. Then either a challenge window (optimistic) or a
 * validity proof (ZK) settles that the batch is correct.
 */

type Kind = 'optimistic' | 'zk';
const DURATION = 13;
const L1_Y = 96;
const L1_XS = [126, 214, 302];
const L1_BLOCK: BoxSpec = { w: 34, d: 34, h: 30 };
const BLOB_AT: Pt = [350, 112];
/** where the proof lands and the batch is settled */
const PROOF: Pt = [404, 100];
const BLOB: BoxSpec = { w: 18, d: 18, h: 12 };
const L2: Pt = [222, 252];
const PLATFORM: BoxSpec = { w: 180, d: 90, h: 8 };
const SEQ: BoxSpec = { w: 30, d: 30, h: 26, z: PLATFORM.h };
const SEQ_TOP: Pt = [L2[0], L2[1] - PLATFORM.h - SEQ.h - 14];
const USERS: Pt[] = [
  [136, 252],
  [178, 284],
  [270, 282],
  [312, 248],
];
const TX: BoxSpec = { w: 7, d: 7, h: 7 };
const TXS = 8;
const txAt = (n: number) => 0.2 + n * 0.5;

const COMMON: Step[] = [
  { at: 0, title: 'Transactions on Layer 2', body: 'You send transactions to the Layer 2. The sequencer puts them in order and confirms them almost instantly, for a low fee.' },
  { at: 4.6, title: 'Bundled into a batch', body: 'Many transactions are gathered up and compressed into one batch.' },
  { at: 6.2, title: 'Posted to Ethereum', body: "The batch's data is posted to Ethereum, usually as a blob, so anyone can download it and check it again." },
];
const LAST: Record<Kind, Step> = {
  optimistic: {
    at: 8,
    title: 'Wait for challenges',
    body: 'An optimistic rollup assumes the batch is correct. During the challenge period (usually a few days to a week), anyone who spots a mistake can submit a fraud proof to correct it.',
  },
  zk: { at: 8, title: 'Proof attached', body: 'A ZK-rollup sends a validity proof along with the batch. Ethereum checks the proof, so no challenge period is needed.' },
};

function render(t: number, kind: Kind) {
  const reset = 1 - prog(t, 12.2, 0.7);
  const batch = prog(t, 4.6, 1.2);
  const post = easeInOut(prog(t, 6.2, 1.3));
  const posted = t >= 7.5;
  const pending = TXS - Array.from({ length: TXS }, (_, n) => t >= txAt(n) + 0.5).filter(Boolean).length;
  const absorbed = batch >= 1 ? 0 : TXS - pending;
  // proof
  const wait = prog(t, 8.2, 3.2);
  const proofRun = easeInOut(prog(t, 8, 1.1));
  const settled = kind === 'optimistic' ? backOut(prog(t, 11.4, 0.35)) : backOut(prog(t, 9.2, 0.35));

  const seqBatch: Pt = [SEQ_TOP[0], SEQ_TOP[1] + 4];
  const blobPos: Pt = posted ? BLOB_AT : [lerp(seqBatch[0], BLOB_AT[0], post), lerp(seqBatch[1], BLOB_AT[1], post) - Math.sin(Math.PI * post) * 30];
  const half = L1_BLOCK.w * COS30;

  return (
    <>
      {/* Layer 1 */}
      <Text x={16} y={L1_Y - 10} anchor="start">
        Ethereum
      </Text>
      <Text x={16} y={L1_Y + 5} className="iso-sub" anchor="start">
        Layer 1
      </Text>
      {L1_XS.map((x, i) => (
        <g key={x}>
          <Shadow at={[x, L1_Y]} spec={L1_BLOCK} />
          <Cube at={[x, L1_Y]} spec={L1_BLOCK} />
          {i > 0 && <Arrow from={[x - half - 3, L1_Y - 15]} to={[L1_XS[i - 1] + half + 3, L1_Y - 15]} tone="block" />}
        </g>
      ))}

      {/* Layer 2 */}
      <Text x={16} y={L2[1] - 6} anchor="start">
        Layer 2
      </Text>
      <Text x={16} y={L2[1] + 9} className="iso-sub" anchor="start">
        rollup
      </Text>
      <Shadow at={L2} spec={PLATFORM} />
      <Box at={L2} spec={PLATFORM} tone="l2" />
      {USERS.map((u, i) => (
        <Phone key={i} at={[u[0], u[1] - PLATFORM.h]} lit={Array.from({ length: TXS }, (_, n) => n % USERS.length === i && t >= txAt(n) && t < txAt(n) + 0.3).some(Boolean)} />
      ))}
      <Shadow at={L2} spec={SEQ} />
      <Box at={L2} spec={SEQ} tone="l2" />
      <Text x={L2[0]} y={L2[1] + 30} className="iso-sub">
        sequencer
      </Text>

      {/* transactions flying to the sequencer */}
      {Array.from({ length: TXS }, (_, n) => {
        const k = prog(t, txAt(n), 0.5);
        if (k <= 0 || k >= 1) return null;
        const from = USERS[n % USERS.length];
        const e = easeInOut(k);
        return <Box key={n} at={[lerp(from[0], SEQ_TOP[0], e), lerp(from[1] - 40, SEQ_TOP[1], e) - Math.sin(Math.PI * e) * 18]} spec={TX} tone="tx" />;
      })}
      {absorbed > 0 && batch <= 0 && (
        <Text x={L2[0]} y={SEQ_TOP[1] - 26} className="iso-note is-tx">
          {absorbed} {absorbed === 1 ? 'transaction' : 'transactions'} ✓
        </Text>
      )}

      {/* the batch: grows on the sequencer, then goes up to Ethereum as a blob */}
      {batch > 0 && (
        <g opacity={reset}>
          <Cube at={blobPos} spec={{ ...BLOB, h: BLOB.h * (posted ? 1 : Math.max(0.15, batch)) }} tone="l2" />
          {!posted && post <= 0 && (
            <Text x={L2[0]} y={SEQ_TOP[1] - 26} className="iso-note is-l2" opacity={batch}>
              1 batch · compressed
            </Text>
          )}
          {post > 0 && <Arrow from={[seqBatch[0], seqBatch[1] - 6]} to={[BLOB_AT[0] - 10, BLOB_AT[1] + 10]} tone="l2" head={false} opacity={0.5} />}
        </g>
      )}
      {posted && (
        <Text x={BLOB_AT[0]} y={BLOB_AT[1] + 22} className="iso-sub" opacity={reset}>
          blob
        </Text>
      )}

      {/* proving it right, in its own column to the right of the chain */}
      {posted && kind === 'optimistic' && (
        <g opacity={reset}>
          <circle cx={PROOF[0]} cy={PROOF[1]} r={11} className="card" />
          <circle
            cx={PROOF[0]}
            cy={PROOF[1]}
            r={11}
            fill="none"
            style={{ stroke: 'var(--amber)', strokeWidth: 3 }}
            strokeDasharray={`${2 * Math.PI * 11 * wait} ${2 * Math.PI * 11}`}
            transform={`rotate(-90 ${PROOF[0]} ${PROOF[1]})`}
          />
          <Text x={PROOF[0]} y={PROOF[1] + 30} className="iso-note is-key">
            ~7 days
          </Text>
          <Text x={PROOF[0]} y={PROOF[1] + 44} className="iso-sub">
            challenge
          </Text>
        </g>
      )}
      {kind === 'zk' && proofRun > 0 && proofRun < 1 && (
        <g transform={`translate(${lerp(SEQ_TOP[0], PROOF[0], proofRun)} ${lerp(SEQ_TOP[1], PROOF[1], proofRun) - Math.sin(Math.PI * proofRun) * 30})`}>
          <rect x={-9} y={-9} width={18} height={18} className="card" style={{ stroke: 'var(--vote)', strokeWidth: 1.5 }} />
          <text y={4} textAnchor="middle" className="iso-note is-ok">
            π
          </text>
        </g>
      )}
      {kind === 'zk' && t >= 9 && (
        <g opacity={reset}>
          <Text x={PROOF[0]} y={PROOF[1] + 30} className="iso-note is-ok">
            validity
          </Text>
          <Text x={PROOF[0]} y={PROOF[1] + 44} className="iso-sub">
            proof
          </Text>
        </g>
      )}
      <Badge at={PROOF} ok scale={settled * reset} r={10} />
    </>
  );
}

export function RollupScene() {
  const [kind, setKind] = useState<Kind>('optimistic');
  const steps = [...COMMON, LAST[kind]];
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
      title="Rollup: transactions run on Layer 2, are bundled into a batch and posted to Ethereum; an optimistic rollup waits out a challenge period, a ZK-rollup attaches a validity proof"
      viewBox="0 0 440 330"
      duration={DURATION}
      poster={11.8}
      steps={steps}
      render={(t) => render(t, kind)}
      controls={
        <div className="flex shrink-0 border border-fd-border">
          {tab('optimistic', 'Optimistic')}
          {tab('zk', 'ZK')}
        </div>
      }
    />
  );
}
