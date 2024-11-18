import React from 'react';
import styles from './search.module.css'; // Assuming you're using a CSS Module for styling.

const Search = () => {
  return (
    <div className={styles['search-container']}>
      <p className={styles['coming-soon']}>Coming Soon...</p>
    </div>
  );
};

export default Search;