import React, { useEffect, useState } from 'react';
import styles from './tourCategory.module.css';
import { apiCall } from '../../utils/common'; // Adjust path based on where your apiCall is defined
import ToursList from '../../components/toursList/toursList';
import { BASE_URL } from '../../utils/headers';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { IoFilter } from "react-icons/io5";
// `getStaticPaths` to define the list of dynamic routes to pre-render
const durationOptions = [
  { label: "2 Days", count: 2 },
  { label: "5 Days", count: 5 },
  { label: "7 Days", count: 7 },
  { label: "15 Days", count: 15 },
];
const TourCategory = ({ tourData, categories, location }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const [tours, setTours] = useState(tourData);
  const [range, setRange] = useState([2000, 25000]);
  const [minPrice, setMinPrice] = useState(2000);
  const [maxPrice, setMaxPrice] = useState(25000);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedDuration, setCheckedDuration] = useState([]);
  console.log(minPrice)
  console.log(maxPrice)
  const handleRangeChange = (newRange) => {
    const [start, end] = newRange.sort((a, b) => a - b);
    setRange([start, end]);
    setMinPrice(start);
    setMaxPrice(end);
  };
  const marks = {
    2000: { label: '2000' },
    4000: { label: '4000' },
    8000: { label: '8000' },
    10000: { label: '10000' },
    20000: { label: '20000' },
    25000: { label: '25000' }
  };
  const stepSize = 100000 / (marks.length - 4);
  const handleCheckboxChange = (categoryName) => {
    const lowerCaseCategoryName = categoryName.trim().toLowerCase();

    setCheckedCategories((prevCheckedCategories) => {
      if (prevCheckedCategories.includes(lowerCaseCategoryName)) {
        return prevCheckedCategories.filter(
          (category) => category !== lowerCaseCategoryName
        );
      } else {
        return [...prevCheckedCategories, lowerCaseCategoryName];
      }
    });
  };
  console.log(checkedDuration)
  const handleDurationChange = (duration) => {
    setCheckedDuration((prevCheckedDuration) => {
      if (prevCheckedDuration.includes(duration)) {
        // Remove the duration if it's already checked
        return prevCheckedDuration.filter((d) => d !== duration);
      } else {
        // Add the duration if it's not already checked
        return [...prevCheckedDuration, duration];
      }
    });
  };

  useEffect(() => {

    const fetchToursByCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/allTours`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // location: locationParam,

            tourType: checkedCategories,
            minPrice,
            maxPrice,
            durations: checkedDuration,
          }),
        });
        const data = await response.json();
        setTours(data)
        console.log(data)
        // setTours1(data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchToursByCategories();
  }, [checkedCategories, checkedDuration, minPrice, maxPrice]);
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
            <Slider
              min={2000}
              max={25000}
              value={range}
              onChange={handleRangeChange}
              step={stepSize}
              range
              marks={marks}
              allowCross={false}
              dots
            />
            <div className={styles['filter-section__price-inputs']}>
              <input
                type="number"
                defaultValue={minPrice}
                className={styles['filter-section__price-min']}
              />
              <input
                type="number"
                defaultValue={maxPrice}
                className={styles['filter-section__price-max']}
              />
            </div>
          </div>

          {/* Destination Filter */}
          <div className={styles['filter-section__destination']}>
            <h3 className={styles['filter-section__title']}>Tour Categories</h3>
            <div className={styles['filter-section__options']}>
              {categories?.map((category) => (
                <label key={category.name} className={styles['filter-section__option']}>
                  <input
                    type="checkbox"
                    name="tourType"
                    value={category.name}
                    onChange={() =>
                      handleCheckboxChange(category.name)
                    }
                  />
                  {category.name}
                </label>
              ))}
            </div>
            <div className={styles['filter-section__destination']}>
              <h3 className={styles['filter-section__title']}>Tour Duration</h3>
              <div className={styles['filter-section__options']}>
                {durationOptions?.map((duration) => (
                  <label key={duration.label} className={styles['filter-section__option']}>

                    <input
                      type="checkbox"
                      name="duration"
                      value={duration.label}
                      onChange={() =>
                        handleDurationChange(duration.count)
                      }
                    />
                    More than  {duration.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles['tour-cards']}>
          <ToursList tourData={tours} />
        </div>
      </div>
      <div>
        <div className={styles['filter-mobile-button']} onClick={toggleDialog}>
          <IoFilter /> Filter
        </div>

       
        {isDialogOpen ?
        <div className={`${styles['filter-section-mobile']} ${styles['filtersection']}`}>
          {/* Search Input */}
          <div className={styles['filter-section__search']}>
            <input
              type="text"
              placeholder="Search"
              className={styles['filter-section__search-input']}
            />
           <button onClick={toggleDialog}> x</button>
          </div>

          {/* Price Filter */}
          <div className={styles['filter-section__price']}>
            <h3 className={styles['filter-section__title']}>Price Filter</h3>
            <Slider
            style={{marginBottom:"20px"}}
              min={2000}
              max={25000}
              value={range}
              onChange={handleRangeChange}
              step={stepSize}
              range
              marks={marks}
              allowCross={false}
              dots
            />
            <div className={styles['filter-section__price-inputs']}>
              <input
                type="number"
                defaultValue={minPrice}
                className={styles['filter-section__price-min']}
              />
              <input
                type="number"
                defaultValue={maxPrice}
                className={styles['filter-section__price-max']}
              />
            </div>
          </div>

          {/* Destination Filter */}
          <div className={styles['filter-section__destination']}>
            <h3 className={styles['filter-section__title']}>Tour Categories</h3>
            <div className={styles['filter-section__options']}>
              {categories?.map((category) => (
                <label key={category.name} className={styles['filter-section__option']}>
                  <input
                    type="checkbox"
                    name="tourType"
                    value={category.name}
                    onChange={() =>
                      handleCheckboxChange(category.name)
                    }
                  />
                  {category.name}
                </label>
              ))}
            </div>
            <div className={styles['filter-section__destination']}>
              <h3 className={styles['filter-section__title']}>Tour Duration</h3>
              <div className={styles['filter-section__options']}>
                {durationOptions?.map((duration) => (
                  <label key={duration.label} className={styles['filter-section__option']}>

                    <input
                      type="checkbox"
                      name="duration"
                      value={duration.label}
                      onChange={() =>
                        handleDurationChange(duration.count)
                      }
                    />
                    More than  {duration.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div> : null}
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
        categories: [],
        location: ''
      },
    };
  }
}
