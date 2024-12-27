import React, { useEffect, useState } from 'react';
import styles from '../whyChoose/whyChoose.module.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styled from 'styled-components';

const WhyChoose = ({ whyChoose }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);


  useEffect(() => {
    setIsClient(true); // This will ensure the component renders only on the client side
    // Update `isMobile` based on the window width
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767); // Mobile view for width <= 767px
    };

    // Add resize event listener and run it once on load
    window.addEventListener('resize', handleResize);
    handleResize();

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Carousel responsive settings
  const responsive = {
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  };
const CustomDots = styled(Carousel)`
.react-multi-carousel-dot-list {
margin-bottom:-10px;}

`



  return (
    <section className={styles['about-us-section']}>
       <div className={styles['header']}>
  <p className={styles['subtitle']}>Your Trusted Travel Partner</p>
  <h2 className={styles['title']}>Why Choose Us</h2>
</div>

     
      {isMobile ? (
        // Show carousel only on mobile
        <CustomDots
          responsive={responsive}
          infinite={true}
          autoPlay={false}
          autoPlaySpeed={3000}
          swipeable={true}
          draggable={true}
          showDots={true}
          arrows={false}
          containerClass={styles['carousel-container']}
        >
          {whyChoose.data.slice(0, 4).map((card) => (
            <div key={card.id} className={styles['about-card']}>
              <div className={styles['image-wrapper']}>
                <img src={card.bannerImage} alt={card.title} />
              </div>
              <div className={styles['card-content']}>
                <h3 className={styles['card-title']}>{card.title}</h3>
                {isClient && (

                  <p
                    className={styles['card-description']}
                    dangerouslySetInnerHTML={{
                      __html: card.description && card.description,
                    }}
                  ></p>
                )}
              </div>
            </div>
          ))}
        </CustomDots>
      ) : (
        // Show grid on larger screens
        <div className={styles['cards-container']}>
          {whyChoose.data.slice(0, 4).map((card) => (
            <div key={card.id} className={styles['about-card']}>
              <div className={styles['image-wrapper']}>
                <img src={card.bannerImage} alt={card.title} />
              </div>
              <div className={styles['card-content']}>
                <h3 className={styles['card-title']}>{card.title}</h3>
                {isClient && (

                  <p
                    className={styles['card-description']}
                    dangerouslySetInnerHTML={{
                      __html: card.description && card.description,
                    }}
                  ></p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default WhyChoose;
