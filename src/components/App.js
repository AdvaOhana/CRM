import { useState } from 'react'
import { customers } from '../data/myObj'
import Cards from './Cards'
import Table from './Table'
import Buttons from './Buttons'

export default function App() {
    const [view, setView] = useState('card')
    return (
        <>
            <Buttons onChange={setView} />
            {view === 'table' ? <Table customers={customers} /> : <Cards customers={customers} />}
        </>
    );
}
