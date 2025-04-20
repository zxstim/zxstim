import { Button } from "./ui/button";
import Link from 'next/link';
import { ExternalLink, Rss } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="flex flex-col w-full text-left">
      <div className="flex flex-row justify-between items-center bg-primary border-t border-primary text-secondary px-2 font-bold">
        <div>Footer</div>
        <div>_</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 border-2 border-primary">
        <div className="flex flex-col">
          <div className="flex flex-col gap-4 border border-primary p-10">
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-4">Join the community</h2>
            <div className="flex flex-row gap-6 items-center">
              <Button className="w-fit rounded-none">
                <a className="flex flex-row gap-2 items-center" href="https://t.me/zxstimlabs" target='blank'>Go to chat <ExternalLink className="w-4 h-4" /></a>
              </Button>
              <a className="flex flex-row gap-2 items-center underline underline-offset-2" target='blank' href="https://x.com/zxstim"><Rss className="w-4 h-4" />Feed</a>
            </div>
          </div>
          <div className="border border-primary p-10 grow">
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-6">Here are some links</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between gap-6">
              <div className="flex flex-col gap-1">
                <h3 className="scroll-m-20 text-lg font-semibold tracking-tight mb-2">Projects</h3>
                <Link href="https://intern.xyz" className="text-muted-foreground text-sm">Intern app</Link>
                <Link href="https://buildstation.org" className="text-muted-foreground text-sm">buildstation</Link>
                <Link href="https://gmgn.app" className="text-muted-foreground text-sm">GMGN app</Link>
                <Link href="https://zekae.com" className="text-muted-foreground text-sm">Zekae</Link>
                <Link href="https://defi.vn" className="text-muted-foreground text-sm">DeFi Vietnam</Link>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="scroll-m-20 text-lg font-semibold tracking-tight mb-2">Communities</h3>
                <Link href="https://t.me/buildstation" className="text-muted-foreground text-sm">buildstation</Link>
                <Link href="https://x.com/i/communities/1896019968392904883" className="text-muted-foreground text-sm">ethstation</Link>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="scroll-m-20 text-lg font-semibold tracking-tight mb-2">Other</h3>
                <Link href="/works" className="text-muted-foreground text-sm">Works</Link>
                <Link href="/cv" className="text-muted-foreground text-sm">CV</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="grow border border-primary p-10">
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">For builders</h2>
            <p className="leading-7 [&:not(:first-child)]:mt-6 mb-6">So you are ready to build stuffs, huh? Go to buildstation and join the global hacker movement!</p>
            <a className="flex flex-row gap-2 items-center dark:text-blue-400 text-blue-500 underline underline-offset-4" href="https://buildstation.org" target="_blank">
              Explore and Build <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-3 border border-primary [&>*:not(:last-child)]:border-r [&>*]:border-primary">
            <a target="_blank" href="https://x.com/zxstim">
              <div className="flex py-6 items-center justify-center text-primary-foreground">
                <Image className="dark:invert" src="/x.svg" alt="X" width={28} height={28} />
              </div>
            </a>
            <a target="_blank" href="https://github.com/zxstim">
              <div className="flex py-6 items-center justify-center text-primary-foreground">
                <Image className="dark:invert" src="/github.svg" alt="github" width={28} height={28} />
              </div>
            </a>
            <a target="_blank" href="https://youtube.com/@zxstim">
              <div className="flex py-6 items-center justify-center text-primary-foreground">
                <Image className="dark:invert" src="/youtube.svg" alt="youtube" width={28} height={28} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}