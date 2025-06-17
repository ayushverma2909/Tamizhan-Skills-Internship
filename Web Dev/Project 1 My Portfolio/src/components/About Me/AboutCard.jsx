import React from "react";
import { ImPointRight } from "react-icons/im";
import './aboutcard.css'


function AboutCard() {
  return (
    <div className="quote-card-view">
        <div className=" text-2xl ">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple"> Ayush Verma </span>
            from <span className="purple"> Varanasi, UttarPradesh, India.</span>
            <br />
            I am currently exploring opportunities in frontend/backend/full stack development.
            <br />
            I have completed BSc in Maths and Computer Science at MGKVP University.
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight />&nbsp; Video Editing
            </li>
            <li className="about-activity">
              <ImPointRight /> &nbsp;YouTube Blogs
            </li>
            <li className="about-activity">
              <ImPointRight />&nbsp; Watching Anime
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">&nbsp;_Ayush</footer>
        </div>
    </div>
  );
}

export default AboutCard;
