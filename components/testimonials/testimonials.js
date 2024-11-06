"use client"
import React from 'react';
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoLogoTripadvisor } from "react-icons/io";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import styles from '../testimonials/testimonials.module.css'; 
const Testimonial = styled(Slider)`


`;
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button className={styles['arrow-next']} onClick={onClick}>
      <IoArrowForwardOutline />
    </button>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button className={styles['arrow-prev']} onClick={onClick}>
      <IoArrowBackOutline />
    </button>
  );
};

const Testimonials = () => { // Changed name to uppercase
  const testimonials = [
    {
      platform: "Tripadvisor",
      review: "Incredible craftsmanship! Egens Lab's web development services surpassed my expectations at every turn. Highly recommended!",
      date: "May 9, 2023",
      time: "10:30 PM",
      name: "Liam Nohkan",
      location: "Italy",
      imgSrc: "/user1.jpg",
    },
    {
      platform: "Tripadvisor",
      review: "Absolute perfection! Egens Lab's web development services left me completely satisfied and eager to recommend them to others.",
      date: "May 9, 2023",
      time: "10:30 PM",
      name: "Mateo Daniel",
      location: "Australia",
      imgSrc: "/user2.jpg",
    },
    {
      platform: "Tripadvisor",
      review: "Exemplary service! Egens Lab's Figma, web design, and development team went above and beyond, leaving me thoroughly impressed and grateful.",
      date: "May 9, 2023",
      time: "10:30 PM",
      name: "Lucas Mora",
      location: "France",
      imgSrc: "/user3.jpg",
    },
  ];
  
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section className={styles['testimonial-section']}>
      <h2>🗨️ Testimonial</h2>
      <h3>Regards From Travelers</h3>
      <div className={styles['tabs-container']}>
        <button className={styles['tab-active']}><IoLogoTripadvisor /> Tripadvisor</button>
        <button className={styles['tab']}><FaFacebook /> Facebook</button>
        <button className={styles['tab']}><FaGoogle /> Google</button>
      </div>
      {/* <Testimonial {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className={styles['testimonial-card']}>
            <p>{testimonial.review}</p>
            <div className={styles['testimonial-details']}>
              <IoLogoTripadvisor />
              <p>{testimonial.platform}</p>
              <p>{testimonial.date}</p>
              <p>{testimonial.time}</p>
            </div>
            <div className={styles['user-info']}>
              <img src={testimonial.imgSrc} alt={`${testimonial.name}`} />
              <div>
                <h4>{testimonial.name}</h4>
                <p>{testimonial.location}</p>
              </div>
            </div>
          </div>
        ))}
      </Testimonial> */}
    </section>
  );
};

export default Testimonials; // Export correctly
