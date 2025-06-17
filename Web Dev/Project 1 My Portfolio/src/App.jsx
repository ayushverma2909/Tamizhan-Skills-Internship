import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ResumeNew from "./components/Resume/MyResume";
import AboutMe from "./components/About Me/AboutMe";
import Projects from "./components/Projects/Projects";

function App() {
  return (
    <Router basename="/My-Portfolio/"> 
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/resume" element={<ResumeNew />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
