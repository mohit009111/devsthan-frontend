import React, { useState } from 'react';
import styles from './contact.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiCall } from '../../utils/common'; 
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
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
      const response = await apiCall({
        endpoint: '/api/contact', 
        method: 'POST',
        body: formData,
      });
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
      });

      toast.success('Your message has been submitted successfully!');
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
          <div className={styles['info-card']}>
            <h4>Phone</h4>
            <p>+990-737 621 432</p>
            <p>+990-137 324 465</p>
          </div>
          <div className={styles['info-card']}>
            <h4>Email Now</h4>
            <p>info@example.com</p>
            <p>example@example.com</p>
          </div>
          <div className={styles['info-card']}>
            <h4>Location</h4>
            <p>168/170, Avenue 01, Old York Drive Rich Mirpur DOHS, Bangladesh</p>
          </div>
          <div className={styles['info-card']}>
            <h4>Opening Time</h4>
            <p>8:00AM - 10:PM, Friday Closed</p>
          </div>
        </div>
        <div className={styles['form-section']}>
          <h2>Reach Us Anytime</h2>
          <form className={styles['contact-form']} onSubmit={handleSubmit}>
            <label>Name*</label>
            <input
              type="text"
              placeholder="Daniel Scoot"
              name="name"
              value={formData.name}
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
