import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.SANITY_CLIENT_API_ID,
  dataset: "production",
  useCdn: true,
  apiVersion: "2025-02-06",
  token: process.env.SANITY_CLIENT_API_TOKEN,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: string) {
  return builder.image(source);
}

type Req = {
  method?: string;
  body?: {
    title?: string;
    description?: string;
    imgUrl?: string;
  };
};

type Res = {
  status: (code: number) => Res;
  json: (data: unknown) => void;
};

export default async function handler(req: Req, res: Res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const doc = {
      _type: "abouts",
      title: req.body?.title ?? "Untitled",
      description: req.body?.description ?? "",
      imgUrl: req.body?.imgUrl ?? "",
    };

    const result = await client.create(doc);
    res.status(200).json(result);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
}
