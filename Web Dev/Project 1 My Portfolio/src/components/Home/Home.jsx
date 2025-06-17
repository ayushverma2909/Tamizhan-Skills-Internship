import Particle from "../Particles";
import { Mail, Github, Linkedin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import myFace from "../../assets/favicon512.png";

const Home = () => {
  return (
    <>
      <Particle />

      <section
        className="min-h-screen flex flex-col justify-center items-center px-6 md:flex-row md:justify-between md:px-16"
        id="hero"
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-center md:text-left max-w-xl"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Hi, I'm <span className="text-purple-400">Ayush</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6">
            A full-stack developer passionate about crafting clean code,
            beautiful UI/UX, and scalable backend systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="/projects"
              className="bg-purple-600 px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-purple-700 transition"
            >
              View Projects <ArrowRight size={18} />
            </a>
            {/* <a
              href="#contact"
              className="border border-purple-400 px-6 py-3 rounded-xl text-purple-300 hover:bg-purple-500 hover:text-white transition"
            >
              Get in Touch
            </a> */}
          </div>

          <div className="mt-8 flex justify-center md:justify-start space-x-6">
            <a
              href="https://github.com/ayushverma2909"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="hover:text-purple-400" />
            </a>
            <a
              href="https://www.linkedin.com/in/ayush-verma-2b3a48341/"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="hover:text-purple-400" />
            </a>
            <a href="mailto:ayushv2909@gmail.com">
              <Mail className="hover:text-purple-400" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="mt-10 md:mt-0"
        >
          <img
            src={myFace}
            alt="Ayush"
            className="w-60 h-60 md:w-80 md:h-80 rounded-full object-cover border-4 border-purple-500 shadow-xl"
          /> 
        </motion.div>
      </section>

      <section className="py-16 px-6 md:px-20 text-center md:text-left bg-transparent text-gray-200">
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-3xl md:text-4xl font-bold text-purple-400 mb-4"
        >
          LET ME INTRODUCE MYSELF
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl"
        >
          I fell in love with programming and, thankfully, haven’t looked back
          since. I’ve learned a lot (and unlearned even more!) along the way.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mt-6"
        >
          I’m fluent in{" "}
          <span className="text-purple-300 font-medium">JavaScript</span> and
          passionate about building modern, responsive web applications that are
          clean, intuitive, and user-friendly. I work extensively with
          technologies like{" "}
          <span className="text-purple-300 font-medium">
            React.js, Node.js, and Express.js
          </span>{" "}
          to develop full-stack web solutions with great user experiences.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mt-6"
        >
          On the <span className="text-purple-300 font-medium">Python</span>{" "}
          side, I enjoy building powerful backend systems, writing automation
          scripts, working with APIs, and handling data processing. Whether it’s
          scripting, building Flask-based services, or managing workflows,
          Python is one of my go-to tools for solving problems effectively.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mt-6"
        >
          I’m always eager to create meaningful digital experiences through
          solid architecture, beautiful design, and efficient backend logic.
        </motion.p>
      </section>
    </>
  );
};

export default Home;
