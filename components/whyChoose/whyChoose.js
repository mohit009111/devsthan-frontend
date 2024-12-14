import React, { useEffect, useState } from 'react'
import styles from '../whyChoose/whyChoose.module.css'
const whyChoose = ({ whyChoose }) => {

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // This will ensure the component renders only on the client side
  }, []);
  return (
    <>
      <section className={styles['about-us-section']}>
        <h2 className={styles['section-title']}>Why Chosse Us</h2>
        <div className={styles['cards-container']}>
          {whyChoose.data.slice(0, 4).map((card) => (
            <div key={card.id} className={styles['about-card']}>
              <div className={styles['image-wrapper']}>
                <img src={card.bannerImage} alt={card.title} />
              </div>
              <div className={styles['card-content']}>
                <h3 className={styles['card-title']}>{card.title}</h3>
                {isClient && (
                  <p className={styles['card-description']} dangerouslySetInnerHTML={{
                    __html: card.description && card.description
                  }}></p>)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default whyChoose
