import "./Skills.scss";
import { urlFor } from "../../../lib/sanityPublic/client";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import { Tooltip } from "react-tooltip";
import { useCacheApi } from "../../hooks/useCacheApi";
import { images } from "../../constants";

type SkillType = {
  name: string;
  bgColor: string;
  icon: string;
};
type WorkExperienceType = {
  name: string;
  company: string;
  desc: string;
};
type ExperienceType = {
  year: string;
  works: WorkExperienceType[];
};

const IS_EXPERIENCE_DISPLAYED = false;
// eslint-disable-next-line react-refresh/only-export-components
function Skills() {
  const {
    data: skills,
    loading: skillsLoading,
    error: skillsError,
  } = useCacheApi<SkillType[]>("/api/getSkill", "skills");

  const {
    data: experience,
    loading: experienceLoading,
    error: experienceError,
  } = useCacheApi<ExperienceType[]>("/api/getExperience", "experience");

  const safeSkill =
    skills && Array.isArray(skills)
      ? skills
      : [
          {
            name: "ERROR",
            bgColor: "#fff",
            icon: images.api,
          },
        ];

  const safeExperience =
    experience && Array.isArray(experience)
      ? experience
      : [
          {
            year: "0000",
            works: [
              {
                name: "ERROR",
                company: "Error.co",
                desc: "error",
              },
            ],
          },
        ];

  if (skillsLoading && !skills)
    return <p className="loading-text">Loading skills...</p>;

  if (experienceLoading && !experience)
    return <p className="loading-text">Loading experience...</p>;

  return (
    <div>
      <h2 className="head-text">
        Skills {IS_EXPERIENCE_DISPLAYED && "& Experience"}
      </h2>

      {skillsError && (
        <p style={{ color: "red" }}>Failed to load skills: {skillsError}</p>
      )}

      {experienceError && (
        <p style={{ color: "red" }}>
          Failed to load experience: {experienceError}
        </p>
      )}
      <div className="app__skills-container">
        <motion.div className=" app__skills-list">
          {safeSkill.map((s) => (
            <motion.div
              className="app__skills-item app__flex"
              key={`skill-item-${s.name}`}
              whileInView={{
                opacity: [0, 1],
              }}
              transition={{
                duration: 0.5,
              }}
            >
              <div
                className="app__flex"
                style={{
                  backgroundColor: s.bgColor,
                }}
              >
                {!skillsError && <img src={urlFor(s.icon)} alt={s.name} />}
              </div>
              <p className="p-text">{s.name}</p>
            </motion.div>
          ))}
        </motion.div>

        {IS_EXPERIENCE_DISPLAYED && (
          <motion.div className="app__skills-exp">
            {safeExperience
              .sort((a, b) => parseInt(a.year) - parseInt(b.year))
              .map((exp, i) => (
                <motion.div
                  className="app__skills-exp-item"
                  key={`exp-item-${exp.year}-${i}`}
                >
                  <div className="app__skills-exp-year">
                    <p className="bolt-text">{exp.year}</p>
                  </div>
                  <motion.div className="app__skills-exp-works">
                    {exp.works.map((s) => (
                      <div key={`exp-works-item-${s.name}`}>
                        <motion.div
                          data-tooltip-id={s.name}
                          className="app__skills-exp-work"
                          whileInView={{
                            opacity: [0, 1],
                          }}
                          transition={{
                            duration: 0.5,
                          }}
                        >
                          <h4 className="bold-text">{s.name}</h4>
                          <p className="p-text">{s.company}</p>
                        </motion.div>
                        <Tooltip
                          id={s.name}
                          float={true}
                          arrowColor="#fff"
                          className="skills-tooltip"
                        >
                          {s.desc}
                        </Tooltip>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);
