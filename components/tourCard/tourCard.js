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

export default function TourCard({ duration, location, imageUrl, title, startingPrice, originalPrice, uuid }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Format date as dd-MM-yyyy

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date).replace(/\//g, '-');
  };

  const handleGoToTour = () => {
  
      localStorage.setItem('selectedDate', formatDate(selectedDate));
      

    
      // Navigate to the tour page
      window.location.href = `/tour/${uuid}`;
   
  };

  // Open the dialog
  const openDialog = () => setIsDialogOpen(true);

  // Close the dialog
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div className={styles['tour-card']}>
      {/* Image Container */}
      <div className={styles['image-container']}  onClick={handleGoToTour}>
        <Image src={imageUrl} alt={location} width={350} height={200} className={styles['image']} />
        <div className={styles['tag']}>
          <span className={styles['duration']}>{duration}</span>
          <span className={styles['location']}><FaLocationDot className={styles['location-icon']} />{location}</span>
        </div>
      </div>

      <h3>{title}</h3>

      {/* Tour Features */}
      <div className={styles['tour-features']}>
        <div className={styles['tour-hotel']}>
          <FaBed />
          <p>Hotel</p>
        </div>
        <div className={styles['tour-hotel']}>
          <GiMeal />
          <p>Meals</p>
        </div>
        <div className={styles['tour-hotel']}>
          <FaCamera />
          <p>Site Seens</p>
        </div>
        <div className={styles['tour-hotel']}>
          <FaCar />
          <p>Transport</p>
        </div>
        <div className={styles['tour-hotel']}>
          <MdLocalDrink />
          <p>Welcome Drinks</p>
        </div>
      </div>

      {/* Pricing and Button */}
      <div className={styles['pricing-and-button']}>
        <div className={styles['pricing']}>
          <span className={styles['starting-from']}>Starting From:</span>
          <div>
            <span className={styles['starting-price']}>{startingPrice}</span>
          </div>
        </div>
        <button className={styles['book-btn']} onClick={openDialog}>Book A Trip</button>
      </div>

      {/* Dialog Box */}
      {/* {isDialogOpen && (
        <div className={styles['dialog-overlay']}>
          <div className={styles['dialog-box']}>
            <h3>Select Departure Date</h3>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText="Select Date"
              dateFormat="dd-MM-yyyy"
              className={styles['datepicker-input']}
            />
            <div className={styles['dialog-actions']}>
              <button onClick={closeDialog} className={styles['close-btn']}>Cancel</button>
              {selectedDate ? (
                <button className={styles['confirm-btn']} onClick={handleGoToTour}>
                  Go to Tour
                </button>
              ) : (
                <button disabled className={styles['confirm-btn-disabled']}>
                  Select a Date
                </button>
              )}
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
