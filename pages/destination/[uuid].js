import React, { useState } from 'react';
import styles from './destination.module.css';
import { apiCall } from '../../utils/common';

const images = [
  'italy.jpg', 'thailand.jpg', 'vietnam.jpg', 'venice.jpg',
  'peru.jpg', 'switzerland.jpg', 'nepal.jpg', 'canada.jpg'
];

const Destination  = ({destinationData}) => {
    const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.container}>
      <section className={styles.mainContent}>
        <h1>Welcome To {destinationData.state.label}</h1>
        <p>
      {isExpanded ? destinationData.description : `${destinationData.description .slice(0, 900)}...`}
      <button onClick={toggleReadMore}>
        {isExpanded ? "Show Less" : "Read More"}
      </button>
    </p>

        <div className={styles.imageGrid}>
          {destinationData.images.map((img, index) => (
            <div key={index} className={styles.imageCard}>
              <img src={`${img}`} alt={`image ${index + 1}`} className={styles.image} />
            </div>
          ))}
        </div>

        <h2>Heaven On Earth</h2>
        <p>
          Japan is known for exploring ancient ruins, cultural landmarks, and much more...
        </p>
        <ul className={styles.features}>
          <li>🌍 Exploring ancient ruins, historical landmarks</li>
          <li>🎡 Kid-friendly activities, theme parks</li>
          <li>🗺️ Immersive cultural experiences</li>
          <li>🍽️ Premium accommodations, gourmet dining</li>
        </ul>
      </section>

      <aside className={styles.sidebar}>
        <div className={styles.detailsBox}>
          <h3>Destination</h3>
          <p><strong>Japan</strong></p>
          <p><strong>Population:</strong> 90.5 million</p>
          <p><strong>Capital City:</strong> Cairo</p>
          <p><strong>Language:</strong> Japanese</p>
          <p><strong>Currency:</strong> Yen</p>
        </div>
        <div className={styles.offerBox}>
          <h4>Savings worldwide</h4>
          <p>50% Off</p>
          <button className={styles.offerButton}>View All Package</button>
        </div>
      </aside>
    </div>
  );
};

export default Destination ;
export async function getStaticPaths() {
   
    const destinations = await apiCall({
        endpoint: '/api/getAllDestinations',
        method: 'GET',
    
      });
  
    const paths = destinations.map((dest) => ({
      params: { uuid: dest.uuid },
    }));
  
    return {
      paths,
      fallback: false, 
    };
  }
  
  export async function getStaticProps({ params }) {
    const { uuid } = params;
    console.log("uuid",uuid)
    const destinationData = await apiCall({
      endpoint: `/api/getDestinationById/${uuid}`,
      method: 'POST',
    
    });
  
    return {
      props: {
        destinationData
      },
    };
  }
  