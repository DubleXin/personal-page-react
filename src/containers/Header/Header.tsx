import "./Header.scss";
import { motion } from "framer-motion";
import { images } from "../../constants";

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
            <span>🤘</span>
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
          delayChildren: 0.3,
        }}
      >
        <img src={images.profile} alt="profile-bg"></img>
        <motion.img
          className="overlay-circle"
          src={images.circle}
          alt="profile_circle"
          initial={{
            scale: 0,
          }}
          whileInView={{
            scale: [0, 1],
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      <motion.div
        variants={scaleVariants}
        whileInView={scaleVariants.visible.whileInView}
        className="app__header-circles"
      >
        {[images.flutter, images.redux, images.sass].map((s, i) => (
          <div className="circle-cmp app__flex" key={`header-circle-${i}`}>
            <img src={s} alt="technology-circle" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default Header;
