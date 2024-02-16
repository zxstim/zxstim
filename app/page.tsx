import Image from 'next/image'
import Link from 'next/link'
import {
  ExternalLink,
  Mail,
  Layers,
  Wand2,
  Facebook,
  Twitter,
  Github,
  MapPin,
  Hourglass,
  ArrowDown
  // Search
} from 'lucide-react';


export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="md:col-span-4 flex flex-col gap-4 bg-background rounded-2xl p-6">
            <Image 
              src="./zxstim.svg" 
              alt="ZxStim" 
              width={100} 
              height={100}
              className="rounded-full border-1 p-2 shadow-lg" 
            />
            <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight">ZxStim - <span className="text-muted-foreground">Building and shipping software products.</span></h1>
            <p className="text-lg font-normal tracking-tight">Experienced Builder adept in bringing forth expertise in all aspects of a company such as sales, marketing, product design, and software development. Also proficient in various web frameworks and Solidity. Able to effectively self-manage during independent projects, as well as collaborate as part of a productive team.</p>
            <div className="flex flex-row gap-2 items-center mt-2">
              <div className="bg-green-500 rounded-full p-2 w-fit"></div>
              <p className="text-sm italic">Open to discuss opportunities</p>
              <Link className="flex flex-row items-center text-blue-600 underline" href="/cv">CV</Link>
            </div>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 grid-rows-4 gap-4 w-full">
            <div className="flex flex-row gap-2 justify-center items-center text-center bg-background rounded-2xl p-6 col-span-2">
              <MapPin size={25} />
              <p>Ho Chi Minh City</p>
            </div>
            <div className="flex flex-row gap-2 justify-center items-center text-center bg-background rounded-2xl p-6 col-span-2">
              <Mail size={30} />
              <p>zxstim@gmail.com</p>
            </div>
            <a 
              href="https://www.facebook.com/zxstim/" 
              target="_blank"
              >
              <div className="flex flex-col justify-center items-center text-center bg-background rounded-2xl p-6 w-full h-full">
                <Facebook size={30} />
                Facebook
              </div>
            </a>
            <a 
              href="https://x.com/zxStim" 
              target="_blank"
              >
              <div className="flex flex-col justify-center items-center text-center bg-background rounded-2xl p-6 w-full h-full">
                <Twitter size={30} />
                X
              </div>
            </a>
            <a 
              href="https://t.me/zxstim" 
              target="_blank"
              >
              <div className="flex flex-col justify-center items-center text-center bg-background rounded-2xl p-6 w-full h-full">
                <Image
                  src="/telegram.svg"
                  alt="telegram"
                  width={30}
                  height={30}
                />  
                Telegram
              </div>
            </a>
            <a 
              href="https://github.com/zxstim"
              target="_blank"
              >
              <div className="flex flex-col justify-center items-center text-center bg-background rounded-2xl p-6 w-full h-full">
                <Github size={30} />
                GitHub
              </div>
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-background rounded-2xl p-6">
          <div className="flex flex-row gap-2 items-center">
            <Layers />
            <h1 className="scroll-m-20 text-lg font-extrabold tracking-tight">TechStack</h1>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-3 gap-8 md:justify-between">
            <div className="flex flex-col gap-4">
              <h4 className="text-black text-lg font-bold">
                Coding Languages
              </h4>
              <div className="flex flex-wrap gap-2">
                <div className="border-2 border-black rounded-lg px-3 py-2">
                  HTML
                </div>
                <div className="border-2 border-black rounded-lg px-3 py-2">
                  CSS
                </div>
                <div className="border-2 border-black rounded-lg px-3 py-2">
                  JavaScript
                </div>
                <div className="border-2 border-black rounded-lg px-3 py-2">
                  TypeScript
                </div>
                <div className="border-2 border-black rounded-lg px-3 py-2">
                  Python
                </div>
                <div className="border-2 border-black rounded-lg px-3 py-2">
                  Rust
                </div>
                <div className="border-2 border-black rounded-lg px-3 py-2">
                  Go
                </div>
                <div className="border-2 border-black rounded-lg px-3 py-2">
                  Solidity
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-black text-lg font-bold">
                Frameworks
              </h4>
              <div className="flex flex-wrap gap-2">
                <div className="border-2 border-black rounded-lg px-3 py-2">
                  React
                </div>
                <div className="border-2 border-black rounded-lg px-3 py-2">
                  NextJS
                </div>
                <div className="border-2 border-black rounded-lg px-3 py-2">
                  ExpressJS
                </div>
                <div className="border-2 border-black rounded-lg px-3 py-2">
                  Django
                </div>
                <div className="border-2 border-black rounded-lg px-3 py-2">
                  Gin
                </div>
                <div className="border-2 border-black rounded-lg px-3 py-2">
                  Foundry
                </div>
                <div className="border-2 border-black rounded-lg px-3 py-2">
                  Hardhat
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-black text-lg font-bold">
                Other
              </h4>
              <div className="flex flex-wrap gap-2">
                <div className="border-2 border-black rounded-lg px-3 py-2">
                  SQL
                </div>
                <div className="border-2 border-black rounded-lg px-3 py-2">
                  PostgreSQL
                </div>
                <div className="border-2 border-black rounded-lg px-3 py-2">
                  MongoDB
                </div>
                <div className="border-2 border-black rounded-lg px-3 py-2">
                  Amazon Web Services
                </div>
                <div className="border-2 border-black rounded-lg px-3 py-2">
                  Google Cloud Plaform
                </div>
              </div>                
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-background rounded-2xl p-6">
          <div className="flex flex-row gap-2 items-center">
            <Wand2 />
            <h1 className="scroll-m-20 text-lg font-extrabold tracking-tight">Skills</h1>
          </div>
          <div className="flex flex-col gap-8 md:grid md:grid-cols-3 md:justify-between">
            <div className="flex flex-col gap-4">
              <h4 className="text-black text-lg font-bold">Business</h4>
              <div className="flex flex-wrap gap-2">
                <div className="border-2 border-black rounded-lg px-3 py-2">Hubspot</div>
                <div className="border-2 border-black rounded-lg px-3 py-2">Content</div>
                <div className="border-2 border-black rounded-lg px-3 py-2">SEO</div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-black text-lg font-bold">Tools</h4>
              <div className="flex flex-wrap gap-2">
                <div className="border-2 border-black rounded-lg px-3 py-2">Figma</div>
                <div className="border-2 border-black rounded-lg px-3 py-2">Canva</div>
                <div className="border-2 border-black rounded-lg px-3 py-2">Adobe</div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-black text-lg font-bold">Languages</h4>
              <div className="flex flex-wrap gap-2">
                <div className="border-2 border-black rounded-lg px-3 py-2">English</div>
                <div className="border-2 border-black rounded-lg px-3 py-2">Vietnamese</div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4 bg-background rounded-2xl p-6">
            <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight">Editor at <a className="text-blue-600" href="https://www.opentechstack.com"><span className="inline-flex"><span className="mr-1">OpenTechStack</span><ExternalLink /></span></a></h1>
            <p>A blog covering the expansive modern technical stack.</p>
            <div className="relative h-[180px] md:h-[270px] w-full">
              <Image
                src="/ots.svg"
                alt="opentechstack"
                fill={true}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 bg-background rounded-2xl p-6">
            <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight">Builder in <a className="text-blue-600" href="https://www.openforbuilders.com"><span className="inline-flex"><span className="mr-1">OpenForBuilders</span><ExternalLink /></span></a></h1>
            <p>A community initiative and content platform for builders.</p>
            <div className="relative h-[180px] md:h-[270px] w-full">
              <Image
                src="/ofb.svg"
                alt="openforbuilders"
                fill={true}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4 bg-background rounded-2xl p-6">
            <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight">Developer Advocate at <a className="text-blue-600" href="https://klaytn.foundation"><span className="inline-flex"><span className="mr-1">Klaytn</span><ExternalLink /></span></a></h1>
            <p>A leading Layer 1 public blockchain designed for tomorrow&apos;s on-chain world. Offers world-class developer resources and support program.</p>
            <div className="relative h-[180px] md:h-[270px] w-full">
              <Image
                src="/klaytn.svg"
                alt="klaytn"
                fill={true}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 bg-background rounded-2xl p-6">
            <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight">Owner and Operator of <a className="text-blue-600" href="https://www.pyhash.com"><span className="inline-flex"><span className="mr-1">Pyhash</span><ExternalLink /></span></a></h1>
            <p>A digital asset management institution providing after market support and treasury management solutions in the blockchain ecosystem.</p>
            <div className="relative h-[180px] md:h-[270px] w-full">
              <Image
                src="/pyhash.svg"
                alt="pyhash"
                fill={true}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 border-2 p-6 border-dashed border-muted-foreground rounded-2xl h-[200px] items-center justify-center mb-8">
          <Hourglass className="text-muted-foreground h-6 w-6 md:h-8 md:w-8" />
          <h1 className="text-md md:text-xl font-semibold text-muted-foreground">New updates are coming soon...</h1>
        </div>
        <div className="flex flex-col gap-4 mt-12 mb-6 items-center">
          <div className="border-2 border-dashed border-muted-foreground w-[100px]"></div>
          <h1 className="text-md md:text-xl font-semibold text-muted-foreground text-center">Past works below</h1>
          <ArrowDown className="text-muted-foreground h-6 w-6 md:h-8 md:w-8" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4 bg-background rounded-2xl p-6">
            <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight">VP of Product and Sales at <a className="text-blue-600" href="https://vietpay.com"><span className="inline-flex"><span className="mr-1">Vietpay</span><ExternalLink /></span></a></h1>
            <p>Innovative commercial banking platform for Vietnamese SMEs that help them to accept payments, and scale at a push of button.</p>
            <div className="relative h-[180px] md:h-[270px] w-full">
              <Image
                src="/vietpay.svg"
                alt="vietpay"
                fill={true}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 bg-background rounded-2xl p-6">
            <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight">APAC Head of Sales at <a className="text-blue-600" href="https://crypto.unlimit.com"><span className="inline-flex"><span className="mr-1">Unlimit Crypto</span><ExternalLink /></span></a></h1>
            <p>Next generation fiat on-ramp backed by a battled-tested payment enterprise with global coverage and over 1000+ payment methods.</p>
            <div className="relative h-[180px] md:h-[270px] w-full">
              <Image
                src="/unc.svg"
                alt="unlimit"
                fill={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
