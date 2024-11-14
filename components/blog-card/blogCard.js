import { truncateText } from '../../utils/common';
import styles from './blogCard.module.css';
import Link from 'next/link'
export default function BlogCard({ blogs }) {
    return (
        <div className={styles['blog-card']}>
            <div className={styles['blog-card-image']}>
                <img src={blogs.bannerImage} alt="Scenic Mountain Lake" />
            </div>
            <div className={styles['blog-card-content']}>
                <h2 className={styles['blog-card-title']}>
                    {blogs.title}
                </h2>
                <div className={styles['blog-card-meta']}>
                    <span className={styles['author']}>By administrator</span>
                    <span className={styles['date']}>{blogs.createdAt}</span>
                </div>
                <p
                    className={styles['blog-card-description']}
                    dangerouslySetInnerHTML={{
                        __html: truncateText(blogs.description, 700) // You can set the desired maxLength here, e.g., 100
                    }}
                />
             <Link href={`/blog/${blogs.uuid}`}> <p className={styles['read-more']}>Read More</p></Link>  
            </div>
        </div>
    );
}