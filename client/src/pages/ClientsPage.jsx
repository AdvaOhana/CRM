import { FaThLarge, FaTable } from 'react-icons/fa';
import { useClients, useDeleteClients } from '../hooks/useClients';
import { useView } from '../contexts/ViewContext'
import Cards from '../components/Cards'
import Table from '../components/Table'
import Button from '../components/Button'
import '../global.css';


import { useNavigate } from 'react-router-dom';

export default function CustomersPage() {
    const { isCard, toggleView } = useView()
    const { data: clients, isLoading, error } = useClients();
    const deleteClient = useDeleteClients();
    const navigate = useNavigate();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>;

    return <div className="layout">
        <Button className={"layout-btn"} onClick={toggleView}>Switch to {!isCard ? <> Card <FaThLarge /></> : <> Table <FaTable /></>}</Button>
        {!isCard ? <Table data={clients} onRowClick={client => navigate(`${client._id}?edit=false`)} onDelete={deleteClient} /> :
            <Cards data={clients} onCardClick={client => navigate(`${client._id}?edit=false`)} onDelete={deleteClient} />}
    </div>
}

