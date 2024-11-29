// This should be in a file like pages/tour/[uuid].js
import React, { useState } from 'react';
import TourGallery from '../../components/tourPageComponents/tourGallery';
import TourDetails from '../../components/tourPageComponents/tourDetails';
import TourBookingPanel from '../../components/tourPageComponents/tourBookingPanel';
import styles from './tour.module.css';
import { apiCall } from "../../utils/common";
import { useRouter } from 'next/router';
import Itinerary from '../../components/itinery/itinery';

const TourPage = ({ tourAllData }) => {
  console.log(tourAllData)
 
  const router = useRouter();
  const { date } = router.query;

  const [selectedCategory, setSelectedCategory] = useState('standardDetails');
  const [activeTab, setActiveTab] = useState('Itinerary');
  const [selectedDay, setSelectedDay] = useState(0);

  const handleTabChange = (tab) => setActiveTab(tab);
  const handleDayChange = (dayIndex) => setSelectedDay(dayIndex);
  const categoryDetails =
    selectedCategory === 'standardDetails' ? tourAllData[0].standardDetails :
      selectedCategory === 'deluxeDetails' ? tourAllData[0].deluxeDetails :
        selectedCategory === 'premiumDetails' ? tourAllData[0].premiumDetails :
          null;


  return (
    <div className={styles['tour-main']}>

      <div className={styles['gallery']}>
        <TourGallery
          duration={tourAllData[0].duration}
          images={tourAllData[0].images}
          bannerImage={tourAllData[0].bannerImage}
          name={tourAllData[0].name}
          state={tourAllData[0].state}
          city={tourAllData[0].city}
          location={tourAllData[0].location}
        />
      </div>

      <div className={styles['tabs']}>
        <button
          className={activeTab === 'Itinerary' ? styles['tab-active'] : ''}
          onClick={() => handleTabChange('Itinerary')}
        >
          Itinerary
        </button>
        <button
          className={activeTab === 'Policies' ? styles['tab-active'] : ''}
          onClick={() => handleTabChange('Policies')}
        >
          Policies
        </button>
        <button
          className={activeTab === 'Summary' ? styles['tab-active'] : ''}
          onClick={() => handleTabChange('Summary')}
        >
          Summary
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles['tab-panel']}>
        <div className={styles['tab-content']}>
          {activeTab === 'Itinerary' && (
            <Itinerary categoryDetails={categoryDetails.itineraries
            } date={date} />
          )}

          {activeTab === 'Policies' && (
            <div className={styles['policies']}>
              <h2>Canecellation Policies</h2>
              <p>{categoryDetails.
                cancellationPolicy
              }</p>

              {/* <h2>Terms and Conditions</h2>
              <p>{tourAllData[0].termsAndConditions}</p> */}
              <h2>Know before you go</h2>
              <p>{tourAllData[0].
                knowBeforeYouGo?.map((text) => {
                  return (

                    <>
                      <p>{text}</p>
                    </>
                  )
                })}</p>
            </div>
          )}

          {activeTab === 'Summary' && (
            <div className={styles['summary']}>
              <h2>Know before you go</h2>
              <p>{tourAllData[0].
                knowBeforeYouGo?.map((text) => {
                  return (

                    <>
                      <p>{text}</p>
                    </>
                  )
                })}</p>
            </div>
          )}
        </div>


        <TourBookingPanel
          duration={tourAllData[0].duration}
       
       
        
          state={tourAllData[0].state}
          city={tourAllData[0].city}
          location={tourAllData[0].location}
          name={tourAllData[0].name}
          availability={tourAllData.availability}
          uuid={tourAllData[0].uuid && tourAllData[0].uuid}
          categoryDetails={categoryDetails}
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
  const tourAllData = await apiCall({
    endpoint: `/api/getTour/${uuid}`,
    method: 'GET',
    data: { uuid },
  });

  return {
    props: {
      tourAllData,
    },
    revalidate: 600,
  };
}
