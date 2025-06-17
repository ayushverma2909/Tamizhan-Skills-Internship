import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>
        &copy; {year} InnovaTech. All rights reserved.
      </p>
      <p>
        Built with React
      </p>
    </footer>
  );
}