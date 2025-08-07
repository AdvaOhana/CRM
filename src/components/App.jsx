import CustomersPage from '../pages/CustomersPage';
import Navigation from './Navigation';
import EditPage from '../pages/EditPage';
import styles from '../styles/App.module.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import { customers as initinalCustomers } from '../data/myObj'
import { useState } from 'react';


export default function App() {
    const [customers, setCustomers] = useState(initinalCustomers)


    return (<div>
        <Routes>
            <Route path='/' element={<AppLayOut />} >
                <Route index element={<HomePage />} />
                <Route path='customers'>
                    <Route index element={<CustomersPage customers={customers} onAddCustomer={setCustomers} />} />
                    <Route path=':id' element={<EditPage customers={customers} onEdit={setCustomers} />} />
                </Route>
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
