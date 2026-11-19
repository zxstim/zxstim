import type { MDXComponents } from "mdx/types";
import { SectionCards } from "@/components/ethereum/section-cards";
import { ApprovalScene } from "@/components/ethereum/iso/approval-scene";
import { BlockAnatomy } from "@/components/ethereum/iso/block-anatomy";
import { ByzantineScene } from "@/components/ethereum/iso/byzantine-scene";
import { ChainScene } from "@/components/ethereum/iso/chain-scene";
import { ConsensusScene } from "@/components/ethereum/iso/consensus-scene";
import { ContractScene } from "@/components/ethereum/iso/contract-scene";
import { DelegationScene } from "@/components/ethereum/iso/delegation-scene";
import { ExplorerScene } from "@/components/ethereum/iso/explorer-scene";
import { FeeMarketScene } from "@/components/ethereum/iso/fee-market-scene";
import { FinalityScene } from "@/components/ethereum/iso/finality-scene";
import { GasScene } from "@/components/ethereum/iso/gas-scene";
import { KeysScene } from "@/components/ethereum/iso/keys-scene";
import { NetworksScene } from "@/components/ethereum/iso/networks-scene";
import { NodeScene } from "@/components/ethereum/iso/node-scene";
import { PoisoningScene } from "@/components/ethereum/iso/poisoning-scene";
import { PrivacyScene } from "@/components/ethereum/iso/privacy-scene";
import { RecoveryScene } from "@/components/ethereum/iso/recovery-scene";
import { RollupScene } from "@/components/ethereum/iso/rollup-scene";
import { SignatureScene } from "@/components/ethereum/iso/signature-scene";
import { SmartWalletScene } from "@/components/ethereum/iso/smart-wallet-scene";
import { SupplyScene } from "@/components/ethereum/iso/supply-scene";
import { TokenScene } from "@/components/ethereum/iso/token-scene";
import { UpgradeScene } from "@/components/ethereum/iso/upgrade-scene";
import { UserOpScene } from "@/components/ethereum/iso/user-op-scene";
import { ValidatorsScene } from "@/components/ethereum/iso/validators-scene";

/**
 * MDX components only the Ethereum wiki uses: the section cards and the 25
 * isometric explainers. Passed by the /ethereum page alone, so /writing and
 * /docs don't bundle the animations. A component used in content but missing
 * here fails the prerender, so the build catches it.
 */
export const ethereumMdxComponents = {
  SectionCards,
  ApprovalScene,
  BlockAnatomy,
  ByzantineScene,
  ChainScene,
  ConsensusScene,
  ContractScene,
  DelegationScene,
  ExplorerScene,
  FeeMarketScene,
  FinalityScene,
  GasScene,
  KeysScene,
  NetworksScene,
  NodeScene,
  PoisoningScene,
  PrivacyScene,
  RecoveryScene,
  RollupScene,
  SignatureScene,
  SmartWalletScene,
  SupplyScene,
  TokenScene,
  UpgradeScene,
  UserOpScene,
  ValidatorsScene,
} satisfies MDXComponents;
