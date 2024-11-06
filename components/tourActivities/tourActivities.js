import Image from 'next/image';
import styles from '../tourActivities/tourActivities.module.css';

export default function Activities() {
  return (
    <section className={styles['activities-section']}>
  {/* <h2 className={styles['activities-title']}>Explore Your Activities</h2> */}
  <div className={styles['activities-grid']}>
    <div className={`${styles['activity-card']} ${styles['activity-active']}`}>
      <span className={styles['activity-icon']}>🧗</span>
      <p>Zip lining</p>
    </div>
    <div className={`${styles['activity-card']} ${styles['activity-active']}`}>
      <span className={styles['activity-icon']}>🧗</span>
      <p>Zip lining</p>
    </div>
    <div className={`${styles['activity-card']} ${styles['activity-active']}`}>
      <span className={styles['activity-icon']}>🧗</span>
      <p>Zip lining</p>
    </div>
    <div className={`${styles['activity-card']} ${styles['activity-active']}`}>
      <span className={styles['activity-icon']}>🧗</span>
      <p>Zip lining</p>
    </div>
    <div className={`${styles['activity-card']} ${styles['activity-active']}`}>
      <span className={styles['activity-icon']}>🧗</span>
      <p>Zip lining</p>
    </div>
    <div className={`${styles['activity-card']} ${styles['activity-active']}`}>
      <span className={styles['activity-icon']}>🪂</span>
      <p>Paragliding</p>
    </div>
    {/* Add more activity divs as needed */}
  </div>
  <div className={styles['activity-details']}>
    <div className={styles['activity-highlight']}>Zip lining</div>
    <h3 className={styles['activity-subtitle']}>Thrill Above Ground: The Zip Line Adventure</h3>
    <p className={styles['activity-description']}>
      Embark on an adrenaline-fueled journey, zipping through lush landscapes...
    </p>
    <div className={styles['activity-features']}>
      <span className={styles['activity-feature']}>🌳 Treetop Views</span>
      <span className={styles['activity-feature']}>⚡ Adrenaline Rush</span>
      {/* Add more features */}
    </div>
    <button className={styles['activity-availability']}>Check Availability</button>
    
  </div>
  <div className={styles['activity-images']}>
    <Image src="https://res.cloudinary.com/dmyzudtut/image/upload/v1729833162/images/yhwqnzsjqzfygsycssmi.jpg" alt="Zipline 1" width={300} height={200} />
    <Image src="https://res.cloudinary.com/dmyzudtut/image/upload/v1729833162/images/yhwqnzsjqzfygsycssmi.jpg" alt="Zipline 2" width={300} height={200} />
  </div>
</section>

  );
}
