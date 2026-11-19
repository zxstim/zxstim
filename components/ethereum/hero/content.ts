/**
 * Words of the home hero, shared by the wide and the tall (phone) versions:
 * the six story steps, what each "+" explains, the guided tour order and the
 * wiki pages each topic links to. Positions live in `layout.ts`.
 */

import { T, activeSteps } from '@/lib/ethereum/timeline';

export const STEPS = [
  {
    title: 'Send a transaction',
    body: "The wallet signs the transaction and sends it to a node over RPC. The node's execution layer checks the signature and the balance, then puts the transaction in the mempool (the queue of pending transactions).",
    tone: 'tx',
  },
  {
    title: 'Propagation',
    body: "The node forwards the transaction to its peers over the P2P network. Within a few seconds, the transaction is in the mempool of most of the network, including the block builders'.",
    tone: 'tx',
  },
  {
    title: 'Block auction',
    body: 'Several block builders each pack transactions into a block, then bid through a relay node. A bid is the amount of ETH the builder pays the proposer, and it rises as more transactions come in.',
    tone: 'block',
  },
  {
    title: 'Block proposal',
    body: "Each 12-second slot has one randomly chosen proposer; here it's the validator in the node. MEV-Boost takes the highest bid from the relay node, the validator signs, the relay node publishes the block and the block joins the chain.",
    tone: 'block',
  },
  {
    title: 'Attestation',
    body: "A committee (1/32 of all validators) votes for the block at the head of the chain; each vote is an attestation. A single block doesn't need 2/3: it joins the chain as soon as the proposer signs and publishes it.",
    tone: 'vote',
  },
  {
    title: 'Finality: 2/3',
    body: "In every epoch (32 slots), every validator casts one vote. When the votes reach 2/3 of all staked ETH, the epoch's checkpoint is justified. When two checkpoints in a row both reach 2/3, the earlier one reaches finality.",
    tone: 'vote',
  },
] as const;

export const STILL_STEPS = activeSteps(T.still);

export const CAPTION =
  "An illustration: a solo staker's node, whose validator has been chosen as the proposer for this slot. In reality each slot's proposer is picked at random from all validators, and most blocks are built through MEV-Boost as shown here. The story runs in real time (12 seconds per slot) from sending the transaction until the block is attested, then fast-forwards until the block is finalized. Slot and epoch numbers are taken from mainnet when the story starts, but the story's pace doesn't match the real slots; the 2/3 bar assumes 99% of validators vote on time; the transactions and bids are illustrative.";

export const SCENE_TITLE = 'An Ethereum block is built, auctioned, signed, added to the chain and finalized';
export const SCENE_DESC =
  "A wallet sends a transaction to a validator's node. The execution layer puts the transaction in the mempool and spreads it over the P2P network to other nodes and to block builders. The block builders bid through a relay node; the node's MEV-Boost picks the highest bid, the validator signs, the relay node publishes the block and the block joins the chain. The attestation committee votes for the block. Then a fast-forward shows every validator's votes, epoch by epoch: when they reach 2/3 of all staked ETH, the epoch checkpoint is justified, and when two checkpoints in a row reach 2/3, the block is finalized.";

// ── what each "+" explains ───────────────────────────────────────────────

/**
 * `rel`: a "+" in the middle of a connection, explaining the relationship.
 * `item`: a mini "+" next to a part.
 * `group` is the scene layer the button sits on (network buttons dim with the network in the fast-forward).
 */
export interface InfoText {
  id: string;
  kind: 'rel' | 'item';
  group: 'net' | 'committee' | 'chain';
  title: string;
  via: string;
  body: string;
}

