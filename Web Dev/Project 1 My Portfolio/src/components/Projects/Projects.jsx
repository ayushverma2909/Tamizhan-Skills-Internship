import React, { useState } from "react";
import ProjectCard from "./ProjectCards";
import Particle from "../Particles";
import BlogApp from "../../assets/Projects/BlogApp.png";
import PersonalNotes from "../../assets/Projects/PersonalNotes.png";
import currency from "../../assets/Projects/currency.png";
import familyTracker from "../../assets/Projects/familyTracker.png";
import rateItNow from "../../assets/Projects/rateItNow.png";
import weather from "../../assets/Projects/weather.png";
import MyntraClone from "../../assets/Projects/MyntraClone.png";
import Permalist from "../../assets/Projects/Permalist.png";
import "./Projects.css";

function Projects() {
  const [showAll, setShowAll] = useState(false);;
  return (
    <div className="project-section">
      <Particle />

      <h1 className="project-heading">
        My Recent <span className="purple">Works</span>
      </h1>
      <p className="project-subtext">Here are a few projects I've worked on recently.</p>

      <div className="project-grid">
        <ProjectCard
          imgPath={BlogApp}
          title="Blog App"
          description="A full-stack blog application built with React, Node.js, Express, and Supabase Postgres. It features secure login, real-time CRUD operations, and an auto-save draft system to prevent content loss — offering a smooth and reliable writing experience."
          ghLink="https://github.com/ayushverma2909/Blog-App"
          demoLink="https://ayushverma2909.github.io/Blog-App/"
          isBlog={false}
        />
        
        <ProjectCard
          imgPath={PersonalNotes}
          title="Personal Notes"
          description="Taking notes has never been this fun! myNote is a personal note-keeping app where users can log in, create, view, and manage their own posts. Built with completely expressJs, EJS, and Node.js while Data is stored in Supabase — it’s a full-stack playground for storing thoughts, ideas, or anything you want to remember!"
          ghLink="https://github.com/ayushverma2909/Personal-Notes.git"
          demoLink="https://personal-notes-xi.vercel.app/"
          isBlog={false}
        />

        <ProjectCard
          imgPath={currency}
          title="Crypto Price Tracker"
          description="A responsive web application built with Node.js, Express, EJS, and Axios that allows users to monitor live cryptocurrency prices and real-time foreign exchange rates. It fetches data from the CoinMarketCap and ExchangeRate APIs to deliver up-to-date price information. The app features a clean UI, real-time updates, and provides users with key financial insights at a glance."
          ghLink="https://github.com/ayushverma2909/Crypto-FX-tracker.git"
          isBlog={false}
        />

        {showAll && (
          <>
            <ProjectCard
              imgPath={familyTracker}
              title="Family Travel Tracker"
              description="The app was created using Node.js, Express, and PostgreSQL to track users and the countries they’ve visited. It features dynamic EJS templates for rendering, input validation to avoid duplicate entries, and a user-friendly interface for logging and viewing travels. The database stores user profiles and visited countries, and the app was thoroughly tested to ensure smooth functionality."
              ghLink="https://github.com/ayushverma2909/Family-Travel-tracker.git"
              isBlog={false}
            />
            <ProjectCard
              imgPath={rateItNow}
              title="Rate It Now App"
              description="The Rate It Now App is an innovative Books Notes API crafted using Node.js, Express, and EJS, designed to let users seamlessly manage their book notes. With an intuitive interface and efficient backend, it offers real-time CRUD operations powered by PostgreSQL, providing a powerful, dynamic experience for book enthusiasts."
              ghLink="https://github.com/ayushverma2909/Rate-It-Now-App.git"
              isBlog={false}
            />
            <ProjectCard
              imgPath={weather}
              title="Weather App"
              description="A simple and responsive web app that shows real-time weather information for any city using the OpenWeatherMap API. Built with HTML, CSS, JavaScript (or React, if you used it). Users can search by city name and get current temperature, humidity, weather conditions, and more."
              ghLink="https://github.com/ayushverma2909/Weather-App.git"
              isBlog={false}
            />
            <ProjectCard
              imgPath={MyntraClone}
              title="Myntra Clone"
              description="A responsive e-commerce website clone built with HTML, CSS, and JavaScript. It replicates Myntra's core features like product browsing, details view, and a shopping cart, with a mobile-friendly design."
              ghLink="https://github.com/ayushverma2909/Myntra-Clone.git"
              demoLink="https://ayushverma2909.github.io/Myntra-Clone/"
              isBlog={false}
            />
            <ProjectCard
              imgPath={Permalist}
              title="Permalist App"
              description="Permalist is a web application designed to help users manage a personal list of items. With a simple and intuitive interface, users can easily add and delete items from their list. Built with Node.js, Express, and PostgreSQL, it offers a seamless experience for organizing and maintaining personal data securely."
              ghLink="https://github.com/ayushverma2909/Permalist-App.git"
              isBlog={false}
            />
          </>
        )}
      </div>

      <div className="project-toggle-wrapper">
        <button className="project-toggle-btn" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
}

export default Projects;
