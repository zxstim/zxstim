import defaultMdxComponents from "fumadocs-ui/mdx";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import type { ComponentProps } from "react";
import type { MDXComponents } from "mdx/types";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    // Click-to-zoom for images in posts.
    img: (props) => (
      <ImageZoom {...(props as ComponentProps<typeof ImageZoom>)} />
    ),
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
