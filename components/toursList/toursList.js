import React from 'react'
import styles from '../tourExperience/tourExperience.module.css';
import TourCard from '../tourCard/tourCard'
const toursList = ({ tourData }) => {
  return (
    <>
     
        {tourData.length > 0 && tourData && tourData.map((data) => {
       
          return (
            <>
              <TourCard
              data={data}
                duration={data.duration}
                location={data.location}
                uuid={data.uuid}
                imageUrl={data.bannerImage}
                title={data.name}
                startingPrice={`Rs.${data.standardDetails.pricing[0] && data.standardDetails.pricing[0].price}`} 
                
              />
            </>
          )

        })}


 
    </>
  )
}

export default toursList
