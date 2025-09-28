import "./About.scss";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { images } from "../../constants";
import axios from "axios";

type AboutsType = {
  title: string;
  description: string;
  imgUrl: string;
};

function About() {
  const [abouts, setAbouts] = useState<AboutsType[]>([]);

  useEffect(() => {
    const fetchAbouts = async () => {
      try {
        const res = await axios.get<AboutsType[]>("/api/createAbout");
        if (Array.isArray(res.data)) {
          setAbouts(res.data);
        } else {
          throw new Error("API response is not an array");
        }
      } catch (e) {
        console.error(
          `API error while fetching data for 'about' section: ${e}`
        );
        setAbouts([
          {
            title: "ERROR",
            description: "Could not load abouts",
            imgUrl: images.api,
          },
        ]);
      }
    };

    fetchAbouts();
  }, []);

  return (
    <div className="app__about">
      <h2 className="head-text">
        I Know that <span>Good Development</span> <br /> means{" "}
        <span>Good Business</span>
      </h2>

      <div className="app__profile">
        {abouts.map((s, i) => (
          <motion.div
            className="app__profile-item"
            key={`profile-item-${s.title}-${i}`}
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 0.8,
            }}
            whileHover={{
              opacity: 1,
              scale: 1.1,
            }}
            transition={{
              duration: 0.5,
              type: "tween",
            }}
          >
            <img src={s.imgUrl} alt={`profile image ${s.title}`} />
            <h2
              className="bold-text"
              style={{
                marginTop: "20px",
              }}
            >
              {s.title}
            </h2>
            <p
              className="p-text"
              style={{
                marginTop: "10px",
              }}
            >
              {s.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default About;
