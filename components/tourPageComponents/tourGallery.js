import React from 'react';
import styles from '../../pages/tour/tour.module.css';
import { IoLocationOutline } from "react-icons/io5";
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomPrevArrow = ({ onClick }) => (
  <button className={styles.prevArrow} onClick={onClick}>
    &#8592;
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button className={styles.nextArrow} onClick={onClick}>
    &#8594;
  </button>
);

const TourGallery = ({ images, name, state, city, location, duration }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className={styles['gallery-container']}>
      {/* Title Section */}
      <div className={styles['header']}>
        <h1>{name}</h1>
        <div className={styles['sub-header']}>
          <span className={styles['duration']}>{`${duration} Days / ${duration-1} Nights`}</span>
          <span className={styles['location']}>{location}</span>
        </div>
      </div>

      {/* Carousel Section */}
      <div className={styles['carousel-container']}>
        <Slider {...settings}>
          {images?.map((image, index) => (
            <div key={index} className={styles['carousel-item']}>
              <Image src={image} alt={`Gallery Image ${index + 1}`} layout="fill" className={styles['carousel-img']}/>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TourGallery;
