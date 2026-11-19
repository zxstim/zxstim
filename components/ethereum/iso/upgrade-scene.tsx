'use client';

import type { BoxSpec, Pt } from '@/lib/ethereum/iso';
import { COS30 } from '@/lib/ethereum/iso';
import { backOut, prog } from '@/lib/ethereum/timeline';
import { IsoFigure, type Step } from './figure';
import { Arrow, Badge, Box, Card, Cube, Pill, Shadow, Text, type Tone } from './parts';

/**
 * How Ethereum upgrades: anyone writes a proposal (EIP); client teams discuss
 * it in public calls and pick what goes into the next upgrade; several teams
 * each implement it and test it on testnets; at a set epoch every updated node
 * switches rules together, and a node that didn't update is left behind.
 */

const DURATION = 12;
const MEET: Pt[] = [
  [174, 62],
  [204, 46],
  [204, 78],
];
const TEAMS: { at: Pt; tone: Tone }[] = [
  { at: [272, 66], tone: 'tx' },
  { at: [304, 50], tone: 'block' },
  { at: [336, 66], tone: 'final' },
  { at: [368, 50], tone: 'key' },
  { at: [400, 66], tone: 'l2' },
];
const PERSON: BoxSpec = { w: 12, d: 12, h: 14 };
const TEAM: BoxSpec = { w: 18, d: 18, h: 16 };
const TEST_Y = 150;
const TEST_XS = [190, 232, 274];
const SMALL: BoxSpec = { w: 18, d: 18, h: 16 };
const MAIN_Y = 236;
const OLD_XS = [40, 92, 144];
const NEW_XS = [214, 266, 318, 370];
const FORK_X = 178;
const BLOCK: BoxSpec = { w: 26, d: 26, h: 22 };
const HALF = BLOCK.w * COS30;

const STEPS: Step[] = [
  { at: 0, title: 'Proposal (EIP)', body: 'Anyone can write an Ethereum Improvement Proposal (EIP) and put it up for public discussion.' },
  { at: 2.6, title: 'Discussed in public, picked for an upgrade', body: 'The development teams talk it over in open meetings and choose which EIPs go into the next upgrade.' },
  { at: 5.2, title: 'Many teams build and test', body: 'Each client team makes the change in its own software, then tries it out on testnets.' },
  { at: 8, title: 'Everyone upgrades at once', body: 'At a point set in advance, every updated node switches to the new rules together. A node that did not update is split off from the network.' },
];

