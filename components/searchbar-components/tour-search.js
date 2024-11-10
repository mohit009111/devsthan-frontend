import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../components/homeBanner/homeBanner.module.css';
import { FiMapPin } from "react-icons/fi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Link from 'next/link';

// Sample locations list


const TourSearch = ({ locations }) => {
  console.log(locations)
  const [destination, setDestination] = useState(null);
  const [showSelect, setShowSelect] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(locations.destinations);
  const [selectedDate, setSelectedDate] = useState(null);
  const router = useRouter();

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchText(query);

    const filtered = locations.filter((location) =>
      location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (option) => {
    setDestination(option);
    setSearchText(option);
    setShowSelect(false);
  };


  return (
    <div className={styles['search-options-outer']}>
      <div className={styles['search-options']}>
        {/* Destination Input */}
        <div className={styles['search-options-tour']} onClick={() => setShowSelect(!showSelect)}>
          <FiMapPin />
          <div className={styles['search-options-destination']}>
            <p>Destination</p>
            <p>{destination ? destination : 'Select Destination'}</p>
          </div>
          <MdOutlineKeyboardArrowDown className={styles['arrow-down']} />
          {showSelect && (
            <div className={styles['select-dropdown']}>
              <input
                type='text'
                value={searchText}
                onChange={handleSearch}
                placeholder="Search destination..."
                className={styles['search-input']}
              />
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleOptionClick(option)}
                    className={styles['dropdown-option']}
                  >
                    {option}
                  </div>
                ))
              ) : (
                <div className={styles['dropdown-option']}>No results found</div>
              )}
            </div>
          )}
        </div>

        {/* Departure Date */}
        <div className={styles['search-options-tour']}>
          <FiMapPin />
          <div className={styles['search-options-destination']}>
            <p>Departure Date</p>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText="Select Date"
              dateFormat="dd/MM/yyyy"
              className={styles['datepicker-input']}
            />
          </div>
          <MdOutlineKeyboardArrowDown className={styles['arrow-down']} />
        </div>
      </div>
      <Link href={destination ?
        `/tours/${destination.toLowerCase()
          .replace(/[^a-z0-9\s]/g, '') // Remove non-alphanumeric characters
          .replace(/\s+/g, '-')}`
        : '#'}> {/* Use a placeholder link or '#' when destination is null */}
        <button
          className={styles['search-options-button']}
          disabled={!destination} // Disable if destination is not selected
        >
          Search
        </button>
      </Link>

    </div>
  );
};

export default TourSearch;
