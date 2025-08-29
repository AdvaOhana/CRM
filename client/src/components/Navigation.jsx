import { FaHome, FaUsers, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'
import { useLogoutUser, useAuthQuery } from '../hooks/useUsers.js'
import styles from '../styles/App.module.css'

export default function Navigation() {
    const { data: user } = useAuthQuery()

    const { logoutUserMutate } = useLogoutUser()

    return (

        <nav className={styles['nav-container']}>
            <ul className={styles.navList}>
                {!user && (<>
                    <li><NavLink to="/" className={styles.link}> Login</NavLink></li>
                </>)}
                {user && (<>
                    {user.role === 'admin' ? <><li><NavLink to="/register" className={styles.link}> Register</NavLink></li>
                        <li><NavLink to="/users" className={styles.link}><FaUserCircle /> Users</NavLink></li>
                    </> : null}
                    <li><NavLink to="/home" className={styles.link}> <FaHome /> Home</NavLink></li>
                    <li><NavLink to="/clients" className={styles.link}> <FaUsers /> Customers</NavLink></li>
                    <li onClick={logoutUserMutate} className={styles.link} ><FaSignOutAlt /> Logout</li>
                </>)}
            </ul>
        </nav >
    )
}