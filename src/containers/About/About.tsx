import "./About.scss";
import { motion } from "framer-motion";
import { images } from "../../constants";
import { urlFor } from "../../../lib/sanityPublic/client";
import { AppWrap, MotionWrap } from "../../wrapper";
import { useCacheApi } from "../../hooks/useCacheApi";

type AboutsType = {
  title: string;
  description: string;
  imgUrl: string;
};

// eslint-disable-next-line react-refresh/only-export-components
function About() {
  const {
    data: abouts,
    loading,
    error,
  } = useCacheApi<AboutsType[]>("/api/getAbout", "abouts");
  const safeAbouts =
    abouts && Array.isArray(abouts)
      ? abouts
      : [
          {
            title: "ERROR",
            description: "Could not load abouts",
            imgUrl: images.api,
          },
        ];
  if (loading && !abouts)
    return <p className="loading-text">Loading abouts...</p>;
  return (
    <div>
      <h2 className="head-text">
        I Know that <span>Good Development</span> <br /> means{" "}
        <span>Good Business</span>
      </h2>

      {error && <p style={{ color: "red" }}>Failed to load abouts: {error}</p>}
      <div className="app__profile">
        {safeAbouts.map((s, i) => (
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
            {!error && (
              <img src={urlFor(s.imgUrl)} alt={`profile image ${s.title}`} />
            )}
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

// eslint-disable-next-line react-refresh/only-export-components
export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);
