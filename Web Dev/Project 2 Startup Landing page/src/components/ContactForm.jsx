import React, { useState } from 'react';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isEmailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatusMessage('Please fill in all fields.');
      return;
    }

    if (!isEmailValid(formData.email)) {
      setStatusMessage('Please enter a valid email address.');
      return;
    }

    setStatusMessage('');
    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setStatusMessage('Thank you for reaching out! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <section className={styles.contact} id="contact" aria-label="Contact form">
      <h2 className="section-title">Get In Touch</h2>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <input
          type="text"
          name="name"
          placeholder="Your Name *"
          aria-label="Name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={submitting}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email *"
          aria-label="Email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={submitting}
        />
        <textarea
          name="message"
          placeholder="Your Message *"
          aria-label="Message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={submitting}
        />
        <button type="submit" className="btn" disabled={submitting} aria-live="polite" aria-busy={submitting}>
          {submitting ? 'Sending...' : 'Send Message'}
        </button>
        {statusMessage && <p className={styles.status}>{statusMessage}</p>}
      </form>
    </section>
  );
}