const RELATIONS: Omit<InfoText, 'kind'>[] = [
  {
    id: 'wallet-rpc',
    group: 'net',
    title: 'Wallet → Node (RPC)',
    via: 'JSON-RPC · eth_sendRawTransaction',
    body: "The wallet signs the transaction with your private key right on your device, then sends the signed copy to a node over RPC. The node can be your own or an RPC provider's. The node never holds your keys and can't change a signed transaction.",
  },
  {
    id: 'execution',
    group: 'net',
    title: 'Inside the execution layer: RPC → Mempool → P2P',
    via: 'execution client (Geth, Nethermind, Reth…)',
    body: 'The execution layer checks the signature, the nonce and that the balance can cover the fees. A valid transaction goes into the mempool to wait for a block, and at the same time is passed on to other nodes.',
  },
  {
    id: 'p2p',
    group: 'net',
    title: 'Node → Other nodes (P2P)',
    via: "devp2p · the execution layer's peer-to-peer network",
    body: 'Nodes connect to each other in a peer-to-peer network with no central server. Each node tells a few neighbors about a new transaction, and they pass it on. Within a few seconds the transaction has spread across the network, so any proposer can include it in a block.',
  },
  {
    id: 'peer-builder',
    group: 'net',
    title: 'Other nodes → Block builders',
    via: 'public mempool + privately sent transactions',
    body: 'Block builders run nodes too, so they see the public mempool. They also receive transactions sent straight to them, bypassing the mempool (private orderflow). From these they pick and order transactions to make the block as valuable as possible.',
  },
  {
    id: 'builder-relay',
    group: 'net',
    title: 'Block builders → Relay node',
    via: 'relay API',
    body: "Block builders send their block with a bid (the ETH they will pay the proposer) to the relay node. The relay checks that the block is valid and pays what was promised, then shows the proposer only the block's header, without revealing the transactions inside. Block builders have to trust the relay not to steal their blocks.",
  },
  {
    id: 'consensus',
    group: 'net',
    title: 'Inside the consensus layer: Validator → Beacon → MEV-Boost',
    via: 'Beacon API · Builder API',
    body: "The validator holds the signing key but doesn't talk to the network itself. It asks the beacon node (the consensus layer) for a block, and the beacon node asks MEV-Boost. If there's no good bid, the beacon node gets a block from the node's own execution layer instead.",
  },
  {
    id: 'mev-relay',
    group: 'net',
    title: 'MEV-Boost ↔ Relay node',
    via: 'Builder API · getHeader → submitBlindedBlock',
    body: "At the start of the slot, the node's MEV-Boost asks the relay nodes for the highest bid and gets back the block header. The validator signs that header without seeing the transactions inside (blind signing). Only once it has the signature does the relay send the block body and publish the block.",
  },
  {
    id: 'relay-chain',
    group: 'net',
    title: 'Relay node → Blockchain',
    via: "libp2p · the consensus layer's peer-to-peer network",
    body: "The relay node publishes the full block, and the proposer's node broadcasts it too. From there every node relays the block to the others over P2P, and each node checks the block again for itself (signature, transactions, state) before adding it to its own chain. No node has to trust the relay.",
  },
  {
    id: 'attest',
    group: 'committee',
    title: 'Committee → Head of the chain',
    via: 'attestations · BLS signature aggregation',
    body: 'Every slot, about 1/32 of all validators are assigned to vote. Each attestation says two things: which block is the head of the chain, and which epoch checkpoint is the right one. The signatures of many votes are combined to save space, then included in later blocks.',
  },
  {
    id: 'parent',
    group: 'chain',
    title: 'Block → Previous block',
    via: 'parent hash',
    body: 'Each block records the hash of the block right before it. Changing an old transaction would change the hash of the block that contains it and break the link to every block after it. To rewrite the past, you would have to redo every block that came after.',
  },
  {
    id: 'finality',
    group: 'chain',
    title: 'Finalized checkpoint ← Justified checkpoint',
    via: 'Casper FFG',
    body: 'The first block of each epoch is a checkpoint. When the votes for a checkpoint reach 2/3 of all staked ETH, the checkpoint is justified. When the next checkpoint also reaches 2/3, the earlier one is finalized: reversing it would cost at least 1/3 of all staked ETH.',
  },
];

