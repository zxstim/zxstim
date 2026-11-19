import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "ZxStim",
      url: "/",
    },
  };
}

/** Layout options for the Ethereum wiki (/ethereum). */
export function ethereumOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "Ethereum Wiki",
      url: "/ethereum",
    },
    links: [
      // CC BY 4.0 attribution for the content adapted from ethereum.org
      { text: "Attribution", url: "/ethereum/attribution" },
    ],
    githubUrl: "https://github.com/zxstim/zxstim",
  };
}
