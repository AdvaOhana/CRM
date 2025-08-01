import CustomersPage from '../pages/CustomersPage';
import SettingPage from '../pages/SettingPage'
import Navigation from './Navigation';
import styles from '../styles/App.module.css'
import { Outlet, Route, Routes } from 'react-router-dom'

export default function App() {
    return (<div>
        <Routes>
            <Route path='/' element={<AppLayOut />} >
                <Route index element={<HomePage />} />
                <Route path='setting' element={<SettingPage />} />
                <Route path='customers' element={<CustomersPage />} />
            </Route>
        </Routes>
    </div>);
}



function HomePage() {
    return <h1>Home Page</h1>
}
function Headline() {
    return (
        <h1 className={styles.title}>CRM - Application</h1>
    )
}
function AppLayOut() {
    return (
        <>
            <header>
                <Headline />
                <Navigation />
            </header>
            <div>
                <Outlet />
            </div>
        </>)
}
