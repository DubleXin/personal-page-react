const WORKS = [
  // Project Type
  "Fullstack",
  "Frontend",
  "Backend",
  "Portfolio",
  "API",
  "Tooling",
  "UI/UX",

  // Technologies
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "Sanity CMS",
  "Framer Motion",
  "Vite",
  "SCSS",
  "Vercel",

  // Technical Focus
  "REST API",
  "Serverless",
  "Authentication",
  "Caching",
  "CI/CD",
  "Performance",
  "Responsive Design",
  "Accessibility",
  "Testing",
  "Animation",
  // General
  "All",
] as const;

export type WorkId = (typeof WORKS)[number];
export default WORKS;
