import React from 'react'
import styles from '../whyChoose/whyChoose.module.css'
const whyChoose = () => {
    const services = [
        { title: "Worldwide Coverage", icon: "🌍", description: "Cras facilisis fermentum ex sed ..." },
        { title: "Competitive Pricing", icon: "⚡️", description: "Burabitur convallis enim ..." },
        { title: "Fast Booking", icon: "📅", description: "Fermentum eitorx quis ..." },
        { title: "Guided Tours", icon: "🚩", description: "Pellentesque venenatis ..." },
        { title: "Best Support 24/7", icon: "⏰", description: "Sed venenatis mauris ..." },
        { title: "Ultimate Flexibility", icon: "📆", description: "Duis leo sapien, lacinia ..." }
      ];
    
  return (
    <>
     <div className={styles['why-choose-trip-rex']}>
      <h3 className={styles['section-header']}>Our Success</h3>
      <h2 className={styles['main-title']}>Why Choose TripRex</h2>
      <div className={styles['service-grid']}>
        {services.map((service, index) => (
          <div key={index} className={styles['service-card']}>
            <div className={styles['icon']}>{service.icon}</div>
            <h4 className={styles['card-title']}>{service.title}</h4>
            <p className={styles['description']}>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default whyChoose
