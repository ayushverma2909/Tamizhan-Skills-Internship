import React from "react";
import { BiLogoVisualStudio } from "react-icons/bi";
import { FaWindows, FaGithub } from "react-icons/fa";
import { SiPostman } from "react-icons/si";
import './toolstack.css';

function Toolstack() {
  return (
    <div className="tool-row">
      <div className="tech-icons">
        <div className="icon-container">
          <FaWindows />
          <span className="tooltip">Windows</span>
        </div>
      </div>
      <div className="tech-icons">
        <div className="icon-container">
          <BiLogoVisualStudio />
          <span className="tooltip">Visual Studio</span>
        </div>
      </div>
      <div className="tech-icons">
        <div className="icon-container">
          <SiPostman />
          <span className="tooltip">Postman</span>
        </div>
      </div>
      <div className="tech-icons">
        <div className="icon-container">
          <FaGithub />
          <span className="tooltip">GitHub</span>
        </div>
      </div>
    </div>
  );
}

export default Toolstack;
