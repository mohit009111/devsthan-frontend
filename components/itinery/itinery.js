import React, { useState,forwardRef , useRef } from 'react';
import Meals from '../tourPageComponents/meals';
import styles from './itinery.module.css';
import Transfers from '../tourPageComponents/transfers';
import Hotels from '../tourPageComponents/hotels';
import DayPlan from '../tourPageComponents/dayPlan';
import Slider from "react-slick";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Itinerary = ({ categoryDetails }) => {
  const dayRefs = useRef([]); // Array of refs for each day
  const [selectedDate, setSelectedDate] = useState(new Date()); // Default to today's date
  const [startDate, setStartDate] = useState(new Date()); // State for start date
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <input
      className={styles['datepicker-input']}
      value={value}
      onClick={onClick}
      readOnly // Prevent keyboard from opening
      ref={ref}
      placeholder="Select Date"
    />
  ));
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      // Update the start date when date changes
      setStartDate(date);

      // Format the date as dd-MM-yyyy and save it
      const formattedDate = formatDate(date);
      localStorage.setItem('departureDate', formattedDate);
    }
  };

  const [activeTab, setActiveTab] = useState('day-plan');
  const [selectedDay, setSelectedDay] = useState(0);

  const handleDayClick = (index) => {
    setSelectedDay(index);

    // Scroll to the corresponding DayPlan
    dayRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
            <div className={styles['date-container']}>
              <div className={styles['search-options-destination']}>
              <DatePicker
  selected={selectedDate}
  onChange={handleDateChange}
  dateFormat="dd/MM/yyyy"
  customInput={<CustomInput />} // Use custom input
/>
              </div>
              {categoryDetails.map((_, index) => {
                const currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + index); // Increment date by index
                const dayName = currentDate.toLocaleString('en-US', { weekday: 'short' });
                const monthName = currentDate.toLocaleString('en-US', { month: 'short' });
                const dateNumber = currentDate.getDate();

                return (
                  <div
                    key={index}
                    className={`${styles['day-item']} ${selectedDay === index ? styles['active-day'] : ''}`}
                    onClick={() => handleDayClick(index)}
                  >
                    <div className={styles['month-name']}>{monthName.toUpperCase()}</div>
                    <div className={styles['date-number']}>{dateNumber}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          {activeTab === "day-plan" && (
            categoryDetails.map((itinerary, index) => (
              <div key={index} ref={(el) => (dayRefs.current[index] = el)}>
                <DayPlan itinerary={itinerary} />
              </div>
            ))
          )}
        </div>

        <div>
          {activeTab === "transfer" && (
            categoryDetails.map((itinerary, index) => (
              <div key={index} ref={(el) => (dayRefs.current[index] = el)}>
                <Transfers itinerary={itinerary} />
              </div>
            ))
          )}
        </div>

        <div>
          {activeTab === "hotel" && (
            categoryDetails.map((itinerary, index) => (
              <div key={index} ref={(el) => (dayRefs.current[index] = el)}>
                <Hotels itinerary={itinerary} />
              </div>
            ))
          )}
        </div>

        <div>
          {activeTab === "meal" && (
            categoryDetails.map((itinerary, index) => (
              <Meals key={index} itinerary={itinerary} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
