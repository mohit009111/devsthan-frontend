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
  const tourData = {
    duration: '7 days',
    images: [
      'https://res.cloudinary.com/dmyzudtut/image/upload/v1730914616/inner-banner-bg_aomm7x.jpg',
      'https://res.cloudinary.com/dmyzudtut/image/upload/v1730914616/inner-banner-bg_aomm7x.jpg',
      'https://res.cloudinary.com/dmyzudtut/image/upload/v1730914616/inner-banner-bg_aomm7x.jpg',
    ],
    bannerImage: 'https://res.cloudinary.com/dmyzudtut/image/upload/v1730914616/inner-banner-bg_aomm7x.jpg',
    name: 'Amazing Tour Package',
    state: 'California',
    city: 'San Francisco',
    location: 'Golden Gate Park',
    itinerary: [
      {
        date: '2024-11-27',
        dayName: 'Day 1',
        title: 'Arrival and Welcome Dinner',
        description:
          'Arrive at the destination, settle in the hotel, and enjoy a welcome dinner.',
        flightDetails: 'Flight from NYC to SFO',
        transferDetails: 'Airport to hotel transfer',
        hotelName: 'Luxury Inn',
      },
      {
        date: '2024-11-28',
        dayName: 'Day 2',
        title: 'City Tour and Golden Gate Bridge',
        description:
          'Explore the city’s landmarks and enjoy the scenic views of the Golden Gate Bridge.',
        flightDetails: 'N/A',
        transferDetails: 'Bus transfer throughout the day',
        hotelName: 'Luxury Inn',
      },
      {
        date: '2024-11-29',
        dayName: 'Day 3',
        title: 'Wine Country Tour',
        description:
          'Visit the famous wine country and enjoy wine tasting at top vineyards.',
        flightDetails: 'N/A',
        transferDetails: 'Private car transfer',
        hotelName: 'Luxury Inn',
      },
    ],
    policies:
      'Cancellation is free up to 7 days before the tour starts. No refunds within 7 days of the tour start date.',
    summary:
      'This tour package offers a perfect mix of urban exploration and scenic countryside experiences, ensuring an unforgettable trip for all participants.',
  };
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
