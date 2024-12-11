import React, { useState, useEffect } from 'react';
import LoginForm from '../../components/loginForm/loginForm';
import SignupForm from '../../components/signupForm/signupForm';
import styles from './bookingDetails.module.css';
import { useRouter } from "next/router";
import { apiCall } from '../../utils/common.js';
import Script from 'next/script.js';

export default function TravellerDetails() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [address, setAddress] = useState("");
  const [tourInfo, setTourInfo] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [tourid, setTourid] = useState("");
  const [username, setUsername] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const date = localStorage.getItem("selectedDate");
    const username = localStorage.getItem("username");
    const userTempId = localStorage.getItem("userTempId")
    setUsername(username)
    setDate(date)
if(token && userId){
  
  setIsLoggedIn(true);
}
    const userData = { token, userId, userTempId };

    const fetchCartData = async () => {
      try {
        setLoading(true);
        const response = await apiCall({
          endpoint: `/api/getCart`,
          method: 'POST',
          body: userData,
        });

        setTourInfo(response.tour)
        distributePersons(response.cart.adults, response.cart.children);
        setCartData(response.cart);
        setTourid(response.cart.tourId)
        if (!response.ok) {
          throw new Error('Failed to fetch cart data');
        }



      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();

  }, []);


  const distributePersons = (adults, children) => {
    const totalPersons = adults + children;
    const roomArr = [];
    let remainingPersons = totalPersons;

    for (let i = 0; remainingPersons > 0; i++) {
      const personsInRoom = Math.min(remainingPersons, 3);
      roomArr.push({
        room: i + 1,
        adults: Math.min(adults, personsInRoom),
        children: personsInRoom - Math.min(adults, personsInRoom),
        details: Array.from({ length: personsInRoom }, () => ({
          firstName: "",
          lastName: "",
        })),

      });
      adults -= personsInRoom;
      remainingPersons -= personsInRoom;
    }

    setRooms(roomArr);
  };

  const handleInputChange = (roomIndex, personIndex, key, value) => {
    const updatedRooms = [...rooms];
    updatedRooms[roomIndex].details[personIndex][key] = value;
    setRooms(updatedRooms);
  };

  
  const hidePanel = () => {
    setIsLoggedIn(true); // Toggle the state
  };
  const toggleRegisterMode = () => {
    setShowSignup((prev) => !prev); // Toggle the state
  };

  const handleRazorpay = async () => {
    try {

      const userId = localStorage.getItem("userId");
      const response = await apiCall({
        endpoint: `/paymentCalculate`,
        method: 'POST',
        body: { tourId: tourid, userId: userId, category: cartData.category },
      });

      console.log("Order creation response:", response);

      if (!response.success || !response.order) {
        throw new Error("Order creation failed: Invalid response");
      }

      const options = {
        key: "rzp_test_TZIT0OlGcgvEiz",
        amount: response.order.amount,
        currency: response.order.currency,
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: response.order.id,
        handler: async (paymentResponse) => {


          // Verify the payment
          try {
            const verifyResponse = await apiCall({
              endpoint: `/verify-payment`,
              method: 'POST',
              body: {
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_signature: paymentResponse.razorpay_signature,
              },
            });
            if (verifyResponse.success == true) {
              const userId = localStorage.getItem("userId");
              const response = await apiCall({
                endpoint: `/create-order`,
                method: 'POST',
                body: { tourId: tourid, userId: userId, category: cartData.category, address: address, mobile: mobile, email: email, rooms: rooms, username: username },
              });
              console.log(response)
              if (response.success === true) {
                const queryParams = {

                  tourName: tourInfo.name,
                  totalPrice: cartData.totalPrice,
                  adults: cartData.adults,
                  children: cartData.children
                };
                console.log("Redirecting to booking details...");
                router.push({
                  pathname: '/booked-tour',
                  query: queryParams,
                });
              } else {
                console.error("Order creation failed", response);
              }
            }
            console.log("Payment verification response:", verifyResponse);
          } catch (verifyError) {
            console.error("Error verifying payment:", verifyError.message);
          }
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        alert("Payment failed!");
      });

      rzp1.open();
    } catch (error) {
      console.error("Error initiating Razorpay:", error.message);
      alert("Error initiating Razorpay. Check console for details.");
    }
  };


  // Button to trigger Razorpay
  <button id="rzp-button1" onClick={handleRazorpay}>Pay Now</button>;


  return (

    <><Script src="https://checkout.razorpay.com/v1/checkout.js"></Script><div className={styles['container']}>
      <div className={styles['form-section']}>
        {!isLoggedIn ? (
          showSignup ? (
            <SignupForm isComponent={true} toggleToSignup={toggleRegisterMode} toggleToHide={hidePanel}/>
          ) : (
            <LoginForm isComponent={true}  toggleToLogin={toggleRegisterMode} toggleToHide={hidePanel}/>
          )
        ) : (
          <h2>Welcome Back!</h2>
        )}



        <h2>Please Enter Traveller(s) Details</h2>
        <form
          onSubmit={(e) => {
            // The browser will handle required field validation automatically
            if (!e.target.checkValidity()) {
              e.preventDefault(); // Prevent submission if form is invalid
              return;
            }

            e.preventDefault(); // Prevent default submission behavior
            handleRazorpay(); // Process payment if form is valid
          }}
        >
          {rooms.map((room, roomIndex) => (
            <div key={roomIndex} className={styles["form-container"]}>
              <h3>Room {room.room}</h3>
              {room.details.map((person, personIndex) => {
                const isAdult = personIndex < room.adults; // Assuming `room.adults` indicates the count of adults
                const label = isAdult
                  ? `Adult ${personIndex + 1}`
                  : `Child ${personIndex + 1 - room.adults}`;
                return (
                  <div key={personIndex} className={styles["traveller-row"]}>
                    <h4>{label}</h4>
                    <div className={styles["traveller-row-merge"]}>
                      <label>
                        First Name:
                        <input
                          type="text"
                          required
                          value={person.firstName}
                          onChange={(e) =>
                            handleInputChange(roomIndex, personIndex, "firstName", e.target.value)
                          }
                        />
                      </label>
                      <label>
                        Last Name:
                        <input
                          type="text"
                          required
                          value={person.lastName}
                          onChange={(e) =>
                            handleInputChange(roomIndex, personIndex, "lastName", e.target.value)
                          }
                        />
                      </label>
                    </div>

                  </div>
                );
              })}
            </div>
          ))}
          <div className={styles["input-group"]}>
            <label>
              Address:
              <textarea
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
          </div>
          <div className={styles["input-group"]}>
            <label>
              Mobile:
              <input
                type="text"
                value={mobile}
                required
                onChange={(e) => setMobile(e.target.value)}
              />
            </label>
          </div>
          <div className={styles["input-group"]}>
            <label>
              Email:
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <button type="submit" className={styles["button"]}>Pay Now</button>
        </form>
      </div>
      <div className={styles['package-details-box']}>
        <h3 className={styles['section-title']}>Package Details</h3>
        <div className={styles['package-info']}>
          <img
            src={tourInfo?.bannerImage} // You can replace with dynamic image URL if needed
            alt="Tour Package Image"
            className={styles['package-image']} />
          <div>

            <p>{tourInfo?.name || 'Tour Package'}</p>
            <a href={`/tour/${cartData?.tourId}`} className={styles['view-detail-link']}>View Detail</a>
          </div>
        </div>

        <div className={styles['package-summary']}>
          <p>
            <span>Travel Date:</span> <strong>{date}</strong>
          </p>
          <p>
            <span>No. of Rooms:</span> <strong>{cartData?.selectedRooms}</strong>
          </p>
          <p>
            <span>No. of Adults</span> <strong>{cartData?.adults}</strong>
          </p>
          <p>
            <span>No. of Child</span> <strong>{cartData?.children}</strong>
          </p>

        </div>

        <h3 className={styles['section-title']}>Pricing Details</h3>
        <div className={styles['pricing-info']}>

        </div>

        <h3 className={styles['total-amount']}>Total Amount: ₹{cartData?.totalPrice.toFixed(2)}</h3>

        <div className={styles['transaction-safe']}>
          <img
            src="/path/to/google-play-image.jpg" // You can replace with dynamic image URL if needed
            alt="Google Play"
            className={styles['transaction-image']} />
          <div>
            <strong>Your transaction is safe because:</strong>
            <ul>
              <li>
                Your transaction is backed by major commercial banks and your
                personal information is protected and kept private.
              </li>
              <li>
                Bharatbooking.com guarantees conformity to international credit card
                payment standards.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div></>
  );
}
