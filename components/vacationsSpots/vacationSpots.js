// components/VacationSpots.js
import Image from 'next/image';
import styles from '../vacationsSpots/vacationSpots.module.css';

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
                <Image src={dest.bannerImage} alt="Sweden" width={400} height={200} className={styles['grid-item-img']} />
                <span className={styles['label']}>{dest.state.label}</span>
              </div>
            </>
          )
        })}

        <div className={styles['promo-card']}>
          <p className={styles['promo-text']}>Get 10% Off</p>
          <h3 className={styles['promo-title']}>Of Our All Destination</h3>
          <button className={styles['promo-button']}>View All Destination</button>
        </div>
      </div>
    </section>
  );
};

export default VacationSpots;
