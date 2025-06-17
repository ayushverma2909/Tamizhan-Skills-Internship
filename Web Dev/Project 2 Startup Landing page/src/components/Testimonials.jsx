import React from 'react';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: 'Emily R.',
    role: 'Product Manager',
    photo: 'https://randomuser.me/api/portraits/women/79.jpg',
    feedback:
      'InnovaTech transformed our workflow entirely. The AI tools are intuitive and powerful.',
  },
  {
    name: 'Michael S.',
    role: 'CEO, TechSoft',
    photo: 'https://randomuser.me/api/portraits/men/65.jpg',
    feedback:
      'Fast integration and reliable analytics helped take our growth to the next level.',
  },
  {
    name: 'Sophie P.',
    role: 'Marketing Head',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    feedback:
      'The security features provide peace of mind. I highly recommend their services.',
  },
];

export default function Testimonials() {
  return (
    <section className={styles.testimonials}>
      <h2 className="section-title">What Our Customers Say</h2>
      <div className={styles.container} role="list">
        {testimonials.map(({ name, role, photo, feedback }) => (
          <blockquote key={name} className={styles.card} role="listitem" tabIndex="0" aria-label={`Testimonial from ${name}, ${role}`}>
            <p className={styles.feedback}>"{feedback}"</p>
            <div className={styles.user}>
              <img
                src={photo}
                alt={`${name} profile`}
                className={styles.avatar}
                loading="lazy"
              />
              <div>
                <strong>{name}</strong>
                <br />
                <small>{role}</small>
              </div>
            </div>
          </blockquote>
        ))}
      </div>
    </section>
  );
}