import React from 'react'
import styles from '../../components/itinery/itinery.module.css';
import Image from 'next/image';
const transfers = ({ itinerary }) => {
    return (
        <div>
            <div className={styles['day-details-heading']}>
                <div className={styles['day-details-inner']}>
                    <p>Day {itinerary.day}</p>
                    <p>{itinerary.title}</p>
                </div>

            </div>
           
            {itinerary.transportation.flight?.isIncluded && (
                <div className={styles['section']}>
                    <h3>Flight</h3>
                    <div className={styles['content']}>
                        <div className={styles['photos']}>
                            {itinerary.transportation.flight.photos.map((photo, idx) => (
                                <Image key={idx} src={photo} alt="Flight photo" width={300} height={300} />
                            ))}
                        </div>
                        <p>
                            <strong>{itinerary.transportation.flight.name}</strong>
                            <br />
                            Departure Time: {itinerary.transportation.flight.departureTime}
                            <br />
                            {itinerary.transportation.flight.description}
                        </p>
                    </div>
                </div>
            )}

            {/* Car Section */}
            {itinerary.transportation.car?.isIncluded && (
                <div className={styles['section']}>
                    <h3>Car</h3>
                    <div className={styles['content']}>
                        <div className={styles['photos']}>
                            {itinerary.transportation.car.photos.map((photo, idx) => (
                                <Image key={idx} src={photo} alt="Car photo" width={300} height={300} />
                            ))}
                        </div>
                        <p>
                            <strong>{itinerary.transportation.car.name}</strong>
                            <br />
                            {itinerary.transportation.car.description}
                        </p>

                    </div>

                </div>
            )}


            {itinerary.transportation.bus?.isIncluded && (
                <div className={styles['section']}>
                    <h3>Bus</h3>
                    <p>
                        <strong>{itinerary.transportation.bus.name}</strong>
                        <br />
                        {itinerary.transportation.bus.description}
                    </p>
                    <div className={styles['photos']}>
                        {itinerary.transportation.bus.photos.map((photo, idx) => (
                            <Image key={idx} src={photo} alt="Bus photo" width={300} height={300} />
                        ))}
                    </div>
                </div>
            )}


            {itinerary.transportation.train?.isIncluded && (
                <div className={styles['section']}>
                    <h3>Train</h3>
                    <p>
                        <strong>{itinerary.transportation.train.name}</strong>
                        <br />
                        Departure Time: {itinerary.transportation.train.departureTime}
                        <br />
                        {itinerary.transportation.train.description}
                    </p>
                    <div className={styles['photos']}>
                        {itinerary.transportation.train.photos.map((photo, idx) => (
                            <Image key={idx} src={photo} alt="Train photo" width={300} height={300} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default transfers
