import React from 'react'
import styles from './destinationCard.module.css'
import Image from 'next/image'
const destinationCard = ({ destination }) => {
    return (
        <>
            <Image src={destination.bannerImage} alt="Sweden" width={400} height={200} className={styles['grid-item-img']} />
            <div className={styles.overlay}>
                <span className={styles.tourBadge}>{destination.tours.length} Tour</span>
                <div className={styles.textContainer}>
                    <span>Travel To</span>
                    <h3>{destination.state.label}</h3>
                </div>

            </div>
        </>
    )
}

export default destinationCard
