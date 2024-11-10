import React, { useState } from 'react';
import styles from './itinery.module.css';

const itineraryData = [
  {
    day: 'Day 01',
    title: 'Admire Big Ben, Buckingham Palace And St Paul’s Cathedral',
    description:
      'Arrive Cairo airport, welcome greeting by our representative who will assist you and provide transfers to your Hotel in Cairo. (the clients will inform us about their arrival time minimum 7 days before)',
    highlights: [
      'Admire Big Ben, Buckingham Palace And St Paul’s Cathedral',
      'Chance To Spot Prominent Landmarks Of The City',
    ],
  },
  {
    day: 'Day 02',
    title: 'Adventure Begins',
    description: 'This day is filled with various adventurous activities...',
    highlights: ['Activity 1', 'Activity 2'],
  },
  {
    day: 'Day 03',
    title: 'Historical Tour',
    description: 'Explore historical sites and landmarks.',
    highlights: ['Historical Site 1', 'Historical Site 2'],
  },
  // Add more days as needed
];

const Itinerary = ({ itineraries }) => {
  
  const [expandedDay, setExpandedDay] = useState(null);
  const [selectedItineryButton, setSelectedItineryButton] = useState('overview');

  const toggleDay = (index) => {
    setExpandedDay(expandedDay === index ? null : index);
  };
  const toggleButton = (button) => {
    setSelectedItineryButton(button);
  };
  return (
    <div className={styles['container']}>
      <h2 className={styles['title-header']}>Itinerary</h2>
      {itineraries.map((item, index) => (
        <div key={index} className={styles['day-container']}>
          <div className={styles['day-header']} onClick={() => toggleDay(index)}>
            <div className={styles['day-title']}>
              <span className={styles['day']}>Day: {item.day}</span>
              <span className={styles['title']}>{item.title}</span>
            </div>
            <span className={styles['toggle-icon']}>
              {expandedDay === index ? '▲' : '▼'}
            </span>
          </div>
          {expandedDay === index && (
            <>
              {selectedItineryButton == 'overview' ? <div className={styles['day-content']}>
                <p>{item.description}</p>
                {/* <ul className={styles['highlights']}>
                  {item.highlights.map((highlight, i) => (
                    <li key={i}>✓ {highlight}</li>
                  ))}
                </ul> */}
              </div> : null}

              {selectedItineryButton == 'Car' ? <>

              </> : null}
              {selectedItineryButton === 'meals' && (
                <div className={styles['meals-section']}>
                  <h3>Meals</h3>

                  {item.meals.breakfast.isAvailable ? <div className={styles['meal-item']}>
                    <h4>Breakfast</h4>
                    <p>{item.meals.breakfast.name}</p>
                    <div className={styles['meals-photos']}>


                      {item.meals.breakfast.photos.map((img) => {
                        return (

                          <>
                            <img src={img} alt="Breakfast" className={styles['meal-image']} />
                          </>
                        )
                      })}
                    </div>


                  </div> : null}
                  {item.meals.lunch.isAvailable ?
                    <div className={styles['meal-item']}>
                      <h4>Lunch</h4>
                      <p>{item.meals.lunch.name}</p>
                      <div className={styles['meals-photos']}>


                        {item.meals.lunch.photos.map((img) => {
                          return (

                            <>
                              <img src={img} alt="Breakfast" className={styles['meal-image']} />
                            </>
                          )
                        })}
                      </div>
                    </div> : null}
                  {item.meals.dinner.isAvailable ?
                    <div className={styles['meal-item']}>
                      <h4>Dinner</h4>
                      <p>{item.meals.dinner.name}</p>
                      <div className={styles['meals-photos']}>


                        {item.meals.dinner.photos.map((img) => {
                          return (

                            <>
                              <img src={img} alt="Breakfast" className={styles['meal-image']} />
                            </>
                          )
                        })}
                      </div>
                    </div> : null}
                </div>
              )}

              {selectedItineryButton === 'hotel' && (
                <div className={styles['hotel-section']}>
                  <h3>Hotel Information</h3>
                  <div className={styles['hotel-info']}>
                    <h4>Hotel Name</h4>
                    <p>Location: Hotel Location</p>
                    <p>Category: Hotel Category</p>
                    <div className={styles['hotel-images']}>
                      <img src="hotel_image_url" alt="Hotel" className={styles['hotel-image']} />
                    </div>
                  </div>
                  <div className={styles['room-section']}>
                    <h4>Room Category</h4>
                    <p>Room Category Name</p>
                    <div className={styles['room-images']}>
                      <img src="room_image_url" alt="Room" className={styles['room-image']} />
                    </div>
                  </div>
                </div>
              )}
              {selectedItineryButton === 'siteseen' ? (
  <>
    <div className={styles['siteseen-photos']}>
      {item.siteSeenPhotos.map((img, index) => (
        <div key={index} className={styles['photo-container']}>
          <img src={img} alt={`Site Seen ${index}`} className={styles['siteseen-image']} />
        </div>
      ))}
    </div>
  </>
) : null}


              <div className={styles['toggle-buttons']}>
                <button onClick={() => toggleButton("overview")}>Overview</button>
                <button onClick={() => toggleButton("meals")}>Meals</button>
                <button onClick={() => toggleButton("Car")}>Car</button>
                <button onClick={() => toggleButton("hotel")}>Hotel</button>
                <button onClick={() => toggleButton("siteseen")}>Site Seen</button>
              </div>
            </>


          )}


        </div>
      ))}
    </div>
  );
};

export default Itinerary;
