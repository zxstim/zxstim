import type { Metadata } from "next";
import Script from "next/script";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";


const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] });

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
    creator: "@0xstim",
    images: ["/zxstim-tbn.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script
        defer
        src="https://analytics.zxstim.com/script.js"
        data-website-id="080aeece-b99a-4b88-9369-037c76d8e8c6"
      />
      <body className={jetBrainsMono.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            <main className="flex flex-col gap-12 items-center p-6 md:p-10 pb-12">
              <Header />
              {children}
              <Footer />
            </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
