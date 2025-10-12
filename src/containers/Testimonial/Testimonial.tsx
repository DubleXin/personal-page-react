import "./Testimonial.scss";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { AppWrap, MotionWrap } from "../../wrapper";
import { useEffect, useState } from "react";
import { urlFor } from "../../../lib/sanityPublic/client";
import axios from "axios";

type TestimonialType = {
  name: string;
  company: string;
  feedback: string;
  imgUrl: string;
};

type BrandType = {
  _id: string;
  name: string;
  imgUrl: string;
};

// eslint-disable-next-line react-refresh/only-export-components
function Testimonial() {
  const [brands, setBrands] = useState<BrandType[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  useEffect(() => {
    const fetchSectionData = async () => {
      axios
        .get<TestimonialType[]>("/api/getTestimonial")
        .then((res) => {
          if (Array.isArray(res.data)) return setTestimonials(res.data);
          throw new Error("API response is not an array");
        })
        .catch((e) =>
          console.error(
            `API error while fetching data for 'testimonial' section: ${e}`
          )
        );
      axios
        .get<BrandType[]>("/api/getBrand")
        .then((res) => {
          if (Array.isArray(res.data)) return setBrands(res.data);
          throw new Error("API response is not an array");
        })
        .catch((e) =>
          console.error(
            `API error while fetching data for 'brand' section: ${e}`
          )
        );
    };
    fetchSectionData();
  }, []);
  function onTestimonialButtonCLick(nextIndex: number = 0): void {
    setCurrentIndex(nextIndex);
  }
  return (
    <div>
      {testimonials.length > 0 && (
        <div className="app__testimonial-container">
          <div className="app__testimonial-item app__flex">
            <img
              src={urlFor(testimonials[currentIndex].imgUrl)}
              alt="Testimonial"
            />
            <div className="app__testimonial-content">
              <p className="p-text">{testimonials[currentIndex].feedback}</p>
              <div>
                <h4 className="bold-text">{testimonials[currentIndex].name}</h4>
                <h5 className="p-text">{testimonials[currentIndex].company}</h5>
              </div>
            </div>
          </div>
          <div className="app__testimonials-btns app__flex">
            <button
              type="button"
              className="app__flex"
              onClick={() =>
                onTestimonialButtonCLick(
                  currentIndex == 0 ? testimonials.length - 1 : currentIndex - 1
                )
              }
            >
              <HiChevronLeft />
            </button>
            <button
              type="button"
              className="app__flex"
              onClick={() =>
                onTestimonialButtonCLick(
                  currentIndex == testimonials.length - 1 ? 0 : currentIndex + 1
                )
              }
            >
              <HiChevronRight />
            </button>
          </div>
        </div>
      )}

      {brands.length > 0 && (
        <div className="app__flex app__testimonials-brands">
          {brands.map((s) => (
            <motion.div
              key={s._id}
              whileInView={{
                opacity: [0, 1],
              }}
              transition={{
                duration: 0.5,
                type: "tween",
              }}
            >
              <img src={urlFor(s.imgUrl)} alt={`${s.name} logo`} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default AppWrap(
  MotionWrap(Testimonial, "app__testimonial"),
  "testimonials",
  "app__primarybg"
);
