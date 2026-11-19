import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Ethereum wiki landing animation, ported from ethvn-web-wiki: `useHero`
    // returns its refs and state in one object and mirrors state into refs for
    // its requestAnimationFrame loop, which the React Compiler's refs rule
    // flags. It works as written (the compiler isn't enabled in this project);
    // revisit if `reactCompiler` is turned on.
    files: [
      "components/ethereum/hero/block-scene.tsx",
      "components/ethereum/hero/block-scene-mobile.tsx",
      "components/ethereum/hero/hero-parts.tsx",
    ],
    rules: { "react-hooks/refs": "off" },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
