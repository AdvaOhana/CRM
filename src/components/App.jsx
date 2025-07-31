import { customers } from '../data/myObj'
import Cards from './Cards'
import Table from './Table'
import Button from './Button'
import { useView } from '../contexts/ViewContext'
import { NavLink, Outlet, Route, Routes } from 'react-router-dom'

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
function Navigation() {
    return (
        <div className='nav-container'>
            <ul>
                <li><NavLink to="/" >Home</NavLink></li>
                <li><NavLink to="/setting">Setting</NavLink></li>
                <li><NavLink to="/customers">Customers</NavLink></li>
            </ul>
        </div>
    )
}
function SettingPage() {
    const { isCard, toggleView } = useView()
    return (<div>
        <Button onClick={toggleView}>Show as {!isCard ? 'card' : 'table'}</Button>
    </div>)
}
function CustomersPage() {
    const { isCard } = useView()

    return (!isCard ? <Table customers={customers} /> : <Cards customers={customers} />)

}
function HomePage() {
    return <h1>Home Page</h1>
}
function AppLayOut() {
    return (
        <>
            <header>
                <Navigation />
            </header>
            <div>
                <Outlet />
            </div>
        </>)
}
