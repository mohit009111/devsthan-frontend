import React, { useEffect, useState } from 'react';
import styles from '../../pages/tour/tour.module.css';
import { apiCall } from '../../utils/common';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { SiOnstar } from 'react-icons/si';
const TourBookingPanel = ({ uuid, categoryDetails }) => {
  console.log(categoryDetails)

  const [rooms, setRooms] = useState([
    { id: 1, adults: 1, children: 0, extraBeds: 0 }
  ]);
  const [totalPrice, setTotalPrice] = useState(categoryDetails.pricing[3].price);

  function calculateInitialPrice(itineraries) {
    return itineraries.reduce((total, day) => {
      // Use pricing[3] if it exists, otherwise fallback to 0
      const price = day.pricing && day.pricing[3] ? parseInt(day.pricing[3].price || 0) : 0;
      return total + price;
    }, 0);
  }


  // Add a new room
  const handleAddRoom = () => {
    const newRoom = { adults: 1, children: 0 };
    setRooms((prevRooms) => [...prevRooms, newRoom]);

    // Recalculate the total price
    const newPrice = itineraries.reduce((total, day) => {
      return total + parseInt(day.hotel.beds.doubleBed.price || 0);
    }, 0);
    setTotalPrice((prevPrice) => prevPrice + newPrice);
  };
  // Function to update room values
  const updateRoom = (roomId, field, value) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomId
          ? { ...room, [field]: Math.max(0, room[field] + value) } // Ensure value doesn't go below 0
          : room
      )
    );
  };

  // Function to add a new room
  const addRoom = () => {
    setRooms((prevRooms) => [
      ...prevRooms,
      { id: prevRooms.length + 1, adults: 1, children: 0, extraBeds: 0 }
    ]);
  };

  // Function to remove a room
  const removeRoom = (roomId) => {
    setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));
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

          <p className={styles['tour-booking-price']}>

            ₹ {totalPrice}
          </p>
          <p className={styles['tour-booking-taxes']}>Excluding applicable taxes</p>
          <button onClick={() => setShowDialouge(true)}>PROCEED TO PAYMENT</button>
        </div>
        {showDialouge && (
          <div className={styles["dialog-overlay"]}>
            <div className={styles["dialog-box"]}>
              <button className={styles["dialog-close"]} onClick={() => setShowDialouge(false)}>&times;</button>
              <div className={styles["dialog-header"]}>
                <h3>7N-8D Royal Uttarakhand Package</h3>
                <h4>Total Price: ₹{totalPrice}</h4>
                <div className={styles["dialog-details"]}>
                  <span className={styles["dialog-badge"]}>7 Nights</span>
                  <span className={styles["dialog-badge"]}>8 Days</span>
                </div>
                <button className={styles["dialog-button-primary"]}>Book Now</button>
              </div>

              <div className={styles["dialog-content"]}>
                {rooms.map((room) => (
                  <div key={room.id} className={styles["dialog-room-section"]}>
                    <div className={styles["dialog-room"]}>
                      <span>Room {room.id}</span>
                      <span>
                        {room.adults} Adult / {room.children} Children
                      </span>
                      {rooms.length > 1 && (
                        <button
                          className={styles["dialog-remove-room"]}
                          onClick={() => removeRoom(room.id)}
                        >
                          Remove Room
                        </button>
                      )}
                    </div>

                    <div className={styles["dialog-row"]}>
                      <label>Extra Bed</label>
                      <div className={styles["dialog-counter"]}>
                        <button onClick={() => updateRoom(room.id, "extraBeds", -1)}>
                          -
                        </button>
                        <span>{room.extraBeds}</span>
                        <button onClick={() => updateRoom(room.id, "extraBeds", 1)}>
                          +
                        </button>
                      </div>
                    </div>

                    <div className={styles["dialog-row"]}>
                      <label>Adult</label>
                      <div className={styles["dialog-counter"]}>
                        <button onClick={() => updateRoom(room.id, "adults", -1)}>
                          -
                        </button>
                        <span>{room.adults}</span>
                        <button onClick={() => updateRoom(room.id, "adults", 1)}>
                          +
                        </button>
                      </div>
                    </div>

                    <div className={styles["dialog-row"]}>
                      <label>Children</label>
                      <div className={styles["dialog-counter"]}>
                        <button onClick={() => updateRoom(room.id, "children", -1)}>
                          -
                        </button>
                        <span>{room.children}</span>
                        <button onClick={() => updateRoom(room.id, "children", 1)}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <button className={styles["dialog-link"]} onClick={addRoom}>
                  Add a room
                </button>
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
