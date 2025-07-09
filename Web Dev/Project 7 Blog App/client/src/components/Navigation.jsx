import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/Header.module.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>My Blog Editor</div>

      <button className={styles.hamburger} onClick={toggleMenu}>
        ☰
      </button>

      <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.show : ''}`}>
        <Link to="/myposts" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>My Post</Link>
        <Link to="/blogs" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>All Blogs</Link>
        <Link to="/newpost" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>New Post</Link>
        <Link to="/login" className={styles.button} onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
        <Link to="/signup" className={styles.button} onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
      </nav>
    </header>
  );
};

export default Header;
