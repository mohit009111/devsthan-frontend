import React from 'react';
import styles from './fullscreenLoader.module.css'; 
import Loader from '../loader/loader';

const FullScreenLoader = () => (
  <div  className={styles['loader-overlay']}>
    <Loader/>
  </div>
);

export default FullScreenLoader;