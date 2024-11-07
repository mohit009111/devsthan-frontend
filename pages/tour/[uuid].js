import React from 'react';
import TourGallery from '../../components/tourPageComponents/tourGallery';
import TourDetails from '../../components/tourPageComponents/tourDetails';
import TourBookingPanel from '../../components/tourPageComponents/tourBookingPanel';
import styles from '../../pages/tour/tour.module.css';
import { apiCall } from "../../utils/common";

const TourPage = ({ tourData }) => {
  console.log(tourData)
  return (
    <>
      <div className={styles['tour-main']}>
        <TourGallery images={tourData[0].images} bannerImage={tourData[0].bannerImage} name={tourData[0].name} state={tourData[0].state} city={tourData[0].city} location={tourData[0].location}/>
        <div className={styles['tour-details-panel']}>
        <TourDetails details={{ overview: tourData[0].overview, size: tourData[0].groupSize ,departureDrtails: tourData[0].departureDrtails, additionalInfo:tourData[0].additionalInfo,duration:tourData[0].duration}} />

          <TourBookingPanel availability={tourData.availability} />
        </div>
      </div>
    </>
  );
};

export default TourPage;

export async function getStaticPaths() {
  // Fetch the list of UUIDs to pre-render the pages
  const tours = await apiCall({
    endpoint: '/api/allTours',
    method: 'POST',
  });


  const paths = tours.map((tour) => ({
    params: { uuid: tour.uuid },
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
  };
}
