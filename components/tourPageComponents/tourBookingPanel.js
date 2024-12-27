import React, { useEffect, useState } from 'react';
import styles from '../../pages/tour/tour.module.css';
import { apiCall } from '../../utils/common';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { SiOnstar } from 'react-icons/si';
import { useRouter } from 'next/router';
import Loader from '../loader/loader';
import CustomizedQuery from './customizedQuery';
import { v4 as uuidv4 } from 'uuid';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';



const TourBookingPanel = ({ uuid, categoryDetails, name, duration, category, date }) => {
  const [storedUUID, setStoredUUID] = useState()
  const [isLoadingBook, setIsLoadingBook] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [showDialouge, setShowDialouge] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: '',
    uuid: ''
  });
  const CustomInputWrapper = styled(DatePicker)`
  cursor: pointer;
`;
  // Set storedUUID when uuid prop changes
  useEffect(() => {

    if (uuid) {
      setStoredUUID(uuid);
    }
  }, [uuid]);

  // Synchronize formData.uuid with storedUUID
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      uuid: storedUUID
    }));
  }, [storedUUID])
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const [selectedDate, setSelectedDate] = useState(null);


  const close = (() => {
    setShowCustomizeDialog(false)
  })
  const [pricePerPerson, setPricePerPerson] = useState();
  const [roomsCount, setRoomsCount] = useState(1);
  const [loading, setLoading] = useState(false)
  const [showCustomizeDialog, setShowCustomizeDialog] = React.useState(false);
  const [rooms, setRooms] = useState({
    id: 1,
    extraBeds: 0,
    adults: categoryDetails.pricing.length,
    children: 0,
  });
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(

  );
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <input
      className={styles['datepicker-input']}
      value={value}
      onClick={onClick}
      readOnly // Prevent keyboard from opening
      ref={ref}
      placeholder="Select Date"
    />
  ));
  CustomInput.displayName = "CustomInput";
  useEffect(() => {
    if (!categoryDetails || !categoryDetails.pricing) return;
  
    const totalPersons = rooms.adults + rooms.children;
  
    // Function to find pricing with fallback logic
    const findPricingWithFallback = (persons) => {
      const validPricing = categoryDetails.pricing.find(
        (p) => p.person === persons && p.price > 0
      );
      if (validPricing) return validPricing; // Return valid pricing if found
  
      // Fallback to 3 persons, then 1 person if no valid pricing found
      return (
        categoryDetails.pricing.find((p) => p.person === 3 && p.price > 0) ||
        categoryDetails.pricing.find((p) => p.person === 1 && p.price > 0) ||
        null
      );
    };
  
    // Find pricing for total persons or fallback
    const pricing = findPricingWithFallback(totalPersons);
  
    if (pricing) {
      const fallbackPersonCount = pricing.person; // Use the fallback person count from pricing
      const priceForTotalPersons = pricing.price;
      const perPersonPrice = fallbackPersonCount > 0 ? priceForTotalPersons / fallbackPersonCount : 0;
      const childPrice = perPersonPrice / 2;
      const extraBedCost = rooms.extraBeds * 2000;
  
      // Calculate the total price
      const computedTotalPrice =
        rooms.adults * perPersonPrice +
        rooms.children * childPrice +
        extraBedCost;
  
      // Update state
      setTotalPrice(Math.round(computedTotalPrice));
      setPricePerPerson(Math.round(perPersonPrice));
      setRoomsCount(pricing.rooms); // Update roomsCount based on pricing
    } else {
      // Reset the total price, price per person, and rooms count if no matching pricing is found
      setTotalPrice(0);
      setPricePerPerson(0);
      setRoomsCount(1); // Default room count
    }
  }, [categoryDetails, rooms]);

  const handleBookNow = async () => {
    setIsLoadingBook(true)
    const departureDate = localStorage.getItem('departureDate'); // Assuming the key is 'departureDate'
    if (!departureDate) {
      toast.error('Please select a departure date before proceeding.');
      setIsLoadingBook(false)
      return; // Stop execution if departure date is not available
    }
    const userSelected = {
      category: category,
      adults: rooms.adults,
      children: rooms.children,
      tourId: uuid,
      departureDate,
    };
    const token = localStorage.getItem('token');
    const userTempId = token ? null : uuidv4();
    const requestBody = {
      ...userSelected,
      ...(token ? { token } : { userTempId }),
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
          date: date,
        };  
        router.push({
          pathname: '/bookingDetails',
          query: queryParams,
        });
      } else {
        toast.error('Session expired? Please login again.');
        localStorage.clear()
        localStorage.setItem('userTempId', userTempId);
        const queryParams = {
          date: date,
        };
        router.push({
          pathname: '/bookingDetails',
          query: queryParams,
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoadingBook(false)
    }
  };
  const updateRoom = (type, value) => {
    setRooms((prev) => {
      const totalPersons = prev.adults + prev.children; // Current total persons
      const newValue = prev[type] + value; // Proposed new value for the type
      const totalPersonsUpdated = totalPersons + value; // Updated total persons
  
      // Ensure adults count stays at or above 1
      if (type === "adults" && newValue < 1) return prev;
  
      // Ensure children count stays at or above 0
      if (type === "children" && newValue < 0) return prev;
  
      // Find the pricing for the updated total persons
      const pricingForTotalPersons = categoryDetails.pricing.find(
        (p) => p.person === totalPersonsUpdated
      );
  
      // Get the maximum allowed people based on the pricing
      const maxAllowedPersons = pricingForTotalPersons ? pricingForTotalPersons.person : 0;
  
      // Prevent exceeding the maximum allowed people
      if (totalPersonsUpdated > maxAllowedPersons) return prev;
  
      // Calculate updated rooms and pricing
      const updatedRooms = {
        ...prev,
        [type]: newValue,
      };
  
      const priceForTotalPersons = pricingForTotalPersons ? pricingForTotalPersons.price : 0;
      const perPersonPrice =
        totalPersonsUpdated > 0 ? priceForTotalPersons / totalPersonsUpdated : 0;
      const childPrice = perPersonPrice / 2;
      const extraBedCost = updatedRooms.extraBeds * 2000;
      const computedTotalPrice =
        updatedRooms.adults * perPersonPrice +
        updatedRooms.children * childPrice +
        extraBedCost;
  
      // Update state
      setTotalPrice(Math.round(computedTotalPrice)); // Total price for all persons
      setPricePerPerson(Math.round(perPersonPrice)); // Price per individual
      setRoomsCount(pricingForTotalPersons ? pricingForTotalPersons.rooms : 0); // Update room count
      return updatedRooms;
    });
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoadingSubmit(true)
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
      // setFormData({ fullName: '', phone: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
    } finally {
      setLoadingSubmit(false)
    }
  };
  return (
    <>
      <div className={styles['tour-booking-panel-outer']}>

        <div className={styles['tour-booking-button-pannel']}>
          <div style={{ minWidth: '145px' }}>

            <div className={styles['tour-booking-pricing']}>


              <p className={styles['tour-booking-price']}>₹ {pricePerPerson}</p> <p className={styles['tour-booking-tax']}>/per person</p>
            </div>
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
                  <h4>₹ {pricePerPerson}/per person</h4>
                  <div className={styles["dialog-row"]}>
                    <label>Number of Rooms</label>
                    <div className={styles["dialog-counter"]}>
                      <span>{roomsCount}</span>
                    </div>
                  </div>
                </div>
                <div className={styles["dialog-details"]}>
                  <span className={styles["dialog-badge"]}>{`${duration}D / ${duration - 1}N`}</span>
                </div>
                <div>

                {isLoadingBook ? <Loader /> : <button
                  className={styles["dialog-button-primary"]}
                  onClick={handleBookNow}

                >
                  Book Now
                </button>}
                {/* <div className={styles['search-options-destination']}>
                <CustomInputWrapper
                  selected={selectedDate}
                  // onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  customInput={<CustomInput />} // Use custom input
                />
              </div> */}
                  </div>

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
          <CustomizedQuery uuid={uuid} handleClose={close} />
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
            {loadingSubmit ? <Loader /> : <button type="submit">Submit</button>}
          </form>
        </div>
      </div>
    </>

  );
};

export default TourBookingPanel;
