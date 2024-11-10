import React from 'react';
import styles from './destinations.module.css';
import { apiCall } from '../../utils/common';
import Link from 'next/link';
import DestinationCard from '../../components/destinationCard/destinationCard';

const Destinations = ({ destinations }) => {
  
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Destinations</h1>
        <nav>Home ➔ Destinations</nav>
      </header>
      <div className={styles.grid}>
        {destinations.map((destination, index) => (
          <Link href={`/destination/${destination.uuid}`} className={styles.card} key={index}>


           <DestinationCard destination={destination}/>
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
    revalidate: 600, 
  };
}
