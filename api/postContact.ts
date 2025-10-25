import { client } from "../lib/sanity/client.js";
import { Req, Res } from "../lib/vercel/apiTypes.js";

export default async function handler(
  req: Req<{
    name: string;
    email: string;
    message: string;
  }>,
  res: Res
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });
  if (!req.body) return res.status(400).json({ error: "Missing request body" });
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const doc = {
    _type: "contact",
    name: name,
    email: email,
    message: message,
  };
  try {
    await client.create(doc).then((apiRes) => {
      console.log(
        `[${apiRes._createdAt}] created contact form with id: ${apiRes._id}`
      );
      return res.status(200).json({ success: true });
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
