import { FaThLarge, FaTable } from 'react-icons/fa';
import { useView } from '../contexts/ViewContext'
import Cards from '../components/Cards'
import Table from '../components/Table'
import Button from '../components/Button'
import { useUsers, useDeleteUser } from '../hooks/useUsers';
import { useNavigate } from 'react-router-dom';

export default function UsersPage() {

    const { isCard, toggleView } = useView()
    const { data: users, isLoading, error } = useUsers();
    const deleteUser = useDeleteUser();
    const navigate = useNavigate();


    if (isLoading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>;


    return <div>
        <Button onClick={toggleView}>Switch to {!isCard ? <> Card < FaThLarge /></> : <>Table < FaTable /></>}</Button>
        {!isCard ? <Table data={users} onRowClick={user => navigate(`${user._id}?edit=false`)} onDelete={deleteUser} />
            : <Cards data={users} onCardClick={user => navigate(`${user._id}?edit=false`)} onDelete={deleteUser} />}
    </div>

}
