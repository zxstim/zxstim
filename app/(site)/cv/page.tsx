import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BackToHome } from "@/components/back-to-home";
import {
  Prompt,
  TerminalPane,
  TerminalPanes,
  TerminalWindow,
} from "@/components/terminal/terminal-window";
import { StatusBar } from "@/components/terminal/status-bar";

interface Entry {
  role: string;
  org: string;
  url: string;
  location: string;
  dates: string;
  points: string[];
}

const sections: { title: string; entries: Entry[] }[] = [
  {
    title: "Projects",
    entries: [
      {
        role: "Maxi",
        org: "ETH.vn",
        url: "https://www.eth.vn",
        location: "HCMC, Vietnam",
        dates: "August 2025 - Present",
        points: [
          "Ethereum resources for Vietnamese",
          "Created videos, interviews, explainers, etc. about Ethereum",
        ],
      },
      {
        role: "Host",
        org: "DeFi.vn",
        url: "https://www.defi.vn",
        location: "HCMC, Vietnam",
        dates: "May 2025 - Present",
        points: [
          "Curated contents for Vietnamese investors about DeFi",
          "Make Youtube videos about DeFi",
        ],
      },
    ],
  },
  {
    title: "Employment History",
    entries: [
      {
        role: "Developer Relations Engineer for",
        org: "Bifrost",
        url: "https://bifrost.io",
        location: "Remote",
        dates: "Dec 2024 - Present",
        points: [
          "Created and implemented a developer grant program to fund community open source contributions",
          "Coordinated DeFi campaign on the EVM ecosystems",
          "Created and excuted content creation strategy on social media channels",
        ],
      },
      {
        role: "Developer Advocate for",
        org: "Kaia",
        url: "https://kaia.io",
        location: "Remote",
        dates: "May 2023 - Present",
        points: [
          "Created and implemented a developer grant program to fund community open source contributions",
          "Coordinated local meetups in multiple regions (Vietnam, Nigeria, Indonesia, etc.) to build awareness about Kaia with the local developers",
          "Fostered partnerships with crypto projects and onboard them to build on Kaia",
        ],
      },
      {
        role: "APAC Head of Sales for",
        org: "Unlimit Crypto",
        url: "https://crypto.unlimit.com",
        location: "Remote",
        dates: "May 2023 - Nov 2023",
        points: [
          "Led the product strategy for an on-ramp cryptocurrency platform",
          "Created sales and marketing strategies to promote user growth",
          "Executed the strategies, outreached to contacts, followed up and maintained relationships",
        ],
      },
      {
        role: "VP of Product and Sales at",
        org: "Vietpay",
        url: "https://vietpay.com",
        location: "HCMC, Vietnam",
        dates: "December 2018 - Apr 2023",
        points: [
          "Responsible for maintaining the partnership with PVComBank in Vietnam",
          "Coordinated Mastercard, Visa and NAPAS system integration",
          "Coordinated PVComBank Core Banking system integration with Vietpay Fintech platform",
        ],
      },
    ],
  },
  {
    title: "Education",
    entries: [
      {
        role: "BSc. in Civil Engineering from",
        org: "University of New Brunswick",
        url: "https://unb.ca",
        location: "Fredericton, Canada",
        dates: "September 2012 - May 2016",
        points: [
          "Pre-Masters research thesis in Finite Element Analysis for Steel Joint Connection",
          "Graduated with Honors",
        ],
      },
    ],
  },
];

const profileLinks = [
  { name: "Github", url: "https://github.com/zxstim" },
  { name: "Twitter", url: "https://twitter.com/zxstim" },
  { name: "Facebook", url: "https://www.facebook.com/zxstim" },
  { name: "Telegram", url: "https://t.me/zxstim" },
];

const skills = ["HTML & CSS", "SQL", "Python", "Typescript", "Django", "Solidity", "React", "Next.js", "Rust"];

const languages = ["English", "Vietnamese"];

const linkClass =
  "underline decoration-2 underline-offset-4 outline-none hover:bg-primary hover:text-primary-foreground hover:no-underline focus-visible:bg-primary focus-visible:text-primary-foreground";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="w-fit bg-primary px-2 font-bold text-primary-foreground">
      {children}
    </h2>
  );
}

function Points({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="text-muted-foreground">
            -
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CV() {
  return (
    <div className="flex w-full flex-col gap-4">
      <BackToHome />

      <TerminalWindow title="zxstim@web: ~/cv" meta="resume.md">
        <TerminalPanes className="md:grid-cols-[minmax(0,1fr)_18rem]">
          <TerminalPane className="gap-8">
            <div className="flex flex-col gap-4">
              <Prompt path="~/cv" command="whoami" />
              <div className="flex flex-row items-start gap-3">
                <Link href="/" aria-label="ZxStim home" className="shrink-0">
                  <Image
                    src="/zxstim-mini.png"
                    alt="ZxStim"
                    width={75}
                    height={75}
                    className="border-2 border-foreground"
                  />
                </Link>
                <div className="flex flex-col gap-1">
                  <h1 className="text-xl font-bold md:text-2xl">Victor Luong (ZxStim)</h1>
                  <p className="text-muted-foreground">
                    Experienced Builder that can deliver a project start to finish
                  </p>
                </div>
              </div>
            </div>

            {sections.map((section) => (
              <section key={section.title} className="flex flex-col gap-5">
                <SectionTitle>{section.title}</SectionTitle>
                {section.entries.map((entry) => (
                  <article key={`${entry.org}-${entry.dates}`} className="flex flex-col gap-2">
                    <h3 className="flex flex-wrap items-center gap-x-2 gap-y-1 text-lg font-bold">
                      <span>{entry.role}</span>
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 ${linkClass}`}
                      >
                        {entry.org}
                        <ArrowUpRight aria-label="opens in a new tab" className="size-4" />
                      </a>
                      <Badge variant="outline">{entry.location}</Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground">{entry.dates}</p>
                    <Points items={entry.points} />
                  </article>
                ))}
              </section>
            ))}
          </TerminalPane>

          <TerminalPane className="gap-8">
            <section className="flex flex-col gap-3">
              <SectionTitle>Details</SectionTitle>
              <div className="flex flex-col gap-1">
                <p>Ho Chi Minh City</p>
                <p>Viet Nam</p>
                <p>+84982792979</p>
                <a className={`w-fit ${linkClass}`} href="mailto:zxstim@gmail.com">
                  zxstim@gmail.com
                </a>
              </div>
            </section>
            <section className="flex flex-col gap-3">
              <SectionTitle>Links</SectionTitle>
              <ul className="flex flex-col gap-1">
                {profileLinks.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
            <section className="flex flex-col gap-3">
              <SectionTitle>Skills</SectionTitle>
              <Points items={skills} />
            </section>
            <section className="flex flex-col gap-3">
              <SectionTitle>Languages</SectionTitle>
              <Points items={languages} />
            </section>
          </TerminalPane>
        </TerminalPanes>
        <StatusBar current="/cv" />
      </TerminalWindow>
    </div>
  );
}
