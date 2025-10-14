import "./SocialMedia.scss";

import { BsGithub, BsLinkedin } from "react-icons/bs";

export default function SocialMedia() {
  return (
    <div className="app__social">
      <div>
        <BsGithub />
      </div>
      <div>
        <BsLinkedin />
      </div>
    </div>
  );
}
