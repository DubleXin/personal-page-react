import { client } from "../lib/sanity/clientCdn.js";
import { Req, Res } from "../lib/vercel/apiTypes.js";

const query = '*[_type == "brands"]';

export default async function handler(req: Req, res: Res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await client.fetch(query).then((data) => {
      return res.status(200).json(data);
    });
    res.status(404);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
}
