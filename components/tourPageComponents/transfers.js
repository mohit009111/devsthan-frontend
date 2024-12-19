import React from 'react';
import styles from '../../components/itinery/itinery.module.css';
import Image from 'next/image';

const Transfers = ({ itinerary }) => {
    const hasTransportation = 
        itinerary.transportation.flight?.isIncluded ||
        itinerary.transportation.car?.isIncluded ||
        itinerary.transportation.bus?.isIncluded ||
        itinerary.transportation.train?.isIncluded;

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
                            <strong>Departure Time: </strong> {itinerary.transportation.flight.departureTime}
                            <br />
                            <strong>Category: </strong> {itinerary.transportation.flight.category}
                            <br />
                            {itinerary.transportation.flight.description}
                        </p>
                    </div>
                </div>
            )}

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
                            <strong>Departure From: </strong> {itinerary.transportation.car.departureFrom}
                            <br />
                            <strong>Arrival To: </strong> {itinerary.transportation.car.arrivalTo}

                            <br />
                            <strong>Departure Time: </strong> {itinerary.transportation.car.departureTime}
                            <br />
                            <strong>Category: </strong> {itinerary.transportation.car.category}
                            <br />
                            <strong>Maximum capacity: </strong> {itinerary.transportation.car.maxPeople} People
                            <br />
                            <strong>Price: </strong> {itinerary.transportation.car.price} People
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
                        <strong>Departure Time: </strong> {itinerary.transportation.bus.departureTime}
                        <br />
                        <strong>Category: </strong> {itinerary.transportation.bus.category}
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
                        <strong>Departure Time: </strong> {itinerary.transportation.train.departureTime}
                        <br />
                        <strong>Category: </strong> {itinerary.transportation.train.category}
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

            {/* Show "No transportation" message if no options are available */}
            {!hasTransportation && (
                <div className={styles['no-transportation']}>
                    <p>No transportation for this day</p>
                </div>
            )}
        </div>
    );
};

export default Transfers;
