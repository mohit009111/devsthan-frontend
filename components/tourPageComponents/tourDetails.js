import React from 'react'
import styles from '../../pages/tour/tour.module.css'
import { CiClock2 } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import Itinerary from '../itinery/itinery';
const tourDetails = ({ categoryDetails, details }) => {
    const inclusions = [
        "Meal As Per Hotel Plan And Drinks Free Too.",
        "Return Airport And Round Trip Transfers.",
        "Accommodation On Twin Sharing Basis.",
        "The Above Rates Are On Per Day Disposal Basi",
        "Enjoy Brussels Day Tours. Overnight Brussels"
    ]
    return (
        <div className={styles['tour-details']}>
            <div className={styles['tour-details-snapsots']}>
                <p>Tour Snapshots</p>
                <div className={styles['tour-details-snapsots-single']}>
                    <div className={styles['tour-details-snapsots-emojis']}>
                        <CiClock2 />
                        <div className={styles['tour-details-inner']}>
                            <p>Duration:</p>
                            23
                        </div>
                    </div>
                    <div className={styles['tour-details-snapsots-emojis']}>
                        <CiClock2 />
                        <div className={styles['tour-details-inner']}>
                            <p>Group Size:</p>
                            23
                        </div>
                    </div>
                    <div className={styles['tour-details-snapsots-emojis']}>
                        <CiClock2 />
                        <div className={styles['tour-details-inner']}>
                            <p>Duration:</p>
                            23
                        </div>
                    </div>
                    <div className={styles['tour-details-snapsots-emojis']}>
                        <CiClock2 />
                        <div className={styles['tour-details-inner']}>
                            <p>Duration:</p>
                            23
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['tour-details-overview']}>
                <h2>Overview</h2>
                {details.overview}
            </div>
            <div className={styles['tour-details-overview']}>
                <h2>Included and Excluded</h2>

                <div className={styles['tour-details-inc-exc']}>


                    <div className={styles['tour-details-includeds']}>
                        {categoryDetails.inclusions.map((inc) => {
                            return (

                                <>
                                    <div className={styles['tour-details-incl']}>

                                        <FaCheck className={styles['tour-details-check']} />
                                        <p>{inc}</p>
                                    </div>
                                </>
                            )
                        }


                        )}


                    </div>

                    <div className={styles['tour-details-excluded']}>
                        {categoryDetails.exclusions.map((exc) => {
                            return (

                                <>
                                    <div className={styles['tour-details-incl']}>

                                        <RxCross2 className={styles['tour-details-cross']} />
                                        <p>{exc}</p>
                                    </div>
                                </>
                            )
                        }


                        )}



                    </div>
                </div>

            </div>
            <div className={styles['tour-details-overview']}>
                <h2>Highlights</h2>

                <div className={styles['tour-details-highliglits']}>
                    {categoryDetails.highlights.map((high) => {
                        return (

                            <>
                                <div className={styles['tour-details-incl']}>

                                    <FaCheck className={styles['tour-details-check']} />
                                    <p>{high}</p>
                                </div>
                            </>
                        )
                    }


                    )}




                </div>
                <Itinerary itineraries={categoryDetails.itineraries}/>

            </div>
        </div>
    )
}

export default tourDetails
