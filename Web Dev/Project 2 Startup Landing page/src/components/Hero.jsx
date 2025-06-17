import React from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Smart Solutions for Tomorrow’s Businesses
        </h1>
        <p className={styles.subtitle}>
          InnovaTech offers AI-powered tools to elevate your business efficiency
          and growth.
        </p>
        <a href="#contact" className="btn" aria-label="Get Started">
          Get Started
        </a>
      </div>
      <div className={styles.imageContainer}>
        <svg
          viewBox="0 0 800 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className={styles.heroImage}
        >
          <rect width="800" height="500" rx="40" fill="url(#paint0_linear)" />
          <circle cx="400" cy="250" r="120" fill="#BFAAFF" />
          <circle cx="440" cy="210" r="140" fill="#8C63F7" />
          <circle cx="360" cy="290" r="130" fill="#5A0FD4" />
          <text
            x="400"
            y="280"
            fill="white"
            fontSize="40"
            fontWeight="700"
            textAnchor="middle"
            fontFamily="'Poppins', sans-serif"
          >
            AI + You
          </text>
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="0"
              y1="0"
              x2="800"
              y2="500"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#5A0FD4" />
              <stop offset="1" stopColor="#8C63F7" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}