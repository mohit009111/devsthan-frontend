import React from 'react';
import styles from './about.module.css';

const About = () => {
  return (
    <>
    <h1 className={styles.mainHeading}>About Us</h1>
    <div className={styles.container}>
      <p className={styles.description}>
        Welcome to Devsthan Expert Travel Pvt. Ltd., your trusted partner for religious tours, hotel bookings, and cab bookings across Uttarakhand. With our head office located in Khubru, Sonipat, Haryana, and our operational office at Devsthan Expert Gali-7 Gayatri Vihar (opposite Shanti Kunj Ashram Gate-4) Haridwar, Uttarakhand, we are strategically positioned to serve your travel needs with ease and efficiency.
      </p>

      <h2 className={styles.subHeading}>Our Mission</h2>
      <p className={styles.description}>
        At Devsthan Expert Travel Pvt. Ltd., our mission is to provide seamless and memorable religious travel experiences. We are dedicated to offering personalized services that cater to the spiritual and logistical needs of our clients. Whether you are embarking on a pilgrimage or seeking solace in the serene landscapes of Uttarakhand, we are here to ensure your journey is comfortable and fulfilling.
      </p>

      <h2 className={styles.subHeading}>Our Services</h2>
      <ul className={styles.list}>
        <li>
          <strong>Religious Tours:</strong> We specialize in organizing religious tours to various sacred destinations in Uttarakhand. From the revered Char Dham Yatra to the tranquil retreats of Haridwar and Rishikesh, we offer meticulously planned itineraries that cater to your spiritual journey.
        </li>
        <li>
          <strong>Hotel Bookings:</strong> Finding the perfect accommodation is crucial for a peaceful pilgrimage. We provide a range of hotel options that suit your budget and preferences, ensuring a restful stay during your travels.
        </li>
        <li>
          <strong>Cab Bookings:</strong> Travel with ease and comfort with our reliable cab booking services. Our experienced drivers and well-maintained vehicles ensure a smooth ride to your chosen destinations.
        </li>
      </ul>

      <h2 className={styles.subHeading}>Why Choose Us?</h2>
      <ul className={styles.list}>
        <li><strong>Expertise and Experience:</strong> With years of experience in the travel industry, we have the expertise to organize flawless religious tours. Our knowledgeable team is well-versed in the unique requirements of spiritual travel.</li>
        <li><strong>Personalized Service:</strong> We understand that every traveler has unique needs. Our services are tailored to provide personalized attention, ensuring that your journey is as per your expectations.</li>
        <li><strong>Comprehensive Solutions:</strong> From tour planning and hotel bookings to cab arrangements, we offer comprehensive solutions for all your travel needs, making your pilgrimage hassle-free.</li>
        <li><strong>Customer Satisfaction:</strong> Our priority is your satisfaction. We are committed to providing high-quality services and ensuring that your travel experience is memorable and fulfilling.</li>
      </ul>

      <h2 className={styles.subHeading}>Contact Us</h2>
      <p className={styles.description}>
        We are here to assist you with all your travel needs. Reach out to us at <a href="mailto:info@devsthanexpert.com" className={styles.link}>info@devsthanexpert.com</a> or call us at 8683818381. Our team is ready to help you plan your next spiritual journey with Devsthan Expert Travel Pvt. Ltd.
      </p>

      <h2 className={styles.subHeading}>Visit Us</h2>
      <p className={styles.description}>
        <strong>Head Office:</strong> Khubru, Sonipat, Haryana<br />
        <strong>Operational Office:</strong> Devsthan Expert Gali-7 Gayatri Vihar (Opposite Shanti Kunj Ashram Gate-4), Haridwar, Uttarakhand
      </p>
    </div>
    </>
      
  );
};

export default About;
