"use client";
import React from 'react';
import styles from '../homeBanner/homeBanner.module.css';
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoLocationOutline } from "react-icons/io5";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineKeyboardArrowDown, MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";

const BannerInner = styled(Slider)`
height:100% !important;
 border-radius: 30px;

.slick-list{
height:100% !important;

}
.slick-slide > div{
height:100% !important;
}
.slick-track{
height:100% !important;
}
.slick-slider {
height:100% !important;
}
.slick-next{
right:25px;
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
const HomeBanner = () => {
    var settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    };
    return (
        <div className={styles['home-banner']}>
            <div className={styles['banner-outer']}>

                <BannerInner {...settings}>
                    <div className={styles['banner-inner']}>
                        <img className={styles['banner-img']} src='https://triprex.b-cdn.net/wp-content/uploads/2024/02/hero-home1-slider-4.webp' />
                        <div className={styles['banner-inner-content']}>
                            <div className={styles['banner-inner-location']}>
                                <IoLocationOutline />

                                <p>France</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles['banner-inner']}>
                        <img className={styles['banner-img']} src='https://triprex.b-cdn.net/wp-content/uploads/2024/02/hero-home1-slider-4.webp' />
                        <div className={styles['banner-inner-content']}>
                            <div className={styles['banner-inner-location']}>
                                <IoLocationOutline />

                                <p>France</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles['banner-inner']}>
                        <img className={styles['banner-img']} src='https://triprex.b-cdn.net/wp-content/uploads/2024/02/hero-home1-slider-4.webp' />
                        <div className={styles['banner-inner-content']}>
                            <div className={styles['banner-inner-location']}>
                                <IoLocationOutline />

                                <p>France</p>
                            </div>
                        </div>
                    </div>
                </BannerInner>

            </div>
            <div className={styles['search-bar']} >

                <div className={styles['search-headings']} >

                    <div className={styles['search-headings-tour']} >
                        <FiMapPin />
                        <p>Tour</p>
                    </div>
                    <div className={styles['search-headings-tour']} >
                        <FiMapPin />
                        <p>Hotel</p>
                    </div>
                    <div className={styles['search-headings-tour']} >
                        <FiMapPin />
                        <p>Bus</p>
                    </div>
                    <div className={styles['search-headings-tour']} >
                        <FiMapPin />
                        <p>Cab</p>
                    </div>
                    <div className={styles['search-headings-tour']} >
                        <FiMapPin />
                        <p>Flight</p>
                    </div>

                </div>
                <div className={styles['search-options-outer']} >
                    <div className={styles['search-options']}>

                        <div className={styles['search-options-tour']} >
                            <FiMapPin />
                            <div className={styles['search-options-destination']}>

                                <p >Destination</p>
                                <p>Select Destination</p>
                            </div>
                            <MdOutlineKeyboardArrowDown className={styles['arrow-down']} />
                        </div>
                        <div className={styles['search-options-tour']} >
                            <FiMapPin />
                            <div className={styles['search-options-destination']}>

                                <p >Destination</p>
                                <p>Select Destination</p>
                            </div>
                            <MdOutlineKeyboardArrowDown className={styles['arrow-down']} />
                        </div>
                        <div className={styles['search-options-tour']} >
                            <FiMapPin />
                            <div className={styles['search-options-destination']}>

                                <p >Destination</p>
                                <p>Select Destination</p>
                            </div>
                            <MdOutlineKeyboardArrowDown className={styles['arrow-down']} />
                        </div>
                        <div className={styles['search-options-tour']} >
                            <FiMapPin />
                            <div className={styles['search-options-destination']}>

                                <p >Destination</p>
                                <p>Select Destination</p>
                            </div>
                            <MdOutlineKeyboardArrowDown className={styles['arrow-down']} />
                        </div>
                    </div>

                    <button className={styles['search-options-button']}>
                        Search
                    </button>
                </div>
            </div>

        </div>
    )
}

export default HomeBanner
