import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import styles from './blogs.module.css';
import BlogCard from '../blog-card/blogCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomPrevArrow = ({ onClick }) => (
  <button className={styles.prevArrow} onClick={onClick}>
    &#8592; {/* Left arrow symbol */}
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button className={styles.nextArrow} onClick={onClick}>
    &#8594;
  </button>
);

const Blogs = ({ blogs }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <>
     <div className={styles['header']}>
  <p className={styles['subtitle']}>Your Trusted Travel Partner</p>
  <h2 className={styles['title']}>Why Choose Us</h2>
</div>
      <div className={styles.blogsContainer}>
        {isMobile ? (
          <Slider {...settings}>
            {blogs.slice(0, 6).map((blog) => (
              <div key={blog.id}>
                <BlogCard blogs={blog} />
              </div>
            ))}
          </Slider>
        ) : (
          blogs.slice(0, 6).map((blog) => (
            <BlogCard key={blog.id} blogs={blog} />
          ))
        )}
      </div>
    </>
  );
};

export default Blogs;
