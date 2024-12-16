import Image from "next/image";
import React from 'react';
import About from '../components/about/about';
import HomeBanner from "../components/homeBanner/HomeBanner";
import VacationSpots from "../components/vacationsSpots/vacationSpots";
import TourExperience from "../components/tourExperience/tourExperience";
import WhyChoose from "../components/whyChoose/whyChoose";
import Blogs from "../components/blogs/blogs";
// import TourActivities from "../components/tourActivities/tourActivities";
// import Testimonials from "../components/testimonials/testimonials";
import { apiCall } from "../utils/common";

export default function Home({ tourData, destinations,locations,whyChoose,blogs,homebanner }) {
 
  
  return (
    <>
      <HomeBanner locations={locations} homebanner={homebanner} />
      <About />
      <VacationSpots destinations={destinations} />
      <TourExperience tourData={tourData} />
      <WhyChoose whyChoose={whyChoose}/>
      <Blogs blogs={blogs.data}/>
      {/* <TourActivities /> */}
      {/* <Testimonials /> */}
    </>
  );
}

export async function getStaticProps() {
  const tourData = await apiCall({
    endpoint: '/api/allTours',
    method: 'POST',
  });
  const locations = await apiCall({
    endpoint: '/api/getAllLocations',
    method: 'GET',
  });

  const destinations = await apiCall({
    endpoint: '/api/getAllDestinations',
    method: 'GET',
  });
  const whyChoose = await apiCall({
    endpoint: '/api/getAllWhyChoose',
    method: 'GET',
  });
  const blogs = await apiCall({
    endpoint: `/api/getAllBlogs`,
    method: 'GET',

});
const homebanner = await apiCall({
  endpoint: `/api/getBanner?page=homeBanner`,
  method: 'GET',

});

  return {
    props: {
      tourData,
      destinations,
      locations,
      whyChoose,
      blogs,
      homebanner
    },
    revalidate: 600, 
  };
}
