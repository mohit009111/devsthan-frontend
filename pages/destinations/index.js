import React from 'react';
import styles from './destinations.module.css';
import { apiCall } from '../../utils/common';
import Link from 'next/link';

const Destinations = ({ destinations }) => {
  console.log(destinations)
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Destination</h1>
        <nav>Home ➔ Destination</nav>
      </header>
      <div className={styles.grid}>
        {destinations.map((destination, index) => (
          <Link href={`/destination/${destination.uuid}`} className={styles.card} key={index}>


            <img src={destination.bannerImage} alt={destination.name} className={styles.image} />
            <div className={styles.overlay}>
              <span className={styles.tourBadge}>{destination.tours.length} Tour</span>
              <div className={styles.textContainer}>
                <span>Travel To</span>
                <h3>{destination.state.label}</h3>
              </div>

            </div>
          </Link>

        ))}
      </div>
      <div className={styles.pagination}>
        <span>01</span>
        <span>02</span>
        <button className={styles.nextButton}>&#10095;</button>
      </div>
    </div>
  );
};

export default Destinations;
export async function getStaticProps() {

  const destinations = await apiCall({
    endpoint: '/api/getAllDestinations',
    method: 'GET',

  });
  return {
    props: {

      destinations
    },
  };
}
