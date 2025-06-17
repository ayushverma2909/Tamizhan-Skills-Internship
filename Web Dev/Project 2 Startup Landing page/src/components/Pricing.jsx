import React, { useState } from 'react';
import styles from './Pricing.module.css';

const plans = [
  {
    name: 'Starter',
    priceMonthly: 19,
    priceYearly: 190,
    features: [
      'Up to 5 users',
      'Basic AI tools',
      'Email support',
      'Limited analytics',
    ],
  },
  {
    name: 'Growth',
    priceMonthly: 49,
    priceYearly: 490,
    features: [
      'Up to 25 users',
      'Advanced AI tools',
      'Priority support',
      'Full analytics suite',
    ],
  },
  {
    name: 'Enterprise',
    priceMonthly: 99,
    priceYearly: 990,
    features: [
      'Unlimited users',
      'Custom AI models',
      'Dedicated support',
      'Custom analytics & reports',
    ],
  },
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const toggleBilling = () => {
    setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly');
  };

  return (
    <section className={styles.pricing} id="pricing">
      <h2 className="section-title">Pricing Plans</h2>

      <div className={styles.billingToggle}>
        <span className={billingCycle === 'monthly' ? styles.active : ''}>Monthly</span>
        <label className={styles.switch}>
          <input
            type="checkbox"
            aria-label="Toggle billing period"
            checked={billingCycle === 'yearly'}
            onChange={toggleBilling}
          />
          <span className={styles.slider}></span>
        </label>
        <span className={billingCycle === 'yearly' ? styles.active : ''}>Yearly</span>
      </div>

      <div className={styles.grid}>
        {plans.map(({ name, priceMonthly, priceYearly, features }) => (
          <div key={name} className={styles.card} tabIndex="0" aria-label={`${name} pricing plan`}>
            <h3>{name}</h3>
            <p className={styles.price}>
              <span className={styles.currency}>$</span>
              {billingCycle === 'monthly' ? priceMonthly : priceYearly}
              <span className={styles.period}>
                /{billingCycle === 'monthly' ? 'mo' : 'yr'}
              </span>
            </p>
            <ul className={styles.features}>
              {features.map((feat) => (
                <li key={feat}>{feat}</li>
              ))}
            </ul>
            <button className="btn" aria-label={`Select ${name} plan`}>
              Select
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}