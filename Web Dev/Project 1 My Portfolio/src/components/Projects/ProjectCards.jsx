import React, { useEffect } from "react";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import "./Projects.css";
import AOS from "aos";
import "aos/dist/aos.css";

function ProjectCard(props) {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);
  return (
    <div className="custom-card" data-aos="fade-up">
      <img src={props.imgPath} alt="project" className="custom-card-img" />

      <div className="custom-card-body">
        <h3 className="custom-card-title">{props.title}</h3>
        <p className="custom-card-desc">{props.description}</p>

        <div className="custom-card-btns">
          <a
            href={props.ghLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn github-btn"
          >
            <BsGithub /> &nbsp; {props.isBlog ? "Blog" : "GitHub"}
          </a>

          {!props.isBlog && props.demoLink && (
            <a
              href={props.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn demo-btn"
            >
              <CgWebsite /> &nbsp; Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
