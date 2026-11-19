'use client';

import type { BoxSpec, Pt } from '@/lib/ethereum/iso';
import { iso } from '@/lib/ethereum/iso';
import { backOut, easeInOut, easeOut, lerp, prog } from '@/lib/ethereum/timeline';
import { IsoFigure, type Step } from './figure';
import { Arrow, Badge, Box, Flame, Pill, Shadow, Text } from './parts';

/**
 * Finality, time-lapsed: slots fill three epochs of 32; each epoch's first
 * block is its checkpoint; when the votes for a checkpoint reach 2/3 of all
 * staked ETH it is justified, and when the next checkpoint is justified too,
 * the earlier one is finalized together with every block before it. A block
 * waits 2 to 3 epochs (about 13 to 19 minutes). Reverting a finalized block
 * means at least 1/3 of all stake breaks the rules and is slashed.
 *
 * Simplified like the home hero: a checkpoint counts as justified the moment
 * its gauge passes 2/3 (on mainnet that is processed at the epoch boundary).
 */

const DURATION = 13;
const SLOTS = 32;
const COLS = 8;
const EPOCH_S = 2.8;
const START = 0.2;
/** real minutes per second of animation */
const MIN_PER_S = 6.4 / EPOCH_S;
const PARTICIPATION = 0.99;

const Y = 172;
const XS = [80, 220, 360];
const SLAB: BoxSpec = { w: 92, d: 48, h: 4 };
const CELL: BoxSpec = { w: 9, d: 9, h: 6, z: 4 };
const CHECKPOINT: BoxSpec = { w: 9, d: 9, h: 16, z: 4 };
const MISSED = new Set(['0:21', '2:9']);
const TX = { e: 0, s: 11 };

const slotAt = (e: number, s: number) => START + e * EPOCH_S + s * (EPOCH_S / SLOTS);
const cellAt = (e: number, s: number): Pt => iso(XS[e], Y, -38.5 + (s % COLS) * 11, -16.5 + Math.floor(s / COLS) * 11);
/** the moment epoch e's checkpoint passes 2/3 of the stake */
const justifiedAt = (e: number) => START + e * EPOCH_S + ((2 / 3) / PARTICIPATION) * EPOCH_S;
/** checkpoint e is finalized when checkpoint e + 1 is justified */
const finalAt = (e: number) => justifiedAt(e + 1) + 0.2;
const TX_AT = slotAt(TX.e, TX.s);
const TX_FINAL = finalAt(1);

const STEPS: Step[] = [
  { at: 0, title: 'Slots and epochs', body: 'Each 12-second slot can hold one block; if the proposer is absent, the slot stays empty. 32 slots make an epoch, 6.4 minutes long. Your transaction is in a block, but it is not finalized yet.' },
  { at: 3, title: 'Checkpoints and the 2/3 vote', body: 'The first block of each epoch is a checkpoint. In each epoch, every validator votes once. When the votes reach 2/3 of all staked ETH, the checkpoint is justified.' },
  { at: 7.6, title: 'Two checkpoints in a row', body: 'Once the next checkpoint is justified too, the earlier one is finalized, along with every block before it. Counting from when a transaction lands in a block, this takes 2 to 3 epochs, about 13 to 19 minutes.' },
  { at: 9.6, title: 'Reversing it burns your own money', body: 'To reverse a finalized block, at least 1/3 of all staked ETH would have to break the rules, and that stake gets slashed.' },
];

