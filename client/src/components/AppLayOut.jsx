import { Outlet } from 'react-router-dom'
import Navigation from './Navigation';
import styles from '../styles/App.module.css'

export default function AppLayOut() {
    return (
        <>
            <header>
                <h1 className={styles.title}>CRM - Application</h1>
                <Navigation />
            </header>
            <div>
                <Outlet />
            </div>
        </>)
}