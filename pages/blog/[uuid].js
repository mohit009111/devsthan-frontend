import React, { useEffect } from 'react';
import styles from './blog.module.css';
import { apiCall } from '../../utils/common';
import { format } from 'date-fns';
import parse from 'html-react-parser';
export default function Blog({ blogs, blogBanner }) {
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

    <>
      {/* <header className={styles.header}>
        <div className={styles['parallax-container']}>
          <img src={blogBanner?.data?.bannerUrls[0]} alt="Destination Banner" className={styles['parallax-image']} />
        </div>
        <div className={styles.header_content}>
          <h1 className={styles.title}>Blog</h1>
          <nav>Home ➔ Blog</nav>
        </div>
      </header> */}
      <div className={styles['blog-container']}>
        <div className={styles['blog-image-container']}>
          <img
            src={blogs.data.bannerImage}
            alt={blogs.data.title}
            className={styles['blog-image']}
          />
        </div>
        <h1 className={styles['blog-title']}>{blogs.data.title}</h1>

        <p className={styles['blog-date']}>
          Published on: {format(new Date(blogs.data.createdAt), 'MMMM d, yyyy')}
        </p>
        <div className={styles['blog-description']}>
  {parse(blogs.data.description)}
</div>
      </div>
    </>

  );
}

export async function getStaticProps({ params }) {
  const { uuid } = params
  const blogs = await apiCall({
    endpoint: `/api/getBlogById/${uuid}`,
    method: 'GET',

  });
  const blogBanner = await apiCall({
    endpoint: `/api/getBanner?page=blogBanner`,
    method: 'GET',

  });


  return {
    props: { blogs, blogBanner },

    revalidate: 600,
  };
  
}

export async function getStaticPaths() {
  // Replace with your API URL
  const blog = await apiCall({
    endpoint: `/api/getAllBlogs`,
    method: 'GET',

  });


  const paths = blog.data.map((blog) => ({
    params: { uuid: blog.uuid },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}
