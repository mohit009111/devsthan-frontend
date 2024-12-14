import React from 'react';
import styles from './terms-and-conditions.module.css';

const TermsAndConditions = () => {
  return (
    <div className={styles['terms-and-conditions']}>
        <h1 className={styles['title']}>Terms and Conditions</h1>
      <div className={styles['container']}>
        <p className={styles['last-updated']}>Last Updated: 13-12-2024</p>

        <div className={styles['section']}>
          <h2 className={styles['section-title']}>1. Acceptance of Terms</h2>
          <p className={styles['section-text']}>
            By accessing this website, we assume you accept these terms and conditions. 
            Do not continue to use www.devsthanexpert.com if you do not agree to take 
            all of the terms and conditions stated on this page.
          </p>
        </div>

        <div className={styles['section']}>
          <h2 className={styles['section-title']}>2. Use of the Site</h2>
          <ul className={styles['list']}>
            <li className={styles['list-item']}>You must be at least 18 years old to use this site.</li>
            <li className={styles['list-item']}>
              You agree to use the site only for lawful purposes and in a way that does not 
              infringe the rights of, restrict, or inhibit anyone else’s use and enjoyment of the site.
            </li>
          </ul>
        </div>

        <div className={styles['section']}>
          <h2 className={styles['section-title']}>3. Intellectual Property Rights</h2>
          <p className={styles['section-text']}>
            Unless otherwise stated, Devsthan Expert Travel Pvt Ltd and/or its licensors own the
            intellectual property rights for all material on www.devsthanexpert.com. All intellectual
            property rights are reserved. You may access this from www.devsthanexpert.com for
            your own personal use subjected to restrictions set in these terms and conditions.
          </p>
        </div>

        {/* Add additional sections here, following the same structure */}
        
        <div className={styles['section']}>
          <h2 className={styles['section-title']}>11. Contact Us</h2>
          <p className={styles['section-text']}>
            If you have any questions about these terms and conditions, please contact us at:
          </p>
          <ul className={styles['contact-list']}>
            <li className={styles['contact-item']}>
              <strong>Email:</strong> info@devsthanexpert.com
            </li>
            <li className={styles['contact-item']}>
              <strong>Phone:</strong> +91-8683818381
            </li>
            <li className={styles['contact-item']}>
              <strong>Address:</strong> Khubru, Sonipat, Haryana
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
