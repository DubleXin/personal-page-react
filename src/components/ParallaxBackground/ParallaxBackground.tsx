import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import "./ParallaxBackground.scss";

type Props = {
  intensity?: number;
  direction?: "up" | "down";
};

export default function ParallaxBackground({
  intensity = 120,
  direction = "up",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const to = direction === "up" ? -Math.abs(intensity) : Math.abs(intensity);
  const y = useTransform(scrollYProgress, [0, 1], [0, to]);

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="parallax-wrap">
      <motion.div className="parallax-bg" style={{ y, opacity }} aria-hidden />
    </div>
  );
}
