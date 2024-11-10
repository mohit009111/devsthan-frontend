import React, { useState } from 'react';
import styles from './tourCategory.module.css';
import { apiCall } from '../../utils/common'; // Adjust path based on where your apiCall is defined
import ToursList from '../../components/toursList/toursList';

// `getStaticPaths` to define the list of dynamic routes to pre-render

const TourCategory = ({  tourData ,categories,location}) => {

  const [selectedTourTypes, setSelectedTourTypes] = useState([]);


  // Handle checkbox change and trigger API call
  const handleCheckboxChange = async (e) => {
    const { value, checked } = e.target;

    // Update selected values
    const updatedSelectedTourTypes = checked
      ? [...selectedTourTypes, value] // Add the selected value
      : selectedTourTypes.filter((item) => item !== value); // Remove the unselected value

    // Update state
    setSelectedTourTypes(updatedSelectedTourTypes);

    // Trigger API call
    try {
      const response = await apiCall({
        endpoint: `/api/tours/${location}`, // Adjust endpoint
        method: 'POST',
        body: {
          tourType: updatedSelectedTourTypes,
        },
      });

      // Handle response (e.g., update state or display data)
      console.log('Fetched Tours:', response);
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
  };

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Tours </h1>
        <nav>Home ➔ </nav>
      </header>

      <div className={styles['tour-category']}>
        <div className={styles['filter-section']}>
          {/* Search Input */}
          <div className={styles['filter-section__search']}>
            <input
              type="text"
              placeholder="Search"
              className={styles['filter-section__search-input']}
            />
            <button className={styles['filter-section__search-button']}>
              🔍
            </button>
          </div>

          {/* Price Filter */}
          <div className={styles['filter-section__price']}>
            <h3 className={styles['filter-section__title']}>Price Filter</h3>
            <input
              type="range"
              min="180"
              max="800"
              className={styles['filter-section__range']}
            />
            <div className={styles['filter-section__price-inputs']}>
              <input
                type="number"
                defaultValue="180"
                className={styles['filter-section__price-min']}
              />
              <input
                type="number"
                defaultValue="800"
                className={styles['filter-section__price-max']}
              />
            </div>
          </div>

          {/* Destination Filter */}
          <div className={styles['filter-section__destination']}>
            <h3 className={styles['filter-section__title']}>Tour Categories</h3>
            <div className={styles['filter-section__options']}>
        {categories.map((category) => (
          <label key={category.name} className={styles['filter-section__option']}>
            <input
              type="checkbox" // Change to checkbox
              name="tourType"
              value={category.name}
              onChange={handleCheckboxChange} // Trigger API call on change
            />
            {category.name}
          </label>
        ))}
      </div>
          </div>
        </div>

        <div className={styles['tour-cards']}>
          <ToursList tourData={tourData} />
        </div>
      </div>
    </>
  );
};

export default TourCategory;
export async function getStaticPaths() {
  const locations = await apiCall({
    endpoint: '/api/getAllLocations',
    method: 'GET',
  });



  const destinations = locations?.destinations?.map((dest) => dest.trim()) || [];



  const paths = destinations.map((destination) => ({
    params: { location: destination },
  }));



  return {
    paths,
    fallback: 'blocking', // or false, depending on your requirement
  };
}


export async function getStaticProps({ params }) {
  const { location } = params;


  try {

  const categories = await apiCall({
    endpoint: '/api/categories',
    method: 'GET',
  });

    const tourData = await apiCall({
      endpoint: `/api/tours/${location}`,
      method: 'POST',
    });



    return {
      props: {
        tourData,
        categories,
        location
      },
    };
  } catch (error) {
    console.error('Error fetching tour data:', error);

    return {
      props: {
        tourData: [],
        categories:[],
        location:''
      },
    };
  }
}
