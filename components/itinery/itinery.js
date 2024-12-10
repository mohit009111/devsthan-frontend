import React, { useState, useRef } from 'react';
import Meals from '../tourPageComponents/meals'
import styles from './itinery.module.css';
import Transfers from '../tourPageComponents/transfers'
import Hotels from '../tourPageComponents/hotels'
import DayPlan from '../tourPageComponents/dayPlan';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Itinerary = ({ categoryDetails, date }) => {
  console.log(categoryDetails)

  const dayRefs = useRef([]); // Array of refs for each day

  const handleDayClick = (index) => {
    setSelectedDay(index);

    // Scroll to the corresponding DayPlan
    dayRefs.current[index - 1]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const [activeTab, setActiveTab] = useState('day-plan');
  const [selectedDay, setSelectedDay] = useState(0);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (

    <div className={styles['itinerary']}>
      {/* Tabs */}
      <div className={styles['tabs']}>
        {/* <Slider {...settings}> */}
        <button
          className={activeTab === "day-plan" ? styles['active-tab'] : ''}
          onClick={() => setActiveTab("day-plan")}
        >
          <p>{`${categoryDetails.length} Day Plan`}</p>
        </button>
        <button
          className={activeTab === "transfer" ? styles['active-tab'] : ''}
          onClick={() => setActiveTab("transfer")}
        >
          <p>Transfers</p>
        </button>
        <button
          className={activeTab === "hotel" ? styles['active-tab'] : ''}
          onClick={() => setActiveTab("hotel")}
        >
          <p>1 Hotel</p>
        </button>
        <button
          className={activeTab === "meal" ? styles['active-tab'] : ''}
          onClick={() => setActiveTab("meal")}
        >
          <p>Meals</p>
        </button>
        {/* </Slider> */}
      </div>

      {/* Content */}
      <div className={styles['content-dayplan']}>
        {/* Day Plan Sidebar */}
        <div className={styles['day-plan-sidebar']}>
          <div className={styles['day-plan-sidebar-days']}>

            <div className={styles['date-container']}>
              {categoryDetails.map((day, index) => {
                const currentDate = new Date(2024, 4, 23 + index); // Starting from May 23
                const dayName = currentDate.toLocaleString('en-US', { weekday: 'short' });
                const monthName = currentDate.toLocaleString('en-US', { month: 'short' });
                const date = currentDate.getDate();

                return (
                  <div
                    key={index}
                    className={`${styles['day-item']} ${selectedDay === index ? styles['active-day'] : ''}`}
                    onClick={() => handleDayClick(index)}
                  >
                    <div className={styles['month-name']}>{monthName.toUpperCase()}</div>

                    <div className={styles['date-number']}>{date}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div>

          {activeTab === "day-plan" && (
            categoryDetails.map((itinerary, index) => {
              return (
                <div key={index} ref={(el) => (dayRefs.current[index] = el)}>
                  <DayPlan itinerary={itinerary} />
                </div>
              );
            })
          )}

        </div>
        <div>


          {activeTab === "transfer" && (
            categoryDetails.map((itinerary, index) => {
              return (
                <div key={index} ref={(el) => (dayRefs.current[index] = el)}>
                  <Transfers key={index} itinerary={itinerary} />
                </div>

              );
            })
          )}
        </div>

        <div>


          {activeTab === "hotel" && (
            categoryDetails.map((itinerary, index) => {
              return (
                <div key={index} ref={(el) => (dayRefs.current[index] = el)}>
                  <Hotels key={index} itinerary={itinerary} />
                </div>

              );
            })
          )}
        </div>
        <div>


          {activeTab === "meal" && (
            categoryDetails.map((itinerary, index) => {
              return (
                <Meals key={index} itinerary={itinerary} />
              );
            })
          )}
        </div>



      </div>
    </div >
  );
};

export default Itinerary;
