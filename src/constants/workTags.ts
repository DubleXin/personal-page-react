const WORKS = [
  "React",
  "CI/CD",
  "EJS",
  "SQL",
  "Node",
  "TypeScript",
  "Vercel",
  "All",
] as const;

export type WorkId = (typeof WORKS)[number];
export default WORKS;
