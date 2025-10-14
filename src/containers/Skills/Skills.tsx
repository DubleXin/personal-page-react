import "./Skills.scss";
import { urlFor } from "../../../lib/sanityPublic/client";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import { useEffect, useState } from "react";
import axios from "axios";
import { Tooltip } from "react-tooltip";

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
// eslint-disable-next-line react-refresh/only-export-components
function Skills() {
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [experience, setExperience] = useState<ExperienceType[]>([]);
  useEffect(() => {
    const fetchSectionData = async () => {
      axios
        .get<SkillType[]>("/api/getSkill")
        .then((res) => {
          if (Array.isArray(res.data)) return setSkills(res.data);
          throw new Error("API response is not an array");
        })
        .catch((e) =>
          console.error(
            `API error while fetching data for 'skills' section: ${e}`
          )
        );
      axios
        .get<ExperienceType[]>("/api/getExperience")
        .then((res) => {
          if (Array.isArray(res.data)) return setExperience(res.data);
          throw new Error("API response is not an array");
        })
        .catch((e) =>
          console.error(
            `API error while fetching data for 'experience' section: ${e}`
          )
        );
    };
    fetchSectionData();
  }, []);
  return (
    <div>
      <h2 className="head-text">Skills & Experience</h2>
      <div className="app__skills-container">
        <motion.div className=" app__skills-list">
          {skills.map((s) => (
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
                <img src={urlFor(s.icon)} alt={s.name} />
              </div>
              <p className="p-text">{s.name}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="app__skills-exp">
          {experience
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
