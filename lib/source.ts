import { defineCollections, defineDocs } from "fumadocs-mdx/macro";
import { loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { z } from "zod";

const docs = defineDocs({
  dir: "content/docs",
});

// Ethereum wiki (from ethvn-web-wiki). Each root folder ("root": true in its
// meta.json) is a section: basics, investors, developers, enterprise, government.
const ethereumDocs = defineDocs({
  dir: "content/ethereum",
  docs: {
    schema: pageSchema.extend({
      // pages a page was adapted from (ethereum.org: CC BY 4.0, EPF wiki: CC BY-SA 4.0)
      sources: z.array(z.string()).optional(),
    }),
    // processed Markdown for the "Copy Markdown" / open-in-AI page actions
    postprocess: { includeProcessedMarkdown: true },
  },
  meta: { schema: metaSchema },
});

// Long-form posts. `status` is a render-time filter, not access control: the
// /writing home lists "published" posts, /writing/draft lists "draft" ones.
const blogPosts = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: pageSchema.extend({
    author: z.string(),
    date: z.coerce.date(), // YAML dates arrive as strings
    language: z.enum(["en", "vi"]),
    thumbnail: z.string().optional(),
    status: z.enum(["draft", "published"]),
  }),
});

// "tweet" content type: short posts written by hand and styled to look like an
// X / Twitter post. The MDX body is the tweet text; frontmatter carries the
// display identity and date. Not routed; rendered on the /writing timeline by
// `components/writing/tweet-card.tsx`.
const tweets = defineCollections({
  type: "doc",
  dir: "content/tweets",
  schema: z.object({
    author: z.string().default("ZxStim"),
    handle: z.string().default("zxstim"),
    date: z.coerce.date(), // YAML dates arrive as strings
    language: z.enum(["en", "vi"]).default("en"),
    // Optional explicit link to the post on X. If omitted and the filename is
    // the numeric tweet id, the link is derived as x.com/<handle>/status/<id>.
    url: z.string().optional(),
  }),
});

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});

export const blog = loader({
  baseUrl: "/writing",
  source: blogPosts.toFumadocsSource(),
});

export const ethereum = loader({
  baseUrl: "/ethereum",
  source: ethereumDocs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export type TweetEntry = (typeof tweets.entries)[number];

/** All tweets, newest first. */
export function getTweets(): TweetEntry[] {
  return [...tweets.entries].sort((a, b) => b.date.getTime() - a.date.getTime());
}
