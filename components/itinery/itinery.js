import React, { useState,useRef} from 'react';
import Meals from '../tourPageComponents/meals'
import styles from './itinery.module.css';
import Transfers from '../tourPageComponents/transfers'
import Hotels from '../tourPageComponents/hotels'
import DayPlan from '../tourPageComponents/dayPlan';

const Itinerary = ({ categoryDetails, date }) => {
  console.log(categoryDetails)
  const dayRefs = useRef([]); // Array of refs for each day

  const handleDayClick = (index) => {
    setSelectedDay(index);

    // Scroll to the corresponding DayPlan
    dayRefs.current[index-1]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const [activeTab, setActiveTab] = useState('day-plan');
  const [selectedDay, setSelectedDay] = useState(0);

  return (

    <div className={styles['itinerary']}>
      {/* Tabs */}
      <div className={styles['tabs']}>

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

      </div>

      {/* Content */}
      <div className={styles['content-dayplan']}>
        {/* Day Plan Sidebar */}
        <div className={styles['day-plan-sidebar']}>
          <div className={styles['day-plan-sidebar-days']}>
            <p className={styles['day-plan-heading']}>Day Plan</p>
            {categoryDetails.map((day, index) => {
              // Parse the date from "DD-MM-YYYY" format
              const date = new Date(2024, 9, 29); // October 29, 2024 (0-based month index)
              const dayPart = String(date.getDate()).padStart(2, '0'); // "29"
              const monthPart = String(date.getMonth() + 1).padStart(2, '0'); // "10"
              const yearPart = date.getFullYear(); // "2024"
              // "29-10-2024"



              return (
                <div
                  key={index}
                  className={`${styles['day-item']} ${selectedDay === index ? styles['active-day'] : ''}`}
             onClick={() => handleDayClick(index)}
                >
                  <div>{`${day.day + parseInt(dayPart, 10)}-${monthPart}-${yearPart}`}</div>
                </div>
              );
            })}


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
