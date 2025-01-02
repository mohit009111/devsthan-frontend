import React from 'react';
import styles from './privacy-policy.module.css';

const Privacy = () => {
  return (
    <>
      <h1 className={styles.mainHeading}>Privacy Policy</h1>
      <div className={styles.container}>
        <p className={styles.lastUpdated}>Last Updated: 8-11-2024</p>
        <p className={styles.description}>
          At Devsthan Expert Travel Pvt Ltd, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website, www.devsthanexpert.com, and use our services.
        </p>

        <h2 className={styles.subHeading}>1. Information We Collect</h2>
        <p className={styles.description}><strong>Personal Information:</strong></p>
        <ul className={styles.list}>
          <li>When you contact us, book a tour, or use our services, we may collect personal information such as your name, email address, phone number, and payment details.</li>
        </ul>

        <p className={styles.description}><strong>Non-Personal Information:</strong></p>
        <ul className={styles.list}>
          <li>We may also collect non-personal information about your website visit, including your IP address, browser type, operating system, and browsing behavior.</li>
        </ul>

        <h2 className={styles.subHeading}>2. How We Use Your Information</h2>
        <p className={styles.description}><strong>Personal Information:</strong></p>
        <ul className={styles.list}>
          <li>To process bookings and payments</li>
          <li>To communicate about your bookings and our services</li>
          <li>To provide customer support</li>
          <li>To send promotional offers and updates (opt-out available)</li>
        </ul>

        <p className={styles.description}><strong>Non-Personal Information:</strong></p>
        <ul className={styles.list}>
          <li>To improve our website and services</li>
          <li>To analyze website traffic and usage</li>
        </ul>

        <h2 className={styles.subHeading}>3. How We Protect Your Information</h2>
        <p className={styles.description}>
          We implement various security measures to protect your personal information, including encryption, secure servers, and access controls. However, no method of internet transmission or electronic storage is 100% secure.
        </p>

        <h2 className={styles.subHeading}>4. Sharing Your Information</h2>
        <p className={styles.description}>
          We do not sell, trade, or transfer your personal information to outside parties except:
        </p>
        <ul className={styles.list}>
          <li><strong>Service Providers:</strong> Third-party providers who assist with our website operations and services.</li>
          <li><strong>Legal Requirements:</strong> When required by law or in response to legal requests.</li>
        </ul>

        <h2 className={styles.subHeading}>5. Cookies</h2>
        <p className={styles.description}>
          Our website uses cookies to enhance your browsing experience. These small files enable our systems to recognize your browser and capture certain information.
        </p>

        <h2 className={styles.subHeading}>6. Third-Party Links</h2>
        <p className={styles.description}>
          Our website may contain links to third-party sites with separate privacy policies. We are not responsible for their content or activities.
        </p>

        <h2 className={styles.subHeading}>7. Your Consent</h2>
        <p className={styles.description}>
          By using our website, you consent to this Privacy Policy.
        </p>

        <h2 className={styles.subHeading}>8. Changes to Our Privacy Policy</h2>
        <p className={styles.description}>
          We may update this policy periodically. Changes will be posted on this page with an updated revision date.
        </p>

        <h2 className={styles.subHeading}>9. Contact Us</h2>
        <p className={styles.description}>
          For questions about this Privacy Policy, please contact us:
        </p>
        <p className={styles.contactInfo}>
          <strong>Email:</strong> <a href="mailto:info@devsthanexpert.com" className={styles.link}>info@devsthanexpert.com</a><br />
          <strong>Phone:</strong> +91-8683818381
        </p>
      </div>
    </>
  );
};

export default Privacy;
