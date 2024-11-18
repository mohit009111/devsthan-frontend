import React from 'react'
import styles from './blogs.module.css'
import BlogCard from '../blog-card/blogCard';
const blogs = ({blogs}) => {
    const firstFiveBlogs = blogs.slice(0, 5);
  return (
    <>
    <h1 className={styles.blogsHeading}>Blogs</h1>
    <div className={styles.blogsContainer}>
      
    {blogs.map((blogs) => (
      <BlogCard key={blogs.id} blogs={blogs} />
    ))}
  </div>
    
    </>
  )
}

export default blogs
