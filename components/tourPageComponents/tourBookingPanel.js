import React, { useEffect, useState } from 'react';
import styles from '../../pages/tour/tour.module.css';
import { apiCall } from '../../utils/common';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { SiOnstar } from 'react-icons/si';
const TourBookingPanel = ({uuid}) => {
  console.log(uuid)
  const [adultCount, setAdultCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [totalPrice, setTotalPrice] = useState(240); // initial base price for one adult
  const [panelTab, setPanelTab] = useState("booking");
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: '',
    uuid: uuid
  });
  const [errors, setErrors] = useState({});
console.log(formData)
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


  const extraServices = [
    { name: 'Home Pickup', price: 10 },
    { name: 'Night Food', price: 15 },
    { name: 'Seaplane Flying', price: 20 },
  ];
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createInquiry = await apiCall({
        endpoint: `/api/createInquiry`,
        method: 'POST',
    
        body: formData,
      });
      if(createInquiry.success == true){

        toast.success('Inquiry submitted successfully!');
      }else{

        toast.error('Error submitting inquiry. Please try again later.');
      }
      setFormData({ fullName: '', phone: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
    }
  };


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
      
      </div>
    
   
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
  );
};

export default TourBookingPanel;
