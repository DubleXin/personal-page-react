import "./Work.scss";
import { AnimatePresence, motion, stagger } from "framer-motion";
import { images, WORKS } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import { useState } from "react";
import type { WorkId } from "../../constants/workTags";
import { useCacheApi } from "../../hooks/useCacheApi";
import { PortfolioCard } from "../../components";

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
          delayChildren: stagger(0.3),
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
              <PortfolioCard
                key={`woks-${s.title}-${i}`}
                title={s.title}
                description={s.description}
                codeLink={s.codeLink}
                imgUrl={s.imgUrl}
                tags={s.tags}
                projectLink={s.projectLink ? s.projectLink : undefined}
              />
            ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default AppWrap(MotionWrap(Work, "app__work"), "work", "app__primarybg");
