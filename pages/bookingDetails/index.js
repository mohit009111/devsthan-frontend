import React, { useState, useEffect } from 'react';
import LoginForm from '../../components/loginForm/loginForm';
import SignupForm from '../../components/signupForm/signupForm';
import styles from './bookingDetails.module.css';
import { useRouter } from "next/router";
import { apiCall } from '../../utils/common.js';
import Script from 'next/script.js';
import Loader from '../../components/loader/loader.js';
import { toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import FullScreenLoader from '../../components/fullScreenLoader/fullScreenLoader.js';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
export default function TravellerDetails() {
  const router = useRouter();
const[isLoading,setIsLoading]=useState(false)
const[fullLoading,setFullLoading]=useState(false)
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
const [selectedDate, setSelectedDate] = useState(new Date()); // Default to today's date
  const [startDate, setStartDate] = useState(new Date()); // State for start date
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const handleDateChange = (date) => {
    setSelectedDate(date); // Update the selected date state
    if (date) {
      setStartDate(date); // Set the start date
      const formattedDate = formatDate(date); // Format the date
      setDate(formattedDate)
      localStorage.setItem('departureDate', formattedDate); // Save formatted date in localStorage
    }
  };
  
  // Custom Input Component for Date Picker
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <input
      className={styles['datepicker-input']}
      value={value}
      onClick={onClick}
      readOnly
      ref={ref}
      placeholder="Select Date"
    />
  ));
  CustomInput.displayName = "CustomInput";
  
  // useEffect to handle data updates whenever selectedDate changes
  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
    const departureDate = localStorage.getItem("departureDate");
    const username = localStorage.getItem("username");
    const userTempId = localStorage.getItem("userTempId");
  
    setUsername(username);
  
    // Process departure date if available
    if (departureDate) {
      try {
        // Parse the date in "DD-MM-YYYY" format
        const [day, month, year] = departureDate.split('-').map(Number);
        const parsedDate = new Date(year, month - 1, day); // Month is 0-indexed
  
        if (!isNaN(parsedDate.getTime())) {
          // Format date to "DD//MM//YY"
          const formattedDate = `${String(day).padStart(2, '0')}//${String(month).padStart(2, '0')}//${String(year).slice(-2)}`;
  
          // Only update states if the date has changed
          if (selectedDate?.getTime() !== parsedDate.getTime()) {
            setStartDate(parsedDate);      // Set parsed date object
            setSelectedDate(parsedDate);   // Update selected date
            setDate(formattedDate);        // Display formatted date
          }
        } else {
          console.error("Invalid date format in localStorage.");
        }
      } catch (error) {
        console.error("Error parsing date from localStorage:", error);
      }
    }
  
    if (token && userId) {
      setIsLoggedIn(true);
    }
  }, [selectedDate]); // Runs only when 'selectedDate' changes
  

