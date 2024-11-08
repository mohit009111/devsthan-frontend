import React from 'react'
import styles from './destinationCard.module.css'
const destinationCard = ({ destination }) => {
    return (
        <>
            <img src={destination.bannerImage} alt={destination.name} className={styles.image} />
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
