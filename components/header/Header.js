import React from 'react'
import styles from '../header/header.module.css'
import { FaRegUser } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiPhoneCall } from "react-icons/fi";
import Link from 'next/link';
const Header = () => {
    return (
        <>
            <header className={styles['header-container']}>
                <div className={styles['logo-container']}>
                    <Link href={`/`}>
                    
                    <img src="/logo.png" alt="TripRex" className={styles['logo']} />
                    </Link>
                </div>
                <nav className={styles['nav-menu']}>
                    <ul>
                        <li><a className={styles['nav-link']} href="/">Home</a></li>
                        <li><a className={styles['nav-link']} href="/about">About</a></li>
                        <li><a className={styles['nav-link']} href="/tours">Tours</a></li>
                        <li><a className={styles['nav-link']} href="/destinations">Destination</a></li>
                        <li><a className={styles['nav-link']} href="/contact">Contact</a></li>
                    </ul>
                </nav>
                <div className={styles['header-right-option']}>

                    <FaRegUser className={styles['user-icon']} />
                    <div className={styles['inquiry']}>

                        <FiPhoneCall className={styles['inquiry-icon']}/>
                        <div className={styles['inquiry-details']}>

                            <span>To More Inquiry</span>
                            <a href="tel:+990737621432">+990-737-621-432</a>
                        </div>
                    </div>
                    <RxHamburgerMenu className={styles['hamburger']}/>
                </div>

            </header>
        </>
    )
}

export default Header
