import Link from "next/link";
import { Badge } from "@/components/ui/badge"
import Image from "next/image";
import {
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';


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
      <div className="flex flex-wrap gap-24 mt-8">
        <div className="max-w-3xl">
          <div className="flex flex-col gap-4 mt-8">
            <h1 className="text-xl font-semibold">Employment History</h1>
            <div>
              <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">Developer Advocate for <a className="text-blue-600" href="https://kaia.io" target="_blank"><span className="inline-flex"><span className="mr-1">Kaia</span><ExternalLink /></span></a> <Badge className="bg-muted-foreground">Remote</Badge></h2>
              <p className="font-md italic text-muted-foreground">May 2023 - Present</p>
              <ul className="list-disc list-outside ml-8">
                <li>Created and implemented a developer grant program to fund community open source contributions</li>
                <li>Coordinated local meetups in multiple regions (Vietnam, Nigeria, Indonesia, etc.) to build awareness about Kaia with the local developers</li>
                <li>Fostered partnerships with crypto projects and onboard them to build on Kaia</li>
              </ul>
            </div>
            <div>
              <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">APAC Head of Sales for <a className="text-blue-600" href="https://crypto.unlimit.com" target="_blank"><span className="inline-flex"><span className="mr-1">Unlimit Crypto</span><ExternalLink /></span></a> <Badge className="bg-muted-foreground">Remote</Badge></h2>
              <p className="font-md italic text-muted-foreground">May 2023 - Nov 2023</p>
              <ul className="list-disc list-outside ml-8">
                <li>Led the product strategy for an on-ramp cryptocurrency platform</li>
                <li>Created sales and marketing strategies to promote user growth</li>
                <li>Executed the strategies, outreached to contacts, followed up and maintained relationships</li>
              </ul>
            </div>
            <div>
              <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">VP of Product and Sales at <a className="text-blue-600" href="https://vietpay.com" target="_blank"><span className="inline-flex"><span className="mr-1">Vietpay</span><ExternalLink /></span></a> <Badge className="bg-muted-foreground">HCMC, Vietnam</Badge></h2>
              <p className="font-md italic text-muted-foreground">December 2018 - Apr 2023</p>
              <ul className="list-disc list-outside ml-8">
                <li>Responsible for maintaining the partnership with PVComBank in Vietnam</li>
                <li>Coordinated Mastercard, Visa and NAPAS system integration</li>
                <li>Coordinated PVComBank Core Banking system integration with Vietpay Fintech platform</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-8">
            <h1 className="text-xl font-semibold">Education</h1>
            <div>
              <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">BSc. in Civil Engineering from <a className="text-blue-600" href="https://unb.ca"><span className="inline-flex"><span className="mr-1">University of New Brunswick</span><ExternalLink /></span></a> <Badge className="bg-muted-foreground">Fredericton, Canada</Badge></h2>
              <p className="font-md italic text-muted-foreground">September 2012 - May 2016</p>
              <ul className="list-disc list-outside ml-8">
                <li>Pre-Masters research thesis in Finite Element Analysis for Steel Joint Connection</li>
                <li>Graduated with Honors</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 max-w-48">
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold">Details</h1>
            <div>
              <div>Ho Chi Minh City</div>
              <div>Viet Nam</div>
              <div>+84982792979</div>
              <a className="text-blue-600 underline underline-offset-2" href="mailto:zxstim@gmail.com">zxstim@gmail.com</a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold">Links</h1>
            <div className="flex flex-col">
              <a className="text-blue-600 underline underline-offset-2" href="https://github.com/zxstim">Github</a>
              <a className="text-blue-600 underline underline-offset-2" href="https://twitter.com/zxstim">Twitter</a>
              <a className="text-blue-600 underline underline-offset-2" href="https://www.facebook.com/zxstim">Facebook</a>
              <a className="text-blue-600 underline underline-offset-2" href="https://t.me/zxstim">Telegram</a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold">Skills</h1>
            <div className="flex flex-col">
              <p>HTML & CSS</p>
              <p>SQL</p>
              <p>Python</p>
              <p>Javascript</p>
              <p>Django</p>
              <p>Solidity</p>
              <p>React</p>
              <p>Next.js</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold">Languages</h1>
            <div className="flex flex-col">
              <p>English</p>
              <p>Vietnamese</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}