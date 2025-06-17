import "./Footer.css";
import { FaGithub, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-left">
        <p> © {year} Copyright</p>
        <p>Designed and Developed by Ayush Verma</p>
      </div>

      <div className="footer-right">
        <a href="https://instagram.com/ayush.1.9" target="_blank" rel="noreferrer">
          <FaInstagram />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <FaTwitter />
        </a>
        <a href="https://github.com/ayushverma2909" target="_blank" rel="noreferrer">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/ayush-verma-2b3a48341/" target="_blank" rel="noreferrer">
          <FaLinkedin />
        </a>
      </div>

    </footer>
  );
}

export default Footer;
