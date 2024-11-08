import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from './destinationHighlights.module.css';
import styled from 'styled-components';

const DestinationHighlightCarousel = ({highlights}) => {
  const destinations = [
    { title: 'Outdoor Adventure', image: '/images/adventure.jpg' },
    { title: 'Cultural Experiences', image: '/images/cultural.jpg' },
    { title: 'Historical Tours', image: '/images/historical.jpg' },
    { title: 'Beach Relaxation', image: '/images/beach.jpg' },
  ];
  const SubDestinationCarousel = styled(Carousel)`
  overflow:hidden;
      max-width: 800px !important;
    
  
  `;
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 4 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <div className={styles.carouselContainer}>
      <h2 className={styles.title}>Our Destination Highlight</h2>
      <SubDestinationCarousel responsive={responsive} infinite>
        {destinations.map((destination, index) => (
          
          <div key={index} className={styles.card}>
           
            <img src={destination.image} alt={destination.title} className={styles.image} />
            <div className={styles.cardContent}>
              <p className={styles.cardTitle}>{destination.title}</p>
            </div>
          </div>
        ))}
      </SubDestinationCarousel>
    </div>
  );
};

export default DestinationHighlightCarousel;
