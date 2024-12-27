import React from 'react';
import styles from './cancellation.module.css';

const Index = () => {
  return (
    <div className={styles['container']}>
      <div className={styles['heading']}>
       <h1>Cancellation and Refund Policy</h1> 
      </div>
      <div className={styles['section-outer']}>
      <div className={styles['section']}>
        <div className={styles['section-heading']}>1. Cancellation Policy:</div>
        <ul className={styles['list']}>
          <li className={styles['list-item']}>
            <strong>Before 30 Days of Departure:</strong> Customers may cancel their bookings up to 30 days before the departure date with a full refund, minus any administrative fees or charges incurred by the company.
          </li>
          <li className={styles['list-item']}>
            <strong>Between 15-29 Days of Departure:</strong> Cancellations made between 15 and 29 days prior to the departure will incur a 25% cancellation fee on the total booking amount.
          </li>
          <li className={styles['list-item']}>
            <strong>Between 7-14 Days of Departure:</strong> Cancellations made between 7 and 14 days prior to the departure will incur a 50% cancellation fee on the total booking amount.
          </li>
          <li className={styles['list-item']}>
            <strong>Within 7 Days of Departure:</strong> No refund will be provided for cancellations made within 7 days of the departure date.
          </li>
          <li className={styles['list-item']}>
            <strong>No Show/Partial Cancellation:</strong> If the customer fails to show up for the scheduled departure, or cancels part of the package after commencement, no refund will be issued.
          </li>
        </ul>
      </div>
      <div className={styles['section']}>
        <div className={styles['section-heading']}>2. Refund Policy:</div>
        <ul className={styles['list']}>
          <li className={styles['list-item']}>
            <strong>Refund Process:</strong> Once the cancellation request is approved, we will process the refund within 7-10 business days. The refund will be credited to the same payment method used during the booking process.
          </li>
          <li className={styles['list-item']}>
            <strong>Refundable Amount:</strong> The refundable amount will depend on the cancellation time, as outlined above. Any applicable administrative or processing charges will be deducted from the total amount.
          </li>
          <li className={styles['list-item']}>
            <strong>Non-Refundable Services:</strong> Certain services like non-refundable hotel bookings, flight tickets, or special permits may not be refundable under any circumstances.
          </li>
          <li className={styles['list-item']}>
            <strong>Force Majeure/Unforeseen Circumstances:</strong> In cases of natural disasters, government-imposed restrictions, or other unforeseen events, we will try to offer alternative dates or packages. If no resolution is possible, we will issue a partial or full refund, depending on the situation.
          </li>
        </ul>
      </div>
      <div className={styles['section']}>
        <div className={styles['section-heading']}>3. How to Cancel or Request a Refund:</div>
        <ul className={styles['list']}>
          <li className={styles['list-item']}>
            <strong>Cancellation Requests:</strong> All cancellation requests must be sent in writing via email to info@devsthanexpert.com or via the contact number 8683818381.
          </li>
          <li className={styles['list-item']}>
            <strong>Refund Requests:</strong> After cancellation, a refund request must be made through the same channels, and you will be informed once the refund process begins.
          </li>
        </ul>
      </div>
      <div className={styles['contact']}>
        For any queries, please contact us at info@devsthanexpert.com or call 8683818381.
      </div>
      <div className={styles['terms']}>
        By making a booking with us, you agree to the terms and conditions set forth in this cancellation and refund policy.
      </div>

      </div>
     
    </div>
  );
};

export default Index;
