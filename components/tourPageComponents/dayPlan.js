import React from 'react'
import styles from '../../components/itinery/itinery.module.css';
import Image from 'next/image';
const dayPlan = ({ itinerary }) => {
    return (
        <div className={styles['day-details-outer']}>
            {/* Heading Section */}
            <div className={styles['day-details-heading']}>
                <div className={styles['day-details-inner']}>
                    <p className={styles['day-details-dayheading']}>Day {itinerary.day} :</p>
                    <p>{itinerary.title}</p>
                </div>

            </div>

            {/* Day Details */}
            <div className={styles['day-details']}>
                {/* Flight Section */}
                <div className={styles['content']}>
                {
                        itinerary.photos.map((photo) => {
                            return (

                                <>
                                    <Image src={photo} width={300} height={300} />
                                </>
                            )
                        })
                    }
                    <p>{itinerary.description}</p>
                  
                </div>

              
            </div>

        </div>
    )
}

export default dayPlan
