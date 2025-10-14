import "./Footer.scss";
import { useState } from "react";
import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import axios from "axios";

type FormType = {
  name: string;
  email: string;
  message: string;
};

// eslint-disable-next-line react-refresh/only-export-components
function Footer() {
  const [formData, setFormData] = useState<FormType>({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { name, email, message } = formData;
  function onInputChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void {
    const { name, value } = event.target;
    console.log(`${name} => ${value}`);

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function onFormSubmit(): void {
    setLoading(true);

    const doc = {
      _type: "contact",
      name: name,
      email: message,
      message: message,
    };

    axios.post<{ success: boolean }>("api/postContact", doc).then((res) => {
      if (!res.data.success) throw new Error("Bad API response");

      setLoading(false);
      setIsFormSubmitted(true);
    });
  }

  return (
    <>
      <h2 className="head-text">Take coffee & chat with me </h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email icon" />
          <a href="mailto:oleksandrhrechuk@gmail.com" className="p-text">
            oleksandrhrechuk@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="phone icon" />
          <a href="tel: +48 (886) 753-813" className="p-text">
            +48 (886) 753-813
          </a>
        </div>
      </div>

      {isFormSubmitted ? (
        <h3 className="head-text">Thank you for getting in touch!</h3>
      ) : (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              type="text"
              name="name"
              className="p-text"
              placeholder="Your name"
              value={name}
              onChange={onInputChange}
            />
          </div>
          <div className="app__flex">
            <input
              type="email"
              name="email"
              className="p-text"
              placeholder="Your email"
              value={email}
              onChange={onInputChange}
            />
          </div>
          <div>
            <textarea
              name="message"
              value={message}
              placeholder="Your Message"
              className="p-text"
              onChange={onInputChange}
            ></textarea>
          </div>
          <button className="p-text" type="button" onClick={onFormSubmit}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      )}
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__whitebg"
);
