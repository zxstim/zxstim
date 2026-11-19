import TerminalMenu from "@/components/terminal-menu";
import KeyboardNav from "@/components/keyboard-nav";
import { MenuItem } from "@/components/terminal-menu";

export default function Home() {

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "CV",
      url: "/cv",
    },
  ];

  const keyboardNavItems = [
    {
      keyboard: "1",
      description: "Sections",
      url: "/cv",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
        <div className="flex flex-col gap-4 w-full md:w-5/6 text-left">
          <div className="flex flex-row gap-2 items-center">
            <span className="text-sm bg-primary text-secondary font-bold px-2 py-1">
              00.
            </span>
            <h1 className="text-md font-bold">Index</h1>
          </div>
          <h1 className="text-xl md:text-3xl font-bold">
            Software studio
          </h1>
          <div className="flex flex-col gap-12 mt-4">
            <p className="text-md">
              Contribute and maintain open source UX libraries for onchain applications.
            </p>
            <p className="text-md">
              Research and develop techniques to improve onchain user experience.
            </p>
            <p className="text-md">
              Build tools and frameworks to help developers build onchain applications faster and easier.
            </p>
          </div>
        </div>
        <div className="flex flex-col border-2 border-primary gap-2 pb-8">
          <div className="flex flex-row justify-between items-center bg-primary text-secondary p-2">
            <h1 className="text-lg md:text-xl font-bold">Terminal</h1>
            <p className="text-md">_</p>
          </div>
          <div className="flex flex-col px-4 py-2">
            <h2 className="text-md">$ loading...</h2>
            <TerminalMenu menuItems={menuItems} />
          </div>
        </div>
        <KeyboardNav keyboardNavItems={keyboardNavItems} />
      </div>
    </>
  );
}
