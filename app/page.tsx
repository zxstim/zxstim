import TerminalMenu from '@/components/terminal-menu';
import KeyboardNav from '@/components/keyboard-nav';

export default function Home() {

  const menuItems = [
    {
      id: 1,
      name: 'Intern app',
      url: 'https://intern.xyz'
    },
    {
      id: 2,
      name: 'buildstation',
      url: 'https://buildstation.org'
    },
    {
      id: 3,
      name: 'GM GN',
      url: 'https://gmgn.app'
    },
    {
      id: 4,
      name: 'Zekae',
      url: 'https://zekae.com'
    },
    {
      id: 5,
      name: 'DeFi Vietnam',
      url: 'https://defi.vn'
    }
  ];

  const keyboardNavItems = [
    {
      keyboard: '1',
      description: 'Sections',
      url: 'https://intern.xyz'
    },
    {
      keyboard: '2',
      description: 'Sections',
      url: 'https://buildstation.org'
    },
    {
      keyboard: '3',
      description: 'Sections',
      url: 'https://gmgn.app'
    },
    {
      keyboard: '4',
      description: 'Sections',
      url: 'https://zekae.com'
    },
    {
      keyboard: '5',
      description: 'Sections',
      url: 'https://defi.vn'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
      <div className="flex flex-col gap-4 w-full md:w-5/6 text-left">
        <div className="flex flex-row gap-2 items-center">
          <span className="text-sm bg-primary text-secondary font-bold px-2 py-1">00.</span>
          <h1 className="text-md font-bold">Index</h1>
        </div>
        <h1 className="text-xl md:text-3xl font-bold">Currently on oss arc</h1>
        <div className="flex flex-col gap-12 mt-4">
          <p className="text-md">High quality, open source, open code software for onchain developers. Design, build and launch your best DApp from scratch.</p>
          <p className="text-md">Join a vibrant builder community to learn, ask questions, and get help. Get the guidance to start and iterate your product with the community feedbacks.</p>
          <p className="text-md">Founded upon the freedom software movement ethos of transparency, collaboration, and empowerment.</p>
        </div>
      </div>
      <div className="flex flex-col border-2 border-primary gap-2 pb-8">
        <div className="flex flex-row justify-between items-center bg-primary text-secondary p-2">
          <h1 className="text-lg md:text-xl font-bold">Terminal</h1>
          <p className="text-md">_</p>
        </div>
        <div className="flex flex-col px-4 py-2">
          <h2 className="text-md">$ cat projects.md</h2>
          <TerminalMenu menuItems={menuItems} />
        </div>
      </div>
      <KeyboardNav keyboardNavItems={keyboardNavItems} />
    </div>
  )

  // return (
  //   <>
  //     <div className="flex flex-col gap-4">
  //       <div className="flex flex-col gap-4 border-2 border-primary rounded-md p-6">
  //         <div className="flex flex-row gap-4">
  //           <Image
  //             src="/zxstim.svg"
  //             alt="ZxStim"
  //             width={80}
  //             height={80}
  //             className="rounded-full border-2 border-primary"
  //           />
  //           <div className="flex flex-col justify-between">
  //             <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
  //               ZxStim
  //             </h1>
  //             <p>currently on my oss/acc arc</p>
  //           </div>
  //         </div>
  //         <div className="flex flex-row gap-2 items-center mt-2">
  //           <div className="bg-green-500 rounded-full p-2 w-fit"></div>
  //           <p className="text-sm italic">Open to discuss opportunities</p>
  //         </div>
  //         <div className="flex flex-wrap gap-2 items-center">
  //           <Button variant="outline" asChild>
  //             <Link className="flex flex-row gap-2" href="/cv">
  //               <FolderClosed size={18} /> CV File
  //             </Link>
  //           </Button>
  //           <Button
  //             asChild
  //             className="flex flex-row gap-2 bg-blue-500 text-secondary"
  //             variant="outline"
  //           >
  //             <a href="https://x.com/zxstim">
  //               Twitter
  //             </a>
  //           </Button>
  //           <Button
  //             asChild
  //             className="flex flex-row gap-2 bg-primary text-secondary"
  //             variant="outline"
  //           >
  //             <a href="https://github.com/zxstim">
  //               GitHub
  //             </a>
  //           </Button>
  //           <Button
  //             asChild
  //             className="flex flex-row gap-2 bg-primary text-secondary"
  //             variant="outline"
  //           >
  //             <a href="mailto:zxstim@gmail.com">
  //               Email
  //             </a>
  //           </Button>
  //         </div>
  //       </div>
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //         <div className="flex flex-col gap-4 border-2 border-primary rounded-md p-6">
  //           <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight">
  //             Developer at{" "}
  //             <a className="text-blue-600" href="https://www.blockcmd.com">
  //               <span className="inline-flex">
  //                 <span className="mr-1">BlockCMD</span>
  //                 <ExternalLink />
  //               </span>
  //             </a>
  //           </h1>
  //           <p>A product lab specializing in crypto and onchain protocols</p>
  //         </div>
  //         <div className="flex flex-col gap-4 border-2 border-primary rounded-md p-6">
  //           <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight">
  //             Core contributor in{" "}
  //             <a className="text-blue-600" href="https://www.buildstation.org">
  //               <span className="inline-flex">
  //                 <span className="mr-1">buildstation</span>
  //                 <ExternalLink />
  //               </span>
  //             </a>
  //           </h1>
  //           <p>A community initiative and grant platform for builders.</p>
  //         </div>
  //       </div>
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //         <div className="flex flex-col gap-4 border-2 border-primary rounded-md p-6">
  //           <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight">
  //             Developer Advocate at{" "}
  //             <a className="text-blue-600" href="https://kaia.io">
  //               <span className="inline-flex">
  //                 <span className="mr-1">Kaia</span>
  //                 <ExternalLink />
  //               </span>
  //             </a>
  //           </h1>
  //           <p>
  //             A leading Layer 1 public blockchain designed for tomorrow&apos;s
  //             on-chain world.
  //           </p>
  //         </div>
  //         <div className="flex flex-col gap-4 border-2 border-primary rounded-md p-6">
  //           <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight">
  //             Editor at{" "}
  //             <a className="text-blue-600" href="https://www.defi.vn">
  //               <span className="inline-flex">
  //                 <span className="mr-1">DeFi.vn</span>
  //                 <ExternalLink />
  //               </span>
  //             </a>
  //           </h1>
  //           <p>A wikipedia about decentralized finance for Vietnamese</p>
  //         </div>
  //       </div>
  //       <div className="flex flex-row gap-2 border-2 p-6 border-dashed border-muted-foreground rounded-md h-[200px] items-center justify-center mb-8">
  //         <Hourglass className="text-muted-foreground h-6 w-6 md:h-8 md:w-8" />
  //         <h1 className="text-md md:text-xl font-semibold text-muted-foreground">
  //           New updates are coming soon...
  //         </h1>
  //       </div>
  //       <div className="flex flex-col gap-4 mt-12 mb-6 items-center">
  //         <div className="border-2 border-dashed border-muted-foreground w-[100px]"></div>
  //         <h1 className="text-md md:text-xl font-semibold text-muted-foreground text-center">
  //           Past works below
  //         </h1>
  //         <ArrowDown className="text-muted-foreground h-6 w-6 md:h-8 md:w-8" />
  //       </div>
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //         <div className="flex flex-col gap-4 border-2 border-primary rounded-md p-6">
  //           <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight">
  //             VP of Product and Sales at{" "}
  //             <a
  //               className="text-blue-600"
  //               href="https://vietpay.com"
  //               target="_blank"
  //             >
  //               <span className="inline-flex">
  //                 <span className="mr-1">Vietpay</span>
  //                 <ExternalLink />
  //               </span>
  //             </a>
  //           </h1>
  //           <p>
  //             Innovative commercial banking platform for Vietnamese SMEs that
  //             help them to accept payments, and scale at a push of button.
  //           </p>
  //         </div>
  //         <div className="flex flex-col gap-4 border-2 border-primary rounded-md p-6">
  //           <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight">
  //             APAC Head of Sales at{" "}
  //             <a
  //               className="text-blue-600"
  //               href="https://crypto.unlimit.com"
  //               target="_blank"
  //             >
  //               <span className="inline-flex">
  //                 <span className="mr-1">Unlimit Crypto</span>
  //                 <ExternalLink />
  //               </span>
  //             </a>
  //           </h1>
  //           <p>
  //             Next generation fiat on-ramp backed by a battled-tested payment
  //             enterprise with global coverage and over 1000+ payment methods.
  //           </p>
  //         </div>
  //         <div className="flex flex-col gap-4 border-2 border-primary rounded-md p-6">
  //           <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight">
  //             Founder at{" "}
  //             <a
  //               className="text-blue-600"
  //               href="https://pyhash.com"
  //               target="_blank"
  //             >
  //               <span className="inline-flex">
  //                 <span className="mr-1">Pyhash</span>
  //                 <ExternalLink />
  //               </span>
  //             </a>
  //           </h1>
  //           <p>
  //             Digital asset management institution providing after market
  //             support and treasury management solutions.
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
}
