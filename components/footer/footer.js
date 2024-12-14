// components/Footer.js
import Link from 'next/link';
import styles from '../footer/footer.module.css';

export default function footer() {
  return (
    <footer className={styles['footer']}>
      <div className={styles['footer-content']}>
        <div className={styles['promo-section']}>
          <h2 className={styles['promo-title']}>Want To Take Tour Packages?</h2>
        <Link  href="/tours/uttarakhand"> <button className={styles['promo-button']}>Book A Tour</button></Link>
         
        </div>
        <div className={styles['footer-links']}>
          <div className={styles['quick-links']}>
            <h3>Quick Link</h3>
            <ul>
             <Link href={'/about'} className={styles['li']}><li >About Us</li></Link> 
             <Link href={'/destinations'} className={styles['li']}><li >Destinations</li></Link> 
             <Link href={'/blogs'} className={styles['li']}><li >Blogs</li></Link> 
             
             <Link href={'/contact'} className={styles['li']}><li >Contact Us</li></Link> 
             
            </ul>
          </div>
          <div className={styles['more-inquiry']}>
            <h3>More Inquiry</h3>
            <p>+91 8683818381</p>
            <p>info@devsthanexpert.com </p>
            <p>street-7# Gayatri Vihar, Shanti Kunj Ashram Gate-4, Bhupatwala, Haridwar - 249401</p>
          </div>
          <div className={styles['about-section']}>
            <h3>Your Trusted Travel Partner</h3>
            <p>From your first step to your last, we’re committed to creating moments you’ll cherish forever. Wherever your journey takes you, we’ll be here to make it extraordinary.</p>
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
        <p>©Copyright 2024 Devsthan Expert </p>
        <div className={styles['footer-bottom-pages']}>


       <Link href={'/privacy-policy'} ><p >Privacy Policy</p></Link> •   <Link href={'/terms-and-conditions'} ><p >Terms & Condition</p></Link>
        </div>
      </div>
    </footer>
  );
}
