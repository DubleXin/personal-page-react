const TABS = [
  "home",
  "about",
  "work",
  "skills",
  // "testimonials",
  "contact",
] as const;

export type TabId = (typeof TABS)[number];
export default TABS;
