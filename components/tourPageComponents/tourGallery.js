import React from 'react'
import styles from '../../pages/tour/tour.module.css'
import { IoLocationOutline } from "react-icons/io5";
import Image from 'next/image';
const tourGallery = ({ images, bannerImage,name,state,city,location ,duration}) => {
  console.log(images)
  return (
    <>
        <div className={styles['gallery-container']}>
      {/* Title Section */}
      <div className={styles['header']}>
        <h1>{name}</h1>
        <div className={styles['sub-header']}>
          <button className={styles['customizable-btn']}>Customizable</button>
          <span className={styles['duration']}>{duration}</span>
          <span className={styles['location']}>{location}</span>
        </div>
      </div>

      {/* Gallery Section */}
      <div className={styles['gallery-grid']}>
        {images?.map((image, index) => (
        
          <div
            key={index}
            className={`${styles['gallery-item']} ${index === 0 ? styles['main-image'] : ''}`}
          >
           
            <Image src={image} alt={image} layout="fill" objectFit="cover" />
            {index === 0 && (
              <div className={styles['overlay']}>
                <button className={styles['view-gallery-btn']}>View Gallery →</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tabs Section */}
    
    </div>
   
    </>
   


  )
}

export default tourGallery
