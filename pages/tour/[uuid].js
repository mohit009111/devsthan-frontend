// This should be in a file like pages/tour/[uuid].js
import React, { useState } from 'react';
import TourGallery from '../../components/tourPageComponents/tourGallery';
import TourDetails from '../../components/tourPageComponents/tourDetails';
import TourBookingPanel from '../../components/tourPageComponents/tourBookingPanel';
import styles from '../../pages/tour/tour.module.css';
import { apiCall } from "../../utils/common";

const TourPage = ({ tourData }) => {
  console.log(tourData)
  const [selectedCategory, setSelectedCategory] = useState('standardDetails');

  const categoryDetails = 
    selectedCategory === 'standardDetails' ? tourData[0].standardDetails :
    selectedCategory === 'deluxeDetails' ? tourData[0].deluxeDetails :
    selectedCategory === 'premiumDetails' ? tourData[0].premiumDetails : 
    null;

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className={styles['tour-main']}>
      <TourGallery 
        images={tourData[0].images} 
        bannerImage={tourData[0].bannerImage} 
        name={tourData[0].name} 
        state={tourData[0].state} 
        city={tourData[0].city} 
        location={tourData[0].location}
      />
      <div className={styles['tour-category']}>
        <label htmlFor="category-select">Tour Category: </label>
        <select 
          id="category-select" 
          value={selectedCategory} 
          onChange={handleCategoryChange}
          className={styles['category-select']}
        >
          <option value="standardDetails">Standard</option>
          <option value="deluxeDetails">Deluxe</option>
          <option value="premiumDetails">Premium</option>
        </select>
      </div>

      <div className={styles['tour-details-panel']}>
        <TourDetails 
          categoryDetails={categoryDetails}  
          details={{ 
            overview: tourData[0].overview, 
            size: tourData[0].groupSize,
            departureDetails: tourData[0].departureDetails, 
            additionalInfo: tourData[0].additionalInfo,
            duration: tourData[0].duration 
          }} 
        />
        <TourBookingPanel 
          availability={tourData.availability} 
          uuid={tourData[0].uuid && tourData[0].uuid} 
        />
      </div>
    </div>
  );
};

export default TourPage;

export async function getStaticPaths() {
  const tours = await apiCall({
    endpoint: '/api/allTours',
    method: 'POST',
  });

  const paths = tours.map((tour) => ({
    params: { uuid: String(tour.uuid) }, 
  }));

  return {
    paths,
    fallback: false, 
  };
}

export async function getStaticProps({ params }) {
  const { uuid } = params;
  const tourData = await apiCall({
    endpoint: `/api/getTour/${uuid}`,
    method: 'GET',
    data: { uuid },
  });

  return {
    props: {
      tourData,
    },
    revalidate: 600, 
  };
}
