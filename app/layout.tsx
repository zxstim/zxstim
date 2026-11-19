import type { Metadata } from "next";
import "./globals.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import { JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

export const metadata: Metadata = {
  title: "ZxStim",
  description: "Building and shipping software products",
  metadataBase: new URL("https://www.zxstim.com"),
  openGraph: {
    title: "ZxStim",
    description: "Building and shipping software products",
    url: "https://www.zxstim.com",
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
    title: "ZxStim",
    description: "Building and shipping software products",
    creator: "@zxstim",
    images: ["/zxstim-tbn.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-mono", jetbrainsMono.variable)}>
      <body className="flex flex-col min-h-screen">
        {/* Same next-themes setup as before (class, system default, no transition flash). */}
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
