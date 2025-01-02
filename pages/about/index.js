import React from 'react';
import styles from './about.module.css';

const About = () => {
  return (
    <>
      <h1 className={styles.mainHeading}>Welcome to Devsthan Expert Pvt. Ltd.</h1>
      <div className={styles.container}>
        <p className={styles.description}>
          At Devsthan Expert Pvt. Ltd., we believe that travel should be more than just moving from one place to another. It&apos;s about experiencing the essence of every destination. Based in the heart of India, our company specializes in crafting unforgettable journeys that highlight the vibrant culture, rich heritage, and stunning natural beauty of India. Whether it&apos;s through winding landscapes or serene pilgrimage sites, we ensure your travel is not just a journey, but a profound experience.
        </p>

        <h2 className={styles.subHeading}>Who We Are and Our Mission</h2>
        <p className={styles.description}>
          Devsthan Expert is your premier travel partner dedicated to offering seamless, personalized travel experiences. We understand the significance of comfort and soul in travel, especially to culturally rich destinations like India. Our mission is simple: to provide travel experiences that are not only comfortable and convenient but also inspire and captivate by celebrating the spiritual and natural bounty of India.
        </p>

        <h2 className={styles.subHeading}>Solving Travel Challenges</h2>
        <p className={styles.description}>
          Travel, especially to remote or spiritually significant destinations, can often be challenging. Our tailored services aim to alleviate common travel concerns such as physical strain and the hassle of planning. We handle every detail from hotel bookings to cab services and provide 24/7 support, ensuring you can focus on the spiritual and emotional rewards of your journey.
        </p>

        <h2 className={styles.subHeading}>Addressing Your Needs</h2>
        <p className={styles.description}>
          We recognize the unique needs of our travelers who seek:
        </p>
        <ul className={styles.list}>
          <li>Deep spiritual connections at sacred sites like Gangotri and Yamunotri.</li>
          <li>A hassle-free travel experience that avoids the discomfort of traditional travel methods.</li>
          <li>Opportunities to participate in meaningful spiritual activities while enjoying the breathtaking landscapes of India.</li>
        </ul>
        <p className={styles.description}>
          By customizing itineraries to fit individual spiritual and travel desires, we make sure that every journey with us is not only satisfying but also enriches your soul.
        </p>

        <h2 className={styles.subHeading}>How to Embark on Your Journey</h2>
        <p className={styles.description}>
          Starting your spiritual or leisure journey with Devsthan Expert is straightforward and designed with your convenience in mind:
        </p>
        <ul className={styles.list}>
          <li>Visit our website to explore the various travel packages available.</li>
          <li>Choose a package that resonates with your spiritual or travel aspirations.</li>
          <li>Reach out to us for any specific requirements or further customization.</li>
          <li>Secure your booking, particularly if planning a trip during peak travel seasons.</li>
          <li>Follow any travel tips we provide to fully prepare for your journey.</li>
          <li>Set off on your trip, supported around the clock by our dedicated team.</li>
        </ul>

        <h2 className={styles.subHeading}>Discover More with Us</h2>
        <p className={styles.description}>
          While our webpage is rich with information on diverse pilgrimage destinations and the unique travel packages we offer, we always encourage direct interactions. If you&apos;re contemplating a journey that transcends the ordinary, reach out to us. Discussing directly can help tailor an experience that&apos;s exactly right for you, including exclusive options like helicopter services for difficult-to-reach terrains.
        </p>

        <h2 className={styles.subHeading}>Why Choose Us?</h2>
        <p className={styles.description}>
          Choosing Devsthan Expert means opting for a travel experience that understands and respects your desires for spiritual fulfillment and authentic cultural immersion. Whether it&apos;s viewing the serene sunsets of the Himalayas or partaking in a sacred ritual by the Ganges, we ensure your journey is as fulfilling as the destination itself.
        </p>

        <p className={styles.description}>
          We invite you to explore, experience, and enrich your life with journeys that are as limitless as your spirit. Begin your adventure with Devsthan Expert Pvt. Ltd., where your journey to spiritual enlightenment and cultural exploration awaits.
        </p>
      </div>
    </>
  );
};

export default About;
