import React from 'react'
import styles from '../../components/itinery/itinery.module.css';
const meals = ({itinerary}) => {
  return (
    <div>
    {itinerary.meals.breakfast.isIncluded && (
        <div className={styles['section']}>
            <h3>breakfast</h3>

            <div className={styles['hotel-details']}>
                <div className="photos">
                    {itinerary.meals.breakfast.photos.map((image, idx) => (
                        <Image key={idx} src={image} alt="Hotel" width={300} height={300} />
                    ))}
                </div>
                <div>
                    <p><strong>{itinerary.meals.breakfast.name}</strong></p>
                   



                 
                </div>
            </div>



        </div>
    )}
</div>
  )
}

export default meals
