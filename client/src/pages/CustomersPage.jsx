import { FaUserPlus, FaThLarge, FaTable } from 'react-icons/fa';
import { useCustomers, useDeleteCustomer } from '../hooks/useCustomers';
import { useView } from '../contexts/ViewContext'
import { useState } from 'react';
import Cards from '../components/Cards'
import Table from '../components/Table'
import Button from '../components/Button'
import AddForm from '../components/AddForm';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

export default function CustomersPage() {
    const { isCard, toggleView } = useView()
    const { data: customers, isLoading, error } = useCustomers();
    const deleteCustomer = useDeleteCustomer();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();


    function handleOpen() {
        setOpen(open => !open)
    }


    if (isLoading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>;


    return <div>
        <div>
            <Button onClick={toggleView}>Switch to {!isCard ? <> Card < FaThLarge /></> : <>Table < FaTable /></>}</Button>
            <Button onClick={handleOpen}><FaUserPlus /></Button>
            {!isCard ? <Table data={customers} onRowClick={customer => navigate(`${customer._id}?edit=false`)} onDelete={deleteCustomer} /> :
                <Cards data={customers} onCardClick={customer => navigate(`${customer._id}?edit=false`)} onDelete={deleteCustomer} />}
        </div>
        <>
            <Dialog open={open} onClose={handleOpen}>
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogContent>
                    <AddForm />
                </DialogContent>
            </Dialog>
        </>
    </div>

}

