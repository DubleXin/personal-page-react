import { type ComponentType } from "react";
import { motion } from "framer-motion";

const MotionWrap = (Component: ComponentType, classNames: string = "") => {
  function HOC() {
    return (
      <motion.div
        className={`${classNames} app__flex`}
        whileInView={{
          y: [100, 50, 0],
          opacity: [0, 0, 1],
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <Component />
      </motion.div>
    );
  }

  HOC.displayName = `MotionWrap(${
    Component.displayName || Component.name || "Component"
  })`;

  return HOC;
};

export default MotionWrap;
