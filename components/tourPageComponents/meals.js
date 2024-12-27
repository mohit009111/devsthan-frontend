import React from 'react';
import styles from '../../components/itinery/itinery.module.css';
import Image from 'next/image';

const Meals = ({ itinerary }) => {
    const { breakfast, lunch, dinner } = itinerary.meals;

    return (
        <div>
             <div className={styles['day-details-heading']}>
                        <div className={styles['day-details-inner']}>
                            <p>Day {itinerary.day}</p>
                            <p>{itinerary.title}</p>
                        </div>
                    </div>
            {(breakfast?.isAvailable || lunch?.isAvailable || dinner?.isAvailable) ? (
                <>
                   

                    {breakfast?.isAvailable && (
                        <div className={styles['section']}>
                            <h3>Breakfast</h3>
                            <div className={styles['hotel-details']}>
                                <div>
                                    <p><strong>{breakfast.name}</strong></p>
                                </div>
                                <div className="photos">
                                    {breakfast.photos.map((image, idx) => (
                                        <Image key={idx} src={image} alt="Breakfast" width={300} height={300} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {lunch?.isAvailable && (
                        <div className={styles['section']}>
                            <h3>Lunch</h3>
                            <div className={styles['hotel-details']}>
                                <div>
                                    <p><strong>{lunch.name}</strong></p>
                                </div>
                                <div className="photos">
                                    {lunch.photos.map((image, idx) => (
                                        <Image key={idx} src={image} alt="Lunch" width={300} height={300} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {dinner?.isAvailable && (
                        <div className={styles['section']}>
                            <h3>Dinner</h3>
                            <div className={styles['hotel-details']}>
                                <div>
                                    <p><strong>{dinner.name}</strong></p>
                                </div>
                                <div className="photos">
                                    {dinner.photos.map((image, idx) => (
                                        <Image key={idx} src={image} alt="Dinner" width={300} height={300} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className={styles['no-meals']}>
                    <p>No meals available for this day.</p>
                </div>
            )}
        </div>
    );
};

export default Meals;