const ITEMS: Omit<InfoText, 'kind'>[] = [
  {
    id: 'wallet',
    group: 'net',
    title: 'Wallet',
    via: 'private key · recovery phrase',
    body: "A wallet doesn't hold your money: your assets live on the blockchain. The wallet holds the private key that signs transactions, and whoever has the key (or the recovery phrase) has full control of the assets. That's why you never give your recovery phrase to anyone.",
  },
  {
    id: 'node',
    group: 'net',
    title: 'Validator node',
    via: 'execution layer + consensus layer',
    body: 'An Ethereum node is two pieces of software running together: the execution layer processes transactions and keeps the state, and the consensus layer tracks blocks and votes. Stakers also run validator software, and may run MEV-Boost.',
  },
  {
    id: 'rpc',
    group: 'net',
    title: 'RPC',
    via: 'JSON-RPC',
    body: "The gateway wallets and apps use to talk to a node: reading balances, estimating fees, sending transactions. With a provider's RPC, you trust them to answer truthfully; with your own node, you can verify for yourself.",
  },
  {
    id: 'mempool',
    group: 'net',
    title: 'Mempool',
    via: 'queue of pending transactions',
    body: "Where valid transactions wait until they make it into a block. Every node has its own mempool, so there's no single shared list. Transactions that pay a higher priority fee are usually picked first.",
  },
  {
    id: 'p2p-module',
    group: 'net',
    title: 'P2P',
    via: 'devp2p',
    body: "Each node stays connected to a few dozen other nodes to exchange transactions. There's no central server, so the network keeps running when some nodes go offline.",
  },
  {
    id: 'validator',
    group: 'net',
    title: 'Validator',
    via: 'signing key · staked ETH',
    body: 'Software that holds the signing key of someone who has staked at least 32 ETH. It signs a block when chosen to propose, and signs one attestation every epoch. Signing two conflicting blocks for the same slot is heavily penalized (slashing).',
  },
  {
    id: 'beacon',
    group: 'net',
    title: 'Beacon node',
    via: 'consensus client (Lighthouse, Prysm, Teku…)',
    body: 'The consensus layer: it tracks blocks and votes, picks the head of the chain based on the votes, and drives the execution layer through the Engine API. The validator relies on it to know when to propose or vote.',
  },
  {
    id: 'mev',
    group: 'net',
    title: 'MEV-Boost',
    via: 'optional software',
    body: 'Runs alongside the beacon node and lets the proposer sell the right to build its block to the highest bidder, which usually earns more than building the block itself. The trade-off: you have to trust the relay node, and block building ends up in fewer hands.',
  },
  {
    id: 'peers',
    group: 'net',
    title: 'Other nodes',
    via: 'thousands of nodes',
    body: 'Thousands of nodes around the world, run by individuals, companies and organizations. Each node keeps a copy of the blockchain and checks every block for itself, so no one can rewrite history on their own.',
  },
  {
    id: 'builders',
    group: 'net',
    title: 'Block builders',
    via: 'transaction ordering · MEV',
    body: 'Specialists in optimizing blocks: they choose and order transactions to collect fees and MEV (value that comes from the order of transactions). Today just a few large block builders produce most of the blocks on Ethereum.',
  },
  {
    id: 'relay',
    group: 'net',
    title: 'Relay node (MEV-Boost)',
    via: 'a middleman node run by a third party',
    body: "A node run by a dedicated relay operator, such as Flashbots or Ultra Sound. Besides the relay software, it runs a full node (beacon) to check the block builders' blocks and publish the winning one. It keeps the block secret until the proposer signs, and makes sure the proposer is paid the promised price. The validator node doesn't do this itself; it uses MEV-Boost to ask the relay.",
  },
  {
    id: 'committee',
    group: 'committee',
    title: 'Attestation committee',
    via: '1/32 of all validators per slot',
    body: 'Every epoch, all validators are split across the 32 slots, one committee per slot. Voting on time earns a reward; missing a vote costs a little. The picture shows only 7; in reality each slot has tens of thousands of validators.',
  },
  {
    id: 'chain',
    group: 'chain',
    title: 'Blockchain',
    via: 'one slot every 12 seconds',
    body: "Each block has a header (slot number, proposer, parent hash, state root) and a body (transactions, attestations). The head of the chain is the newest block on the branch with the most votes behind it. If a slot's proposer is absent, that slot has no block.",
  },
  {
    id: 'justified',
    group: 'chain',
    title: 'Justified checkpoint',
    via: 'Casper FFG',
    body: "The first block of an epoch, which has received votes from 2/3 of all staked ETH. It isn't finalized yet, but it's already very hard to replace. When the next checkpoint also reaches 2/3, this one is finalized.",
  },
  {
    id: 'finalized',
    group: 'chain',
    title: 'Finalized checkpoint',
    via: 'irreversible',
    body: 'This block and every block before it are finalized. Reversing them would take at least 1/3 of all staked ETH breaking the rules, and that ETH would be burned: millions of ETH. Many bridges wait for this checkpoint before treating a transaction as certain.',
  },
  {
    id: 'gauge',
    group: 'chain',
    title: 'Votes for the epoch checkpoint',
    via: 'weighted by staked ETH',
    body: "The bar adds up the current epoch's votes by staked ETH, not by number of people. Once it passes 2/3, the checkpoint is justified when the epoch ends. This is a model that assumes 99% of validators vote on time, not live data.",
  },
];