// Fetch Cart Data whenever 'selectedDate' changes
useEffect(() => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
  const userTempId = localStorage.getItem("userTempId");
  const userData = { token, userId, userTempId };

  const fetchCartData = async () => {
    try {
      setLoading(true); // Start loading
      const response = await apiCall({
        endpoint: `/api/getCart`,
        method: 'POST',
        body: userData,
      });

      // Handle response
      setTourInfo(response.tour);
      distributePersons(response.cart.adults, response.cart.children);
      setCartData(response.cart);
      setTourid(response.cart.tourId);

      if (!response.ok) {
        throw new Error('Failed to fetch cart data');
      }
    } catch (err) {
      setError(err.message); // Handle error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch data whenever 'selectedDate' changes
  fetchCartData();
}, []); // Dependency added for 'selectedDate'


// Fetch Cart Data (runs only once after initial setup)
useEffect(() => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
  const userTempId = localStorage.getItem("userTempId");
  const userData = { token, userId, userTempId };

  const fetchCartData = async () => {
    try {
      setLoading(true);
      const response = await apiCall({
        endpoint: `/api/getCart`,
        method: 'POST',
        body: userData,
      });

      // Handle response
      setTourInfo(response.tour);
      distributePersons(response.cart.adults, response.cart.children);
      setCartData(response.cart);
      setTourid(response.cart.tourId);

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
}, []); // Empty dependency array to fetch data only once



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
    setIsLoggedIn(true); 
  };
  const toggleRegisterMode = () => {
    setShowSignup((prev) => !prev); 
  };
  const handleRazorpay = async () => {
    setIsLoading(true);
  
    // Retrieve token and user ID
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
  
    if (!token || !userId) {
      toast.error("User not logged in!");
      setIsLoading(false);
      return;
    }
  
    try {
      // Step 1: Calculate Payment
      const paymentResponse = await apiCall({
        endpoint: `/paymentCalculate`,
        method: 'POST',
        body: { tourId: tourid, userId, category: cartData.category },
      });
  
      console.log("Payment Response:", paymentResponse);
  
      if (!paymentResponse.success || !paymentResponse.order) {
        throw new Error("Order creation failed: Invalid response");
      }
  
      const options = {
        key: "rzp_live_B5xF9jUOmcfT68", // Replace with test key for debugging
        amount: paymentResponse.order.amount,
        currency: paymentResponse.order.currency,
        name: "Devsthan Expert",
        description: "Devsthan Expert Pvt. Ltd. is a premier travel company...",
        image: "https://res.cloudinary.com/dmyzudtut/image/upload/v1731261401/Untitled_design_11_dlpmou.jpg",
        order_id: paymentResponse.order.id,
        handler: async (paymentResponse) => {
          toast.success("Payment successful, processing order...");
  
          try {
            // Step 2: Verify Payment
            const verifyResponse = await retryApiCall({
              endpoint: `/verify-payment`,
              method: 'POST',
              body: {
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_signature: paymentResponse.razorpay_signature,
              },
            });
  
            console.log("Verify Payment Response:", verifyResponse);
  
            if (verifyResponse.success) {
              setFullLoading(true);
  
              // Step 3: Create Order
              const orderResponse = await retryApiCall({
                endpoint: `/create-order`,
                method: 'POST',
                body: {
                  tourId: tourid || '',
                  userId: userId || '',
                  category: cartData.category || '',
                  address: address || '',
                  mobile: mobile || '',
                  email: email || '',
                  rooms: rooms || 0,
                  username: username || '',
                  date: date || '',
                },
              });
  
              console.log("Order Response:", orderResponse);
  
              if (orderResponse.success) {
                const queryParams = {
                  tourName: tourInfo.name,
                  totalPrice: cartData.totalPrice,
                  adults: cartData.adults,
                  children: cartData.children,
                  date,
                };
  
                setTimeout(() => {
                  router.push({
                    pathname: '/booked-tour',
                    query: queryParams,
                  });
                }, 500);
              } else {
                toast.error("Order creation failed. Please try again.");
              }
              setFullLoading(false);
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (verifyError) {
            toast.error("Error verifying payment.");
          }
        },
        prefill: {
          name: username || "Guest",
          email: email || "example@email.com",
          contact: mobile || "9999999999",
        },
        notes: { address: address || "Razorpay Corporate Office" },
        theme: { color: "#3399cc" },
      };
  
      const rzp1 = new window.Razorpay(options);
  
      rzp1.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        toast.error(`Payment failed: ${response.error.description}`);
      });
  
      rzp1.open();
    } catch (error) {
      console.error("Error initiating Razorpay:", error.message);
      toast.error("An error occurred while processing the payment.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Retry API Call Function
  const retryApiCall = async (config, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await apiCall(config);
        if (response.success) return response;
      } catch (error) {
        if (i === retries - 1) throw error;
      }
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
           
            if (!e.target.checkValidity()) {
              e.preventDefault(); 
              return;
            }

            e.preventDefault();
            handleRazorpay(); 
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
          {isLoading ? <Loader/> : <button type="submit" className={styles["button"]}>Pay Now</button> }
         
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
          <div>
         
            <span>Travel Date:</span> <strong>{date}
              
            </strong>
            <div className={styles['search-options-destination']}>
            
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              customInput={<CustomInput />} // Use custom input
            />
          </div>
            
          </div>
         
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
          {/* <img
            src="/path/to/google-play-image.jpg" // You can replace with dynamic image URL if needed
            alt="Google Play"
            className={styles['transaction-image']} /> */}
          <div>
            <strong>Your transaction is safe because:</strong>
            <ul>
              <li>
                Your transaction is backed by major commercial banks and your
                personal information is protected and kept private.
              </li>
              <li>
                Devsthan-Expert.com guarantees conformity to international credit card
                payment standards.
              </li>
            </ul>
          </div>
        </div>
      </div>
     {fullLoading ? <FullScreenLoader/> : null}
    </div></>
  );
}
