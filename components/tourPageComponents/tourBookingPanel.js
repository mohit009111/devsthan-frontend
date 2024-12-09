import React, { useEffect, useState } from 'react';
import styles from '../../pages/tour/tour.module.css';
import { apiCall } from '../../utils/common';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { SiOnstar } from 'react-icons/si';
import { useRouter } from 'next/router';

import CustomizedQuery from './customizedQuery';
import { v4 as uuidv4 } from 'uuid';
const TourBookingPanel = ({ uuid, categoryDetails, name, duration, category,date }) => {
  const [roomsCount, setRoomsCount] = useState(1);
  const [loading, setLoading] = useState(false)
  const [showCustomizeDialog, setShowCustomizeDialog] = React.useState(false);
  const [rooms, setRooms] = useState({
    id: 1,
    extraBeds: 0,
    adults: 1,
    children: 0,
  });
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(
    categoryDetails?.pricing.find((p) => p.person === rooms.adults)?.price || 0
  );

  const handleBookNow = async () => {
    // Prepare user-selected data
    const userSelected = {
      category: category,
      adults: rooms.adults,
      children: rooms.children,
      tourId: uuid,
     
    };

    // Check if localStorage contains a token
    const token = localStorage.getItem('token'); // Replace 'token' with the actual key used for token

    // Generate userTempId if token is not available
    const userTempId = token ? null : uuidv4();

    // Add userTempId or token as separate keys in the object
    const requestBody = {
      ...userSelected,
      ...(token ? { token } : { userTempId }), // Add token or userTempId depending on availability
    };

    try {
      // Make API call to add to cart
      const response = await apiCall({
        endpoint: '/api/addToCart',
        method: 'POST',
        body: requestBody,
      });


      if (response.success) {
        toast.success('Added to cart successfully!');

        // Store userTempId in local storage if token doesn't exist
        if (!token && userTempId) {
          localStorage.setItem('userTempId', userTempId);
        
        }
        const queryParams = {
                
         data:date
        };
        router.push({
          pathname: '/bookingDetails',
          query: queryParams,
        });
      
      } else {
        toast.error("Session expired? Please login again");
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('An error occurred. Please try again.');
    }
  };


  const updateRoom = (type, value) => {
    setRooms((prev) => {
      // Calculate the new value for the type (adults or children)
      let newValue = prev[type] + value;

      // Find the total number of persons (adults + children) after update
      const totalPersons = prev.adults + prev.children;

      // Find the pricing for the updated total number of persons (adults + children)
      const pricingForTotalPersons = categoryDetails.pricing.find(
        (p) => p.person === totalPersons + value
      );

      // If pricing is found, get the max allowed persons
      const maxAllowedPersons = pricingForTotalPersons ? pricingForTotalPersons.person : 0;

      // Ensure newValue does not exceed max allowed persons
      if (type === "adults") {
        const maxAllowedAdults = maxAllowedPersons - prev.children;
        // Ensure total adults do not exceed max allowed adults
        newValue = Math.min(newValue, maxAllowedAdults);
      } else if (type === "children") {
        const maxAllowedChildren = maxAllowedPersons - prev.adults;
        // Ensure total children do not exceed max allowed children
        newValue = Math.min(newValue, maxAllowedChildren);
      }

      // Prevent negative values (ensure new value is at least 0)
      newValue = Math.max(0, newValue);

      // Create updatedRooms object with new values
      const updatedRooms = {
        ...prev,
        [type]: newValue,
      };

      // Total persons after the update
      const totalPersonsUpdated = updatedRooms.adults + updatedRooms.children;

      // Find pricing and room info based on updated total persons
      const pricing = categoryDetails.pricing.find(
        (p) => p.person === totalPersonsUpdated
      );

      const priceForTotalPersons = pricing ? pricing.price : 0;
      const roomsForTotalPersons = pricing ? pricing.rooms : 0;

      // Calculate per person price and child price
      const perPersonPrice =
        totalPersonsUpdated > 0 ? priceForTotalPersons / totalPersonsUpdated : 0;
      const childPrice = perPersonPrice / 2;

      // Add extra bed cost (assuming fixed cost per bed, e.g., 2000)
      const extraBedCost = updatedRooms.extraBeds * 2000;

      // Total price calculation
      const computedTotalPrice =
        updatedRooms.adults * perPersonPrice +
        updatedRooms.children * childPrice +
        extraBedCost;

      console.log("Updated Rooms:", updatedRooms);
      console.log("Computed Total Price:", computedTotalPrice);
      console.log("Rooms for Total Persons:", roomsForTotalPersons); // Log the number of rooms

      // Update the total price and the number of rooms to display
      setTotalPrice(Math.round(computedTotalPrice));
      setRoomsCount(roomsForTotalPersons); // Update the room count based on selected total persons

      return updatedRooms;
    });
  };

  const [showDialouge, setShowDialouge] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: '',
    uuid: uuid
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input changed: ${name} => ${value}`); // Add logging here
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      uuid: uuid
    }));
  }, [uuid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createInquiry = await apiCall({
        endpoint: `/api/createInquiry`,
        method: 'POST',

        body: formData,
      });
      if (createInquiry.success == true) {

        toast.success('Inquiry submitted successfully!');
      } else {

        toast.error('Error submitting inquiry. Please try again later.');
      }
      setFormData({ fullName: '', phone: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
    }
  };






  return (


    <>
      <div className={styles['tour-booking-panel-outer']}>

        <div className={styles['tour-booking-button-pannel']}>
          <div>
            <p className={styles['tour-booking-price']}>₹ {totalPrice}</p>
            <p className={styles['tour-booking-taxes']}>Excluding applicable taxes</p>
          </div>
          <button onClick={() => setShowDialouge(true)}>Book Now</button>
          <button onClick={() => setShowCustomizeDialog(true)}>Customize Tour</button>
        </div>
        {showDialouge && (
          <div className={styles["dialog-overlay"]}>
            <div className={styles["dialog-box"]}>
              <button
                className={styles["dialog-close"]}
                onClick={() => setShowDialouge(false)}
              >
                &times;
              </button>
              <div className={styles["dialog-header"]}>
                <div>
                  <h3>{name}</h3>
                  <h4>Total Price: ₹{totalPrice}</h4>
                  <div className={styles["dialog-row"]}>
                    <label>Number of Rooms</label>
                    <div className={styles["dialog-counter"]}>
                      <span>{roomsCount}</span>
                    </div>
                  </div>
                </div>
                <div className={styles["dialog-details"]}>
                  <span className={styles["dialog-badge"]}>{duration}</span>
                </div>
                <button
                  className={styles["dialog-button-primary"]}
                  onClick={handleBookNow}
                  disabled={loading} // Optionally disable the button while loading
                >
                  {loading ? 'Adding to Cart...' : 'Book Now'}
                </button>
                <ToastContainer position="top-right" autoClose={3000} />
              </div>

              <div className={styles["dialog-content"]}>

                <div key={rooms.id} className={styles["dialog-room-section"]}>
                  <div className={styles["dialog-row"]}>
                    <label>Adult</label>
                    <div className={styles["dialog-counter"]}>
                      <button onClick={() => updateRoom("adults", -1)}>-</button>
                      <span>{rooms.adults}</span>
                      <button onClick={() => updateRoom("adults", 1)}>+</button>
                    </div>
                  </div>

                  <div className={styles["dialog-row"]}>
                    <label>Children</label>
                    <div className={styles["dialog-counter"]}>
                      <button onClick={() => updateRoom("children", -1)}>-</button>
                      <span>{rooms.children}</span>
                      <button onClick={() => updateRoom("children", 1)}>+</button>
                    </div>
                  </div>



                </div>

              </div>
            </div>
          </div>
        )}
        {showCustomizeDialog && (
          <CustomizedQuery uuid={uuid} />

        )}


        <div className={styles['tour-booking-panel']}>
          <p className={styles['panel-heading']}>Book Your Tour</p>
          <p className={styles['panel-des']}>Reserve your ideal trip early for a hassle-free trip; secure comfort and convenience!</p>


          <form className={styles.inquiryForm} onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              minLength="2"
            />

            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="\d{10}"
              title="Phone must be a 10-digit number"
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Message</label>
            <input
              type="text"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit">Submit</button>
          </form>




        </div>
      </div>


    </>

  );
};

export default TourBookingPanel;
