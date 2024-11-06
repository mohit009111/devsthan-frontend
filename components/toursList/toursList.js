import React from 'react'
import styles from '../tourExperience/tourExperience.module.css';
import TourCard from '../tourCard/tourCard'
const toursList = ({ tourData }) => {
  console.log(tourData)
  return (
    <>
      <div className={styles['tour-cards']}>
        {tourData.length > 0 && tourData && tourData.map((data) => {
          return (
            <>
              <TourCard
                duration={data.duration}
                location={data.location}
                uuid={data.uuid}
                imageUrl="https://res.cloudinary.com/dmyzudtut/image/upload/v1729833162/images/yhwqnzsjqzfygsycssmi.jpg"
                title={data.name}
                startingPrice={`Rs.${data.standardDetails.pricing[0] && data.standardDetails.pricing[0].price}`} originalPrice="$450"
                locations="Saint Martin -> Khagrachori -> Cox's Bazar"
              />
            </>
          )

        })}


      </div>
    </>
  )
}

export default toursList
