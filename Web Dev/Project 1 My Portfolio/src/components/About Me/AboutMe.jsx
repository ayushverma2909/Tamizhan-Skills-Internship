import React from "react";
import Particle from "../Particles";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import about from "../../assets/about.png";
import Toolstack from "./Toolstack";
import './aboutcard.css'

function AboutMe() {
  return (
    <div fluid className="about-section">
      <Particle />
      <div>
        <div className="about-card-content">
          <div style={{ flex: "1"}}>
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              Know Who <strong className="purple">I'M</strong>
            </h1>
            <Aboutcard />
          </div>
          <div className="about-img">
            <img src={about} alt="about" className="img-fluid" />
          </div>
        </div>
        <h1 className="project-heading">
          Professional&nbsp;<strong className="purple"> Skillset </strong>
        </h1>

        <Techstack />

        <h1 className="project-heading">
          <strong className="purple">Tools&nbsp; </strong> I use
        </h1>
        <Toolstack />
      </div>
    </div>
  );
}

export default AboutMe;
