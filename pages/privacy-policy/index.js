import React from 'react';
import styles from './privacy-policy.module.css';

const Privacy = () => {
  return (
    <>
      <h1 className={styles.mainHeading}>Privacy Policy</h1>
     <div className={styles.container}>
      <p className={styles.lastUpdated}>Last Updated: 8-11-2024</p>
      <p className={styles.description}>
        At Devsthan Expert Travel Pvt Ltd, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website, <a href="https://www.devsthanexpert.com" className={styles.link}>www.devsthanexpert.com</a>, and use our services.
      </p>

      <h2 className={styles.subHeading}>1. Information We Collect</h2>
      <p className={styles.description}><strong>Personal Information:</strong></p>
      <ul className={styles.list}>
        <li>When you contact us, book a tour, or use our services, we may collect personal information such as your name, email address, phone number, and payment information.</li>
      </ul>

      <p className={styles.description}><strong>Non-Personal Information:</strong></p>
      <ul className={styles.list}>
        <li>We may also collect non-personal information about your visit to our website, including your IP address, browser type, operating system, and browsing behavior.</li>
      </ul>

      <h2 className={styles.subHeading}>2. How We Use Your Information</h2>
      <p className={styles.description}><strong>Personal Information:</strong></p>
      <ul className={styles.list}>
        <li>To process bookings and payments</li>
        <li>To communicate with you regarding your bookings and our services</li>
        <li>To provide customer support</li>
        <li>To send you promotional offers and updates (you may opt-out at any time)</li>
      </ul>
      <p className={styles.description}><strong>Non-Personal Information:</strong></p>
      <ul className={styles.list}>
        <li>To improve our website and services</li>
        <li>To analyze website traffic and usage</li>
      </ul>

      <h2 className={styles.subHeading}>3. How We Protect Your Information</h2>
      <p className={styles.description}>
        We implement a variety of security measures to maintain the safety of your personal information. These measures include encryption, secure servers, and access controls. However, please note that no method of transmission over the internet or electronic storage is 100% secure.
      </p>

      <h2 className={styles.subHeading}>4. Sharing Your Information</h2>
      <p className={styles.description}>
        We do not sell, trade, or otherwise transfer your personal information to outside parties except as described below:
      </p>
      <ul className={styles.list}>
        <li><strong>Service Providers:</strong> We may share your information with third-party service providers who assist us in operating our website and providing our services.</li>
        <li><strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to a legal request.</li>
      </ul>

      <h2 className={styles.subHeading}>5. Cookies</h2>
      <p className={styles.description}>
        Our website uses cookies to enhance your browsing experience. Cookies are small files that a site or its service provider transfers to your computer’s hard drive through your web browser that enables the site’s systems to recognize your browser and capture and remember certain information.
      </p>

      <h2 className={styles.subHeading}>6. Third-Party Links</h2>
      <p className={styles.description}>
        Our website may contain links to third-party websites. These third-party sites have separate and independent privacy policies. We have no responsibility or liability for the content and activities of these linked sites.
      </p>

      <h2 className={styles.subHeading}>7. Your Consent</h2>
      <p className={styles.description}>
        By using our website, you consent to our Privacy Policy.
      </p>

      <h2 className={styles.subHeading}>8. Changes to Our Privacy Policy</h2>
      <p className={styles.description}>
        We may update our Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
      </p>

      <h2 className={styles.subHeading}>9. Contact Us</h2>
      <p className={styles.description}>
        If you have any questions about this Privacy Policy, please contact us at:
      </p>
      <p className={styles.contactInfo}>
        <strong>Email:</strong> <a href="mailto:info@devsthanexpert.com" className={styles.link}>info@devsthanexpert.com</a><br />
        <strong>Phone:</strong> +91-8683818381<br />
        <strong>Address:</strong> Khubru, Sonipat, Haryana
      </p>
    </div>
    </>
   
  );
};

export default Privacy;
