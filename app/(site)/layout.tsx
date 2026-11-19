export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col gap-12 items-center p-6 md:p-10 pb-12">
      {children}
    </main>
  );
}
