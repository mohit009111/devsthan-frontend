import React, { useEffect, useState } from "react";
import styles from "./bookedTour.module.css";
import { useRouter } from 'next/router';

const BookedTourDetails = () => {
  const router = useRouter();
  const { adults, children, tourName, totalPrice } = router.query;

  const [date, setDate] = useState("");

  // Safely access localStorage in the browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDate = localStorage.getItem("selectedDate");
      setDate(storedDate);
    }
  }, []);

  return (
    <div className={styles.bookedTourPage}>
      <div className={styles.header}>
        <h1>Tour Booking Confirmation</h1>
        <p>Thank you for booking your trip with us!</p>
      </div>

      <div className={styles["form-section"]}>
        <h2 className={styles["form-section-title"]}>Tour Details</h2>
        <div className={styles["input-group"]}>
          <label>Tour Name:</label>
          <span>{tourName}</span>
        </div>
        <div className={styles["input-group"]}>
          <label>Date:</label>
          <span>{date || "Not available"}</span>
        </div>
        <div className={styles["input-group"]}>
          <label>Number of Adults:</label>
          <span>{adults}</span>
        </div>
        <div className={styles["input-group"]}>
          <label>Number of Children:</label>
          <span>{children}</span>
        </div>
      </div>

      <div className={styles["form-section"]}>
        <h2 className={styles["form-section-title"]}>Price Breakdown</h2>
        <div className={`${styles["input-group"]} ${styles["total"]}`}>
          <label>Total Price:</label>
          <span>₹{Math.round(totalPrice)}</span>
        </div>
      </div>

      <div className={styles.footer}>
        <p>We wish you a memorable trip! Feel free to contact us for any queries.</p>
      </div>
    </div>
  );
};

export default BookedTourDetails;
