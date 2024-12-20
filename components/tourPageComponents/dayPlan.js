import React from 'react'
import { useState, useEffect } from 'react';
import styles from '../../components/itinery/itinery.module.css';
import Image from 'next/image';
const dayPlan = ({ itinerary }) => {
      const [isClient, setIsClient] = useState(false);
    
        useEffect(() => {
            setIsClient(true); // This will ensure the component renders only on the client side
        }, []);
    
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
                    {isClient && (
                    <p
                        className={styles['blog-card-description']}
                        dangerouslySetInnerHTML={{
                            __html: itinerary.description && itinerary.description
                        }}
                    />
                )}
                  
                    </div>
                </div>
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

        </div>
    )
}

export default dayPlan

// import React from 'react'
// import styles from '../../components/itinery/itinery.module.css';
// import Image from 'next/image';
// const dayPlan = ({ itinerary }) => {
//     return (
//         <div className={styles['day-details-outer']}>
//             {/* Heading Section */}
//             <div className={styles['day-details-heading']}>
//                 <div className={styles['day-details-inner']}>
//                     <p className={styles['day-details-dayheading']}>Day {itinerary.day} :</p>
//                     <p>{itinerary.title}</p>
//                 </div>

//             </div>

//             {/* Day Details */}
//             <div className={styles['day-details']}>
//                 {/* Flight Section */}
//                 <div className={styles['content']}>
//                 {
//                         itinerary.photos.map((photo) => {
//                             return (

//                                 <>
//                                     <Image src={photo} width={300} height={300} />
//                                 </>
//                             )
//                         })
//                     }
//                     <p>{itinerary.description}</p>
                  
//                 </div>

              
//             </div>

//         </div>
//     )
// }

// export default dayPlan
