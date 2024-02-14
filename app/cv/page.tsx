import Link from "next/link";
import Image from "next/image";
import type { Metadata } from 'next';
import {
  ArrowLeft
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'ZxStim',
  description: 'Building and shipping software products',
  metadataBase: new URL('https://www.zxstim.com'),
  openGraph: {
    title: 'ZxStim',
    description: 'Building and shipping software products',
    url: 'https://www.zxstim.com',
    siteName: 'ZxStim',
    images: [
      {
        url: '/zxstim-tbn.png',
        width: 1200,
        height: 630,
        alt: 'og-image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZxStim',
    description: 'Building and shipping software products',
    creator: '@0xstim',
    images: ['/zxstim-tbn.png'],
  },
}


export default function Home() {

  return (
    <div>
      <div className="flex flex-col gap-4">
        <Link className="flex flex-row gap-2 text-blue-600 underline" href="/"><ArrowLeft />Home</Link>
        <div className="flex flex-row gap-2 items-start">
          <Image
            src="./zxstim.svg"
            alt="ZxStim"
            width={75}
            height={75}
            className='border-2 border-foreground'
          />
          <div className="flex flex-col gap-1">
            <h1 className="text-foreground text-xl font-bold">Victor Luong (ZxStim)</h1>
            <h2 className="text-muted-foreground text-md font-medium">Experienced Builder that can deliver a project start to finish</h2>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div>Projects</div>
          <h1>OpenForBuilders</h1>
          <h1>OpenTechStack</h1>
          <h1>BlockCMD</h1>
          <h1>Defi.vn</h1>
        </div>
        <div>
          <div>Employment History</div>
          <div>Head of Sales for APAC <a href="https://crypto.unlimit.com">at Unlimit</a>, Remote</div>
          <div>May 2023 - Nov 2023</div>
          <ul>
            <li>Led the product strategy for an on-ramp cryptocurrency platform</li>
            <li>Created sales and marketing strategies to promote user growth</li>
            <li>Executed the strategies, outreached to contacts, followed up and maintained relationships</li>
          </ul>
          <div>Creator of <a href="https://defi.vn">Defi.vn</a>, Vietnam</div>
          <div>October 2022 - Present</div>
          <ul>
            <li>Developed and implemented the complete tech stack (frontend, backend, smart contract)</li>
            <li>Built content, marketing and sales strategies for the growth of the website (which has reached 30K monthly views)</li>
            <li>Coordinated with various communities for regular developer focused activities</li>
          </ul>
          <div>VP at <a href="https://vietpay.com">Vietpay</a>, Ho Chi Minh, Vietnam</div>
          <div>December 2018 - Apr 2023</div>
          <ul>
            <li>Responsible for maintaining the partnership with PVComBank in Vietnam</li>
            <li>Coordinated Mastercard, Visa and NAPAS system integration</li>
            <li>Coordinated PVComBank Core Banking system integration with Vietpay Fintech platform</li>
          </ul>
          <div>Owner of <a href="https://pyhash.com">Pyhash</a>, Delaware, USA</div>
          <div>June 2019 - Present</div>
          <ul>
            <li>Developed market making software for cryptocurrency exchanges</li>
            <li>Developed various trading algorithm for arbitraging, cross-exchange liquidity</li>
            <li>Open sourced trading software in May 2022 for independent quant-trading teams to use</li>
          </ul>
          <div>Advisor at Clovers Solutions</div>
          <div>December 2018 - Mar 2020</div>
          <ul>
            <li>Advised team on outbound sales and proposal drafts</li>
            <li>Assisted team on strategic directions and daily operations</li>
            <li>Closed over 20 event and marketing deals for the team</li>
          </ul>
          <div>Co-founder at AM Blockchain, Ho Chi Minh, Vietnam</div>
          <div>February 2018 - November 2018</div>
          <ul>
            <li>Coordinated NEM Vietnam team to promote NEM locally and operate NEM Vietnam Blockchain Hub</li>
            <li>Organized 20+ events with 200+ attendees each along with a few notable events like CDAD2018</li>
            <li>Launched marketing campaigns for various cryptocurrency projects to acquire Vietnamese users</li>
          </ul>
          <div>Education</div>
          <div>Bachelor of Science in Civil Engineering, University of New Brunswick, Fredericton, Canada</div>
          <div>September 2012 - May 2016</div>
          <ul>
            <li>Pre-Masters research thesis in Finite Element Analysis for Steel Joint Connection</li>
            <li>Graduated with Honors</li>
          </ul>
        </div>
        <div>
          <div>
            <div>Details</div>
            <div>Ho Chi Minh City</div>
            <div>Viet Nam</div>
            <div>+84982792979</div>
            <a href="mailto:zxstim@gmail.com">zxstim@gmail.com</a>
          </div>
          <div>
            <div>🔗 Links</div>
            <div>
              <a href="https://github.com/0xstim">Github</a>
            </div>
            <div>
              <a href="https://twitter.com/0xStim">Twitter</a>
            </div>
            <div>
              <a href="https://t.me/zxstim">Telegram</a>
            </div>
          </div>
          <div>
            <div>💻 Skills</div>
            <div>HTML & CSS</div>
            <div>SQL</div>
            <div>Git</div>
            <div>Python</div>
            <div>Javascript</div>
            <div>Django</div>
            <div>Solidity</div>
            <div>React</div>
            <div>Next.js</div>
          </div>
          <div>
            <div>🎙️ Languages</div>
            <div>English</div>
            <div>Vietnamese</div>
          </div>
        </div>
      </div>
    </div>
  );
}