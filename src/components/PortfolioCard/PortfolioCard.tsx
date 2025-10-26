import "./PortfolioCard.scss";
import { motion, stagger } from "framer-motion";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { urlFor } from "../../../lib/sanityPublic/client";

const cardVariants = {
  visible: {
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: 100,
  },
  danger: {
    opacity: 1,
    scale: 1.1,
  },
};

type Props = {
  title: string;
  description: string;
  projectLink?: string;
  codeLink: string;
  imgUrl: string;
  tags: string[];
};

const PortfolioCard = ({
  title,
  description,
  projectLink = undefined,
  codeLink,
  imgUrl,
  tags,
}: Props) => {
  return (
    <motion.div
      className="app__work-item app__flex"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      whileHover="danger"
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="app__work-img app__flex">
        <img src={urlFor(imgUrl)} alt={`portfolio item image "${title}"`} />

        <motion.div
          className="app__work-hover app__flex"
          initial={{
            opacity: 0,
          }}
          whileHover={{
            opacity: [0, 1, 0.9],
          }}
          transition={{
            duration: 0.25,
            ease: "easeInOut",
            delayChildren: stagger(0.5),
          }}
        >
          {projectLink && (
            <a href={projectLink} target="_blank" rel="noopener noreferrer">
              <motion.div
                className="app__flex"
                whileInView={{
                  scale: [0.5, 1],
                }}
                whileHover={{
                  scale: [1, 0.9],
                }}
                transition={{
                  duration: 0.25,
                }}
              >
                <AiFillEye />
              </motion.div>
            </a>
          )}

          <a href={codeLink} target="_blank" rel="noopener noreferrer">
            <motion.div
              className="app__flex"
              whileInView={{
                scale: [0.5, 1],
              }}
              whileHover={{
                scale: [1, 0.9],
              }}
              transition={{
                duration: 0.25,
              }}
            >
              <AiFillGithub />
            </motion.div>
          </a>
        </motion.div>
      </div>

      <div className="app__work-content app__flex">
        <h4 className="bold-text">{title}</h4>
        <p className="p-text" style={{ marginTop: "10px" }}>
          {description}
        </p>
        <div className="app__work-tag app__flex">
          <p className="p-text">{tags[0]}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;
