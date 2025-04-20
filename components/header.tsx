import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/theme-toggle";


export default function Header() {
  return (
    <div className="flex flex-col gap-2 md:flex-row items-center justify-between w-full">
      <Link className="flex flex-row gap-2" href="/">
        <Image
          src="/zxstim.svg"
          alt="ZxStim Logo"
          width={30}
          height={30}
          />
          <p className="text-xl font-bold">ZxStim</p>
      </Link>
      <ThemeToggle />
    </div>
  )
}