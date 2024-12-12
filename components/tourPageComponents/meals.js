import React from 'react'
import styles from '../../components/itinery/itinery.module.css';
import Image from 'next/image';
const meals = ({ itinerary }) => {
    return (
        <div>
            {itinerary.meals.breakfast.isAvailable || itinerary.meals.lunch.isAvailable || itinerary.meals.dinner.isAvailable && <div className={styles['day-details-heading']}>
                <div className={styles['day-details-inner']}>
                    <p>Day {itinerary.day}</p>
                    <p>{itinerary.title}</p>
                </div>

            </div>}

            {itinerary.meals.breakfast.isAvailable && (
                <div className={styles['section']}>
                    <h3>breakfast</h3>

                    <div className={styles['hotel-details']}>
                    <div>
                            <p><strong>{itinerary.meals.breakfast.name}</strong></p>





                        </div>
                        <div className="photos">
                            {itinerary.meals.breakfast.photos.map((image, idx) => (
                                <Image key={idx} src={image} alt="Hotel" width={300} height={300} />
                            ))}
                        </div>
                      
                    </div>



                </div>
            )}
            {itinerary.meals.lunch.isAvailable && (
                <div className={styles['section']}>
                    <h3>lunch</h3>

                    <div className={styles['hotel-details']}>
                        <div>
                            <p><strong>{itinerary.meals.lunch.name}</strong></p>





                        </div>
                        <div className="photos">
                            {itinerary.meals.lunch.photos.map((image, idx) => (
                                <Image key={idx} src={image} alt="Hotel" width={300} height={300} />
                            ))}
                        </div>
                    </div>



                </div>
            )}
            {itinerary.meals.dinner.isAvailable && (
                <div className={styles['section']}>
                    <h3>dinner</h3>

                    <div className={styles['hotel-details']}>
                        <div>
                            <p><strong>{itinerary.meals.dinner.name}</strong></p>





                        </div>
                        <div className="photos">
                            {itinerary.meals.dinner.photos.map((image, idx) => (
                                <Image key={idx} src={image} alt="Hotel" width={300} height={300} />
                            ))}
                        </div>
                    </div>



                </div>
            )}
        </div>
    )
}

export default meals
