"use client";

import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import KeyboardNav from "@/components/keyboard-nav";
import { MousePointerClick, ChevronRight } from 'lucide-react';
import TerminalContent, { TerminalContentProps } from "@/components/terminal-content";
import { MenuItem } from "@/components/terminal-menu";


export default function Works() {

  const [terminalContent, setTerminalContent] = useState<TerminalContentProps>({
    title: "",
    contents: [],
    links: undefined,
  });

  const terminalContentList = [
    {
      title: "head-of-devrel-bifrost.md",
      contents: [
        "Crosschain Liquid Staking Protocol for Polkadot and Ethereum ecosystems.",
      ],
      links: undefined,
    },
    {
      title: "devrel-engineer-kaia.md",
      contents: [
        "A leading Layer 1 public blockchain with a strong integration with Line Messenger."
      ],
      links: undefined,
    },
    {
      title: "apac-growth-lead-unlimit.md",
      contents: [
        "Next generation fiat on-ramp backed by a battled-tested payment enterprise with global coverage and over 1000+ payment methods."
      ],
      links: undefined,
    },
    {
      title: "vp-of-product-vietpay.md",
      contents: [
        "Innovative commercial banking platform for Vietnamese SMEs that help them to accept payments, and scale at a push of button."
      ],
      links: undefined,
    }
  ];

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "CV",
      url: "/cv",
    },
  ];

  const keyboardNavItems = [
    {
      keyboard: "1",
      description: "CV",
      url: "/cv",
    },
  ];

  function handleTerminalContentClick(title: string) {
    const content = terminalContentList.find((item) => item.title === `${title}.md`);
    if (content) {
      setTerminalContent(content);
    }
  }
  
  return (
    <div className="flex flex-col gap-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">00. Index</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Works</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
        <div className="flex flex-col gap-4 w-full md:w-5/6 text-left">
          <div className="flex flex-row gap-2 items-center">
            <span className="text-sm bg-primary text-secondary font-bold px-2 py-1">
              $
            </span>
            <h1 className="text-md font-bold">Works</h1>
          </div>
          <h1 className="text-xl md:text-3xl font-bold">A collection of my previous works</h1>
          <div className="flex flex-col gap-12 mt-4">
            <p className="text-md">
            Many L1/L2 ecosystems are struggling to attract developers to build on their platforms. Worse, they also usually encounter:
            </p>
            <div className="flex flex-col gap-4">
              <button onClick={() => handleTerminalContentClick("head-of-devrel-bifrost")} className="flex flex-row items-center rounded-none text-left w-fit relative after:absolute after:bg-primary after:h-full after:w-0 hover:after:w-full after:transition-all after:duration-300 after:left-0 after:top-0 after:-z-10 hover:text-secondary">
                <ChevronRight className="w-6 h-6 mr-2" />
                Head of DevRel at Bifrost
                <MousePointerClick className="w-4 h-4 ml-2" />
              </button>
              <button onClick={() => handleTerminalContentClick("devrel-engineer-kaia")} className="flex flex-row items-center rounded-none text-left w-fit relative after:absolute after:bg-primary after:h-full after:w-0 hover:after:w-full after:transition-all after:duration-300 after:left-0 after:top-0 after:-z-10 hover:text-secondary">
                <ChevronRight className="w-6 h-6 mr-2" />
                DevRel Engineer at Kaia Foundation
                <MousePointerClick className="w-4 h-4 ml-2" />
              </button>
              <button onClick={() => handleTerminalContentClick("apac-growth-lead-unlimit")} className="flex flex-row items-center rounded-none text-left w-fit relative after:absolute after:bg-primary after:h-full after:w-0 hover:after:w-full after:transition-all after:duration-300 after:left-0 after:top-0 after:-z-10 hover:text-secondary">
                <ChevronRight className="w-6 h-6 mr-2" />
                APAC Growth Lead at Unlimit
                <MousePointerClick className="w-4 h-4 ml-2" />
              </button>
              <button onClick={() => handleTerminalContentClick("vp-of-product-vietpay")} className="flex flex-row items-center rounded-none text-left w-fit relative after:absolute after:bg-primary after:h-full after:w-0 hover:after:w-full after:transition-all after:duration-300 after:left-0 after:top-0 after:-z-10 hover:text-secondary">
                <ChevronRight className="w-6 h-6 mr-2" />
                VP of Product at Vietpay
                <MousePointerClick className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
        <TerminalContent contentProps={terminalContent} menuItems={menuItems} />
      </div>
      <KeyboardNav keyboardNavItems={keyboardNavItems} />
    </div>
  );
}