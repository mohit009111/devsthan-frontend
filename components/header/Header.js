import React, { useState } from 'react';
import styles from '../header/header.module.css';
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";
import Link from 'next/link';
import MobileMenu from '../mobileMenue/mobileMenue';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <header className={styles['header-container']}>
                <div className={styles['logo-container']}>
                    <Link href="/">
                        <img src='https://res.cloudinary.com/dmyzudtut/image/upload/v1731261401/Untitled_design_11_dlpmou.jpg' alt="TripRex" className={styles['logo']} />
                    </Link>
                </div>
                <nav className={styles['nav-menu']}>
                    <ul>
                        <li><p className={styles['nav-link']} href="/">Home</p></li>
                        <li><p className={styles['nav-link']} href="/about">About</p></li>
                        <li><p className={styles['nav-link']} href="/tours">Tours</p></li>
                        <li><p className={styles['nav-link']} href="/destinations">Destination</p></li>
                        <li><p className={styles['nav-link']} href="/contact">Contact</p></li>
                    </ul>
                </nav>
                <div className={styles['header-right-option']}>
                    <div className={styles['inquiry']}>
                        <FiPhoneCall className={styles['inquiry-icon']} />
                        <div className={styles['inquiry-details']}>
                            <span>To More Inquiry</span>
                            <a href="tel:+990737621432">+91 86-8381-8381</a>
                        </div>
                    </div>
                    <HiOutlineMenuAlt3 className={styles['hamburger']} onClick={toggleMenu} />
                </div>
            </header>
            <MobileMenu isOpen={menuOpen} toggleMenu={toggleMenu} />
        </>
    );
};

export default Header;
