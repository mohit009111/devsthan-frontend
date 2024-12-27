import React from 'react';
import styles from '../../components/itinery/itinery.module.css';
import Image from 'next/image';

const Meals = ({ itinerary }) => {


    return (
        <>
            <div className={styles['day-details-heading']}>
                <div className={styles['day-details-inner']}>
                    <p className={styles['day-details-dayheading']}>Day {itinerary.day} :</p>
                    <p>{itinerary.title}</p>
                </div>

            </div>
            {itinerary.siteSeen?.isIncluded ? (
                <div className={styles['day-details']}>
                    <h2>Site Seens</h2>
                    <div className={styles['content']}>
                        {
                            itinerary?.siteSeen?.photos?.map((photo) => {
                                return (

                                    <>
                                        <Image src={photo} width={300} height={300} />
                                    </>
                                )
                            })
                        }
                        <strong>{itinerary?.siteSeen?.name}</strong>
                        <p>{itinerary?.siteSeen?.description}</p>

                    </div>


                </div>
            ) :    <div className={styles['no-hotel']}>
            <p>No Site Seens included for this day</p>
        </div>}

        </>


    );
};

export default Meals;
