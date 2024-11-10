import Image from 'next/image';
import styles from '../tourCard/tourCard.module.css';
import Link from 'next/link'
import { FaBed } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { FaCamera } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { MdLocalDrink } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
export default function TourCard({ duration, location, imageUrl, title, startingPrice, originalPrice,  uuid }) {
  return (
    <div className={styles['tour-card']}>
      <Link href={`/tour/${uuid}`}>
        <div className={styles['image-container']}>
          <Image src={imageUrl} alt={location} width={350} height={200} className={styles['image']} />
          <div className={styles['tag']}>
            <span className={styles['duration']}>{duration}</span>
            <span className={styles['location']}><FaLocationDot  className={styles['location-icon']}/>{location}</span>
          </div>
        </div>
      </Link>
      <h3>{title}</h3>
     
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
      <div className={styles['pricing-and-button']}>

        <div className={styles['pricing']}>
          <span className={styles['starting-from']}> Starting From:</span>
          <div>

            <span className={styles['starting-price']}>{startingPrice}</span>

          </div>

        </div>
        <button className={styles['book-btn']}>Book A Trip</button>
      </div>
    </div>
  );
}
