import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import myFace from "../../assets/favicon32.png";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/", id: "home" },
    { name: "About Me", path: "/aboutme", id: "aboutme" },
    { name: "Projects", path: "/projects", id: "projects" },
    { name: "Resume", path: "/resume", id: "resume" },
  ];

  return (
    <>
      <nav className=" bg-black text-white px-6 py-4 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" onClick={() => setActive("home")}>
            <img
              src={myFace}
              alt="My Face"
              className="w-10 h-10 rounded-full border-2 border-white hover:scale-110 duration-300"
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-8 text-lg font-medium relative">
            {navItems.map(({ name, path, id }) => (
              <li key={id} className="relative">
                <Link
                  to={path}
                  onClick={() => setActive(id)}
                  className="hover:text-pink-500 transition-colors"
                >
                  {name}
                  {active === id && (
                    <motion.div
                      layoutId="underline"
                      className="absolute -bottom-1 left-0 h-[2px] w-full bg-pink-500"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-white"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 w-64 h-full bg-black text-white z-50 shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Menu</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <ul className="flex flex-col gap-4 text-lg">
              {navItems.map(({ name, path, id }) => (
                <li key={id}>
                  <Link
                    to={path}
                    onClick={() => {
                      setActive(id);
                      setSidebarOpen(false);
                    }}
                    className={`block hover:text-pink-500 ${
                      active === id ? "text-pink-500" : ""
                    }`}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
            
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
