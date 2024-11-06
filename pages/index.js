
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import About from '../components/about/about';
import HomeBanner from "../components/homeBanner/HomeBanner";
import VacationSpots from "../components/vacationsSpots/vacationSpots";
import TourExperience from "../components/tourExperience/tourExperience";
import WhyChoose from "../components/whyChoose/whyChoose";
import TourActivities from "../components/tourActivities/tourActivities";
import Testimonials from "../components/testimonials/testimonials";
import { apiCall } from "../utils/common";

export default function Home({ tourData,destinations }) {
console.log(destinations)
  return (

    <>
      <HomeBanner />
      <About />
      <VacationSpots destinations={destinations}/>
      <TourExperience tourData={tourData} />
      <WhyChoose />
      {/* <TourActivities /> */}
      {/* <Testimonials /> */}
    </>
  )
}
export async function getStaticProps() {
  const tourData = await apiCall({
    endpoint: '/api/allTours',
    method: 'POST',

  });
  const destinations = await apiCall({
    endpoint: '/api/getAllDestinations',
    method: 'GET',

  });
  return {
    props: {
      tourData,
      destinations
    },
  };
}