function render(t: number) {
  const fade = 1 - prog(t, DURATION - 0.6, 0.6);
  const minutes = Math.max(0, Math.min(t, TX_FINAL) - TX_AT) * MIN_PER_S;
  const txFinal = t >= TX_FINAL;
  const attack = prog(t, 9.8, 1.1);
  const refused = t >= 10.9;

  const isFinal = (e: number, s: number) => {
    // checkpoint 0 finalizes when checkpoint 1 is justified; the rest of
    // epoch 0 (and checkpoint 1) when checkpoint 2 is justified, as a ripple
    // running back from checkpoint 1
    if (e === 0 && s === 0) return t >= finalAt(0);
    if (e === 1 && s === 0) return t >= finalAt(1);
    if (e === 0) return t >= finalAt(1) + (SLOTS - s) * 0.018;
    return false;
  };

  return (
    <g opacity={fade < 1 ? 0.3 + 0.7 * fade : 1}>
      {/* the clock, time-lapsed */}
      <Text x={12} y={22} anchor="start" className={txFinal ? 'iso-lbl is-ok' : 'iso-lbl'} opacity={prog(t, TX_AT, 0.3)}>
        {txFinal ? `finalized after ≈ ${Math.round(minutes)} min` : `${Math.round(minutes)} min since it entered a block`}
      </Text>
      <Text x={12} y={36} anchor="start" className="iso-sub">
        time-lapse: 1 second ≈ 2 minutes
      </Text>

      {XS.map((x, e) => {
        const begun = t >= slotAt(e, 0);
        const votes = Math.min(1, prog(t, START + e * EPOCH_S, EPOCH_S)) * PARTICIPATION;
        const justified = t >= justifiedAt(e);
        const finalized = e < 2 && t >= finalAt(e);
        const gaugeY = Y - 104;
        const flagTop = cellAt(e, 0);
        return (
          <g key={e}>
            <Shadow at={[x, Y]} spec={SLAB} />
            <Box at={[x, Y]} spec={SLAB} />
            {Array.from({ length: SLOTS }, (_, s) => {
              const st = slotAt(e, s);
              if (t < st || MISSED.has(`${e}:${s}`)) return null;
              const lift = (1 - easeOut(prog(t, st, 0.18))) * 14;
              const at = cellAt(e, s);
              const tone = isFinal(e, s) ? 'final' : e === TX.e && s === TX.s ? 'tx' : 'block';
              return <Box key={s} at={[at[0], at[1] - lift]} spec={s === 0 ? CHECKPOINT : CELL} tone={tone} />;
            })}

            {/* the checkpoint's flag, and the gauge of votes for it */}
            {begun && (
              <>
                <path className="iso-line" d={`M${flagTop[0]} ${flagTop[1] - 20} V${flagTop[1] - 36}`} />
                <path d={`M${flagTop[0]} ${flagTop[1] - 36} l10 3.5 l-10 3.5 Z`} style={{ fill: finalized ? 'var(--vote)' : 'var(--amber)' }} />
                {/* right of the flag: "checkpoint" is too long to sit left of the first one */}
                <Text x={flagTop[0] + 13} y={flagTop[1] - 29} anchor="start" className="iso-sub">
                  checkpoint
                </Text>
                <Arrow from={[x, gaugeY + 27]} to={[flagTop[0] + 4, flagTop[1] - 40]} head={false} opacity={0.6} />
                <rect className="card" x={x - 38} y={gaugeY} width={76} height={7} />
                <rect x={x - 38} y={gaugeY} width={76 * votes} height={7} style={{ fill: justified ? 'var(--vote)' : 'var(--block)' }} />
                <path className="iso-line" d={`M${x - 38 + (76 * 2) / 3} ${gaugeY - 3} v13`} />
                <Text x={x - 38 + (76 * 2) / 3} y={gaugeY - 6} className="iso-sub">
                  2/3
                </Text>
                <Text x={x} y={gaugeY + 20} className={finalized ? 'iso-note is-ok' : justified ? 'iso-lbl' : 'iso-sub'}>
                  {finalized ? 'finalized' : justified ? 'justified' : 'voting'}
                </Text>
              </>
            )}
            <Text x={x} y={Y + 52} className="iso-sub">
              {e === 0 ? 'Epoch N' : `Epoch N+${e}`}
            </Text>
          </g>
        );
      })}

      {/* your transaction's block */}
      {(() => {
        const at = cellAt(TX.e, TX.s);
        const land = prog(t, TX_AT, 0.25);
        return (
          <>
            {land > 0 && t < 3.2 && (
              <Pill at={[at[0], at[1] - 26]} text="your transaction" tone="tx" opacity={Math.min(land, 1 - prog(t, 2.9, 0.3))} />
            )}
            <Badge at={[at[0], at[1] - 18]} ok scale={txFinal ? backOut(prog(t, TX_FINAL + 0.4, 0.35)) * (1 - prog(t, 9.8, 0.2)) : 0} r={7} />
            <Badge at={[at[0], at[1] - 18]} ok={false} scale={refused ? backOut(prog(t, 10.9, 0.3)) : 0} r={8} />
          </>
        );
      })()}

      {/* trying to reverse it */}
      {attack > 0 && attack < 1 && (
        <Pill
          at={(() => {
            const to = cellAt(TX.e, TX.s);
            const e = easeInOut(attack);
            return [lerp(330, to[0] + 10, e), lerp(250, to[1] - 34, e) - Math.sin(Math.PI * e) * 30] as Pt;
          })()}
          text="reverse?"
          tone="bad"
        />
      )}
      {refused && (
        <g opacity={prog(t, 10.9, 0.3)}>
          <Flame at={[150, 256]} scale={0.6 + 0.08 * Math.sin(t * 9)} />
          <Text x={164} y={250} anchor="start" className="iso-note is-bad">
            costs ≥ 1/3 of all stake
          </Text>
        </g>
      )}
    </g>
  );
}

export function FinalityScene() {
  return (
    <IsoFigure
      title="Finality: blocks are grouped into epochs of 32 slots; when the checkpoints of two consecutive epochs both get votes from 2/3 of all staked ETH, the earlier checkpoint and every block before it are finalized, after about 13 to 19 minutes"
      viewBox="0 0 440 266"
      duration={DURATION}
      poster={8.6}
      steps={STEPS}
      render={render}
    />
  );
}
