import { FaHome, FaUsers } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'
import styles from '../styles/App.module.css'

export default function Navigation() {
    return (
        <nav className={styles['nav-container']}>
            <ul className={styles.navList}>
                <li><NavLink to="/" className={styles.link}> <FaHome /> Home</NavLink></li>
                <li><NavLink to="/customers" className={styles.link}> <FaUsers /> Customers</NavLink></li>
            </ul>
        </nav >
    )
}