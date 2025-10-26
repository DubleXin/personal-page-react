import "./Header.scss";
import { motion, stagger } from "framer-motion";
import { images } from "../../constants";
import Wings from "../../assets/wings.svg?react";
import { FaNodeJs, FaReact } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";

const MotionWings = motion.create(Wings);

const scaleVariants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    whileInView: {
      scale: [0, 1],
      opacity: [0, 1],
      transition: {
        duration: 1,
        ease: "easeInOut" as const,
      },
    },
  },
};

function Header() {
  return (
    <div id="home" className="app__header app__flex">
      <motion.div
        className="app__header-info"
        initial={{
          opacity: 0,
        }}
        whileInView={{
          x: [-100, 0],
          opacity: [0, 1],
        }}
        transition={{
          duration: 0.5,
          ease: "easeIn",
        }}
      >
        <div className="app__header-badge">
          <div className="badge-cmp app__flex">
            <span>░▒▓</span>
            <div style={{ marginLeft: 20 }}>
              <p className="p-text">Hello, I am </p>
              <h1 className="head-text">Oleksandr</h1>
            </div>
          </div>
          <div className="app__flex tag-cmp">
            <p className="p-text">Web Developer</p>
            <p className="p-text">Full-Stack</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="app__header-img"
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: [0, 1],
        }}
        transition={{
          duration: 0.5,
          ease: "easeIn",
          delayChildren: stagger(0.3),
        }}
      >
        <img src={images.profile} alt="profile-bg" />
        <MotionWings
          className="overlay-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />
      </motion.div>
      <motion.div
        variants={scaleVariants}
        whileInView={scaleVariants.visible.whileInView}
        className="app__header-circles"
      >
        {[<FaNodeJs />, <FaReact />, <BiLogoPostgresql />].map((s, i) => (
          <div className="circle-cmp app__flex" key={`header-circle-${i}`}>
            {s}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default Header;
