import React, { useState } from 'react';
import styles from './contact.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiCall } from '../../utils/common';
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { BASE_URL } from '../../utils/headers';
const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createInquiry = await apiCall({
        endpoint: `/api/createInquiry`,
        method: 'POST',
    
        body: formData,
      });
      // setFormData({
      //   name: '',
      //   phone: '',
      //   email: '',
      //   message: '',
      // });
      if (createInquiry.success == true) {

        toast.success('Message submitted successfully ');
      }else{
        toast.error('Error submitting message. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Error submitting message. Please try again later.');
    }
  };


  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Contact</h1>
        <nav>Home ➔ Contact</nav>
      </header>
      <div className={styles['contact-container']}>
        <div className={styles['info-section']}>
          <div className={styles['info-icon']}>
            <div className={styles['icon-div']}>

              <FaPhoneAlt className={styles['icon']} />
            </div>
            <div className={styles['info-card']}>

              <p>+91 86-8381-8381</p>
              {/* <p>+990-137 324 465</p> */}
            </div>

          </div>

          <div className={styles['info-icon']}>
            <div className={styles['icon-div']}>

              <MdEmail className={styles['icon']} />
            </div>
            <div className={styles['info-card']}>

              <p> info@devsthanexpert.com</p>
              <p> support@devsthanexpert.com</p>
            </div>


          </div>
          <div className={styles['info-icon']}>
            <div className={styles['icon-div']}>

              <FaLocationDot className={styles['icon']} />
            </div>
            <div className={styles['info-card']}>

              <p>street-7# Gayatri Vihar, Shanti Kunj Ashram Gate-4, Bhupatwala, Haridwar - 249401</p>
              {/* <p>+990-137 324 465</p> */}
            </div>

          </div>
          <div className={styles['info-icon']}>
            <div className={styles['icon-div']}>

              <IoTime className={styles['icon']} />
            </div>
            <div className={styles['info-card']}>

              <p>+990-737 621 432</p>
              <p>+990-137 324 465</p>
            </div>

          </div>
        </div>
        <div className={styles['form-section']}>
          <h2>Reach Us Anytime</h2>
          <form className={styles['contact-form']} onSubmit={handleSubmit}>
            <label>Name*</label>
            <input
              type="text"
              placeholder="Daniel Scoot"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <label>Phone*</label>
            <input
              type="tel"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <label>Email*</label>
            <input
              type="email"
              placeholder="Email Us..."
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Write Your Message*</label>
            <textarea
              placeholder="What’s on your mind"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" className={styles['submit-button']}>
              Submit Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