function render(t: number) {
  const fade = 1 - prog(t, 11.4, 0.6);
  const eip = prog(t, 0.2, 0.5);
  const toMeet = prog(t, 1.4, 0.8);
  const talk = t >= 2.6 && t < 5.2;
  const chosen = backOut(prog(t, 4.4, 0.3));
  const teamsOn = (i: number) => t >= 5.4 + i * 0.3;
  const test = (i: number) => prog(t, 6.6 + i * 0.35, 0.3);
  const fork = backOut(prog(t, 8.1, 0.35));
  const grow = (i: number) => prog(t, 8.6 + i * 0.55, 0.35);
  const left = prog(t, 9.4, 0.4);

  return (
    <g opacity={fade < 1 ? 0.3 + 0.7 * fade : 1}>
      {/* 1. the proposal */}
      <Card x={12} y={30} w={118} title="EIP-XXXX" rows={['improvement', 'proposal']} opacity={eip} />
      <Arrow from={[134, 56]} to={[158, 60]} tone="block" k={toMeet} />

      {/* 2. the public calls */}
      {MEET.map((p, i) => (
        <Box key={i} at={p} spec={PERSON} tone={talk ? 'tx' : 'device'} />
      ))}
      <Text x={192} y={110} className="iso-sub">
        open meetings
      </Text>
      {talk && <Pill at={[192, 18]} text={t >= 4.4 ? 'chosen ✓' : 'discussing…'} tone={t >= 4.4 ? 'ok' : 'tx'} opacity={Math.min(1, chosen + 0.6)} />}
      <Arrow from={[222, 62]} to={[252, 62]} tone="block" k={prog(t, 4.8, 0.5)} />

      {/* 3. several teams, several programs */}
      {TEAMS.map((tm, i) => (
        <g key={i}>
          <Shadow at={tm.at} spec={TEAM} />
          <Box at={tm.at} spec={TEAM} tone={teamsOn(i) ? tm.tone : 'device'} />
        </g>
      ))}
      <Text x={336} y={104} className="iso-sub">
        many teams, many clients
      </Text>
      <Text x={TEST_XS[0] - 30} y={TEST_Y - 6} className="iso-sub" anchor="end">
        testnets
      </Text>
      {TEST_XS.map((x, i) => {
        const k = test(i);
        return k > 0 ? (
          <g key={x} opacity={k}>
            <Cube at={[x, TEST_Y]} spec={SMALL} tone="l2" />
            {i > 0 && <Arrow from={[x - 18, TEST_Y - 8]} to={[TEST_XS[i - 1] + 18, TEST_Y - 8]} tone="l2" />}
          </g>
        ) : null;
      })}

      {/* 4. mainnet: the fork at a set point */}
      <Text x={14} y={MAIN_Y - 46} className="iso-sub" anchor="start">
        mainnet
      </Text>
      {OLD_XS.map((x, i) => (
        <g key={x}>
          <Cube at={[x, MAIN_Y]} spec={BLOCK} />
          {i > 0 && <Arrow from={[x - HALF - 3, MAIN_Y - 11]} to={[OLD_XS[i - 1] + HALF + 3, MAIN_Y - 11]} tone="block" />}
        </g>
      ))}
      {fork > 0 && (
        <g>
          <path className="iso-line" data-tone="key" d={`M${FORK_X} ${MAIN_Y + 18} V${MAIN_Y - 50}`} style={{ strokeDasharray: '3 3' }} />
          <Pill at={[FORK_X, MAIN_Y - 62]} text="upgrade point" tone="key" opacity={Math.min(1, fork)} />
        </g>
      )}
      {NEW_XS.map((x, i) => {
        const k = grow(i);
        return k > 0 ? (
          <g key={x} opacity={k}>
            <Cube at={[x, MAIN_Y]} spec={BLOCK} tone="final" />
            <Arrow from={[x - HALF - 3, MAIN_Y - 11]} to={[(i === 0 ? OLD_XS[2] : NEW_XS[i - 1]) + HALF + 3, MAIN_Y - 11]} tone="ok" />
          </g>
        ) : null;
      })}
      {/* the node that didn't update: one block on old rules, then stuck */}
      {left > 0 && (
        <g opacity={left * 0.7}>
          <Cube at={[NEW_XS[0] + 6, MAIN_Y + 46]} spec={{ ...BLOCK, h: 16 }} />
          <Arrow from={[NEW_XS[0] + 6 - HALF, MAIN_Y + 34]} to={[OLD_XS[2] + HALF, MAIN_Y - 4]} tone="lane" />
          <Badge at={[NEW_XS[0] + 46, MAIN_Y + 40]} ok={false} scale={backOut(prog(t, 9.8, 0.3))} r={7} />
          <Text x={NEW_XS[0] + 58} y={MAIN_Y + 44} className="iso-note is-bad" anchor="start">
            not updated: split off
          </Text>
        </g>
      )}
    </g>
  );
}

export function UpgradeScene() {
  return (
    <IsoFigure
      title="How Ethereum upgrades: an EIP is proposed and discussed in public, several client teams build and test it, then the whole network switches to the new rules at a point set in advance"
      viewBox="0 0 440 300"
      duration={DURATION}
      poster={10.6}
      steps={STEPS}
      render={render}
    />
  );
}
