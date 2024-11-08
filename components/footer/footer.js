// components/Footer.js
import Link from 'next/link';
import styles from '../footer/footer.module.css';

export default function footer() {
  return (
    <footer className={styles['footer']}>
      <div className={styles['footer-content']}>
        <div className={styles['promo-section']}>
          <h2 className={styles['promo-title']}>Want To Take Tour Packages?</h2>
          <button className={styles['promo-button']}>Book A Tour</button>
        </div>
        <div className={styles['footer-links']}>
          <div className={styles['quick-links']}>
            <h3>Quick Link</h3>
            <ul>
             <Link href={'/about'} className={styles['li']}><li >About Us</li></Link> 
             <Link href={'/destinations'} className={styles['li']}><li >Destinations</li></Link> 
             <Link href={'/about'} className={styles['li']}><li >Tour Package</li></Link> 
             <Link href={'/privacy-policy'} className={styles['li']}><li >Privacy Policy</li></Link> 
             <Link href={'/contact'} className={styles['li']}><li >Contact Us</li></Link> 
             
            </ul>
          </div>
          <div className={styles['more-inquiry']}>
            <h3>More Inquiry</h3>
            <p>+999-858 624 984</p>
            <p>info@example.com</p>
            <p>House 168/170, Avenue 01, Mirpur DOHS, Dhaka Bangladesh</p>
          </div>
          <div className={styles['about-section']}>
            <h3>We Are Here</h3>
            <p>Quisque purus augue, facilisis andi neque idont acumsan fringilla massa. Vivamusol id nibhom condimentum.</p>
          </div>
          {/* <div className={styles['payment-partner']}>
            <h3>Payment Partner</h3>
            <div className={styles['payment-icons']}>
              <span>VISA</span>
              <span>Stripe</span>
              <span>PayPal</span>
              <span>WOO</span>
              <span>Skrill</span>
            </div>
          </div> */}
        </div>
      </div>
      <div className={styles['footer-bottom']}>
        <p>©Copyright 2024 TripRex | Design By <a href="#">Egens Lab</a></p>
        <p><a href="#">Privacy Policy</a> • <a href="#">Terms & Condition</a></p>
      </div>
    </footer>
  );
}
