import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../vacationsSpots/vacationSpots.module.css';
import DestinationCard from '../destinationCard/destinationCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const VacationSpots = ({ destinations }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1025 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  };

  return (
    <section className={styles['vacation-spots-section']}>
      <div className={styles['header']}>
        <p className={styles['subtitle']}>Journey to the</p>
        <h2 className={styles['title']}>Desired Vacation Spots</h2>
      </div>

      {isMobile ? (
        <Carousel 
          responsive={responsive} 
          infinite 
          autoPlay={true} 
          arrows 
          showDots
        >
          {destinations.slice(0, 8).map((dest) => (
            <div key={dest.uuid} className={styles['carousel-item']}>
              <Link href={`/destination/${dest.uuid}`}>
                <DestinationCard destination={dest} />
              </Link>
            </div>
          ))}
        </Carousel>
      ) : (
        <div className={styles['grid']}>
          {destinations.slice(0, 8).map((dest) => (
            <div key={dest.uuid} className={styles['grid-item']}>
              <Link href={`/destination/${dest.uuid}`}>
                <DestinationCard destination={dest} />
              </Link>
            </div>
          ))}
        </div>
      )}

      <Link href={`/destinations`}>
        <button className={styles['promo-button']}>View All Destination</button>
      </Link>
    </section>
  );
};

export default VacationSpots;
