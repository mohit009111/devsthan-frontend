import React from 'react'

import Image from "next/image";
import styles from './about.module.css'
import Link from 'next/link';
const about = () => {
    return (

        <section className={styles['about-us-section']}>
            <div className={styles['text-container']}>
                <p className={styles['subtitle']}>About Us</p>
                <h2 className={styles['title']}>Let’s know About Our Journey For TripRex</h2>
                <div className={styles['icons']}>
                    <div className={styles['icon-item']}>
                        <span className={styles['icon-text']}>🎯 Mission & Vision</span>
                    </div>
                    <div className={styles['icon-item']}>
                        <span className={styles['icon-text']}>🤝 Focus On Customer</span>
                    </div>
                </div>
                <p className={styles['description']}>
                    Etiam ac tortor id purus commodo vulputate. Vestibulum porttitor erat felis and sed vehicula tortor malesuada gravida. Mauris volutpat enim quis pulv gont congue. Suspendisse ullamcorper, enim vitae tristique blandit, eratot augue torel tempo libero, non porta lectus tortor et elit. Quisque finibusot enim et eratourgt gravida, eu elementum turpis lacinia. Integer female go tellus ligula, attendora and condimentum.
                </p>
              <Link href='/about'><button className={styles['button']}>More About</button></Link>  
            </div>
            <div className={styles['images-container']}>
                <div className={styles['image-wrapper']}>
                    <Image src="https://res.cloudinary.com/dmyzudtut/image/upload/v1729833162/images/yhwqnzsjqzfygsycssmi.jpg" alt="Group" width={200} height={200} className={styles['about-images']}/>
                </div>
                <div className={styles['image-wrapper']}>
                    <Image src="https://res.cloudinary.com/dmyzudtut/image/upload/v1729833162/images/yhwqnzsjqzfygsycssmi.jpg" alt="Resort" width={200} height={200} className={styles['about-images']}/>
                </div>
                <div className={styles['image-wrapper']}>
                    <Image src="https://res.cloudinary.com/dmyzudtut/image/upload/v1729833162/images/yhwqnzsjqzfygsycssmi.jpg" alt="Desert" width={200} height={200} className={styles['about-images']}/>
                </div>
                <div className={styles['image-wrapper']}>
                    <Image src="https://res.cloudinary.com/dmyzudtut/image/upload/v1729833162/images/yhwqnzsjqzfygsycssmi.jpg" alt="Couple" width={200} height={200} className={styles['about-images']}/>
                </div>
            </div>
        </section>

    )
}

export default about