/** Everything a "+" can open: relationships on the lines, and details next to parts. */
export const INFO: InfoText[] = [
  ...RELATIONS.map((r) => ({ ...r, kind: 'rel' as const })),
  ...ITEMS.map((r) => ({ ...r, kind: 'item' as const })),
];
export const INFO_BY_ID: Record<string, InfoText> = Object.fromEntries(INFO.map((i) => [i.id, i]));

/** Guided order for "Next →": follows a transaction from the wallet to finality. */
export const TOUR = [
  'wallet',
  'wallet-rpc',
  'node',
  'rpc',
  'execution',
  'mempool',
  'p2p-module',
  'p2p',
  'peers',
  'peer-builder',
  'builders',
  'builder-relay',
  'relay',
  'mev-relay',
  'mev',
  'consensus',
  'beacon',
  'validator',
  'relay-chain',
  'chain',
  'parent',
  'committee',
  'attest',
  'gauge',
  'justified',
  'finality',
  'finalized',
];

/** Wiki pages that already cover a topic. Topics without a page get no link (no "coming soon" dead ends). */
const READ = {
  wallet: { href: '/ethereum/basics/getting-started/wallets-and-accounts', label: 'Wallets, accounts and recovery phrases' },
  network: { href: '/ethereum/basics/getting-started/what-is-ethereum#the-ethereum-network', label: 'The Ethereum network' },
  chain: { href: '/ethereum/basics/how-it-works/blockchain', label: 'What is a blockchain?' },
  pos: { href: '/ethereum/basics/how-it-works/consensus#proof-of-stake', label: 'Consensus: proof of stake' },
  validators: { href: '/ethereum/basics/how-it-works/validators', label: 'Validators' },
  signature: { href: '/ethereum/basics/how-it-works/digital-signatures', label: 'Digital signatures' },
  block: { href: '/ethereum/basics/how-it-works/blocks', label: 'Blocks' },
  finality: { href: '/ethereum/basics/how-it-works/blocks#when-can-a-block-no-longer-be-reversed', label: 'Finality' },
  node: { href: '/ethereum/basics/how-it-works/nodes', label: 'Nodes' },
};
export const MORE: Record<string, { href: string; label: string }> = {
  wallet: READ.wallet,
  'wallet-rpc': READ.signature,
  node: READ.node,
  rpc: READ.node,
  peers: READ.network,
  p2p: READ.network,
  'p2p-module': READ.network,
  mempool: READ.block,
  execution: READ.block,
  builders: READ.block,
  'relay-chain': READ.block,
  validator: READ.validators,
  committee: READ.validators,
  attest: READ.pos,
  chain: READ.chain,
  parent: READ.chain,
  justified: READ.finality,
  finalized: READ.finality,
  finality: READ.finality,
  gauge: READ.finality,
};

/** Per-viewer convenience: which "+" this browser has opened. Shared by both versions. */
export const SEEN_KEY = 'eth-hero-seen';
