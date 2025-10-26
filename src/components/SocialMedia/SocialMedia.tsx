import "./SocialMedia.scss";

import { BsGithub, BsLinkedin } from "react-icons/bs";

export default function SocialMedia() {
  return (
    <div className="app__social">
      <a href="https://github.com/DubleXin">
        <div>
          <BsGithub />
        </div>
      </a>
      <a href="https://www.linkedin.com/in/oleksandr-hrechuk-78b147304?trk=contact-info">
        <div>
          <BsLinkedin />
        </div>
      </a>
    </div>
  );
}
