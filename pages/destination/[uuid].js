"use client"
import { useState } from 'react';
import React, { useEffect } from 'react';
import styles from './destination.module.css';
import { apiCall } from '../../utils/common';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Pagination, Navigation } from 'swiper';
import { MdOutlineKeyboardArrowDown, MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";
import DestinationHighlighs from '../../components/destinationHighlights/destinationHighlights';

const NextArrow = ({ onClick }) => (

  <div className={`${styles["custom-arrow"]} ${styles["next-arrow"]}`} onClick={onClick}>
    <MdOutlineArrowForwardIos />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className={`${styles["custom-arrow"]} ${styles["prev-arrow"]}`} onClick={onClick}>
    <MdOutlineArrowBackIos />
  </div>
);
var settings = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};


const SubDestinationCarousel = styled(Slider)`


`;

const Destination = ({ destinationData, destinationBanner }) => {
  const handleScrollParallax = () => {
    const parallaxImage = document.querySelector(`.${styles['parallax-image']}`);
    if (parallaxImage) {
      const scrollPosition = window.scrollY;
      parallaxImage.style.transform = `translateY(${scrollPosition * 0.5}px)`; // Adjust speed factor
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollParallax);
    return () => window.removeEventListener('scroll', handleScrollParallax);
  }, []);
  console.log(destinationBanner)
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles['parallax-container']}>
          <img src={destinationBanner.data.bannerUrls[0]} alt="Destination Banner" className={styles['parallax-image']} />
        </div>
        <div className={styles.header_content}>
          <h1 className={styles.title}>Destination</h1>
          <nav>Home ➔ Destination</nav>
        </div>
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
          <div className={styles['carousel-container']}>
            <SubDestinationCarousel {...settings}>
              {destinationData.subDestinations.map((dest, index) => (
                <div key={index} className={styles['carousel-item']}>
                  <h2>{dest.name}</h2>
                  <p>{dest.description}</p>
                  <div className={styles['image-grid']}>
                    {dest.photos.map((photo, photoIndex) => (
                      <img key={photoIndex} src={photo} alt={`Photo ${photoIndex + 1}`} />
                    ))}
                  </div>
                </div>
              ))}
            </SubDestinationCarousel>
          </div>

          {/* <DestinationHighlighs highlights={destinationData.highlights} /> */}

        </section>

        {/* <aside className={styles.sidebar}>
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
      </aside> */}
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
  const destinationBanner = await apiCall({
    endpoint: `/api/getBanner?page=destinationBanner`,
    method: 'GET',

  });
  return {
    props: {
      destinationData,
      destinationBanner
    },
  };
}
