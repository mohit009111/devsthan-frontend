import React from 'react';
import styles from '../../components/itinery/itinery.module.css';
import Image from 'next/image';

const Hotels = ({ itinerary }) => {
    return (
        <div>
            <div className={styles['day-details-heading']}>
                <div className={styles['day-details-inner']}>
                    <p>Day {itinerary.day}</p>
                    <p>{itinerary.title}</p>
                </div>
            </div>

            {itinerary.hotel?.isIncluded ? (
                <div className={styles['section']}>
                    <h3>Hotel</h3>

                    <div className={styles['hotel-details']}>
                        <div>
                            <p><strong>{itinerary.hotel.name}</strong></p>
                            <p>
                                <a href={itinerary.hotel.url} target="_blank" rel="noopener noreferrer">
                                    {itinerary.hotel.url}
                                </a>
                            </p>

                            <div className="details">
                                <strong>Category:</strong> 
                                {itinerary.hotel.hotelCategory.map((category, idx) => (
                                    <span key={idx}> {category} </span>
                                ))}
                            </div>

                            <p><strong>Location:</strong> {itinerary.hotel.location}</p>
                        </div>
                        <div className="photos">
                            {itinerary.hotel.hotelImages.map((image, idx) => (
                                <Image key={idx} src={image} alt="Hotel" width={300} height={300} />
                            ))}
                        </div>
                    </div>

                    <h3>Rooms</h3>
                    <p><strong>Room Category:</strong> {itinerary.hotel.roomCategory}</p>
                    <div className="photos">
                        {itinerary?.hotel?.roomImages.map((image, idx) => (
                            <Image key={idx} src={image} alt="Room" width={300} height={300} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className={styles['no-hotel']}>
                    <p>No hotel included for this day</p>
                </div>
            )}
        </div>
    );
};

export default Hotels;
