import "./NavBar.scss";
import { images } from "../../constants";

import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import { useState } from "react";
import { TABS } from "../../constants";
import { useTheme } from "../../hooks/useTheme";

function NavBar() {
  const [toggle, setToggle] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const onMenuStateToggle = () => {
    setToggle(!toggle);
  };
  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={images.logo} alt="logo"></img>
      </div>

      <ul className="app__navbar-links">
        {TABS.map((s) => (
          <li className="p-text app__flex" key={`link-${s}`}>
            <a href={`#${s}`}>{s}</a>
          </li>
        ))}
      </ul>
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === "light" ? "🌙 Switch to Dark" : "☀️ Switch to Light"}
      </button>
      {toggle && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: [0, 1],
          }}
          transition={{
            duration: 0.3,
            ease: "linear",
          }}
          className="app__bg-overlay"
        />
      )}
      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={onMenuStateToggle} />
        {toggle && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ scale: [0, 1], opacity: [0.9, 1] }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.85,
              ease: "easeOut",
            }}
          >
            <HiX onClick={onMenuStateToggle} />
            <ul>
              {TABS.map((s) => (
                <li className="p-text app__flex" key={`link-${s}`}>
                  <a href={`#${s}`} onClick={onMenuStateToggle}>
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
