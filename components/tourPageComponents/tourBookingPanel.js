import React, { useEffect, useState } from 'react';
import styles from '../../pages/tour/tour.module.css';
import { apiCall } from '../../utils/common';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { SiOnstar } from 'react-icons/si';
const TourBookingPanel = ({ uuid, categoryDetails,name,duration }) => {
  const [rooms, setRooms] = useState({
    id: 1,
    extraBeds: 0,
    adults: 1,
    children: 0,
  });
  
  const [totalPrice, setTotalPrice] = useState(
    categoryDetails?.pricing.find((p) => p.person === rooms.adults)?.price || 0
  );
  
  const updateRoom = (type, value) => {
    setRooms((prev) => {
      // Get the maximum number of people allowed (sum of adults and children)
      const maxPersons = Math.max(...categoryDetails.pricing.map((p) => p.person)); 
    
      // Calculate the updated value for the type (either adults or children)
      const updatedValue = prev[type] + value;
    
      // Ensure the updated value is not negative
      if (updatedValue < 0) {
        return prev; // Do not allow negative values
      }
    
      // Ensure that the total number of adults and children does not exceed maxPersons
      if (type === "adults" && updatedValue + prev.children > maxPersons) {
        return prev; // Do not update if the total exceeds the maxPersons
      }
    
      if (type === "children" && prev.adults + updatedValue > maxPersons) {
        return prev; // Do not update if the total exceeds the maxPersons
      }
    
      // Update the rooms state
      const updatedRooms = {
        ...prev,
        [type]: updatedValue,
      };
    
      // Calculate total price: Adults + Half price for Children
      const adultPrice = categoryDetails?.pricing.find((p) => p.person === updatedRooms.adults)?.price || 0;
      console.log(adultPrice)
      // Find the price for one person (used for children)
      const pricePerPerson = categoryDetails?.pricing.find((p) => p.person === updatedRooms.adults)?.price || 0;
  
      // Calculate children price as half of the price per person
      const childrenPrice = (updatedRooms.children * pricePerPerson) / 2;
    
      // Set the total price
      setTotalPrice(adultPrice - childrenPrice/4);
    
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
            <p className={styles['tour-booking-price']}>

              ₹ {totalPrice}
            </p>
            <p className={styles['tour-booking-taxes']}>Excluding applicable taxes</p>
          </div>

          <button onClick={() => setShowDialouge(true)}>Book Now</button>
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
                  </div>
                <div className={styles["dialog-details"]}>
                  <span className={styles["dialog-badge"]}>{duration}</span>
                
                </div>
                <button className={styles["dialog-button-primary"]}>Book Now</button>
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
                      <button onClick={() => updateRoom( "children", -1)}>
                        -
                      </button>
                      <span>{rooms.children}</span>
                      <button onClick={() => updateRoom( "children", 1)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
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
