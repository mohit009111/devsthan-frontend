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
          <div className={styles['section-heading']}>1. Cancellation Policy</div>
          <ul className={styles['list']}>
            <li className={styles['list-item']}>
              <strong>Before 30 Days of Departure:</strong> Full refund minus administrative fees.
            </li>
            <li className={styles['list-item']}>
              <strong>15-29 Days Before Departure:</strong> 25% cancellation fee on total booking amount.
            </li>
            <li className={styles['list-item']}>
              <strong>7-14 Days Before Departure:</strong> 50% cancellation fee on total booking amount.
            </li>
            <li className={styles['list-item']}>
              <strong>Within 7 Days of Departure:</strong> No refund.
            </li>
            <li className={styles['list-item']}>
              <strong>No Show/Partial Cancellation:</strong> No refund for failure to show up or partial cancellation after commencement.
            </li>
          </ul>
        </div>
        
        <div className={styles['section']}>
          <div className={styles['section-heading']}>2. Refund Policy</div>
          <ul className={styles['list']}>
            <li className={styles['list-item']}>
              <strong>Refund Process:</strong> Approved cancellations processed within 7-10 business days, credited to original payment method.
            </li>
            <li className={styles['list-item']}>
              <strong>Refundable Amount:</strong> Depends on cancellation time; administrative charges deducted.
            </li>
            <li className={styles['list-item']}>
              <strong>Non-Refundable Services:</strong> Some services are strictly non-refundable, regardless of the circumstances.
            </li>
            <li className={styles['list-item']}>
              <strong>Force Majeure:</strong> Alternative dates/packages offered for unforeseen events; partial or full refund if no resolution possible.
            </li>
          </ul>
        </div>
        
        <div className={styles['section']}>
          <div className={styles['section-heading']}>3. How to Cancel or Request a Refund</div>
          <ul className={styles['list']}>
            <li className={styles['list-item']}>
              <strong>Cancellation Requests:</strong> Submit in writing via email to info@devsthanexpert.com or call 8683818381.
            </li>
            <li className={styles['list-item']}>
              <strong>Refund Requests:</strong> Submit through the same channels after cancellation.
            </li>
          </ul>
        </div>
        
        <div className={styles['contact']}>
          For queries, contact info@devsthanexpert.com or call 8683818381.
        </div>
        
        <div className={styles['terms']}>
          By booking with us, you agree to these terms and conditions.
        </div>
      </div>
    </div>
  );
};

export default Index;
