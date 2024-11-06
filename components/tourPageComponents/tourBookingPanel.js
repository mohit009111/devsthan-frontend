import React, { useState } from 'react';
import styles from '../../pages/tour/tour.module.css';

const TourBookingPanel = () => {
  const [adultCount, setAdultCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [totalPrice, setTotalPrice] = useState(240); // initial base price for one adult
  const [panelTab, setPanelTab] = useState("booking");
  const extraServices = [
    { name: 'Home Pickup', price: 10 },
    { name: 'Night Food', price: 15 },
    { name: 'Seaplane Flying', price: 20 },
  ];

  const handleAdultChange = (amount) => {
    const newCount = Math.max(adultCount + amount, 1);
    setAdultCount(newCount);
    updateTotalPrice(newCount, childrenCount);
  };

  const handleChildrenChange = (amount) => {
    const newCount = Math.max(childrenCount + amount, 0);
    setChildrenCount(newCount);
    updateTotalPrice(adultCount, newCount);
  };

  const handleExtraChange = (extra) => {
    const updatedExtras = selectedExtras.includes(extra)
      ? selectedExtras.filter((e) => e !== extra)
      : [...selectedExtras, extra];
    setSelectedExtras(updatedExtras);
    updateTotalPrice(adultCount, childrenCount, updatedExtras);
  };

  const updateTotalPrice = (adults, children, extras = selectedExtras) => {
    let basePrice = 240 * adults + 20 * children; // $240 per adult, $20 per child
    const extraCost = extras.reduce((sum, extra) => sum + extra.price, 0);
    setTotalPrice(basePrice + extraCost);
  };
  const handlePanelTabs = (tab) => {
    setPanelTab(tab)

  }

  return (
    <div className={styles['tour-booking-panel']}>
      <p className={styles['panel-heading']}>Book Your Tour</p>
      <p className={styles['panel-des']}>Reserve your ideal trip early for a hassle-free trip; secure comfort and convenience!</p>
      <div className={styles['panel-buttons']}>
        <button onClick={() => handlePanelTabs('booking')}>Online Booking</button>
        <button onClick={() => handlePanelTabs('inquiry')}>Inquiry Form</button>

      </div>
      {
        panelTab == 'booking' ? <>

          <div className={styles.dateSelection}>
            <input type="date" />
          </div>

          <h3>Adult</h3>
          <div className={styles.counter}>
            <button onClick={() => handleAdultChange(-1)}>-</button>
            <span>{adultCount}</span>
            <button onClick={() => handleAdultChange(1)}>+</button>
          </div>

          <h3>Children</h3>
          <div className={styles.counter}>
            <button onClick={() => handleChildrenChange(-1)}>-</button>
            <span>{childrenCount}</span>
            <button onClick={() => handleChildrenChange(1)}>+</button>
          </div>

          <h3>Other Extra Services</h3>
          {extraServices.map((service, index) => (
            <label key={index} className={styles.extraService}>
              <input
                type="checkbox"
                onChange={() => handleExtraChange(service)}
                checked={selectedExtras.includes(service)}
              />
              {service.name} - ${service.price}
            </label>
          ))}

          <div className={styles.summary}>
            {/* <p>Adult Price: ${240} x {adultCount} => ${240 * adultCount}</p> */}
            <p>Total Price: ${totalPrice}</p>
          </div>
          <button className={styles.bookButton}>Book Now</button>
        </>
          : null
      }
       {
        panelTab === "inquiry" ? (
          <form className={styles.inquiryForm}>
            <label>Phone</label>
            <input type="tel" />

            <label>Email</label>
            <input type="email" />

            <label>Message</label>
            <input type="text" />

            <button type="submit">Submit</button>
          </form>
        ) : null
      }

    </div>
  );
};

export default TourBookingPanel;
