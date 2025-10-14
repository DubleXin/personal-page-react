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
  console.log("got request");

  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });
  console.log("status OK");
  if (!req.body) return res.status(400).json({ error: "Missing request body" });
  console.log("body OK");
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  console.log("fields OK");
  const doc = {
    _type: "contact",
    name: name,
    email: email,
    message: message,
  };
  console.log("doc created");
  try {
    await client.create(doc).then((apiRes) => {
      console.log(
        `[${apiRes._createdAt}] created contact form with id: ${apiRes._id}`
      );
      console.log("created record");
      return res.status(200).json({ success: true });
    });

    res.status(404);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log("err defined: ", err);
      res.status(500).json({ error: err.message });
    } else {
      console.log("err not defined");
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
}
