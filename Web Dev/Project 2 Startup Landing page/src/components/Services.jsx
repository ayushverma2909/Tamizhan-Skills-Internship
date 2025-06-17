import React from 'react';
import styles from './Services.module.css';
import { FaRocket, FaShieldAlt, FaChartLine } from 'react-icons/fa';

const services = [
  {
    icon: <FaRocket />,
    title: 'Fast Integration',
    description:
      'Get your tools integrated within hours, not days. No more waiting.',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Robust Security',
    description:
      'Your data is encrypted and protected with enterprise-grade security.',
  },
  {
    icon: <FaChartLine />,
    title: 'Analytics Insights',
    description:
      'Comprehensive real-time analytics to help you make smarter decisions.',
  },
];

export default function Services() {
  return (
    <section className={styles.services} id="services">
      <h2 className="section-title">Our Key Features</h2>
      <div className={styles.grid}>
        {services.map(({ icon, title, description }) => (
          <div key={title} className={styles.card} tabIndex="0" aria-label={`${title} feature`}>
            <div className={styles.icon}>{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}