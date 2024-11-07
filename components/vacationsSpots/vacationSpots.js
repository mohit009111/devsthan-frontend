// components/VacationSpots.js
import Image from 'next/image';
import styles from '../vacationsSpots/vacationSpots.module.css';
import Link from 'next/link'

const VacationSpots = ({ destinations }) => {
  return (
    <section className={styles['vacation-spots-section']}>
      <div className={styles['header']}>
        <p className={styles['subtitle']}>Journey to the</p>
        <h2 className={styles['title']}>Desired Vacation Spots</h2>
      </div>
      <div className={styles['grid']}>
        {destinations.map((dest) => {
          return (
            <>
             
              <div className={styles['grid-item']}>
             <Link href={`/destination/${dest.uuid}`}>
                <Image src={dest.bannerImage} alt="Sweden" width={400} height={200} className={styles['grid-item-img']} />
              <div className={styles.overlay}>
                <span className={styles['label']}>{dest.state.label}</span>
                </div>
             </Link>
              </div>
            </>
          )
        })}
      </div>
      <Link href={`/destinations`}>
       <button className={styles['promo-button']}>View All Destination</button>
      </Link>
    </section>
  );
};

export default VacationSpots;
