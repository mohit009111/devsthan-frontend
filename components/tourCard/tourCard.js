import Image from 'next/image';
import styles from '../tourCard/tourCard.module.css';
import Link from 'next/link'
import { BASE_URL } from '../../utils/headers';

export default function TourCard({ duration, location, imageUrl, title, startingPrice, originalPrice, locations,uuid }) {
  return (
    <div className={styles['tour-card']}>
      <Link href={`tour/${uuid}`}> 
      <div className={styles['image-container']}>
        <Image src={imageUrl} alt={location} width={350} height={200} className={styles['image']} />
        <div className={styles['tag']}>
          <span>{duration}</span>
          <span>{location}</span>
        </div>
      </div>
      </Link>
      <h3>{title}</h3>
      <p>{locations}</p>
      <div className={styles['pricing-and-button']}>

      <div className={styles['pricing']}>
        <span className={styles['starting-from']}> Starting From:</span>
        <div>

        <span className={styles['starting-price']}>{startingPrice}</span>
        <span className={styles['original-price']}>{originalPrice}</span>
        </div>
        
      </div>
      <button className={styles['book-btn']}>Book A Trip</button>
      </div>
    </div>
  );
}
