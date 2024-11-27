import React, { useState } from 'react';
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
          <p>{`${categoryDetails.length} DAY PLAN`}</p>
        </button>
        <button

          className={activeTab === "transfer" ? styles['active-tab'] : ''}
          onClick={() => setActiveTab("transfer")}
        >
          <p>TRANSFERS</p>
        </button>
        <button
          className={activeTab === "hotel" ? styles['active-tab'] : ''}
          onClick={() => setActiveTab("hotel")}
        >
          <p>1 HOTEL</p>
        </button>
        <button
          className={activeTab === "meal" ? styles['active-tab'] : ''}
          onClick={() => setActiveTab("meal")}
        >
          <p>Meals</p>
        </button>

      </div>

      {/* Content */}
      <div className={styles['content']}>
        {/* Day Plan Sidebar */}
        <div className={styles['day-plan-sidebar']}>
          {categoryDetails.map((day, index) => {
            // Parse the date from "DD-MM-YYYY" format


            return (
              <div
                key={index}
                className={`${styles['day-item']} ${selectedDay === index ? styles['active-day'] : ''
                  }`}
                onClick={() => setSelectedDay(index)}
              >
                <div>{date}</div>
                <div>{day.title}</div>
              </div>
            );
          })}
        </div>
        {activeTab === "day-plan" && (
          categoryDetails.map((itinerary, index) => {
            return (
             <DayPlan key={index} itinerary={itinerary}/>
            );
          })
        )}
          {activeTab === "transfer" && (
          categoryDetails.map((itinerary, index) => {
            return (
             <Transfers  key={index} itinerary={itinerary}/>
            );
          })
        )}
         {activeTab === "hotel" && (
          categoryDetails.map((itinerary, index) => {
            return (
             <Hotels  key={index} itinerary={itinerary}/>
            );
          })
        )}



      </div>
    </div >
  );
};

export default Itinerary;
