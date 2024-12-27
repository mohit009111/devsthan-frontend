import React from 'react';
import styles from './terms-and-conditions.module.css';

const TermsAndConditions = () => {
  return (
    <div className={styles['terms-and-conditions']}>
      <h1 className={styles['title']}>Terms and Conditions</h1>
      <div className={styles['container']}>
        <p className={styles['last-updated']}>Last Updated: 27-12-2024</p>

        <div className={styles['section']}>
          <h2 className={styles['section-title']}>1. Acceptance of Terms</h2>
          <p className={styles['section-text']}>
            By accessing this website, we assume you accept these terms and conditions. Do not
            continue to use www.devsthanexpert.com if you do not agree to take all of the terms and
            conditions stated on this page.
          </p>
        </div>

        <div className={styles['section']}>
          <h2 className={styles['section-title']}>2. Use of the Site</h2>
          <p className={styles['section-text']}>
            Use of our website is subject to the following terms:
          </p>
          <ul className={styles['list']}>
            <li className={styles['list-item']}>
              You must be at least 18 years old to use this site.
            </li>
            <li className={styles['list-item']}>
              Use the site solely for lawful purposes that do not infringe, restrict, or inhibit
              others’ use.
            </li>
          </ul>
        </div>

        <div className={styles['section']}>
          <h2 className={styles['section-title']}>3. Booking and Payment</h2>
          <p className={styles['section-text']}>
            By booking a tour, hotel, or cab service through our site, you agree to the following:
          </p>
          <ul className={styles['list']}>
            <li className={styles['list-item']}>
              Provide accurate and complete information during the booking process.
            </li>
            <li className={styles['list-item']}>
              Payments must be made in accordance with the terms outlined during the booking
              process.
            </li>
            <li className={styles['list-item']}>
              We reserve the right to cancel any booking if fraudulent or unauthorized payment is
              suspected.
            </li>
          </ul>
        </div>
        <div className={styles['section']}>
          <h2 className={styles['section-title']}>4. Limitation of Liability</h2>
          <p className={styles['section-text']}>
            By booking a tour, hotel, or cab service through our site, you agree to the following:
          </p>
          <ul className={styles['list']}>
            <li className={styles['list-item']}>
            Devsthan Expert Travel Pvt Ltd will not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of our services or website.
            </li>
            <li className={styles['list-item']}>
            We do not guarantee the accuracy, completeness, or usefulness of any information provided on the site.
            </li>
           
          </ul>
        </div>
      


        <div className={styles['section']}>
          <h2 className={styles['section-title']}>5. Cancellation and Refund Policy</h2>
          <p className={styles['section-text']}>
            Cancellation policies vary based on the service booked. The following conditions apply:
          </p>
          <ul className={styles['list']}>
            <li className={styles['list-item']}>
              Specific cancellation terms will be provided at the time of booking.
            </li>
            <li className={styles['list-item']}>
              Refunds, if applicable, will be processed in accordance with our cancellation policy.
            </li>
          </ul>
        </div>

        <div className={styles['section']}>
          <h2 className={styles['section-title']}>6. Intellectual Property Rights</h2>
          <p className={styles['section-text']}>
            Unless otherwise stated, Devsthan Expert Travel Pvt Ltd and/or its licensors own the
            intellectual property rights for all material on www.devsthanexpert.com. You are
            permitted to access this site for personal use only, subject to restrictions outlined
            in these terms.
          </p>
        </div>

        <div className={styles['section']}>
          <h2 className={styles['section-title']}>7. User Content</h2>
          <p className={styles['section-text']}>
            Any content submitted by users is governed by the following:
          </p>
          <ul className={styles['list']}>
            <li className={styles['list-item']}>
              You grant us a non-exclusive, royalty-free, perpetual license to use, modify,
              adapt, publish, and display your submitted content.
            </li>
            <li className={styles['list-item']}>
              You warrant that you own or have permissions for all intellectual property in the
              content you submit.
            </li>
          </ul>
        </div>
        <div className={styles['section']}>
          <h2 className={styles['section-title']}>8. Links to Other Websites</h2>
          <p className={styles['section-text']}>
            Our site may contain links to third-party websites or services that are not owned or
            controlled by Devsthan Expert Travel Pvt Ltd. We have no control over, and assume no
            responsibility for, the content, privacy policies, or practices of any third-party
            websites or services.
          </p>
        </div>

        <div className={styles['section']}>
          <h2 className={styles['section-title']}>9. Changes to These Terms</h2>
          <p className={styles['section-text']}>
            We reserve the right to amend these terms and conditions at any time. Any changes will
            be posted on this page with an updated revision date. Your continued use of the site
            following the posting of changes constitutes your acceptance of such changes.
          </p>
        </div>

        <div className={styles['section']}>
          <h2 className={styles['section-title']}>10. Governing Law</h2>
          <p className={styles['section-text']}>
            These terms and conditions are governed by and construed in accordance with the laws of
            India, and you irrevocably submit to the exclusive jurisdiction of the courts in Delhi.
          </p>
        </div>


     
        <div className={styles['section']}>
          <h2 className={styles['section-title']}>11. Contact Us</h2>
          <p className={styles['section-text']}>
            If you have any questions about these terms, reach us at:
          </p>
          <ul className={styles['contact-list']}>
            <li className={styles['contact-item']}>
              <strong>Email:</strong> info@devsthanexpert.com
            </li>
            <li className={styles['contact-item']}>
              <strong>Phone:</strong> +91-8683818381
            </li>
            <li className={styles['contact-item']}>
              <strong>Address:</strong> Khubru, Sonipat, Haryana
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
