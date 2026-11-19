const BANNER = `████████╗██╗  ██╗ ██████╗ ██╗   ██╗ ██████╗ ██╗  ██╗████████╗███████╗
╚══██╔══╝██║  ██║██╔═══██╗██║   ██║██╔════╝ ██║  ██║╚══██╔══╝██╔════╝
   ██║   ███████║██║   ██║██║   ██║██║  ███╗███████║   ██║   ███████╗
   ██║   ██╔══██║██║   ██║██║   ██║██║   ██║██╔══██║   ██║   ╚════██║
   ██║   ██║  ██║╚██████╔╝╚██████╔╝╚██████╔╝██║  ██║   ██║   ███████║
   ╚═╝   ╚═╝  ╚═╝ ╚═════╝  ╚═════╝  ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝`;

/** "Welcome" badge + ASCII "THOUGHTS" banner at the top of the writing lists. */
export default function WritingHero() {
  return (
    <div className="flex flex-col items-center md:items-start lg:items-start justify-center h-80">
      <p className="px-4 py-2 mb-8 text-sm border-2 rounded-none border-fd-secondary">
        Welcome to my writing space!
      </p>
      {/* System monospace stack on purpose: the site's JetBrains Mono (latin
          subset) has no block/box-drawing glyphs, so the banner would fall
          back to a proportional font and lose its alignment. */}
      <pre
        className="text-[0.35rem] md:text-xs lg:text-sm whitespace-pre overflow-x-auto"
        style={{
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        }}
      >
        {BANNER}
      </pre>
    </div>
  );
}
