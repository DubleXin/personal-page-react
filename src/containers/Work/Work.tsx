import "./Work.scss";
import { urlFor } from "../../../lib/sanityPublic/client";
import { AnimatePresence, motion, stagger } from "framer-motion";
import { images, WORKS } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import { useState } from "react";
import type { WorkId } from "../../constants/workTags";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { useCacheApi } from "../../hooks/useCacheApi";

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

type WorkType = {
  title: string;
  description: string;
  projectLink: string;
  codeLink: string;
  imgUrl: string;
  tags: WorkId[];
};
// eslint-disable-next-line react-refresh/only-export-components
function Work() {
  const [filter, setFilter] = useState<WorkId[]>(["All"]);
  const [pendingFilter, setPendingFilter] = useState<WorkId[]>([]);

  const {
    data: works,
    loading,
    error,
  } = useCacheApi<WorkType[]>("/api/getWork", "works");
  const safeWorks =
    works && Array.isArray(works)
      ? works
      : [
          {
            title: "Error",
            description: "error . . .",
            projectLink: "/home",
            codeLink: "/home",
            imgUrl: images.api,
            tags: ["error"],
          },
        ];
  const handleFilter = (item: WorkId) => {
    setPendingFilter(() => {
      let newFilter = filter.includes(item)
        ? filter.filter((s) => s !== item)
        : [...filter, item];
      if (newFilter.length == 0) newFilter = ["All"];
      return newFilter;
    });
    setFilter([]);
  };
  const displayFilter = pendingFilter.length > 0 ? pendingFilter : filter;

  if (loading && !works)
    return <p className="loading-text">Loading works...</p>;

  return (
    <div>
      <h2 className="head-text">
        My personal <span>Highlights</span>
      </h2>

      {error && <p style={{ color: "red" }}>Failed to load works: {error}</p>}

      <div className="app__work-filter">
        {WORKS.map((s, i) => (
          <button
            className={`app__work-filter-item app__flex p-text ${
              displayFilter.includes(s) ? "filter-item-active" : ""
            }`}
            key={`filter-button-${s}-${i}`}
            onClick={() => {
              handleFilter(s);
            }}
          >
            {`${s} `}
          </button>
        ))}
      </div>
      <motion.div
        className="app__work-portfolio app__flex"
        transition={{
          duration: 0.5,
          ease: "easeIn",
          delayChildren: 0.3,
        }}
      >
        <AnimatePresence
          mode="sync"
          onExitComplete={() => {
            if (pendingFilter.length > 0) {
              setFilter(pendingFilter);
              setPendingFilter([]);
            }
          }}
        >
          {safeWorks
            .filter(
              (work) =>
                filter.includes("All") ||
                work.tags.some((tag) => filter.includes(tag as WorkId))
            )
            .map((s, i) => (
              <motion.div
                key={`woks-${s.title}-${i}`}
                className="app__work-item app__flex"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover="danger"
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <div className="app__work-img app__flex">
                  {!error && (
                    <img
                      src={urlFor(s.imgUrl)}
                      alt={`portfolio item image "${s.title}-${i}"`}
                    />
                  )}
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
                    <a
                      href={s.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
                    <a
                      href={s.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
                  <h4 className="bold-text">{s.title}</h4>
                  <p className="p-text" style={{ marginTop: "10px" }}>
                    {s.description}
                  </p>
                  <div className="app__work-tag app__flex">
                    <p className="p-text">{s.tags[0]}</p>
                  </div>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default AppWrap(MotionWrap(Work, "app__work"), "work", "app__primarybg");
