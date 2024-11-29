import React, { useState,useRef} from 'react';
import Meals from '../tourPageComponents/meals'
import styles from './itinery.module.css';
import Transfers from '../tourPageComponents/transfers'
import Hotels from '../tourPageComponents/hotels'
import DayPlan from '../tourPageComponents/dayPlan';
const itineraryData = {
  tabs: ['5 DAY PLAN', '2 FLIGHTS & 2 TRANSFERS', '1 HOTEL'],
  days: [
    {
      date: '04 Dec, Wed',
      title: 'Arrival in Goa (North)',
      flight: {
        from: 'New Delhi',
        to: 'Goa (North)',
        duration: '02h 30m',
        time: '18:00 - 20:30',
        flightNumber: '6E-2279',
        baggage: 'Cabin: 7 Kgs, Check-in: 15 Kgs',
      },
      transfer: {
        type: 'Private Transfer',
        details:
          'Travel comfortably in a private vehicle from Dabolim airport to North Goa hotel.',
      },
      hotel: {
        name: 'Turtle Beach Resort - Morjim',
        location: 'Morjim, 3-4 minutes walk from Morjim Beach',
        checkIn: 'Wed, 4 Dec 2024 - Sun, 8 Dec 2024',
        rating: 3.8,
      },
    },
    {
      date: '05 Dec, Thu',
      title: 'Day 2 Plan...',
      // Add similar details for Day 2
    },
  ],
};
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
