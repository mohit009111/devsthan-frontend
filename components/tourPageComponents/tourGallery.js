import React from 'react'
import styles from '../../pages/tour/tour.module.css'
import { IoLocationOutline } from "react-icons/io5";
const tourGallery = ({ images, bannerImage,name,state,city,location }) => {
  return (
    <div className={styles['tour-all']}>
      <div className={styles['tour-names']}>
        <h1>{name}</h1>
        <div className={styles['tour-locations']}>
          <IoLocationOutline />
          <div className={styles['tour-locations-name']}>
            {location}, {city}, {state}
          </div>

        </div>

      </div>
      <div className={styles['gallery']}>

        <div className={styles['gallery-banner']}>


          <img src={bannerImage} alt="Main Tour Image" className={styles['main-image']} />
        </div>
        <div className={styles['gallery-images']}>

          {
            images?.map((image) => {
              return (

                <>
                  <img src={image} alt="Main Tour Image" className={styles['main-image']} />
                </>
              )
            })
          }


        </div>
      </div>
    </div>


  )
}

export default tourGallery
