import React from 'react'
import BlogCard from '../../components/blog-card/blogCard'
import styles from './blogs.module.css'
import { apiCall } from '../../utils/common'
const index = ({ blogs }) => {

    return (
        <div>
            <header className={styles.header}>
                <h1 className={styles.title}>Blogs</h1>
                <nav>Home ➔ Blogs</nav>
            </header>
            <div className={styles['blog-grid']}>
                {blogs.data.map((blogs) => {
                    return (
                        <>
                            <BlogCard blogs={blogs} />

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

    return {
        props: {
            blogs,
        },
        revalidate: 600,
    };
}