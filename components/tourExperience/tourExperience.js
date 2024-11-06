"use client"
import { useState } from 'react';
import styles from '../tourExperience/tourExperience.module.css';
import ToursList from '../toursList/toursList';

export default function TourExperience({tourData}) {
  const [selectedTab, setSelectedTab] = useState('tour');

  return (
    <div className={styles['tour-experience']}>
      <h2>Ultimate Travel Experience</h2>
      <div className={styles['tabs']}>
        <span onClick={() => setSelectedTab('tour')} className={selectedTab === 'tour' ? styles['active'] : ''}>Tour Package</span>
        <span onClick={() => setSelectedTab('hotel')} className={selectedTab === 'hotel' ? styles['active'] : ''}>Hotel</span>
        <span onClick={() => setSelectedTab('transports')} className={selectedTab === 'transports' ? styles['active'] : ''}>Transports</span>
      </div>
      {selectedTab == "tour" &&  <ToursList tourData={tourData}/>  }
      {selectedTab == "hotel" &&  <p>wsec</p> }
     
      
    </div>
  );
}
