"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"

export interface KeyboardNavItem {
  keyboard: string
  description: string
  url: string
}

const keyClass =
  "text-sm border-primary border border-b-2 px-[1px] py-[1px] w-[24px] h-[24px] hover:bg-primary hover:text-secondary"

export default function KeyboardNav({ keyboardNavItems }: { keyboardNavItems: KeyboardNavItem[] }) {
  const router = useRouter()
  const { go, back, forward } = useKeyboardShortcuts(
    keyboardNavItems.map((item) => ({ key: item.keyboard, url: item.url })),
  )

  return (
    <div className="hidden lg:flex flex-row gap-12 mt-[128px]">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <button type="button" className={keyClass} onClick={back} aria-label="Back">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button type="button" className={keyClass} onClick={forward} aria-label="Forward">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm">Nav</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          {keyboardNavItems.map((item) => (
            <button key={item.keyboard} type="button" className={keyClass} onClick={() => go(item.url)}>
              {item.keyboard}
            </button>
          ))}
        </div>
        <p className="text-sm">{keyboardNavItems[0]?.description}</p>
      </div>
      <div className="flex flex-col gap-2">
        <button type="button" className={keyClass} onClick={() => router.push("/")}>
          0
        </button>
        <p className="text-sm">Index</p>
      </div>
    </div>
  )
}
