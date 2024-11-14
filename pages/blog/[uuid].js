import React from 'react';
import styles from './blog.module.css';
import { apiCall } from '../../utils/common';

export default function Blog({ blogs }) {
    console.log(blogs)
  return (
    <div className={styles['blog-container']}>
      <div className={styles['blog-image-container']}>
        <img
          src={blogs.data.bannerImage}
          alt={blogs.data.title}
          className={styles['blog-image']}
        />
      </div>
      <h1 className={styles['blog-title']}>{blogs.data.title}</h1>
      <p className={styles['blog-date']}>Published on: {blogs.data.createdAt}</p>
      <p className={styles['blog-description']}   dangerouslySetInnerHTML={{
                        __html: blogs.data.description // You can set the desired maxLength here, e.g., 100
                    }}></p>
    </div>
  );
}

export async function getStaticProps({ params }) {
const {uuid}=params
const blogs= await apiCall({
    endpoint: `/api/getBlogById/${uuid}`,
    method: 'GET',

});
  

  return {
    props: { blogs },
    revalidate: 10, // ISR for revalidating every 10 seconds
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
