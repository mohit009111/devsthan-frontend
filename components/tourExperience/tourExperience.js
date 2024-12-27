"use client"
import { useState } from 'react';
import styles from '../tourExperience/tourExperience.module.css';
import ToursList from '../toursList/toursList';

export default function TourExperience({tourData}) {
  const [selectedTab, setSelectedTab] = useState('tour');

  return (
    <div className={styles['tour-experience']}>
        <div className={styles['header']}>
        <p className={styles['subtitle']}>  Holy Pilgrimage</p>
    
        <h2 className={styles['title']}>Tour Packages</h2>
      </div>

      {/* <h2>Holy Pilgrimage Packages</h2> */}
      <div className={styles['tabs']}>
        {/* <span onClick={() => setSelectedTab('tour')} className={selectedTab === 'tour' ? styles['active'] : ''}>Tour Package</span> */}
        {/* <span onClick={() => setSelectedTab('hotel')} className={selectedTab === 'hotel' ? styles['active'] : ''}>Hotel</span>
        <span onClick={() => setSelectedTab('transports')} className={selectedTab === 'transports' ? styles['active'] : ''}>Transports</span> */}
      </div>
      {selectedTab == "tour" &&   <div className={styles['tour-cards']}> <ToursList tourData={tourData}/></div>   }
      {selectedTab == "hotel" &&  <p>wsec</p> }
     
      
    </div>
  );
}
