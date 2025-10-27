import TerminalMenu from '@/components/terminal-menu';
import KeyboardNav from '@/components/keyboard-nav';

export default function Home() {

  const menuItems = [
    {
      id: 1,
      name: 'UnitMetal',
      url: 'https://unitmetal.com'
    },
    {
      id: 2,
      name: 'buildstation',
      url: 'https://buildstation.org'
    },
    {
      id: 3,
      name: 'DeFi Vietnam',
      url: 'https://defi.vn'
    },
    {
      id: 4,
      name: 'ETH34',
      url: 'https://eth34.vn'
    },
    {
      id: 5,
      name: 'Works',
      url: '/works'
    },
    {
      id: 6,
      name: 'CV',
      url: '/cv'
    }
  ];


  const keyboardNavItems = [
    {
      keyboard: '1',
      description: 'Sections',
      url: 'https://unitmetal.com'
    },
    {
      keyboard: '2',
      description: 'Sections',
      url: 'https://buildstation.org'
    },
    {
      keyboard: '3',
      description: 'Sections',
      url: 'https://defi.vn'
    },
    {
      keyboard: '4',
      description: 'Sections',
      url: 'https://eth34.vn'
    },
    {
      keyboard: '5',
      description: 'Sections',
      url: '/works'
    },
    {
      keyboard: '6',
      description: 'Sections',
      url: '/cv'
    }
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
          <p className="text-md">Long time Ethereum holder. Crash of 2018 survivor. DeFi summer survivor. NFT mania survivor. FTX survivor.</p>
          <p className="text-md">Currently, I am building open source software products for developers and DeFi protocols.</p>
          <p className="text-md">I firmly believe that the future of the internet is onchain, that we can build a better money for everyone, and that our conviction will make a lasting impact.</p>
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
}
