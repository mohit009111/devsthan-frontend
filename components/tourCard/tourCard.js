import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../tourCard/tourCard.module.css';
import Link from 'next/link';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaBed } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { FaCamera } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { MdLocalDrink } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

export default function TourCard({ duration, location, imageUrl, title, startingPrice,  uuid ,data}) {



  // Format date as dd-MM-yyyy

  // const formatDate = (date) => {
  //   const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  //   return new Intl.DateTimeFormat('en-GB', options).format(date).replace(/\//g, '-');
  // };

  const handleGoToTour = () => {
  
      // localStorage.setItem('selectedDate', formatDate(selectedDate));

      window.location.href = `/tour/${uuid}`;
   
  };


  return (
    <div className={styles['tour-card']}>
      {/* Image Container */}
      <div className={styles['image-container']}  onClick={handleGoToTour}>
        <Image src={imageUrl} alt={location} width={350} height={200} className={styles['image']} />
        <div className={styles['tag']}>
          <span className={styles['duration']}>{`${duration-1} Nights / ${duration} Days`}</span>
          <span className={styles['location']}><FaLocationDot className={styles['location-icon']} />{location}</span>
        </div>
      </div>

      <h3>{title}</h3>

      {/* Tour Features */}
      <div className={styles['tour-features']}>
        {data.hotel ? <div className={styles['tour-hotel']}>
          <FaBed />
          <p>Hotel</p>
        </div> : null}
        
        {data.meals ? <div className={styles['tour-hotel']}>
          <GiMeal />
          <p>Meals</p>
        </div>: null}
        {data.siteSeen ?  <div className={styles['tour-hotel']}>
          <FaCamera />
          <p>Site Seens</p>
        </div>: null}
        
      
        {data.transportation ?  <div className={styles['tour-hotel']}>
          <FaCar />
          <p>Transport</p>
        </div>: null}
        
       
        {data.welcomeDrinks ?  <div className={styles['tour-hotel']}>
          <MdLocalDrink />
          <p>Welcome Drinks</p>
        </div>: null}
        
       
      </div>

      {/* Pricing and Button */}
      <div className={styles['pricing-and-button']}>
        <div className={styles['pricing']}>
          <span className={styles['starting-from']}>Starting From:</span>
          <div>
            <span className={styles['starting-price']}>{startingPrice}</span>
          </div>
        </div>
        <button className={styles['book-btn']} onClick={handleGoToTour} >Book A Trip</button>
      </div>

     
    </div>
  );
}
