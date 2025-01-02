import React from 'react'

import Image from "next/image";
import styles from './about.module.css'
import Link from 'next/link';
const about = () => {
    return (

        <section className={styles['about-us-section']}>
            <div className={styles['text-container']}>
                <p className={styles['subtitle']}>About Us</p>
                <h2 className={styles['title']}>Let’s know About Devsthan Expert</h2>
                <div className={styles['icons']}>
                    <div className={styles['icon-item']}>
                        <span className={styles['icon-text']}>🎯 Mission & Vision</span>
                    </div>
                    <div className={styles['icon-item']}>
                        <span className={styles['icon-text']}>🤝 Focus On Customer</span>
                    </div>
                </div>
                <p className={styles['description']}>
                Devsthan Expert Pvt. Ltd. is a premier travel company dedicated to crafting unforgettable journeys that celebrate the vibrant culture, heritage, and natural beauty of India. With a team of experienced travel enthusiasts, we specialize in curating personalized itineraries for both domestic and international travelers. From serene landscapes to bustling cities, our mission is to offer seamless travel experiences that inspire and captivate. Trust us to turn your travel dreams into reality with exceptional service and attention to detail.
                </p>
              <Link href='/about'><button className={styles['button']}>More About</button></Link>  
            </div>
            <div className={styles['images-container']}>
                <div className={styles['image-wrapper']}>
                    <Image src="https://res.cloudinary.com/dmyzudtut/image/upload/v1735376268/images/uxs5pgmanov5vyntgom4.webp" alt="Group" width={200} height={200} className={styles['about-images']}/>
                </div>
                <div className={styles['image-wrapper']}>
                    <Image src="https://res.cloudinary.com/dmyzudtut/image/upload/v1735376398/about_zlvr4e.jpg" alt="Resort" width={200} height={200} className={styles['about-images']}/>
                </div>
                <div className={styles['image-wrapper']}>
                    <Image src="https://res.cloudinary.com/dmyzudtut/image/upload/v1735376406/about2_yy6k9x.jpg" alt="Desert" width={200} height={200} className={styles['about-images']}/>
                </div>
                <div className={styles['image-wrapper']}>
                    <Image src="https://res.cloudinary.com/dmyzudtut/image/upload/v1735377308/about3_qul6sh.jpg" alt="Couple" width={200} height={200} className={styles['about-images']}/>
                </div>
            </div>
        </section>

    )
}

export default about
