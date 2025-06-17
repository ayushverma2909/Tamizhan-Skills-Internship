import React from "react";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiGit,
  DiPython
} from "react-icons/di";
import { CgCPlusPlus } from "react-icons/cg";
import {
  SiPostgresql,
  SiExpress,
  SiAxios
} from "react-icons/si";

function Techstack() {
  return (
    <div className="tool-row">
      <div className="tech-icons">
        <div className="icon-container">
          <DiNodejs />
          <span className="tooltip">Node.js</span>
        </div>
      </div>
      <div className="tech-icons">
        <div className="icon-container">
          <DiReact />
          <span className="tooltip">React.js</span>
        </div>
      </div>
      <div className="tech-icons">
        <div className="icon-container">
          <CgCPlusPlus />
          <span className="tooltip">C++</span>
        </div>
      </div>
      <div className="tech-icons">
        <div className="icon-container">
          <DiJavascript1 />
          <span className="tooltip">JavaScript</span>
        </div>
      </div>
      <div className="tech-icons">
        <div className="icon-container">
          <SiExpress />
          <span className="tooltip">Express.js</span>
        </div>
      </div>
      <div className="tech-icons">
        <div className="icon-container">
          <DiGit />
          <span className="tooltip">Git</span>
        </div>
      </div>
      <div className="tech-icons">
        <div className="icon-container">
          <DiPython />
          <span className="tooltip">Python</span>
        </div>
      </div>
      <div className="tech-icons">
        <div className="icon-container">
          <SiPostgresql />
          <span className="tooltip">PostgreSQL</span>
        </div>
      </div>
      <div className="tech-icons">
        <div className="icon-container">
          <SiAxios />
          <span className="tooltip">Axios</span>
        </div>
      </div>
    </div>
  );
}

export default Techstack;
