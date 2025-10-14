import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.SANITY_CLIENT_API_ID,
  dataset: "production",
  apiVersion: "2025-02-06",
  useCdn: false,
  token: process.env.SANITY_CLIENT_API_TOKEN,
});
const builder = imageUrlBuilder(client);

export function urlFor(source: string) {
  return builder.image(source);
}
