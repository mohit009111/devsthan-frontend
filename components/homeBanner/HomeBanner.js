import React, { useState, useEffect } from 'react';
import styles from '../homeBanner/homeBanner.module.css';
import Slider from "react-slick";
import styled from "styled-components";
import { FaHotel } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoLocationOutline } from "react-icons/io5";
import { FiMapPin } from "react-icons/fi";
import { FaBus } from "react-icons/fa";
import { MdFlight } from "react-icons/md";
import { MdOutlineKeyboardArrowDown, MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";
import TourSearch from '../searchbar-components/tour-search';
import Search from '../search/search'

const BannerInner = styled(Slider)`
  height: 100% !important;
  border-radius: 30px;

  .slick-list {
    height: 100% !important;
  }
  .slick-slide > div {
    height: 100% !important;
  }
  .slick-track {
    height: 100% !important;
  }
  .slick-slider {
    height: 100% !important;
  }
  .slick-next {
    right: 25px;
  }
`;

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

const HomeBanner = ({ locations, homebanner }) => {
  const [viewport, setViewport] = useState("desktop");
  const [selected, setSelected] = useState("Tour");
  const [showComminSoon, setShowComminSoon] = useState(false);
console.log(homebanner)
  const headings = [
    { title: 'Tour', isAvailable: true, icon: FiMapPin },
    { title: 'Hotel', isAvailable: false, icon: FaHotel },
    { title: 'Bus', isAvailable: false, icon: FaBus },
    { title: 'Flight', isAvailable: false, icon: MdFlight },
  ];

  var settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 10000, // Set autoplay interval (in milliseconds)
    speed: 500, // Transition speed
    fade: true, // Enable fade transition
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  useEffect(() => {
    const updateViewport = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setViewport("mobile");
      } else if (window.matchMedia("(max-width: 1024px)").matches) {
        setViewport("tablet");
      } else {
        setViewport("desktop");
      }
    };

    // Initial check
    updateViewport();

    // Listen for changes
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);


  const getBannerImages = () => {
    switch (viewport) {
      case "mobile":
        return homebanner?.data?.bannerUrls?.mobile || [];
      case "tablet":
        return homebanner?.data?.bannerUrls?.tablet || [];
      case "desktop":
      default:
        return homebanner?.data?.bannerUrls?.desktop || [];
    }
  };

  const bannerImages = getBannerImages();
  return (
    <div className={styles['home-banner']}>
    <div className={styles['banner-outer']}>
    <div className={styles['home-banner']}>
      <div className={styles['banner-outer']}>
        <BannerInner {...settings}>
          {bannerImages.map((image, index) => (
            <div key={index} className={styles['banner-inner']}>
              <img
                className={styles['banner-img']}
                src={image}
                alt={`Banner ${index}`}
              />
              <div className={styles['banner-overlay']}></div>
              <div className={styles['banner-inner-content']}>
                <div className={styles['banner-inner-location']}></div>
              </div>
            </div>
          ))}
        </BannerInner>
      </div>
    </div>
    </div>
    <div className={styles['search-bar']}>
      <div className={styles['search-headings']}>
        {headings.map((heading, index) => (
          <div
            key={index}
            className={`${styles['search-headings-tour']} 
              ${selected === heading.title ? styles['search-headings-tour-selected'] : styles['unavailable']}`}
            onClick={() => {
              if (!heading.isAvailable) {
                setSelected(heading.title);
                setShowComminSoon(true);
              } else {
                setShowComminSoon(false);
                setSelected(heading.title);
              }
            }}
          >
            {!heading.isAvailable && selected === heading.title ? (
              <p className={styles['coming-soon']}>Coming Soon</p>
            ) : (
              <>
                {React.createElement(heading.icon, { className: styles['icon-class'] })}
                <p>{heading.title}</p>
              </>
            )}
          </div>
        ))}
      </div>

      <TourSearch locations={locations} />
    </div>
  </div>
  );
};

export default HomeBanner;
