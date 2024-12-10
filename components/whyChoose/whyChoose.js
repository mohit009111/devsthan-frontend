import React from 'react'
import styles from '../whyChoose/whyChoose.module.css'
const whyChoose = ({whyChoose}) => {
    const services = [
        { title: "Worldwide Coverage", bannerImage: "🌍", description: "Cras facilisis fermentum ex sed ..." },
        { title: "Competitive Pricing", bannerImage: "⚡️", description: "Burabitur convallis enim ..." },
        { title: "Fast Booking", bannerImage: "📅", description: "Fermentum eitorx quis ..." },
        { title: "Guided Tours", bannerImage: "🚩", description: "Pellentesque venenatis ..." },
        { title: "Best Support 24/7", bannerImage: "⏰", description: "Sed venenatis mauris ..." },
        { title: "Ultimate Flexibility", bannerImage: "📆", description: "Duis leo sapien, lacinia ..." }
      ];
    
  return (
    <>
     <section className={styles['about-us-section']}>
      <h2 className={styles['section-title']}>Why Chosse Us</h2>
      <div className={styles['cards-container']}>
        {whyChoose.data.map((card) => (
          <div key={card.id} className={styles['about-card']}>
            <div className={styles['image-wrapper']}>
              <img src={card.bannerImage} alt={card.title} />
            </div>
            <div className={styles['card-content']}>
              <h3 className={styles['card-title']}>{card.title}</h3>
              <p className={styles['card-description']}>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
    </>
  )
}

export default whyChoose
