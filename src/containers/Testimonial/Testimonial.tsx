import "./Testimonial.scss";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { AppWrap, MotionWrap } from "../../wrapper";
import { useState } from "react";
import { urlFor } from "../../../lib/sanityPublic/client";
import { useCacheApi } from "../../hooks/useCacheApi";
import { images } from "../../constants";

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
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const {
    data: testimonials,
    loading: testimonialsLoading,
    error: testimonialsError,
  } = useCacheApi<TestimonialType[]>("/api/getTestimonial", "testimonials");

  const {
    data: brands,
    loading: brandsLoading,
    error: brandsError,
  } = useCacheApi<BrandType[]>("/api/getBrand", "brands");

  const safeTestimonials =
    testimonials && Array.isArray(testimonials)
      ? testimonials
      : [
          {
            name: "ERROR",
            company: "Error.co",
            feedback: "error . . .",
            imgUrl: images.api,
          },
        ];

  const safeBrands =
    brands && Array.isArray(brands)
      ? brands
      : [
          {
            _id: "ERROR_BRAND_ID",
            name: "ERROR",
            imgUrl: images.api,
          },
        ];

  function onTestimonialButtonCLick(nextIndex: number = 0): void {
    setCurrentIndex(nextIndex);
  }

  if (testimonialsLoading && !testimonials)
    return <p className="loading-text">Loading testimonials...</p>;

  if (brandsLoading && !brands)
    return <p className="loading-text">Loading brands...</p>;

  return (
    <div>
      {testimonialsError && (
        <p style={{ color: "red" }}>
          Failed to load testimonials: {testimonialsError}
        </p>
      )}
      {safeTestimonials.length > 0 && (
        <div className="app__testimonial-container">
          <div className="app__testimonial-item app__flex">
            {!testimonialsError && (
              <img
                src={urlFor(safeTestimonials[currentIndex].imgUrl)}
                alt="Testimonial"
              />
            )}
            <div className="app__testimonial-content">
              <p className="p-text">
                {safeTestimonials[currentIndex].feedback}
              </p>
              <div>
                <h4 className="bold-text">
                  {safeTestimonials[currentIndex].name}
                </h4>
                <h5 className="p-text">
                  {safeTestimonials[currentIndex].company}
                </h5>
              </div>
            </div>
          </div>
          <div className="app__testimonials-btns app__flex">
            <button
              type="button"
              className="app__flex"
              onClick={() =>
                onTestimonialButtonCLick(
                  currentIndex == 0
                    ? safeTestimonials.length - 1
                    : currentIndex - 1
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
                  currentIndex == safeTestimonials.length - 1
                    ? 0
                    : currentIndex + 1
                )
              }
            >
              <HiChevronRight />
            </button>
          </div>
        </div>
      )}

      {brandsError && (
        <p style={{ color: "red" }}>Failed to load brands: {brandsError}</p>
      )}

      {safeBrands.length > 0 && (
        <div className="app__flex app__testimonials-brands">
          {safeBrands.map((s) => (
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
              {!brandsError && (
                <img src={urlFor(s.imgUrl)} alt={`${s.name} logo`} />
              )}
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
