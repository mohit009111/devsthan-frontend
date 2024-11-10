"use client"
import React, { useState } from 'react';
import styles from './destination.module.css';
import { apiCall } from '../../utils/common';

import styled from "styled-components";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Pagination, Navigation } from 'swiper';
import { MdOutlineKeyboardArrowDown, MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";
import DestinationHighlighs from '../../components/destinationHighlights/destinationHighlights';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const SubDestinationCarousel = styled(Carousel)`
overflow:hidden;
    max-width: 800px !important;
 

`;

const Destination = ({ destinationData }) => {


  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
     <header className={styles.header}>
        <h1 className={styles.title}>Destination</h1>
        <nav>Home ➔ Destination</nav>
      </header>
      <div className={styles.container}>
      
      <section className={styles.mainContent}>
     
        <h1>Welcome To {destinationData.state.label}</h1>
        <p>
          {isExpanded ? destinationData.description : `${destinationData.description.slice(0, 900)}...`}
          <button onClick={toggleReadMore}>
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        </p>

        <div className={styles.imageGrid}>
          {destinationData.images.map((img, index) => (
            <div key={index} className={styles.imageCard}>
              <img src={`${img}`} alt={`image ${index + 1}`} className={styles.image} />
            </div>
          ))}
        </div>
        {/* <div className={styles['carousel-container']}>
    <SubDestinationCarousel
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      showDots={true}
      arrows={true}
      customTransition="transform 0.5s ease"
    >
      {destinationData.subDestinations.map((dest, index) => (
        <div key={index} className={styles['carousel-item']}>
          <h2>Heaven On Earth</h2>
          <p>{dest.description}</p>
          <ul>
            <li>🌍 Exploring ancient ruins, historical landmarks</li>
            <li>🎡 Kid-friendly activities, theme parks</li>
            <li>🗺️ Immersive cultural experiences</li>
            <li>🍽️ Premium accommodations, gourmet dining</li>
          </ul>
        </div>
      ))}
    </SubDestinationCarousel>
  </div> */}

        {/* <DestinationHighlighs highlights={destinationData.highlights} /> */}

      </section>

      <aside className={styles.sidebar}>
        <div className={styles.detailsBox}>
          <h3>Destination</h3>
          <p><strong>{destinationData.state.label}</strong></p>
          <p><strong>Population:</strong> {destinationData.population}</p>
          <p><strong>Capital City:</strong> {destinationData.capitalCity}</p>
          <p><strong>Language:</strong> {destinationData.languages}</p>

        </div>
        <div className={styles.offerBox}>
          <h4>Savings worldwide</h4>
          <p>50% Off</p>
          <button className={styles.offerButton}>View All Package</button>
        </div>
      </aside>
    </div>
    </>
   
  );
};

export default Destination;
export async function getStaticPaths() {

  const destinations = await apiCall({
    endpoint: '/api/getAllDestinations',
    method: 'GET',

  });

  const paths = destinations.map((dest) => ({
    params: { uuid: dest.uuid },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { uuid } = params;

  const destinationData = await apiCall({
    endpoint: `/api/getDestinationById/${uuid}`,
    method: 'POST',

  });

  return {
    props: {
      destinationData
    },
  };
}
