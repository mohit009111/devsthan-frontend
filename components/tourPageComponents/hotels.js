import React from 'react'
import styles from '../../components/itinery/itinery.module.css';
import Image from 'next/image';
const hotels = ({ itinerary }) => {
    return (
        <div>
            {itinerary.hotel.isIncluded && (
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
                                Category:
                                {itinerary.hotel.hotelCategory.map((category, idx) => (
                                    <span key={idx}>{category}</span>
                                ))}
                            </div>

                            <p>Location: {itinerary.hotel.location}</p>
                        </div>
                        <div className="photos">
                            {itinerary.hotel.hotelImages.map((image, idx) => (
                                <Image key={idx} src={image} alt="Hotel" width={300} height={300} />
                            ))}
                        </div>
                      
                    </div>



                </div>
            )}
        </div>
    )
}

export default hotels
