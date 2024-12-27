import React, { useEffect, useState } from 'react';
import styles from './contact.module.css';
import { toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { apiCall } from '../../utils/common';
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import Loader from '../../components/loader/loader';
import { BASE_URL } from '../../utils/headers';
const ContactPage = ({ contact }) => {
  const [loading,setLoading]=useState(false)
  const handleScrollParallax = () => {
    const parallaxImage = document.querySelector(`.${styles['parallax-image']}`);
    if (parallaxImage) {
      const scrollPosition = window.scrollY;
      parallaxImage.style.transform = `translateY(${scrollPosition * 0.5}px)`; // Adjust speed factor
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollParallax);
    return () => window.removeEventListener('scroll', handleScrollParallax);
  }, []);

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
      setLoading(true)
      const createInquiry = await apiCall({
        endpoint: `/api/createInquiry`,
        method: 'POST',

        body: formData,
      });
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
      });
      if (createInquiry.success == true) {

        toast.success('Message submitted successfully ');
      } else {
        toast.error('Error submitting message. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Error submitting message. Please try again later.');
    }
    finally{
      setLoading(false)
    }
  };


  return (
    <>
      <header className={styles.header}>
        <div className={styles['parallax-container']}>
          <img src={contact?.data?.bannerUrls[0]} alt="Destination Banner" className={styles['parallax-image']} />
        </div>
        <div className={styles.header_content}>
          {/* <h1 className={styles.title}>Contact Us</h1>
          <nav>Home ➔ Contact Us</nav> */}
        </div>
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

              <p>24/7 Customer Support</p>
             
            </div>

          </div>
        </div>
        <div className={styles['form-section']}>
          <h2>Reach Us Anytime</h2>
          <form className={styles['contact-form']} onSubmit={handleSubmit}>
            <label>Name*</label>
            <input
              type="text"
              placeholder="Full Name"
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
              placeholder="Email Us"
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
{loading ? <Loader/>:  <button type="submit" className={styles['submit-button']}>
              Submit Now
            </button>}
           
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
export async function getStaticProps() {


  const contact = await apiCall({
    endpoint: `/api/getBanner?page=contactBanner`,
    method: 'GET',

  });
  return {
    props: {


      contact
    },

  };
}
