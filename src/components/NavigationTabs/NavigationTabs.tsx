import "./NavigationTabs.scss";
import { motion } from "framer-motion";
import { TABS } from "../../constants";

interface NavigationTabsProps {
  activeElement: string;
}

function NavigationTabs({ activeElement }: NavigationTabsProps) {
  return (
    <div className="app__flex app__navigation-dot-list">
      {TABS.map((s, i) => (
        <motion.a
          className={`app__navigation-dot ${
            activeElement === s ? "active-dot" : ""
          }`}
          href={`#${s}`}
          key={`dot-link-${s}-${i}`}
          initial={{
            opacity: 0.8,
          }}
          whileHover={{ opacity: 1, scale: 1.1 }}
        />
      ))}
    </div>
  );
}

export default NavigationTabs;
