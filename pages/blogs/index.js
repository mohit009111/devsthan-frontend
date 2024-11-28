import React, { useEffect } from 'react'
import BlogCard from '../../components/blog-card/blogCard'
import styles from './blogs.module.css'
import { apiCall } from '../../utils/common'
const index = ({ blogs,blogsBanner }) => {
    const handleScrollParallax = () => {
        const parallaxImage = document.querySelector(`.${styles['parallax-image']}`);
        if (parallaxImage) {
          const scrollPosition = window.scrollY;
          parallaxImage.style.transform = `translateY(${scrollPosition * 0.5}px)`; // Adjust speed factor
        }
      };
    
      useEffect(() => {
        window.addEventListener('scroll', handleScrollParallax);
        return () => window.removeEventListener('scroll', handleScrollParallax);
      }, []);
     
    return (
        <div>
             <header className={styles.header}>
        <div className={styles['parallax-container']}>
          <img src={blogsBanner.data.bannerUrls[0]} alt="Destination Banner" className={styles['parallax-image']} />
        </div>
        <div className={styles.header_content}>
          <h1 className={styles.title}>Blogs</h1>
          <nav>Home ➔ Blogs</nav>
        </div>
      </header>
            <div className={styles['blog-grid']}>
                {blogs.data.map((blogs) => {
                    return (
                        <>
                            <BlogCard key={blogs.id} blogs={blogs} />

                        </>
                    )
                })}


            </div>
        </div>
    )
};

export default index
export async function getStaticProps() {

    const blogs = await apiCall({
        endpoint: `/api/getAllBlogs`,
        method: 'GET',

    });
    const blogsBanner = await apiCall({
        endpoint: `/api/getBanner?page=blogsBanner`,
        method: 'GET',
    
      });
    return {
        props: {
            blogs,
            blogsBanner
        },
        revalidate: 600,
    };
}