import Header from "@/components/header";
import Footer from "@/components/footer";

export default function WorksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}