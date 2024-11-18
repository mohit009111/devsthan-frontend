import React from 'react';
import styles from './mobileMenue.module.css';
import { FaRegUser ,FaArrowRight } from "react-icons/fa6";
import Link from 'next/link';

const MobileMenu = ({ isOpen, toggleMenu }) => {
    return (
        <div className={`${styles['mobile-menu']} ${isOpen ? styles['open'] : ''}`}>
            <div className={styles['menu-header']}>
            <div className={styles['logo-container']}>
                    <Link href="/">
                        <img src='https://res.cloudinary.com/dmyzudtut/image/upload/v1731261401/Untitled_design_11_dlpmou.jpg' alt="TripRex" className={styles['logo']} />
                    </Link>
                </div>
                <span onClick={toggleMenu} className={styles['close-button']}>×</span>
            </div>
            <ul className={styles['menu-list']}>
            <li onClick={toggleMenu}>
                    <Link href={`/tour/uttarakhand`}>
                        Tours <FaArrowRight className={styles['arrow-icon']} />
                    </Link>
                </li>
                <li onClick={toggleMenu}>
                    <Link href="/about">
                        About <FaArrowRight className={styles['arrow-icon']} />
                    </Link>
                </li >
                <li onClick={toggleMenu}>
                    <Link href="/destinations">
                        Destination <FaArrowRight className={styles['arrow-icon']} />
                    </Link>
                </li>
                <li onClick={toggleMenu}>
                    <Link href={`/blogs`}>
                        Blogs <FaArrowRight className={styles['arrow-icon']} />
                    </Link>
                </li>
                <li onClick={toggleMenu}> 
                    <Link href="/contact">
                        Contact Us<FaArrowRight className={styles['arrow-icon']} />
                    </Link>
                </li>
                {/* <li onClick={toggleMenu}>
                    <Link href="/register">
                        Register / Login <FaArrowRight className={styles['arrow-icon']} />
                    </Link>
                </li> */}
            </ul>
            <div className={styles['menu-footer']}>
                <div className={styles['contact-info']}>
                    <FaRegUser className={styles['contact-icon']} />
                    <a href="tel:+990737621432">+91 86-8381-8381</a>
                </div>
            </div>
        </div>
    
    );
};

export default MobileMenu;
