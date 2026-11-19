import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZxStim's Writings",
  description: "A collection of my thoughts",
  openGraph: {
    title: "ZxStim's Writings",
    description: "A collection of my thoughts",
    url: "/writing",
    siteName: "ZxStim",
    images: [
      {
        url: "/zxstim-tbn.png",
        width: 1200,
        height: 630,
        alt: "og-image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZxStim's Writings",
    description: "A collection of my thoughts",
    creator: "@zxstim",
    images: ["/zxstim-tbn.png"],
  },
};

export default function WritingLayout({ children }: LayoutProps<"/writing">) {
  return <div className="flex flex-col flex-1 pb-12">{children}</div>;
}
